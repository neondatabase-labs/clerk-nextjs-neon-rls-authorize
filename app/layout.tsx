import { ClerkProvider } from "@clerk/nextjs";

import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <ClerkProvider>
        <body className={`min-h-screen flex flex-col antialiased`}>
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
