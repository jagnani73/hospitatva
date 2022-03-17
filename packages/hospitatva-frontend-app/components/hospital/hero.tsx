import { HospitalProps } from "../../utils/interfaces/hospital";
import { Map } from "./";
import { Button, Header, Input, Modal } from "../shared";
import { useState } from "react";
import { COMMODITIES } from "../../utils/constants";

const Hero = ({
  name,
  address,
  marker,
  commodities,
  contract_address,
  specialists,
}: HospitalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <section className="mx-auto w-10/12 pt-44">
      <div className="flex items-end justify-between">
        <Header type="primary" tagline={address.join(", ")}>
          {name}
        </Header>
        <Button onClick={() => setIsOpen(true)}>Book</Button>
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

      <table className="mt-10 w-full table-auto border-2 border-patient-secondary">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="border-2 border-patient-secondary py-1 px-4 text-left">
              Commodity Name
            </th>
            <th className="border-2 border-patient-secondary p-1 px-4">
              Count
            </th>
            <th className="border-2 border-patient-secondary p-1 px-4">
              In Use
            </th>
            <th className="border-2 border-patient-secondary p-1 px-4">
              Price
            </th>
          </tr>
        </thead>
        <tbody className="mt-10">
          {commodities.map(({ count, in_use, name, price }) => (
            <tr key={name}>
              <td className="p-1 px-4">{name}</td>
              <td className="p-1 px-4 text-center">{count}</td>
              <td className="p-1 px-4 text-center">{in_use}</td>
              <td className="p-1 px-4 text-center">{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        enterAnimation="fade-bottom"
        exitAnimation="fade-top"
        classNames={{
          header:
            "!bg-gradient-to-r !from-patient-accent !to-green-600 text-white",
          content: "!bg-white",
        }}
        titleElement={<h2 className="font-semibold ">Book Commodities</h2>}
        isOpen={isOpen}
        onClose={handleClose}
      >
        {step === 0 && (
          <>
            <h3 className="text-lg font-semibold">Add Commodities</h3>

            {/* <Input
              name="commodities"
              id="commodity-selector"
              type="select"
              placeholder="Select a commodity"
              choices={Object.keys(COMMODITIES).map((c) => ({
                text: c,
                value: c,
              }))}
            /> */}
          </>
        )}

        {step === 1 && <h3 className="text-lg font-semibold">Summary</h3>}
        {step === 2 && (
          <h3 className="text-lg font-semibold">Add Commodities</h3>
        )}
        <footer className="mt-6 flex items-center justify-between">
          <Button size="small">Prev</Button>
          <Button size="small">Next</Button>
        </footer>
      </Modal>
    </section>
  );
};

export default Hero;
