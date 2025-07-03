"use client"

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
            <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
            <Toaster />
        </ThemeProvider >
    )
}
