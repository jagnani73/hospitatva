import { Button } from ".";
import { HeaderProps } from "../../utils/interfaces/shared";

const Header = ({ type, children, tagline }: HeaderProps) => {
  switch (type) {
    case "primary": {
      return (
        <div className="flex items-end">
          <div>
            <h1 className="text-3xl font-semibold">{children}</h1>
            {tagline && <h2 className="text-xl">{tagline}</h2>}
          </div>
        </div>
      );
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
