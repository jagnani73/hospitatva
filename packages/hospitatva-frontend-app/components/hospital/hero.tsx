import { HospitalProps } from "../../utils/interfaces/hospital";
import { Map } from "./";
import { Button, Header } from "../shared";

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
      <div className="flex items-end justify-between">
        <Header type="primary" tagline={address.join(", ")}>
          {name}
        </Header>
        <Button>Book</Button>
      </div>

      <div className="mx-auto mt-10 flex items-start justify-between">
        <div>
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
