import { HospitalProps } from "../../utils/interfaces/hospital";
import { Map } from "./";
import { Header } from "../shared";

const Hero = ({
  name,
  address,
  marker,
  commodities,
  contract_address,
  specialists,
}: HospitalProps) => {
  return (
    <section className="mx-auto w-10/12 pt-44">
      <Header type="primary" tagline={address.join(", ")}>
        {name}
      </Header>

      <div className="mx-auto flex w-9/12 items-start justify-between">
        <div className="mt-10">
          <Header type="secondary">Specialists Available</Header>

          <div className="grid grid-cols-2">
            {specialists.map((specialist) => (
              <p key={specialist}>→ {specialist}</p>
            ))}
          </div>
        </div>

        <Map {...marker} />
      </div>
    </section>
  );
};

export default Hero;
