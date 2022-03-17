import Link from "next/link";
import { HeroProps } from "../../utils/interfaces/home";
import { Header } from "../shared";
import { Card } from "./";

const Hero = ({ hospitals }: HeroProps) => {
  return (
    <section className="mx-auto w-10/12 pt-36">
      <Header type="secondary">Hospitals near you</Header>

      <div className="grid grid-cols-4 gap-16">
        {hospitals.map((hospital) => (
          <Card key={hospital.contract_address} {...hospital} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
