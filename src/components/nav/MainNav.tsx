"use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { HasPermissions } from "@/core/session/components/hasPermission";
import { navLinks } from "@/utils/nav";
import { getServerSession } from "next-auth";
import Link from "next/link";

import Container from "../layouts/Container";
import ManagementUser from "./ManagementUser";
import NavList from "./NavList";
import { MenuIcon } from "lucide-react";

import Sidebar from "./Sidebar";
import { Button } from "../ui/button";

const MainNav = () => {
  return (
    <header className="p-4 sticky top-0 border-b border-border/40 bg-background z-[1]">
      <Container className="flex justify-between">
        <div className="gap-6 lg:gap-10 items-center hidden md:flex">
          <Link href="/" className="flex items-center  ">
            {/* <Icons.logo className="h-6 w-6" /> */}
            {/* <span className="inline-block font-bold">{store.name}</span> */}
            <span className="inline-block font-bold">Falabella</span>
          </Link>
          <NavList navLinks={navLinks} />
        </div>
        <Sidebar items={navLinks} />
        <ManagementUser />
      </Container>
    </header>
  );
};

export default MainNav;
