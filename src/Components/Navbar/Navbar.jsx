'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Navlink from '../NavLink/Navlink';
import Link from 'next/link';
import { IoMenu } from 'react-icons/io5';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { data, status } = useSession();
  const [toggle, setToggle] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname=usePathname()
  if (!mounted || status === 'loading') return null;
  if(pathname.startsWith('/Dashboard'))return null

  useEffect(() => setMounted(true), []);

  const links = (
    <>
      <Navlink to="/" name="Home" />
      <Navlink to="/About" name="About" />
      <Navlink to="/Contact" name="Contact" />
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-16 lg:h-20 flex bg-base-100 shadow-md">
      <div className="flex w-[550px] items-center px-4 lg:px-6 ">
        <a className="text-lg lg:text-3xl font-bold">
          Raco<span className="text-primary">AI</span>
        </a>
      </div>

      <div
        className="flex-1 flex items-center justify-between px-4 lg:px-20 bg-green-600"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8% 100%)' }}
      >
        {/* Mobile */}
        <div className="dropdown lg:hidden">
          <label className="btn btn-ghost text-white">
            <IoMenu />
          </label>
          <ul className="menu dropdown-content mt-3 p-2 bg-green-600 rounded-box w-52 text-white">
            {links}
          </ul>
        </div>

        {/* Desktop */}
        <ul className="menu menu-horizontal text-white hidden lg:flex">{links}</ul>

        {/* Auth area */}
        <div className="flex gap-3 relative">
          {status === 'authenticated' ? (
            <div onClick={() => setToggle(prev => !prev)} className="cursor-pointer">
              <img
                src={data?.user?.userPhoto || '/avatar.png'}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
          ) : (
            <>
              <Link href="/Login" className="btn btn-md">
                Login
              </Link>
              <Link href="/Register" className="btn btn-md bg-primary text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

    
      <ProfileDropdown toggle={toggle} setToggle={setToggle} />
    </div>
  );
};

export default Navbar;
