import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";

const ProfileDropDownSkeleton = () => {
  return (
    <>
      <div className="lg:hidden">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Skeleton className="flex rounded-xl w-12 h-12" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="faded">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-3/5 rounded-lg" />
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="hidden lg:flex">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex gap-5 cursor-pointer">
              <Skeleton className="flex rounded-xl w-12 h-12" />{" "}
              <div className="flex flex-col gap-1 items-start justify-center">
                <Skeleton className="h-2 w-[100px] rounded-lg" />
                <Skeleton className="h-2 w-[100px] rounded-lg" />
              </div>
              <Skeleton className="flex rounded-full w-6 h-6" />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="faded">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-3/5 rounded-lg" />
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default ProfileDropDownSkeleton;
