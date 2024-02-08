import type { Metadata } from "next";
import "./global.scss";
import AppBar from "./AppBar";

import Container from "react-bootstrap/Container";

export const metadata: Metadata = {
  title: "React Bootstrap Data Grid Documentation",
  description:
    "Technical documentation for the react-bootstrap-data-grid project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppBar />
        <main>
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
