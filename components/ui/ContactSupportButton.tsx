import SupportIcon from "@/components/ui/icons/SupportIcon";
import { Button } from "@nextui-org/button";

const ContactSupportButton = () => {
  return (
    <Button
      color="primary"
      variant="light"
      className="font-medium"
      endContent={<SupportIcon />}
    >
      ارتباط با پشتیبانی
    </Button>
  );
};

export default ContactSupportButton;
