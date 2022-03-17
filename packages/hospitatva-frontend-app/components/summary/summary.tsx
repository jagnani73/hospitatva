import { Magic } from "magic-sdk";

import { SummaryProps } from "../../utils/interfaces/summary";
import { Button, Header } from "../shared";
import { postMagicToken } from "../../services/rest";

const Summary = ({
  date,
  doctor,
  items,
  patient,
  summary_id,
}: SummaryProps) => {
  const handlePayment = async () => {
    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY!);
      const token = await magic.auth.loginWithMagicLink({
        email: patient.email,
        showUI: true,
      });

      if (token) {
        const res = await postMagicToken(token, patient.email);
        console.log(res);
      }
    } catch (err) {
    } finally {
    }
  };

  return (
    <>
      <div className="mx-auto w-10/12 max-w-5xl bg-white p-10">
        <figure>
          <img src="/hospital-logo.png" className="mx-auto w-96" />
        </figure>

        <Header type="primary" className="mt-10 justify-center">
          Order Summary
        </Header>

        <div className="mx-auto mt-4 h-2 w-36 bg-patient-accent" />

        <div>
          <p>
            <span className="font-bold">Summary ID:</span> {summary_id}
          </p>
          <p>
            <span className="font-bold">Date:</span> {date}
          </p>
        </div>

        <div className="mt-6 flex items-start justify-between">
          <div>
            <p className="font-bold">Hospital Details:</p>
            <p>{doctor.hospital}</p>
            {doctor.address.map((add) => (
              <p key={add}>{add}</p>
            ))}
          </div>

          <div>
            <p className="font-bold">Patient Details:</p>
            <p>Name: {patient.name}</p>
            <p>Age: {patient.age}</p>
            <p>Sex: {patient.sex}</p>
            <p>Mobile: {patient.number}</p>
            <p>Address: {patient.address}</p>
          </div>
        </div>

        <p className="mt-4 font-bold">Requested By:</p>
        <p>
          Dr. {doctor.name}, {doctor.specialty}
        </p>
        <p>Mobile: {doctor.number}</p>

        <div className="mx-auto mt-10 w-10/12">
          <div className=" border-y-2 border-patient-secondary border-opacity-80 p-4">
            <table className="w-full table-auto">
              <thead className="">
                <tr>
                  <th className="py-1 px-4 text-left">Item Name</th>
                  <th className="p-1 px-4">Quantity</th>
                  <th className="p-1 px-4">Price</th>
                  <th className="p-1 px-4">Amount</th>
                </tr>
              </thead>
              <tbody className="mt-10">
                {items.map(({ name, price, quantity }) => (
                  <tr key={name}>
                    <td className="p-1 px-4">{name}</td>
                    <td className="p-1 px-4 text-center">{quantity}</td>
                    <td className="p-1 px-4 text-center">₹{price}</td>
                    <td className="p-1 px-4 text-center">
                      ₹{price * quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 pr-10 text-right">
            Grand Total:{" "}
            <span className="font-bold">
              ₹
              {items.reduce(
                (prev, item) => prev + item.price * item.quantity,
                0
              )}
            </span>
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={handlePayment}>Accept & Pay</Button>
        </div>

        <p className="mt-20 text-center text-sm font-bold">
          Powered by Hospitatva.
        </p>
      </div>
    </>
  );
};

export default Summary;
