import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

const formInfoItems: string[] = [
  "اطلاعات شما فقط برای ساخت حساب کاربری استفاده خواهد شد و محفوظ خواهد ماند.",
  "برای امنیت بیشتر، رمز عبور خود را به صورت ترکیبی از حروف و اعداد وارد کنید.",
];

const InfoModal = () => {
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
    setMounted(true);
  }, []);
  return (
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
  );
};

export default InfoModal;
