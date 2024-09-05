"use client";

import { User } from "@/schema";
import { getSessionToken } from "@/utils/helpers";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import TextBoldIcon from "../icons/bold";
import Settings02Icon from "../icons/settings";
import SupportIcon from "../icons/SupportIcon";
import TransactionIcon from "../icons/transaction";
import TrashIcon from "../icons/TrashIcon";
import UnfoldIcon from "../icons/UnfoldIcon";
import UserIcon from "../icons/user";
import Wallet01Icon from "../icons/wallet";
import ProfileDropDownSkeleton from "./ProfileDropDownSkeleton";
import {
  AdminDropDownLinks,
  WriterDropDownLinks,
} from "./ProfileDropDownLinks";
import Link from "next/link";

const ProfileDropDown = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const role = getSessionToken()?.role;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true); // Start loading before making the request

        const decodedToken = getSessionToken();
        const response = await axios.get(
          `http://localhost:3000/api/users/${decodedToken?.userId}`
        );

        if (response.status !== 200) {
          setError(true);
        }

        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {loading ? (
        <ProfileDropDownSkeleton />
      ) : (
        <>
          <div className="lg:hidden">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  radius="md"
                  isBordered
                  as="button"
                  className="transition-transform shadow-md"
                  showFallback
                  name={user?.username}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" variant="faded">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.username}</p>
                </DropdownItem>
                {role === "admin"
                  ? AdminDropDownLinks.map((link, index) => (
                      <DropdownSection
                        key={link.sectionTitle}
                        title={link.sectionTitle}
                      >
                        {link.DropDownLinks.map(
                          (dropDownLink, dropDownLinkIndex) => (
                            <DropdownItem
                              key={dropDownLink.title}
                              startContent={dropDownLink.startContent}
                              href={dropDownLink.href}
                            >
                              {dropDownLink.title}
                            </DropdownItem>
                          )
                        )}
                      </DropdownSection>
                    ))
                  : WriterDropDownLinks.map((link, index) => (
                      <DropdownSection
                        key={link.sectionTitle}
                        title={link.sectionTitle}
                      >
                        {link.DropDownLinks.map(
                          (dropDownLink, dropDownLinkIndex) => (
                            <DropdownItem
                              key={dropDownLink.title}
                              startContent={dropDownLink.startContent}
                              href={dropDownLink.href}
                            >
                              {dropDownLink.title}
                            </DropdownItem>
                          )
                        )}
                      </DropdownSection>
                    ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="hidden lg:flex">
            <Dropdown>
              <DropdownTrigger>
                <div className="flex gap-5 cursor-pointer">
                  <Avatar
                    radius="md"
                    isBordered
                    as="button"
                    className="transition-transform shadow-md"
                    showFallback
                    name={user?.username}
                  />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {user?.first_name + " " + user?.last_name}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                      @{user?.username}
                    </h5>
                  </div>
                  <UnfoldIcon className="w-4 h-4 self-center" />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="faded">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.username}</p>
                </DropdownItem>

                {role === "admin"
                  ? AdminDropDownLinks.map((link, index) => (
                      <DropdownSection
                        key={link.sectionTitle}
                        title={link.sectionTitle}
                      >
                        {link.DropDownLinks.map(
                          (dropDownLink, dropDownLinkIndex) => (
                            <DropdownItem
                              key={dropDownLink.title}
                              startContent={dropDownLink.startContent}
                              href={dropDownLink.href}
                            >
                              {dropDownLink.title}
                            </DropdownItem>
                          )
                        )}
                      </DropdownSection>
                    ))
                  : WriterDropDownLinks.map((link, index) => (
                      <DropdownSection
                        key={link.sectionTitle}
                        title={link.sectionTitle}
                      >
                        {link.DropDownLinks.map(
                          (dropDownLink, dropDownLinkIndex) => (
                            <DropdownItem
                              key={dropDownLink.title}
                              startContent={dropDownLink.startContent}
                              href={dropDownLink.href}
                            >
                              {dropDownLink.title}
                            </DropdownItem>
                          )
                        )}
                      </DropdownSection>
                    ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileDropDown;
