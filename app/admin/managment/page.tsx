import prisma from "@/utils/db";
import UserManagmentTable from "./(table)/Table";
import { UserManagmentTableSchema } from "@/schema";

const ManagmentPage = async () => {
  return (
    <div>
      <UserManagmentTable  />
    </div>
  );
};

export default ManagmentPage;
