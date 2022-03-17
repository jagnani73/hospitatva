import { useRouter } from "next/router";
import { ROUTES } from "../../utils/constants";
import { HeaderProps } from "../../utils/interfaces/shared";

const Header = ({ type, children, tagline, className = "" }: HeaderProps) => {
  const router = useRouter();
  const isHospitalManager = router.route.includes(ROUTES.MANAGE);

  switch (type) {
    case "primary": {
      return (
        <div className={`flex items-end ${className}`}>
          <div>
            <h1 className={`text-3xl font-semibold ${className}`}>
              {children}
            </h1>
            {tagline && <h2 className="text-xl">{tagline}</h2>}
          </div>
        </div>
      );
    }
    case "secondary": {
      return (
        <h2
          className={`mb-8 border-l-4 ${
            isHospitalManager
              ? "border-accent-hospital-start"
              : "border-accent-patient-start"
          } py-1 pl-2 text-2xl font-semibold ${className}`}
        >
          {children}
        </h2>
      );
    }
  }
};

export default Header;
