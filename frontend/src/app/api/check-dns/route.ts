// app/api/check-dns/route.ts
import { NextResponse } from 'next/server'
import dns from 'dns/promises'

const EXPECTED_IP = process.env.NEXT_PUBLIC_SERVER_IP! // Replace this with your platform's A record IP

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const domain = searchParams.get('domain')

    if (!domain) {
        return NextResponse.json({ error: 'Domain is required' }, { status: 400 })
    }

    try {
        const records = await dns.resolve(domain, 'A') // Or use 'CNAME' as needed
        const isCorrect = records.includes(EXPECTED_IP)

        return NextResponse.json({ isCorrect, records })
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to resolve domain', details: error.message }, { status: 500 })
    }
}
