import { Hospitals } from "../../utils/dummy-data/home";
import { Card } from "./";

const Hero = () => {
  return (
    <section className="mx-auto w-10/12 pt-56">
      <div className="grid grid-cols-4 gap-16">
        {Hospitals.map((hospital) => (
          <Card key={hospital.name} {...hospital} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
