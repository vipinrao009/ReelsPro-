import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(){
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized : ({token, req})=>{
                const {pathname} = req.nextUrl // extracting the pathname from url

                // allow auth related routes
                if(
                    pathname.startsWith("/api/auth") ||
                    pathname === "/login" ||
                    pathname === "register"
                ){
                    return true
                }

                //public
                if(pathname === "/" ||pathname === "/api/videos"){
                    return true
                }

                return !!token    // !!token means return false value  
             }
        }
    }
)

export const config = {
   matcher: ["/dashboard/:path*", "/profile/:path*"]
}