import { cn } from '@/utils/cn'
import Link from 'next/link'
import { navLinks } from '@/utils/nav'


const MainNav = () => {

  return (
    <header className="container max-w-screen-2xl flex gap-6 md:gap-10 sticky bg-secondary p-4 ">
      <Link href="/" className="flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        {/* <span className="inline-block font-bold">{store.name}</span> */}
        <span className="inline-block font-bold">falabella</span>
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
                    "flex items-center text-sm font-medium text-muted-foreground",
                    // item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </header>
  )
}

export default MainNav