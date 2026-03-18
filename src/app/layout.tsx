import type { Metadata } from "next";
import "./global.scss";

export const metadata: Metadata = {
  title: "react-bootstrap-data-grid Test Site",
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
