import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";
import { LucideIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    href: string;
    icon?: LucideIcon;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items, className }) => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent side={"left"} className={cn("p-4", className)}>
          <SheetHeader>
            <h2 className="text-lg font-semibold">Falabella</h2>
          </SheetHeader>
          <div className={cn("flex flex-col gap-8 mt-4 pl-6 ")}>
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.href}
              >
                <SheetClose className="flex text-sm font-medium text-muted-foreground/80 hover:text-foreground/80 transition-colors duration-200 items-end gap-4 w-full">
                  {item.icon && <item.icon className="w-6 h-6" />}
                  {item.title}
                </SheetClose>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
