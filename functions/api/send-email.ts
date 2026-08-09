interface EventContext {
  request: Request;
  env: Record<string, string>;
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  try {
    const { name, email, subject, message } = await context.request.json() as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required form fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = context.env.RESEND_API_KEY;
    const recipientEmail = context.env.TO_EMAIL || 'maranandeogenes@gmail.com';

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'RESEND_API_KEY environment variable is missing on Cloudflare Pages.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailSubject = subject?.trim()
      ? `Portfolio Contact: ${subject}`
      : `Portfolio Message from ${name}`;

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
        <h2 style="color: #f47522; margin-top: 0;">New Contact Form Submission</h2>
        <p><strong>Sender Name:</strong> ${name}</p>
        <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f9fafb; padding: 12px; border-radius: 6px;">${message}</p>
      </div>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact Form <onboarding@resend.dev>',
        to: [recipientEmail],
        reply_to: email,
        subject: emailSubject,
        html: htmlContent,
      }),
    });

    const resendResult = await resendResponse.json() as { id?: string; message?: string };

    if (!resendResponse.ok) {
      return new Response(
        JSON.stringify({
          error: resendResult.message || 'Failed to send message via Resend API.',
        }),
        { status: resendResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: resendResult.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown server error.';
    return new Response(
      JSON.stringify({ error: errorMsg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
