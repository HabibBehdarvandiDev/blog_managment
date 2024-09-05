import { Decimal } from "@prisma/client/runtime/library";
import { ReactNode } from "react";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  nickname: string;
  date_of_birth: string | null;
  profile_url: string;
  username: string;
  password: string;
  phone_number: string | null;
  active: boolean;
  role_id: number;
  created_at: string;
  updated_at: string;
};

type NavLinks = {
  title: string;
  href: string;
  startContent: ReactNode;
};

type DropDownSections = {
  sectionTitle: string;
  DropDownLinks: NavLinks[];
};

type DropDownMenu = DropDownSections;

type UserManagmentTableSchema = {
  id:number;
  first_name: string;
  last_name: string;
  username: string;
  active: boolean;
  role: {
    role_name: string;
  };
  userwallet: {
    balance:  Decimal | null;
  } | null;
  _count: {
    blog: number;
  };
};

export type { User, NavLinks, DropDownMenu,UserManagmentTableSchema };
