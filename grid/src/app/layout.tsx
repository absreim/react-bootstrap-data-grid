import type { Metadata } from "next";
import "./global.scss";

export const metadata: Metadata = {
  title: "React Bootstrap Data Grid Test Site",
  description:
    "Playwright test targets for the react-bootstrap-data-grid project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
