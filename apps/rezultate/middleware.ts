import { NextRequest, NextResponse } from "next/server";
import rateLimit from "utils/rate-limit";

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function middleware(req: NextRequest) {
 
    // middleware code starts here

    return NextResponse.next();
}

