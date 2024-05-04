import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import NotFoundPage from "@/components/notFound/NotFoundPage";
import { HasPermissions } from "@/core/session/components/hasPermission";
import { getServerSession } from "next-auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  const hasPermissions = HasPermissions({
    permission: "DASHBOARD_MANAGER",
    role: session?.user.userRole.type,
  });

  return hasPermissions ? children : <NotFoundPage />;
}
