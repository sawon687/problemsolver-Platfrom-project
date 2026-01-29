import React from 'react';
import Navlink from '../NavLink/Navlink';
import Link from 'next/link';
import { IoMenu } from 'react-icons/io5';

const Navbar = () => {
  const link = (
    <>
      <Navlink to="/" name="Home" />
      <Navlink to="/About" name="About" />
      <Navlink to="/Contact" name="Contact" />
    </>
  );

  return (
    <div className="fixed bg-base-100 pl-10 top-0 left-0 z-50 w-full h-16 lg:h-20 flex shadow-md">
      
      {/* LEFT PART */}
      <div className="flex w-[550px] items-center px-4 lg:px-6 bg-base-100">
        <a className="text-lg lg:text-3xl font-bold">Raco<span className='text-primary font-bold'>AI</span></a>
      </div>

      {/* RIGHT GREEN PART */}
      <div
        className="flex-1 bg-green-600 flex items-center justify-between px-4 lg:px-20"
      style={{
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%)",
}}

      >
        {/* MOBILE MENU */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost text-white">
            <IoMenu></IoMenu>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 p-2 shadow bg-green-600 rounded-box w-52 text-white"
          >
            {link}
          </ul>
        </div>

        {/* DESKTOP LINKS */}
        <ul className="menu menu-horizontal px-1 text-white hidden lg:flex">
          {link}
        </ul>

        {/* BUTTONS */}
        <div className="flex gap-2 lg:gap-3">
          <Link href="/Login" className="btn btn-sm lg:btn-md ">
            Login
          </Link>
          <Link href="/Register" className="btn btn-sm lg:btn-md bg-primary text-white">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
