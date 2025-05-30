import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        const body = await req.json()
        
        switch (body.type) {
            case 'tag':
                revalidateTag(body.tag)
                break;
        }

        return NextResponse.json({
            status: 200,
        });
    } catch (error: any) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
}