"use client";
import { cn } from "@/utils/cn";
import { navLinks } from "@/utils/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./layouts/Container";
import ThemeSwitch from "./ThemeSwitch";
import { DoorOpenIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import TooltipWrapper from "./TooltipWrapper";

const MainNav = () => {
  const pathname = usePathname();

  return (
    <header className="p-4 sticky top-0 border-b border-border/40 bg-background z-[1]">
      <Container className="flex justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Icons.logo className="h-6 w-6" /> */}
            {/* <span className="inline-block font-bold">{store.name}</span> */}
            <span className="inline-block font-bold">Falabella</span>
          </Link>
          {navLinks?.length ? (
            <nav className="flex gap-6">
              {navLinks?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm font-medium text-muted-foreground/80 hover:text-foreground/80 transition-colors duration-200",
                        {
                          "text-foreground/80": pathname === item.href,
                        }
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </div>
        <div className="flex gap-2 items-center">
          <ThemeSwitch />
          <TooltipWrapper content="Cerrar sesión">
            <Button
              variant={"outline"}
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
            >
              <DoorOpenIcon className="w-6 h-6" />
            </Button>
          </TooltipWrapper>
        </div>
      </Container>
    </header>
  );
};

export default MainNav;
