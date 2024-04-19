import React from "react";
import Container from "./layouts/Container";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 h-12 flex items-center">
      <Container>
        <p className="text-muted-foreground/60 text-sm ">
          © {new Date().getFullYear()} TOPOdashboard. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
