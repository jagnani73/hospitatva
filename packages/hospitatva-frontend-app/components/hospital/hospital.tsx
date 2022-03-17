import { HospitalProps } from "../../utils/interfaces/hospital";
import { Map, Hero } from "./";

const Hospital = (hospital: HospitalProps) => {
  return (
    <section>
      <Hero {...hospital} />
      <Map />
    </section>
  );
};

export default Hospital;
