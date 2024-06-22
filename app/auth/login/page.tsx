import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
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
