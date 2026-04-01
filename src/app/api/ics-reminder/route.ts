import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderNumber = searchParams.get('order') ?? 'your order'
  const email = searchParams.get('email') ?? ''

  // 7 days from now
  const reminderDate = new Date()
  reminderDate.setDate(reminderDate.getDate() + 7)

  // Format: YYYYMMDDTHHmmssZ
  const formatDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const now = new Date()
  const uid = `bonjoojoo-review-${orderNumber.replace(/[^A-Z0-9]/g, '')}@bonjoojoo.com`

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//bonjoojoo//Review Reminder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatDate(now)}`,
    `DTSTART:${formatDate(reminderDate)}`,
    `DTEND:${formatDate(new Date(reminderDate.getTime() + 30 * 60 * 1000))}`,
    `SUMMARY:Leave a review for ${orderNumber} ✨`,
    `DESCRIPTION:How did you love your bonjoojoo order ${orderNumber}?\\nShare your feedback and help others find their perfect piece.\\n\\nhttps://bonjoojoo.com/account/orders`,
    'URL:https://bonjoojoo.com/account/orders',
    ...(email ? [`ATTENDEE;RSVP=FALSE:mailto:${email}`] : []),
    'BEGIN:VALARM',
    'TRIGGER:-PT0M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Leave a review for your bonjoojoo order',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return new NextResponse(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="bonjoojoo-review-reminder.ics"`,
      'Cache-Control': 'no-store',
    },
  })
}
