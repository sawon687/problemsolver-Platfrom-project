import SidebarItem from "@/Components/SidebarItem/SidebarItem";
import NextAuthProvider from "@/provider/NextAuthProvider";
import UseQueryProvider from "@/provider/UseQueryProvider";

import {
  Bell,
  ClipboardListIcon,
  FolderIcon,
  HomeIcon,
  Moon,
  PlusCircleIcon,
  Search,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { MdDashboardCustomize } from "react-icons/md";
import { authOptions } from "../api/auth/[...nextauth]/route";

const menuItems = [
  {
    to: "/Dashboard",
    label: "Dashboard",
    icon: <MdDashboardCustomize size={28} />,
  },
  {
    to: "/Dashboard/CreateProject",
    label: "Create Project",
    icon: <PlusCircleIcon className="w-6 h-6" />,
  },
  {
    to: "/Dashboard/Profile",
    label: "My Profile",
    icon: <UserIcon className="w-6 h-6" />,
  },
  {
    to: "/Dashboard/Project-list",
    label: "My Project List",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    to: "/Dashboard/My-Requsts",
    label: "My Requests",
    icon: <ClipboardListIcon className="w-6 h-6" />,
  },
  {
    to: "/Dashboard/ManageUsers",
    label: "Manage Users",
    icon: <UsersIcon className="w-6 h-6" />,
  },
  {
    to: "/Dashboard/ManageProject",
    label: "Manage Project",
    icon: <FolderIcon className="w-6 h-6" />,
  },
];

export default async function DashboardLayout({ children }) {
  const session=await getServerSession(authOptions)
  console.log('server is session',session)
  return (
    <>
      <NextAuthProvider>
        <UseQueryProvider>
          <div className="drawer w-full lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* ================= NAVBAR ================= */}
            <nav className="navbar fixed top-0 w-full h-16 pr-10 bg-base-300 z-50 shadow-md">
              
              {/* Left */}
              <div className="flex items-center gap-4">
                <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M9 4v16"></path>
                    <path d="M14 10l2 2l-2 2"></path>
                  </svg>
                </label>

                <h1 className="text-2xl font-bold">Dashboard</h1>
              </div>

              {/* Right */}
              <div className="flex items-center ml-auto gap-5 mr-10">
                
                {/* Search */}
                <div className="flex items-center border rounded-xl px-3 py-1 bg-white shadow-sm">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="outline-none px-2 py-1"
                  />
                  <Search className="w-5 h-5 text-gray-500" />
                </div>

                {/* Notification */}
                <button className="btn btn-ghost btn-circle">
                  <Bell className="w-6 h-6" />
                </button>

                {/* Dark Mode */}
                <button className="btn btn-ghost btn-circle">
                  <Moon className="w-6 h-6" />
                </button>

                {/* Profile */}
                <div className="w-12 h-12 rounded-full border-2 border-green-500 overflow-hidden">
                  <img
                    src={session.userPhoto}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </nav>

            {/* ================= MAIN CONTENT ================= */}
            <div className="drawer-content -mt-7">
              <div className="p-4 pt-6">{children}</div>
            </div>

            {/* ================= SIDEBAR ================= */}
            <div className="drawer-side shadow-2xl z-40  bg-white pt-10  -mt-4">
              <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

              <div className="h-[calc(100vh-64px)] bg-base-200 flex flex-col items-center 
              is-drawer-close:w-20 is-drawer-open:w-60 shadow-2xl transition-all duration-300">

                {/* Logo */}
                <h1 className="text-5xl is-drawer-close:text-sm font-extrabold w-full text-center py-6 border-b-4 border-green-500 tracking-wide">
                  Raco<span className="text-green-500">Al</span>
                </h1>

                {/* Profile */}
                <div className="mt-6 text-center py-6">
                  <div className="w-28 h-28 is-drawer-close:w-16 is-drawer-close:h-16 rounded-full border-4 border-green-500 overflow-hidden mx-auto">
                    <img
                      src={session.userPhoto}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2 className="mt-4 text-lg font-semibold is-drawer-close:hidden">
                    {session.username}
                  </h2>
                  <p className="text-sm text-gray-500 is-drawer-close:hidden">
                    {session.role}
                  </p>
                </div>

                {/* Menu */}
                <ul className="menu w-full mt-4 space-y-3 px-4">

                  {/* Home */}
                  <Link
                    href="/"
                    className="flex items-center gap-4 px-4 py-3 rounded-md bg-white shadow-md hover:bg-primary hover:text-white transition-all duration-300 is-drawer-close:justify-center"
                  >
                    <HomeIcon className="w-6 h-6" />
                    <span className="is-drawer-close:hidden">Home</span>
                  </Link>

                  {/* Dynamic Menu */}
                  {menuItems.map((item, i) => (
                    <SidebarItem
                      key={i}
                      to={item.to}
                      label={item.label}
                      icon={item.icon}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </UseQueryProvider>
      </NextAuthProvider>
    </>
  );
}