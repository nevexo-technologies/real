import { NextRequest, NextResponse } from "next/server";
import rateLimit from "utils/rate-limit";

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function middleware(req: NextRequest) {
    try {
        const response = NextResponse.next();
        await limiter.check(response, 5, 'API_LIMIT_TOKEN');
        return response;
    }
    catch {
        return new NextResponse(JSON.stringify({ message: 'Rate limit exceeded' }), { status: 429, headers: { 'Content-Type': 'application/json' } });
    }
}

export const config = {
    matcher: '/api/:path*',
}