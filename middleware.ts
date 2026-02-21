import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            // Allow public routes
            const path = req.nextUrl.pathname;
            if (path === "/" || path === "/login" || path === "/register") {
                return true;
            }
            // Require token for other routes
            return !!token;
        },
    },
});

export const config = {
    matcher: ["/dashboard/:path*", "/onboarding/:path*", "/settings/:path*", "/api/protected/:path*"],
};
