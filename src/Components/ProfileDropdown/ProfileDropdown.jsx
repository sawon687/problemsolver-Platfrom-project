'use client';
import React from 'react';
import { createPortal } from 'react-dom';
import ProfileCard from '../ProfiledCard/ProfiledCard';


const ProfileDropdown = ({ toggle, setToggle }) => {
  if (!toggle) return null;

  return createPortal(
    <div
      className="fixed right-10 top-20 z-[9999]"
      onClick={() => setToggle(false)}
    >
      <ProfileCard />
    </div>,
    document.body
  );
};

export default ProfileDropdown;
