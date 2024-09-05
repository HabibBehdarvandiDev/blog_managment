import { Skeleton } from "@nextui-org/react";

const NavbarLinksSkeleton = () => {
  return (
    <nav className="flex flex-col space-y-4 animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex justify-start items-center gap-2 p-2 rounded-xl bg-gray-200 h-8 w-full"
        >
          <Skeleton className="rounded-lg">
            <div className="h-5 w-full bg-default-300"></div>
          </Skeleton>
        </div>
      ))}
    </nav>
  );
};

export default NavbarLinksSkeleton;
