interface EventContext {
  request: Request;
  env: Record<string, string>;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  try {
    const origin = context.request.headers.get('Origin');
    if (origin) {
      const allowedOrigins = [
        'https://deogenesmaranan.dev',
        'https://www.deogenesmaranan.dev',
        'http://localhost:5173',
        'http://localhost:4173',
        'http://localhost:3000',
      ];
      const isAllowed =
        allowedOrigins.some((allowed) => origin.startsWith(allowed)) ||
        origin.endsWith('.pages.dev');
      if (!isAllowed) {
        return new Response(
          JSON.stringify({ error: 'Cross-origin request rejected.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const { name, email, subject, message } =
      (await context.request.json()) as {
        name?: string;
        email?: string;
        subject?: string;
        message?: string;
      };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Missing required form fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim()) || email.trim().length > 254) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address format.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (
      name.trim().length > 100 ||
      (subject && subject.trim().length > 200) ||
      message.trim().length > 5000
    ) {
      return new Response(
        JSON.stringify({ error: 'Input field exceeds allowable length limit.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = context.env.RESEND_API_KEY;
    const recipientEmail = context.env.TO_EMAIL || 'maranandeogenes@gmail.com';

    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is missing.');
      return new Response(
        JSON.stringify({
          error: 'Email service configuration error.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const trimmedSubject = subject?.trim();
    const emailSubject = trimmedSubject
      ? `Portfolio Contact: ${trimmedSubject.slice(0, 100)}`
      : `Portfolio Message from ${name.trim().slice(0, 50)}`;

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(trimmedSubject || 'N/A');
    const safeMessage = escapeHtml(message.trim());
    const mailtoHref = `mailto:${encodeURIComponent(email.trim())}`;

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
        <h2 style="color: #f47522; margin-top: 0;">New Contact Form Submission</h2>
        <p><strong>Sender Name:</strong> ${safeName}</p>
        <p><strong>Sender Email:</strong> <a href="${mailtoHref}">${safeEmail}</a></p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f9fafb; padding: 12px; border-radius: 6px;">${safeMessage}</p>
      </div>
    `;

    const textContent = `New Contact Form Submission\n\nSender Name: ${name.trim()}\nSender Email: ${email.trim()}\nSubject: ${trimmedSubject || 'N/A'}\n\nMessage:\n${message.trim()}`;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact Form <onboarding@resend.dev>',
        to: [recipientEmail],
        reply_to: email.trim(),
        subject: emailSubject,
        html: htmlContent,
        text: textContent,
      }),
    });

    const resendResult = (await resendResponse.json()) as {
      id?: string;
      message?: string;
    };

    if (!resendResponse.ok) {
      console.error(
        'Resend API error:',
        resendResult.message || resendResponse.status
      );
      return new Response(
        JSON.stringify({
          error: 'Failed to dispatch message via email provider.',
        }),
        {
          status: resendResponse.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: resendResult.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Unhandled server error in send-email:', err);
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred while transmitting message.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

