"use client";

import RegisterForm from "./RegisterForm";


const RegisterPage = () => {
  

  return (
    <section className="bg-white w-screen h-screen overflow-hidden flex">
      <RegisterForm />
      <div className="hidden lg:flex w-full h-screen bg-primary items-center justify-center align-middle">helo</div>
    </section>
  );
};

export default RegisterPage;
