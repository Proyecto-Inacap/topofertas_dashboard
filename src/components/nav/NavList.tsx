"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavListProps {
  navLinks: {
    title: string;
    href: string;
  }[];
}

const NavList: React.FC<NavListProps> = ({ navLinks }) => {
  const pathname = usePathname();

  return (
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
  );
};

export default NavList;
