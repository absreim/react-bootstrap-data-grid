"use client";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FC } from "react";

const AppBar: FC = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>React Bootstrap Data Grid</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AppBar;
