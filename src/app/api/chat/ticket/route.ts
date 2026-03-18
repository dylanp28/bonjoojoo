import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, orderNumber, issue, chatTranscript } = await request.json()

    if (!name || !email || !issue) {
      return NextResponse.json(
        { error: 'Name, email, and issue description are required' },
        { status: 400 }
      )
    }

    // Log the ticket (ready for SendGrid/Resend drop-in)
    console.log('=== NEW SUPPORT TICKET ===')
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Order Number:', orderNumber || 'N/A')
    console.log('Issue:', issue)
    console.log('Chat Transcript:', chatTranscript)
    console.log('Destination: hello@bonjoojoo.com')
    console.log('=== END TICKET ===')

    // TODO: Replace with actual email send via SendGrid/Resend
    // await sendEmail({
    //   to: 'hello@bonjoojoo.com',
    //   subject: `Support Ticket from ${name}`,
    //   body: `Name: ${name}\nEmail: ${email}\nOrder: ${orderNumber}\nIssue: ${issue}\n\nChat Transcript:\n${chatTranscript}`,
    // })

    return NextResponse.json({
      success: true,
      message:
        "Your support ticket has been submitted. Our team will get back to you within 24 hours at the email address you provided.",
    })
  } catch (error) {
    console.error('Ticket API error:', error)
    return NextResponse.json(
      { error: 'Failed to submit ticket' },
      { status: 500 }
    )
  }
}
