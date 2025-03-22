import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sliding Puzzle",
  description: "Play the classic sliding tile puzzle game. Shuffle the board and arrange the tiles in order to solve the puzzle. Built with React and Next.js."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
