import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req) {
  const body = await req.json().catch(() => ({}))
  const { timestamp, folder } = body || {}
  if (!timestamp) {
    return NextResponse.json({ error: 'Missing timestamp' }, { status: 400 })
  }

  const apiSecret = process.env.CLOUDINARY_API_SECRET
  const paramsToSign = [
    folder ? `folder=${folder}` : null,
    `timestamp=${timestamp}`,
  ].filter(Boolean).join('&')

  const signature = crypto
    .createHash('sha1')
    .update(paramsToSign + apiSecret)
    .digest('hex')

  return NextResponse.json({
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  })
}
