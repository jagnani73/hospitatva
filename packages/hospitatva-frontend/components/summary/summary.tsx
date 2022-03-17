import { useState } from "react";
import { Magic } from "magic-sdk";
import { ZilliqaExtension } from "@magic-ext/zilliqa";
import { BN, units, bytes, Long } from "@zilliqa-js/zilliqa";

import { SummaryProps } from "../../utils/interfaces/summary";
import { Button, Header, Modal } from "../shared";
import { postMagicToken } from "../../services/rest";

const Summary = ({
  date,
  paid: initiallyPaid,
  doctor,
  items,
  patient,
  summary_id,
}: SummaryProps) => {
  const [paid, setPaid] = useState<boolean>(initiallyPaid);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<{
    name: string;
    quantity: number;
    price: number;
    projectedPrice: number;
  } | null>();

  const handlePayment = async () => {
    try {
      setLoading(true);
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
        const res = await postMagicToken(token, patient.email);

        if (res) {
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
              gasPrice: units.toQa("5000", units.Units.Li),
              gasLimit: Long.fromNumber(40000),
            },
            33,
            1000,
            false,
            "0xe7dcf9184d66746dd5e01509c65f7255fb19db9c"
          );

          setPaid(true);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
                  <th className="p-1 px-4">Projected Price</th>
                  <th className="p-1 px-4">Quoted Price</th>
                  <th className="p-1 px-4">Quantity</th>
                  <th className="p-1 px-4">Amount</th>
                </tr>
              </thead>
              <tbody className="mt-10">
                {items.map(({ name, price, quantity, projectedPrice }) => (
                  <tr key={name}>
                    <td className="p-1 px-4">{name}</td>
                    <td className="p-1 px-4 text-right">{projectedPrice}</td>
                    <td className="flex items-center justify-end p-1 px-4 text-right">
                      ₹{price}
                      {projectedPrice < price && (
                        <button
                          onClick={() =>
                            setActiveItem({
                              name,
                              price,
                              quantity,
                              projectedPrice,
                            })
                          }
                          className="ml-1 text-xs font-bold text-red-500"
                        >
                          Report
                        </button>
                      )}
                    </td>
                    <td className="p-1 px-4 text-right">{quantity}</td>
                    <td className="p-1 px-4 text-right">₹{price * quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 pr-10 text-right">
            Grand Total:{" "}
            <span className="font-bold underline">
              ₹
              {items.reduce(
                (prev, item) => prev + item.price * item.quantity,
                0
              )}
            </span>
          </p>
        </div>

        {!paid ? (
          <div className="mt-8 flex justify-center">
            <Button onClick={handlePayment} disabled={loading}>
              {!loading ? (
                "Accept & Pay"
              ) : (
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
            </Button>
          </div>
        ) : (
          <figure className="ml-auto mt-8 flex w-1/4">
            <img src="/paid.png" alt="" />
          </figure>
        )}

        <p className="mt-20 text-center text-sm font-bold">
          Powered by Hospitatva.
        </p>
      </div>

      <Modal
        isOpen={activeItem ? true : false}
        enterAnimation="fade-right"
        exitAnimation="fade-right"
        onClose={() => setActiveItem(null)}
        titleElement={<h3 className="text-lg font-medium">Are you sure?</h3>}
        classNames={{
          content: "!bg-primaryLight !max-w-xl",
          header:
            "!bg-gradient-to-b !from-accent-patient-start !to-accent-patient-stop text-primaryLight",
        }}
      >
        <h2 className="mb-5 text-xl font-semibold">
          You are about to raise a ticket against {doctor.hospital} for the item{" "}
          {activeItem?.name}, priced at ₹{activeItem?.price} against
          exploitation
        </h2>

        <div className="flex w-full justify-between">
          <button onClick={() => setActiveItem(null)}>Cancel</button>
          <button>Raise a Ticket</button>
        </div>
      </Modal>
    </>
  );
};

export default Summary;
