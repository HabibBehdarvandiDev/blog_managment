"use client";

import { Divider } from "@nextui-org/react";
import ProfileDropDown from "./ProfileDropDown";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  return (
    <aside className="flex flex-col p-5 bg-background shadow-sm h-screen overflow-clip">
      <ProfileDropDown />
      <Divider className="my-6" />
      <NavbarMenu />
      <Divider className="my-6" />
    </aside>
  );
};

export default Navbar;
