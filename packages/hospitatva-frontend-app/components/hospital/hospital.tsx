import { HospitalProps } from "../../utils/interfaces/hospital";
import { Hero } from "./";

const Hospital = (hospital: HospitalProps) => {
  return (
    <>
      <Hero {...hospital} />
    </>
  );
};

export default Hospital;
