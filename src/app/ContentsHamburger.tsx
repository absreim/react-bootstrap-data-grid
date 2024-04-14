"use client"

import { FC, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import ContentsNavbar from "@/app/ContentsNavbar";

const ContentsHamburger: FC = () => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="d-lg-none me-2">
        Contents
      </Button>
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Table of Contents
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-lg-none">
          <ContentsNavbar />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default ContentsHamburger
