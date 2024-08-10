import { NextResponse } from "next/server";

export { default } from "next-auth/middleware"

export function middleware (request){
    const session = request.cookies.get('next-auth.session-token'); 

    if(!session){
        return NextResponse.redirect(new URL("/login",request.url).toString());
    }
}
// catch all path after dashoard
export const config = { matcher: ['/dashboard/:path*'] }



