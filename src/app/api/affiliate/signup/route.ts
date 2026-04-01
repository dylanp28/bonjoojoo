import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const BOARD_EMAIL = process.env.BOARD_EMAIL || 'hello@bonjoojoo.com'

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[affiliate] RESEND_API_KEY not set — email disabled')
    return null
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, handle, platform, followers, niche, message } = body

    if (!name || !email || !handle) {
      return NextResponse.json({ error: 'name, email, and handle are required' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const client = getResendClient()

    if (client) {
      await client.emails.send({
        from: 'Bonjoojoo Affiliates <onboarding@resend.dev>',
        to: BOARD_EMAIL,
        subject: `New affiliate application: ${handle}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:Georgia,serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f7;">
    <tr><td align="center" style="padding:40px 20px;">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
        <tr><td style="background:#1a1a1a;padding:28px 40px;text-align:center;">
          <p style="margin:0;color:#c9a96e;font-size:20px;letter-spacing:4px;text-transform:uppercase;">bonjoojoo</p>
          <p style="margin:6px 0 0;color:#fff;font-size:11px;letter-spacing:2px;text-transform:uppercase;opacity:0.6;">New Affiliate Application</p>
        </td></tr>
        <tr><td style="padding:36px 40px;">
          <h2 style="margin:0 0 24px;font-size:18px;font-weight:normal;">Someone wants to join the affiliate program.</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="font-size:12px;color:#888;letter-spacing:1px;text-transform:uppercase;padding:8px 0 2px;">Name</td></tr>
            <tr><td style="font-size:15px;padding-bottom:16px;border-bottom:1px solid #f0ede8;">${name}</td></tr>
            <tr><td style="font-size:12px;color:#888;letter-spacing:1px;text-transform:uppercase;padding:8px 0 2px;">Email</td></tr>
            <tr><td style="font-size:15px;padding-bottom:16px;border-bottom:1px solid #f0ede8;"><a href="mailto:${email}" style="color:#1a1a1a;">${email}</a></td></tr>
            <tr><td style="font-size:12px;color:#888;letter-spacing:1px;text-transform:uppercase;padding:8px 0 2px;">Handle / Platform</td></tr>
            <tr><td style="font-size:15px;padding-bottom:16px;border-bottom:1px solid #f0ede8;">${handle}${platform ? ` · ${platform}` : ''}</td></tr>
            ${followers ? `
            <tr><td style="font-size:12px;color:#888;letter-spacing:1px;text-transform:uppercase;padding:8px 0 2px;">Followers</td></tr>
            <tr><td style="font-size:15px;padding-bottom:16px;border-bottom:1px solid #f0ede8;">${followers}</td></tr>` : ''}
            ${niche ? `
            <tr><td style="font-size:12px;color:#888;letter-spacing:1px;text-transform:uppercase;padding:8px 0 2px;">Niche / Content Type</td></tr>
            <tr><td style="font-size:15px;padding-bottom:16px;border-bottom:1px solid #f0ede8;">${niche}</td></tr>` : ''}
            ${message ? `
            <tr><td style="font-size:12px;color:#888;letter-spacing:1px;text-transform:uppercase;padding:8px 0 2px;">Message</td></tr>
            <tr><td style="font-size:14px;line-height:1.6;padding-bottom:16px;border-bottom:1px solid #f0ede8;">${message}</td></tr>` : ''}
          </table>
        </td></tr>
        <tr><td style="background:#f5f2ed;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#999;">Submitted at ${new Date().toISOString()}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      })
    } else {
      // Fallback: log to console when Resend isn't configured
      console.log('[affiliate] New application (email disabled):', { name, email, handle, platform, followers, niche })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[affiliate/signup]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
