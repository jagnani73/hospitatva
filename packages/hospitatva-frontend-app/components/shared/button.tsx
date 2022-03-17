import { ButtonProps } from "../../utils/interfaces/shared";

const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-patient-accent to-green-600 px-6 py-3 text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
