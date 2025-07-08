"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"

const queryClient = new QueryClient

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        enableSystem
        >
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!}>
            <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
            </GoogleOAuthProvider>
            <Toaster />
        </ThemeProvider >
    )
}
