"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavListProps extends React.HTMLAttributes<HTMLDivElement> {
  navLinks: {
    title: string;
    href: string;
  }[];
}

const NavList: React.FC<NavListProps> = ({ navLinks,className }) => {
  const pathname = usePathname();

  return (
    <nav className={cn("flex gap-4 lg:gap-8 items-center lg:flex",className)}>
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
  );
};

export default NavList;
