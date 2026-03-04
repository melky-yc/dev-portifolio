export function buildContactEmailHtml(name: string, email: string, message: string): string {
  const escapedName = escapeHtml(name)
  const escapedEmail = escapeHtml(email)
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br />")

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contato do Portfolio</title>
</head>
<body style="margin:0;padding:0;font-family:'Inter',system-ui,-apple-system,sans-serif;background-color:#09090b;color:#fafafa;line-height:1.6;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="border:1px solid #27272a;border-radius:8px;overflow:hidden;background:#0a0a0c;">
      <div style="padding:24px 28px;border-bottom:1px solid #27272a;">
        <h1 style="margin:0;font-size:20px;font-weight:600;letter-spacing:-0.02em;">Novo contato — Portfolio</h1>
        <p style="margin:8px 0 0;font-size:14px;color:#a1a1aa;">Mensagem enviada pelo formulário do site.</p>
      </div>
      <div style="padding:24px 28px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#71717a;width:100px;vertical-align:top;">Nome</td>
            <td style="padding:12px 0;font-size:14px;color:#fafafa;">${escapedName}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#71717a;vertical-align:top;">E-mail</td>
            <td style="padding:12px 0;font-size:14px;"><a href="mailto:${escapedEmail}" style="color:#fafafa;text-decoration:underline;">${escapedEmail}</a></td>
          </tr>
          <tr>
            <td style="padding:12px 0;font-size:13px;color:#71717a;vertical-align:top;">Mensagem</td>
            <td style="padding:12px 0;font-size:14px;color:#fafafa;">${escapedMessage}</td>
          </tr>
        </table>
      </div>
      <div style="padding:16px 28px;background:#18181b;border-top:1px solid #27272a;">
        <p style="margin:0;font-size:12px;color:#71717a;">Melchisedek Lima — Portfolio</p>
      </div>
    </div>
  </div>
</body>
</html>
`.trim()
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c)
}
