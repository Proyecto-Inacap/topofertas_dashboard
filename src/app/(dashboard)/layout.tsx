import "@/app/globals.css";
import Footer from "@/components/Footer";
import Container from "@/components/layouts/Container";
import MainNav from "@/components/nav/MainNav";
import { Fragment } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <div className="flex-1">
        <MainNav />
        <Container className={"py-4 w-[90%]"}>{children}</Container>
      </div>
      <Footer />
    </Fragment>
  );
}
