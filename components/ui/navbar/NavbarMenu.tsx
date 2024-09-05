"use client";
import Link from "next/link";
import { AdminLinks, WriterLinks } from "./NavbarLinks";
import { usePathname } from "next/navigation";
import { getSessionToken } from "@/utils/helpers";
import { useEffect, useState } from "react";
import NavbarLinksSkeleton from "./NavbarLinksSkeleton";

const NavbarMenu = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading delay for fetching user session
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const pathname = usePathname();
  const user = getSessionToken();

  const role = user?.role;

  if (loading) {
    return <NavbarLinksSkeleton />;
  }

  return (
    <nav className="flex flex-col space-y-4">
      {role === "admin"
        ? AdminLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={index}
                href={link.href}
                className={`flex justify-center lg:justify-start items-center gap-2 p-2 rounded-xl ${
                  isActive ? "shadow-sm bg-primary text-white" : "bg-background"
                }`}
              >
                {link.startContent}
                <span className="hidden lg:flex">{link.title}</span>
              </Link>
            );
          })
        : WriterLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={index}
                href={link.href}
                className={`flex lg:justify-start items-center gap-2 justify-center p-2 rounded-xl ${
                  isActive ? "shadow-sm bg-primary text-white" : "bg-background"
                }`}
              >
                {link.startContent}
                <span className="hidden lg:flex">{link.title}</span>
              </Link>
            );
          })}
    </nav>
  );
};

export default NavbarMenu;
