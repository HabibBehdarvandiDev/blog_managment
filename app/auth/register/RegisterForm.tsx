"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import InfoModal from "./InfoModal";

const RegisterForm = () => {
  return (
    <form className="bg-white w-full xl:w-2/3 2xl:w-2/5 h-screen lg:h-full flex flex-col justify-start items-center pt-16 p-5 space-y-5 px-4 overflow-hidden relative">
      <h1 className="form-title text-2xl font-medium text-zinc-800">ثبت نام</h1>
      <p className="form-description text-sm text-zinc-400 w-full text-center">
        به جمع تولید کنندگان محتوای دنیای گیم بپیوندید 🎮
      </p>
      <div className="form-control w-full flex gap-4">
        <Input type="text" label="نام" />
        <Input type="text" label="نام خانوادگی" />
      </div>
      <div className="form-control w-full">
        <Input type="text" label="نام کاربری" />
      </div>
      <div className="form-control w-full">
        <Input type="text" label="رمز عبور" />
      </div>
      <div className="form-control w-full">
        <Input type="text" label="تایید رمز عبور" />
      </div>

      <InfoModal />

      <Button color="primary" variant="shadow" className="w-full font-medium">
        ثبت نام
      </Button>
    </form>
  );
};

export default RegisterForm;
