import { ButtonProps } from "../../utils/interfaces/shared";

const Button = ({ size = "normal", ...args }: ButtonProps) => {
  return (
    <button
      {...args}
      className={`rounded-md bg-gradient-to-r from-patient-accent to-green-600 px-6 py-2 ${
        size === "normal" ? "text-lg" : ""
      } font-semibold text-white filter transition-all duration-200 hover:brightness-105 active:brightness-95 ${
        args.className
      }`}
    />
  );
};

export default Button;
