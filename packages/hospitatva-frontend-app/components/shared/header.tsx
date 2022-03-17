import { HeaderProps } from "../../utils/interfaces/shared";

const Header = ({ type, children }: HeaderProps) => {
  switch (type) {
    case "primary": {
      return <h1>{children}</h1>;
    }
    case "secondary": {
      return (
        <h2 className="mb-8 border-l-4 border-patient-accent py-1 pl-2 text-2xl font-semibold">
          {children}
        </h2>
      );
    }
  }
};

export default Header;
