import { cn } from "@/utils/cn";
import Link from "next/link";
import { navLinks } from "@/utils/nav";
import ThemeSwitch from "./ThemeSwitch";

const MainNav = () => {
  return (
    <header className="p-4 sticky top-0 border-b border-border/40 bg-background z-[1]">
      <div className="container max-w-screen-2xl flex justify-between">
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
                        "flex items-center text-sm font-medium text-muted-foreground/80 hover:text-foreground/80 transition-colors duration-200"
                        // item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </div>
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default MainNav;
