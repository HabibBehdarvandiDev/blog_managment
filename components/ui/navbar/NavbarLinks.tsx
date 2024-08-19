import { NavLinks } from "@/schema";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import UserGroupIcon from "../icons/UserGroupIcon";
import NewsIcon from "../icons/NewsIcon";
import RankingIcon from "../icons/RankingIcon";
import TransactionIcon from "../icons/transaction";
import SupportIcon from "../icons/SupportIcon";

const AdminLinks: NavLinks[] = [
  {
    title: "داشبورد",
    href: "/admin/dashboard",
    startContent: <HomeIcon className="w-5 h-5" />,
  },
  {
    title: "مدیریت کاربران",
    href: "/admin/managment",
    startContent: <UserGroupIcon className="w-5 h-5" />,
  },
  {
    title: "نوشته ها",
    href: "/admin/blogs",
    startContent: <NewsIcon className="w-5 h-5" />,
  },
  {
    title: "رتبه بندی ها",
    href: "/admin/rankings",
    startContent: <RankingIcon className="w-5 h-5" />,
  },
  {
    title: "پرداخت ها",
    href: "/admin/transactions",
    startContent: <TransactionIcon className="w-5 h-5" />,
  },
  {
    title: "تماس با پشتیبانی",
    href: "/admin/support",
    startContent: <SupportIcon className="w-5 h-5" />,
  },
];

const WriterLinks: NavLinks[] = [
  {
    title: "داشبورد",
    href: "/writer/dashboard",
    startContent: <HomeIcon className="w-5 h-5" />,
  },
  {
    title: "نوشته های من",
    href: "/writer/myblogs",
    startContent: <NewsIcon className="w-5 h-5" />,
  },
  {
    title: "رتبه من",
    href: "writer/myrank",
    startContent: <RankingIcon className="w-5 h-5" />,
  },
  {
    title: "پرداخت های من",
    href: "/writer/mytransactions",
    startContent: <TransactionIcon className="w-5 h-5" />,
  },
  {
    title: "تماس با پشتیبانی",
    href: "/writer/support",
    startContent: <SupportIcon className="w-5 h-5" />,
  },
];

export { AdminLinks, WriterLinks };
