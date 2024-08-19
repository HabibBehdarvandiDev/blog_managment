"use client";

import { Divider } from "@nextui-org/react";
import ProfileDropDown from "./ProfileDropDown";
import NavbarMenu from "./NavbarMenu";


const Navbar = () => {
  return (
    <aside className="flex flex-col p-5 bg-gray-100 shadow-sm h-screen overflow-clip">
      <ProfileDropDown />
      <Divider className="my-6" />
      <NavbarMenu />
    </aside>
  );
};

export default Navbar;
