"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import Nav from "react-bootstrap/Nav";

interface LinkDefinition {
  name: string;
  path: string;
}

const linkDefs: LinkDefinition[] = [
  {
    name: "Introduction",
    path: "/",
  },
  {
    name: "Pagination",
    path: "/pagination",
  },
  {
    name: "Sorting",
    path: "/sorting",
  },
  {
    name: "Filtering",
    path: "/filtering",
  },
];

const ContentsNavbar: FC = () => {
  const pathname = usePathname();

  return (
    <Nav variant="underline" activeKey={pathname} className="flex-column">
      {linkDefs.map(({ name, path }, index) => (
        <Nav.Item key={index}>
          <Nav.Link href={path}>{name}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default ContentsNavbar;
