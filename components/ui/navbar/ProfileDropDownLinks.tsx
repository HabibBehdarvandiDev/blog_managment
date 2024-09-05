import { DropDownMenu } from "@/schema";
import Settings02Icon from "../icons/settings";
import SupportIcon from "../icons/SupportIcon";
import TransactionIcon from "../icons/transaction";
import UserIcon from "../icons/user";
import Wallet01Icon from "../icons/wallet";
import TextBoldIcon from "../icons/bold";
import SourceCodeIcon from "../icons/SourceCodeIcon";
import RankingIcon from "../icons/RankingIcon";
import Analytics02Icon from "../icons/AnalyticsIcon";

const AdminDropDownLinks: DropDownMenu[] = [
  {
    sectionTitle: "اکشن ها",
    DropDownLinks: [
      {
        title: "پروفایل",
        href: "/admin/profile",
        startContent: <UserIcon className="w-5 h-5" />,
      },
      {
        title: "تنظیمات",
        href: "/admin/setting",
        startContent: <Settings02Icon className="w-5 h-5" />,
      },
      {
        title: "کیف پول کاربران",
        href: "/admin/wallets",
        startContent: <Wallet01Icon className="w-5 h-5" />,
      },
      {
        title: "گزارش ها",
        href: "/admin/reports",
        startContent: <Analytics02Icon className="w-5 h-5" />,
      },
    ],
  },
  {
    sectionTitle: "فنی",
    DropDownLinks: [
      {
        title: "ارتباط با برنامه نویس",
        href: "/landing/contact_dev",
        startContent: <SourceCodeIcon className="w-5 h-5" />,
      },
      {
        title: "پشتیبانی",
        href: "/admin/support",
        startContent: <SupportIcon className="w-5 h-5" />,
      },
    ],
  },
];

const WriterDropDownLinks: DropDownMenu[] = [
  {
    sectionTitle: "اکشن ها",
    DropDownLinks: [
      {
        title: "پروفایل",
        href: "/writer/profile",
        startContent: <UserIcon className="w-5 h-5" />,
      },
      {
        title: "تنظیمات",
        href: "/writer/setting",
        startContent: <Settings02Icon className="w-5 h-5" />,
      },
      {
        title: "رتبه من",
        href: "/writer/myrank",
        startContent: <RankingIcon className="w-5 h-5" />,
      },
      {
        title: "بلاگ های من",
        href: "/writer/myblogs",
        startContent: <TextBoldIcon className="w-5 h-5" />,
      },
      {
        title: "کیف پول من",
        href: "/writer/mywallet",
        startContent: <Wallet01Icon className="w-5 h-5" />,
      },

      {
        title: "پرداختی ها",
        href: "/writer/transactions",
        startContent: <TransactionIcon className="w-5 h-5" />,
      },
    ],
  },
  {
    sectionTitle: "فنی",
    DropDownLinks: [
      {
        title: "ارتباط با برنامه نویس",
        href: "/landing/contact_dev",
        startContent: <SourceCodeIcon className="w-5 h-5" />,
      },
      {
        title: "ارتباط با پشتیبانی",
        href: "/writer/support",
        startContent: <SupportIcon className="w-5 h-5" />,
      },
    ],
  },
];

export { AdminDropDownLinks, WriterDropDownLinks };
