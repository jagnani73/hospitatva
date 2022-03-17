import { HospitalProps } from "../../utils/interfaces/hospital";
import { Header } from "../shared";

const Hero = ({ name, address }: HospitalProps) => {
  return (
    <div>
      <Header type="primary" tagline={address.join(", ")}>
        {name}
      </Header>
    </div>
  );
};

export default Hero;
