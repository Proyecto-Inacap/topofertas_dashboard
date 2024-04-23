import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { HasPermissions } from "@/core/session/components/hasPermission";
import { navLinks } from "@/utils/nav";
import { getServerSession } from "next-auth";
import Link from "next/link";

import Container from "../layouts/Container";
import ManagementUser from "./ManagementUser";
import NavList from "./NavList";

const MainNav = async () => {
  const session = await getServerSession(authOptions);

  const navLinksPermissions = navLinks.filter((item) =>
    HasPermissions({
      permission: item.permission,
      role: session?.user.userRole.type,
    })
  );

  return (
    <header className="p-4 sticky top-0 border-b border-border/40 bg-background z-[1]">
      <Container className="flex justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Icons.logo className="h-6 w-6" /> */}
            {/* <span className="inline-block font-bold">{store.name}</span> */}
            <span className="inline-block font-bold">Falabella</span>
          </Link>
          <NavList navLinks={navLinksPermissions} />
        </div>
        <ManagementUser />
      </Container>
    </header>
  );
};

export default MainNav;
