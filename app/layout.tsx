"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { AuthTokenProvider } from "@/app/auth-token-provider";

import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <ClerkProvider>
        <AuthTokenProvider>
          <body className={`min-h-screen flex flex-col antialiased`}>
            {children}
          </body>
        </AuthTokenProvider>
      </ClerkProvider>
    </html>
  );
}
