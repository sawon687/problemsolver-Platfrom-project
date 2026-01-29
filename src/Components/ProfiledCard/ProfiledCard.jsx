'use client'
import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdDashboardCustomize } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const ProfileCard = () => {
  return (
    <div className="absolute z-[999] right-0 top-0 w-[230px] h-48 bg-white shadow-2xl border border-gray-300 rounded-2xl">
      <ul className="menu h-full flex flex-col justify-center space-y-3 px-4">
        <li>
          <Link href="/profile" className="flex items-center gap-2">
            <CgProfile size={24} />
            <span className="font-semibold">My Profile</span>
          </Link>
        </li>

        <li>
          <Link href="/Dashboard" className="flex items-center gap-2">
            <MdDashboardCustomize size={24} />
            <span className="font-semibold">Dashboard</span>
          </Link>
        </li>

        <div onClick={()=> signOut()} className="flex ml-4 items-center gap-2 cursor-pointer text-red-600">
          <IoLogOutOutline color='black' size={24} />
          <span className="font-semibold">Log out</span>
        </div>
      </ul>
    </div>
  );
};

export default ProfileCard;
