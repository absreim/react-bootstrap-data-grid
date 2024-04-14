"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import Nav from "react-bootstrap/Nav";

interface LinkDefinition {
  id: number;
  name: string;
  path: string;
}

const linkDefs: LinkDefinition[] = [
  {
    id: 1,
    name: "Introduction",
    path: "/",
  },
  {
    id: 2,
    name: "Pagination",
    path: "/pagination",
  },
];

const ContentsNavbar: FC = () => {
  const pathname = usePathname();

  return (
    <Nav variant="underline" activeKey={pathname} className="flex-column">
      {linkDefs.map(({ id, name, path }) => (
        <Nav.Item key={id}>
          <Nav.Link href={path}>{name}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default ContentsNavbar;
