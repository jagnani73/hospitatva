import { useRouter } from "next/router";
import { ROUTES } from "../../utils/constants";

const Navbar = () => {
  const router = useRouter();

  const isHospitalManager = router.route.includes(ROUTES.MANAGE);

  return (
    <nav
      className={`sticky top-0 left-0 flex w-full bg-gradient-to-r  ${
        isHospitalManager
          ? "from-accent-hospital-start to-accent-hospital-stop"
          : "from-accent-patient-start to-accent-patient-stop"
      } px-20 py-2`}
    >
      <figure className="flex w-20 items-center">
        <img src="https://picsum.photos/200" alt="" className="h-auto w-10" />
        <figcaption className="text-patient-primary ml-4 text-2xl font-semibold text-primaryLight">
          Hospitatva
        </figcaption>
      </figure>
    </nav>
  );
};

export default Navbar;
