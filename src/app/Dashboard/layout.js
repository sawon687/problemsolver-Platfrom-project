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
import Link from "next/link";

import { MdDashboardCustomize } from "react-icons/md";

const menuItems = [
  { to: "/Dashboard", label: "Dashboard", icon:   <MdDashboardCustomize size={24}  /> },

  { to: "/Dashboard/CreateProject", label: "Create Project", icon: <PlusCircleIcon /> },
  { to: "/Dashboard/Profile", label: "My Profile", icon: <UserIcon /> },
  { to: "/Dashboard/Project-list", label: "Project List", icon: <FolderIcon /> },
  { to: "/Dashboard/My-Requsts", label: "My Requests", icon: <ClipboardListIcon /> },
  { to: "/Dashboard/ManageUsers", label: "Manage Users", icon: <UsersIcon /> },
  { to: "/Dashboard/ManageProject", label: "Manage Project", icon: <FolderIcon /> },
];

export default function DashboardLayout({ children }) {
  return (
    <>
     <NextAuthProvider>
     <UseQueryProvider>


      
        
        <div className="drawer w-full lg:drawer-open -mt-20">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

          {/* Main Content */}
          <div className="drawer-content">
            {/* Navbar */}
       <nav className="navbar fixed top-0 w-full pr-10  bg-base-300 z-50  shadow">

{/* Left */}
<div className="flex items-center gap-4">
<label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
strokeWidth="2"
fill="none"
stroke="currentColor"
className="size-5"
>
<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
<path d="M9 4v16"></path>
<path d="M14 10l2 2l-2 2"></path>
</svg>
</label>

<h1 className="text-xl font-bold">Dashboard</h1>
</div>

{/* Right */}
<div className="flex items-center is-drawer-close:mr-45 mr-55 gap-4 ml-auto">

{/* Search */}
<div className="flex items-center  border rounded-lg px-2 bg-white">
<input
type="search"
placeholder="Search..."
className="outline-none px-2 py-1"
/>
<Search className="w-4 h-4 text-gray-500" />
</div>

{/* Notification */}
<button className="btn btn-ghost btn-circle">
<Bell className="w-5 h-5"/>
</button>

{/* Dark Mode */}
<button className="btn btn-ghost btn-circle">
<Moon className="w-5 h-5"/>
</button>

{/* Profile */}
<div className="w-10 h-10 rounded-full border-2 border-green-500 overflow-hidden">
<img
src="https://randomuser.me/api/portraits/men/32.jpg"
className="w-full h-full object-cover"
/>
</div>

</div>

</nav>


            {/* Page Content */}
            <div className="bg-green-50 py-20 px-2 z-0 min-h-screen">
              {children}
            </div>
          </div>

          {/* Sidebar */}
        <div className="drawer-side z-0  space-y-15">
  <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

  <div className="min-h-full shadow-3xl bg-base-200 flex flex-col items-center overflow-y-auto overflow-x-visible is-drawer-close:w-20 is-drawer-open:w-60">

    <h1 className="text-4xl is-drawer-close:text-xs font-bold border-b-5 w-full text-center -mt-2 py-5 border-green-500 ">Raco<span className="text-green-500">Al</span></h1>

    {/* Profile */}
    <div className="mt-6 text-center py-10">
      <div className="w-24 h-24 is-drawer-close:w-15 is-drawer-close:h-15 rounded-full border-4 border-green-500 overflow-hidden mx-auto">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="mt-4 text-lg font-semibold is-drawer-close:hidden text-gray-800">
        Sawon Islam
      </h2>
      <p className="text-sm text-gray-500 is-drawer-close:hidden ">MERN Developer</p>
    </div>

    <ul className="menu w-full mt-6 space-y-2 px-3">
      
              <Link
             className="hover:scale-105 bg-white flex is-drawer-close:justify-center hover:text-white hover:bg-primary  items-center  gap-3 px-3 py-2 bg-base-100 rounded-md font-medium transition-all duration-300 shadow-lg"
          href={'/'}
        > 
      
        <span className='is-drawer-close:hidden'>Home</span> <HomeIcon></HomeIcon>
        </Link>
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