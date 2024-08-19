"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/react";
import TextBoldIcon from "../icons/bold";
import Settings02Icon from "../icons/settings";
import SupportIcon from "../icons/SupportIcon";
import TransactionIcon from "../icons/transaction";
import TrashIcon from "../icons/TrashIcon";
import UnfoldIcon from "../icons/UnfoldIcon";
import UserIcon from "../icons/user";
import Wallet01Icon from "../icons/wallet";
import { useEffect, useState } from "react";
import { User } from "@/schema";
import { useRouter } from "next/navigation";
import { decodeJWT } from "@/lib/session";
import axios from "axios";
import ProfileDropDownSkeleton from "./ProfileDropDownSkeleton";

const ProfileDropDown = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true); // Start loading before making the request
        const token = sessionStorage.getItem("session");

        if (!token) {
          setError(true);
          return; // Exit early if there's no token
        }

        const decodedToken = decodeJWT(token);
        const response = await axios.get(
          `http://localhost:3000/api/user/${decodedToken?.userId}`
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
        setLoading(false); // Stop loading only when the request finishes
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
              <DropdownMenu aria-label="Profile Actions" variant="faded">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.username}</p>
                </DropdownItem>
                <DropdownSection showDivider title={"اکشن ها"}>
                  <DropdownItem
                    key="settings"
                    startContent={<UserIcon className="w-4 h-4" />}
                  >
                    پروفایل
                  </DropdownItem>
                  <DropdownItem
                    key="team_settings"
                    startContent={<Settings02Icon className="w-4 h-4" />}
                  >
                    تنظیمات
                  </DropdownItem>
                  <DropdownItem
                    key="analytics"
                    startContent={<TextBoldIcon className="w-4 h-4" />}
                  >
                    بلاگ های من
                  </DropdownItem>
                  <DropdownItem
                    key="system"
                    startContent={<Wallet01Icon className="w-4 h-4" />}
                  >
                    کیف پول من
                  </DropdownItem>
                  <DropdownItem
                    key="configurations"
                    startContent={<TransactionIcon className="w-4 h-4" />}
                  >
                    پرداختی ها
                  </DropdownItem>
                  <DropdownItem
                    key="help_and_feedback"
                    startContent={<SupportIcon className="w-4 h-4" />}
                  >
                    ارتباط با پشتیبانی
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="بخش خطرناکش">
                  <DropdownItem
                    className="text-danger"
                    color="danger"
                    description="اول سیو کن بعد برو"
                    startContent={<TrashIcon className="w-4 h-4" />}
                  >
                    خروج از حساب کاربری
                  </DropdownItem>
                </DropdownSection>
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
                <DropdownSection showDivider title={"اکشن ها"}>
                  <DropdownItem
                    key="settings"
                    startContent={<UserIcon className="w-4 h-4" />}
                  >
                    پروفایل
                  </DropdownItem>
                  <DropdownItem
                    key="team_settings"
                    startContent={<Settings02Icon className="w-4 h-4" />}
                  >
                    تنظیمات
                  </DropdownItem>
                  <DropdownItem
                    key="analytics"
                    startContent={<TextBoldIcon className="w-4 h-4" />}
                  >
                    بلاگ های من
                  </DropdownItem>
                  <DropdownItem
                    key="system"
                    startContent={<Wallet01Icon className="w-4 h-4" />}
                  >
                    کیف پول من
                  </DropdownItem>
                  <DropdownItem
                    key="configurations"
                    startContent={<TransactionIcon className="w-4 h-4" />}
                  >
                    پرداختی ها
                  </DropdownItem>
                  <DropdownItem
                    key="help_and_feedback"
                    startContent={<SupportIcon className="w-4 h-4" />}
                  >
                    ارتباط با پشتیبانی
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="بخش خطرناکش">
                  <DropdownItem
                    className="text-primary"
                    color="primary"
                    description="اول سیو کن بعد برو"
                    startContent={<TrashIcon className="w-4 h-4" />}
                  >
                    خروج از حساب کاربری
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileDropDown;
