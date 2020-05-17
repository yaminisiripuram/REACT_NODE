import React from "react";
import { Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <React.Fragment>
      <Nav variant='pills' as='ul'>
        <Nav.Item as='li'>
          <Nav.Link href='/products'>PRODUCTS</Nav.Link>
        </Nav.Item>
        <Nav.Item as='li'>
          <Nav.Link href='/products/new'>ADD/EDIT PRODUCT</Nav.Link>
        </Nav.Item>
      </Nav>
    </React.Fragment>
  );
};

export default Navigation;
