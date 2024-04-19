import Container from "@/components/layouts/Container";
import LoginForm from "@/core/session/components/LoginForm";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <Container className="flex items-center justify-center h-screen flex-col">
      <Image src="/assets/logo.svg" width={100} height={100} alt="TOPOfertas logo" className="rounded-full absolute top-10"/>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
