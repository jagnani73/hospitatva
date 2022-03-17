import { Magic } from "magic-sdk";
import { ZilliqaExtension } from "@magic-ext/zilliqa";
import { BN, units, bytes, Long } from "@zilliqa-js/zilliqa";

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
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY!, {
        extensions: [
          new ZilliqaExtension({
            rpcUrl: "https://dev-api.zilliqa.com/",
          }),
        ],
      });
      const token = await magic.auth.loginWithMagicLink({
        email: patient.email,
        showUI: true,
      });

      if (token) {
        const wallet = await magic.zilliqa.getWallet();
        console.log("Zilliqa wallet: ", wallet);

        await new Promise((res, rej) => {
          setTimeout(() => {
            console.log("here");
            res(null);
          }, 10000);
        });

        const res = await postMagicToken(token, patient.email);
        console.log("posted");
        if (res) {
          const a = await magic.user.isLoggedIn();
          console.log(a);
          const b = await magic.user.getMetadata();
          console.log(b);
          const result = await magic.zilliqa.callContract(
            "AddItem",
            [
              {
                vname: "listing_data_name",
                type: "String",
                value: "Commodity One",
              },
              {
                vname: "listing_data_price",
                type: "Uint256",
                value: "9000",
              },
            ],
            {
              version: bytes.pack(333, 1),
              amount: new BN(0),
              gasPrice: units.toQa("0.1", units.Units.Li),
              gasLimit: Long.fromNumber(10000),
            },
            33,
            1000,
            false,
            "0xe7dcf9184d66746dd5e01509c65f7255fb19db9c"
          );

          console.log(result);
        }
      }
    } catch (err) {
      console.log(err);
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

        <div className="mx-auto mt-4 h-2 w-36 bg-accent-patient-start" />

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
          <div className=" border-patient-secondary border-y-2 border-opacity-80 p-4">
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
