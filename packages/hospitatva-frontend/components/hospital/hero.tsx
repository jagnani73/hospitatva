import { HospitalProps } from "../../utils/interfaces/hospital";
import { Map } from "./";
import { Header } from "../shared";

const Hero = ({
  name,
  address,
  marker,
  commodities,
  specialists,
}: HospitalProps) => {
  return (
    <section className="mx-auto w-10/12 py-20">
      <Header type="primary" tagline={address.join(", ")}>
        {name}
      </Header>

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

      <table className="border-patient-secondary mt-10 w-full table-auto border-2">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="border-patient-secondary border-2 py-1 px-4 text-left">
              Commodity Name
            </th>
            <th className="border-patient-secondary border-2 p-1 px-4">
              Count
            </th>
            <th className="border-patient-secondary border-2 p-1 px-4">
              Available
            </th>
            <th className="border-patient-secondary border-2 p-1 px-4">
              Price
            </th>
          </tr>
        </thead>
        <tbody className="mt-10">
          {commodities.map(({ count, available, name, price }) => (
            <tr key={name}>
              <td className="p-1 px-4">{name}</td>
              <td className="p-1 px-4 text-center">{count}</td>
              <td className="p-1 px-4 text-center">{available}</td>
              <td className="p-1 px-4 text-center">{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Hero;
