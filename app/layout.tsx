import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { ThemeToggle } from "../components/theme-toggle";
import { PromptHistoryProvider } from "../components/PromptHistoryPanel/PromptHistoryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Construction AI Assistant",
  description: "AI-powered assistant for construction professionals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PromptHistoryProvider>
            <div className="relative min-h-screen">
              <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
              </div>
              {children}
            </div>
          </PromptHistoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
