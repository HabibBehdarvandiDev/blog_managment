import React from "react";
import LoginForm from "./LoginForm";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie!);

  if (session?.userId) {
    redirect("/dashboard");
  }

  return (
    <section className="bg-white w-screen h-screen overflow-hidden flex">
      <LoginForm />
      <div className="hidden lg:flex w-full h-screen bg-primary items-center justify-center align-middle">
        helo
      </div>
    </section>
  );
};

export default LoginPage;
