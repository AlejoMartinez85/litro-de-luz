import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Corre en el servidor (no se prerenderiza en el build estático).
export const prerender = false;

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const FROM = 'Litro de Luz Web <onboarding@resend.dev>'; // cambiar a web@litrodeluz.org cuando el dominio esté verificado en Resend
const TO = 'empresas@unlitrodeluzcolombia.org';

const MAX_LEN = { nombre: 100, empresa: 150, email: 254, mensaje: 2000 };

// Elimina caracteres de control (previene email header injection) y tags HTML (XSS en clientes de email).
const sanitize = (s: string) =>
  s.replace(/[\r\n\t]/g, ' ').replace(/<[^>]*>/g, '').trim();

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return json({ error: 'Solicitud inválida.' }, 400);
  }

  const nombre  = sanitize(String(data.get('nombre')  ?? '')).slice(0, MAX_LEN.nombre);
  const empresa = sanitize(String(data.get('empresa') ?? '')).slice(0, MAX_LEN.empresa);
  const email   = sanitize(String(data.get('email')   ?? '')).slice(0, MAX_LEN.email);
  const mensaje = sanitize(String(data.get('mensaje') ?? '')).slice(0, MAX_LEN.mensaje);
  const honeypot = String(data.get('_gotcha') ?? '').trim();

  // Bot detectado por el honeypot → respondemos "ok" silencioso, sin enviar.
  if (honeypot) return new Response(null, { status: 204 });

  if (!nombre || !empresa || !mensaje || !EMAIL_RE.test(email)) {
    return json({ error: 'Por favor completa todos los campos con datos válidos.' }, 400);
  }

  if (!RESEND_API_KEY) {
    console.error('[contacto] Falta RESEND_API_KEY en el entorno.');
    return json({ error: 'El servidor no está configurado para enviar correos.' }, 500);
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Nuevo contacto ESG — ${empresa}`,
      text:
        `Nuevo mensaje desde el formulario de empresas:\n\n` +
        `Nombre:  ${nombre}\n` +
        `Empresa: ${empresa}\n` +
        `Email:   ${email}\n\n` +
        `Mensaje:\n${mensaje}\n`,
    });

    if (error) {
      console.error('[contacto] Error de Resend:', error);
      return json({ error: 'No se pudo enviar el mensaje. Intenta de nuevo.' }, 502);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error('[contacto] Excepción al enviar:', err);
    return json({ error: 'No se pudo enviar el mensaje. Intenta de nuevo.' }, 500);
  }
};
