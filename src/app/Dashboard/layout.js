import SidebarItem from "@/Components/SidebarItem/SidebarItem";
import NextAuthProvider from "@/provider/NextAuthProvider";
import UseQueryProvider from "@/provider/UseQueryProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardContainer from '../../Components/Dashboard/DashboardContainer';

// Dashboard menu link
const menuConfig = {
  Admin: [
    { to: "/Dashboard", label: "Admin Overview", icon: "LayoutDashboard" },
    { to: "/Dashboard/ManageUsers", label: "Manage Users", icon: "Users" },
    { to: "/Dashboard/ManageProject", label: "Manage Project", icon: "Folder" },
  ],
  Buyer: [
    { to: "/Dashboard", label: "Buyer Dashboard", icon: "LayoutDashboard" },
    { to: "/Dashboard/CreateProject", label: "Post Project", icon: "PlusCircle" },
    { to: "/Dashboard/Project-list", label: "My Projects", icon: "Folder" },
  ],
Worker: [
  { to: "/Dashboard", label: "Solver Desk", icon: "LayoutDashboard" },
  { to: "/Dashboard/My-Requsts", label: "My Applications", icon: "ClipboardList" },
  { to: "/Dashboard/Profile", label: "My Portfolio", icon: "User" },
]
};

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  const userRole = session?.role; // Role selection
  const currentMenuItems = menuConfig[userRole] || menuConfig.Worker;

  return (
    <NextAuthProvider>
      <UseQueryProvider>
        <DashboardContainer session={session} menuItems={currentMenuItems}>
          {children}
        </DashboardContainer>
      </UseQueryProvider>
    </NextAuthProvider>
  );
}