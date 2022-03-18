import { useRouter } from "next/router";
import { ROUTES } from "../../utils/constants";
import { ButtonProps } from "../../utils/interfaces/shared";

const Button = ({ size = "normal", outlined, ...args }: ButtonProps) => {
  const router = useRouter();
  const isHospitalManager = router.route.includes(ROUTES.MANAGE);
  const isAdmin = router.route.includes(ROUTES.ADMIN);

  return (
    <button
      {...args}
      className={`cursor-pointer rounded-md ${
        outlined
          ? `border-2 ${
              isHospitalManager
                ? "border-accent-hospital-start text-accent-hospital-start"
                : isAdmin
                ? "border-accent-admin-stop text-accent-admin-stop"
                : "border-accent-patient-start text-accent-patient-start"
            }`
          : "bg-gradient-to-r text-primaryLight"
      } disabled:cursor-default ${
        isHospitalManager
          ? "from-accent-hospital-start to-accent-hospital-stop"
          : isAdmin
          ? "from-accent-admin-start to-accent-admin-stop"
          : "from-accent-patient-start to-accent-patient-stop"
      } px-6 py-2 ${
        size === "normal" ? "text-lg" : ""
      } font-semibold  filter transition-all duration-200 hover:brightness-105 active:brightness-95 disabled:opacity-60 disabled:brightness-90 ${
        args.className
      }`}
    />
  );
};

export default Button;
