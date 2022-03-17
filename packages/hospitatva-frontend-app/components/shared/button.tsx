import { useRouter } from "next/router";
import { ROUTES } from "../../utils/constants";
import { ButtonProps } from "../../utils/interfaces/shared";

const Button = ({ size = "normal", ...args }: ButtonProps) => {
  const router = useRouter();
  const isHospitalManager = router.route.includes(ROUTES.MANAGE);

  return (
    <button
      {...args}
      className={`cursor-pointer rounded-md bg-gradient-to-r disabled:cursor-default ${
        isHospitalManager
          ? "from-accent-hospital-start to-accent-hospital-stop"
          : "from-accent-patient-start to-accent-patient-stop"
      } px-6 py-2 ${
        size === "normal" ? "text-lg" : ""
      } font-semibold text-white filter transition-all duration-200 hover:brightness-105 active:brightness-95 disabled:opacity-60 disabled:brightness-90 ${
        args.className
      }`}
    />
  );
};

export default Button;
