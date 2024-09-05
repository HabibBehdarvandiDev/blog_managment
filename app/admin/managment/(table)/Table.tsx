"use client";
import MoreVerticalIcon from "@/components/ui/icons/MoreVerticalIcon";
import { User, UserManagmentTableSchema } from "@/schema";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
  Chip,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import TableSkeleton from "./TableSkeleton";

const UserManagmentTable = () => {
  const [users, setUsers] = useState<UserManagmentTableSchema[] | []>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const rowsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/data/managment/users?page=${page}&limit=${rowsPerPage}`
        );
        setUsers(response.data.results);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const loadingState = isLoading ? "loading" : "idle";

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Table
          aria-label="User Management Table"
          className="w-fit"
          shadow="sm"
          bottomContent={
            totalPages > 0 && (
              <div className="flex w-full justify-center align-middle items-center gap-4">
                <Pagination
                  showControls
                  color="primary"
                  page={page}
                  total={totalPages}
                  onChange={(newPage) => setPage(newPage)}
                />
              </div>
            )
          }
        >
          <TableHeader>
            <TableColumn key="id">آیدی</TableColumn>
            <TableColumn key="fullName">نام و نام خانوادگی</TableColumn>
            <TableColumn key="username">نام کاربری</TableColumn>
            <TableColumn key="status">نقش/وضعیت</TableColumn>
            <TableColumn key="status">تعداد نوشته</TableColumn>
            <TableColumn key="status">کیف پول</TableColumn>
            <TableColumn key="actions">اکشن</TableColumn>
          </TableHeader>
          <TableBody
            items={users}
            loadingContent={<TableSkeleton />}
            loadingState={loadingState}
            emptyContent={<p>Empty</p>}
          >
            {(item) => (
              <TableRow key={item?.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{`${item.first_name} ${item.last_name}`}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>
                  <Chip size="sm" variant="flat" color="secondary">
                    {item.role.role_name === "admin" ? "ادمین" : "نویسنده"}
                  </Chip>{" "}
                  <Chip
                    size="sm"
                    variant="flat"
                    color={item.active ? "success" : "danger"}
                  >
                    {item.active ? "فعال" : "غیر فعال"}
                  </Chip>
                </TableCell>
                <TableCell>{item._count.blog}</TableCell>
                <TableCell>
                  {item.userwallet?.balance?.toNumber() || 0}{" "}
                  تومان
                </TableCell>
                <TableCell>
                  <Button isIconOnly variant="light">
                    <MoreVerticalIcon className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default UserManagmentTable;
