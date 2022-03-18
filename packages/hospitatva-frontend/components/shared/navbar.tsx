import { useRouter } from "next/router";
import Link from "next/link";

import { ROUTES } from "../../utils/constants";

const Navbar = () => {
  const { route } = useRouter();

  const isHospitalManager = route.includes(ROUTES.MANAGE);
  const isAdmin = route.includes(ROUTES.ADMIN);

  return (
    <nav
      className={`sticky top-0 left-0 flex w-full bg-gradient-to-r  ${
        isHospitalManager
          ? "from-accent-hospital-start to-accent-hospital-stop"
          : isAdmin
          ? "from-accent-admin-start to-accent-admin-stop"
          : "from-accent-patient-start to-accent-patient-stop"
      } px-20 py-2`}
    >
      <Link href={ROUTES.HOME}>
        <a>
          <figure className="flex w-20 items-center">
            <img
              src="https://picsum.photos/200"
              alt=""
              className="h-auto w-10"
            />
            <figcaption className="text-patient-primary ml-4 text-2xl font-semibold text-primaryLight">
              Hospitatva
            </figcaption>
          </figure>
        </a>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <Link href={ROUTES.HOME}>
          <a className={!isHospitalManager && !isAdmin ? "underline" : ""}>
            Public
          </a>
        </Link>
        <Link href={ROUTES.MANAGE}>
          <a className={isHospitalManager ? "underline" : ""}>Hospitals</a>
        </Link>
        <Link href={ROUTES.ADMIN}>
          <a className={isAdmin ? "underline" : ""}>Supervisors</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
