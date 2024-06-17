"use client";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const formInfoItems: string[] = [
  "اطلاعات شما فقط برای ساخت حساب کاربری استفاده خواهد شد و محفوظ خواهد ماند.",
  "برای امنیت بیشتر، رمز عبور خود را به صورت ترکیبی از حروف و اعداد وارد کنید.",
];

const RegisterPage = () => {
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <section className="bg-white w-screen h-screen overflow-hidden flex">
      <form className="bg-white w-full xl:w-2/3 2xl:w-2/5 h-screen lg:h-full flex flex-col justify-start items-center pt-16 p-5 space-y-5 px-4 overflow-hidden relative">
        <h1 className="form-title text-2xl font-medium text-zinc-800">
          ثبت نام
        </h1>
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

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  اطلاع رسانی
                </ModalHeader>
                <ModalBody>
                  {formInfoItems.map((info, index) => (
                    <p key={index} className="text-sm text-zinc-400">
                      {info}
                    </p>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    متوجه شدم !
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Button color="primary" variant="shadow" className="w-full font-medium">
          ثبت نام
        </Button>
      </form>
      <div className="hidden lg:flex w-full h-screen bg-primary items-center justify-center align-middle">helo</div>
    </section>
  );
};

export default RegisterPage;
