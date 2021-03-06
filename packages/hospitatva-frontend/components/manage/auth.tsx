import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Magic } from "magic-sdk";
import { ZilliqaExtension } from "@magic-ext/zilliqa";
import { BN, units, bytes, Long } from "@zilliqa-js/zilliqa";

import { EMAIL_SCHEMA } from "../../utils/constants";
import { Button, Input } from "../shared";
import { postMagicToken } from "../../services/rest";
import { AuthProps } from "../../utils/interfaces/manage";

export const authValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .matches(EMAIL_SCHEMA, "Must be a valid email")
    .required("Email is required"),
});

const Auth = ({ setWalletAddress }: AuthProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: { email: string }) => {
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
        email: values["email"],
        showUI: true,
      });

      // @ts-ignore
      const { address } = await magic.zilliqa.getWallet();
      setWalletAddress(address);

      if (token) {
        const res = await postMagicToken(token, values["email"]);

        if (res) {
          await magic.zilliqa.callContract(
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
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={handleSubmit}
      validationSchema={authValidationSchema}
    >
      {({ errors, touched, isValid, isSubmitting }) => (
        <>
          <h1 className="mt-28 mb-6 text-center text-3xl font-semibold">
            Hospitatva Hospital Management Portal
          </h1>
          <Form className="relative flex flex-col items-center text-lg text-gray-300">
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Enter Hospital Email"
              classNames={{
                input:
                  "outline-none w-full max-w-sm text-secondary px-4 pl-11 py-2 rounded-md bg-primaryDark shadow-inner border-2 border-accent-hospital-start",
              }}
              startElement={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-1/2 left-3 -translate-y-1/2"
                >
                  <path
                    d="M8.85714 16.1786V16.8214C8.85714 16.9085 8.82533 16.9838 8.76172 17.0474C8.6981 17.111 8.62277 17.1429 8.53571 17.1429H7.89286C7.8058 17.1429 7.73047 17.111 7.66685 17.0474C7.60324 16.9838 7.57143 16.9085 7.57143 16.8214V16.1786C7.57143 16.0915 7.60324 16.0162 7.66685 15.9526C7.73047 15.889 7.8058 15.8571 7.89286 15.8571H8.53571C8.62277 15.8571 8.6981 15.889 8.76172 15.9526C8.82533 16.0162 8.85714 16.0915 8.85714 16.1786ZM8.85714 13.6071V14.25C8.85714 14.3371 8.82533 14.4124 8.76172 14.476C8.6981 14.5396 8.62277 14.5714 8.53571 14.5714H7.89286C7.8058 14.5714 7.73047 14.5396 7.66685 14.476C7.60324 14.4124 7.57143 14.3371 7.57143 14.25V13.6071C7.57143 13.5201 7.60324 13.4448 7.66685 13.3811C7.73047 13.3175 7.8058 13.2857 7.89286 13.2857H8.53571C8.62277 13.2857 8.6981 13.3175 8.76172 13.3811C8.82533 13.4448 8.85714 13.5201 8.85714 13.6071ZM11.4286 13.6071V14.25C11.4286 14.3371 11.3968 14.4124 11.3331 14.476C11.2695 14.5396 11.1942 14.5714 11.1071 14.5714H10.4643C10.3772 14.5714 10.3019 14.5396 10.2383 14.476C10.1747 14.4124 10.1429 14.3371 10.1429 14.25V13.6071C10.1429 13.5201 10.1747 13.4448 10.2383 13.3811C10.3019 13.3175 10.3772 13.2857 10.4643 13.2857H11.1071C11.1942 13.2857 11.2695 13.3175 11.3331 13.3811C11.3968 13.4448 11.4286 13.5201 11.4286 13.6071ZM8.85714 11.0357V11.6786C8.85714 11.7656 8.82533 11.841 8.76172 11.9046C8.6981 11.9682 8.62277 12 8.53571 12H7.89286C7.8058 12 7.73047 11.9682 7.66685 11.9046C7.60324 11.841 7.57143 11.7656 7.57143 11.6786V11.0357C7.57143 10.9487 7.60324 10.8733 7.66685 10.8097C7.73047 10.7461 7.8058 10.7143 7.89286 10.7143H8.53571C8.62277 10.7143 8.6981 10.7461 8.76172 10.8097C8.82533 10.8733 8.85714 10.9487 8.85714 11.0357ZM16.5714 16.1786V16.8214C16.5714 16.9085 16.5396 16.9838 16.476 17.0474C16.4124 17.111 16.3371 17.1429 16.25 17.1429H15.6071C15.5201 17.1429 15.4448 17.111 15.3811 17.0474C15.3175 16.9838 15.2857 16.9085 15.2857 16.8214V16.1786C15.2857 16.0915 15.3175 16.0162 15.3811 15.9526C15.4448 15.889 15.5201 15.8571 15.6071 15.8571H16.25C16.3371 15.8571 16.4124 15.889 16.476 15.9526C16.5396 16.0162 16.5714 16.0915 16.5714 16.1786ZM14 13.6071V14.25C14 14.3371 13.9682 14.4124 13.9046 14.476C13.841 14.5396 13.7656 14.5714 13.6786 14.5714H13.0357C12.9487 14.5714 12.8733 14.5396 12.8097 14.476C12.7461 14.4124 12.7143 14.3371 12.7143 14.25V13.6071C12.7143 13.5201 12.7461 13.4448 12.8097 13.3811C12.8733 13.3175 12.9487 13.2857 13.0357 13.2857H13.6786C13.7656 13.2857 13.841 13.3175 13.9046 13.3811C13.9682 13.4448 14 13.5201 14 13.6071ZM11.4286 11.0357V11.6786C11.4286 11.7656 11.3968 11.841 11.3331 11.9046C11.2695 11.9682 11.1942 12 11.1071 12H10.4643C10.3772 12 10.3019 11.9682 10.2383 11.9046C10.1747 11.841 10.1429 11.7656 10.1429 11.6786V11.0357C10.1429 10.9487 10.1747 10.8733 10.2383 10.8097C10.3019 10.7461 10.3772 10.7143 10.4643 10.7143H11.1071C11.1942 10.7143 11.2695 10.7461 11.3331 10.8097C11.3968 10.8733 11.4286 10.9487 11.4286 11.0357ZM16.5714 13.6071V14.25C16.5714 14.3371 16.5396 14.4124 16.476 14.476C16.4124 14.5396 16.3371 14.5714 16.25 14.5714H15.6071C15.5201 14.5714 15.4448 14.5396 15.3811 14.476C15.3175 14.4124 15.2857 14.3371 15.2857 14.25V13.6071C15.2857 13.5201 15.3175 13.4448 15.3811 13.3811C15.4448 13.3175 15.5201 13.2857 15.6071 13.2857H16.25C16.3371 13.2857 16.4124 13.3175 16.476 13.3811C16.5396 13.4448 16.5714 13.5201 16.5714 13.6071ZM14 11.0357V11.6786C14 11.7656 13.9682 11.841 13.9046 11.9046C13.841 11.9682 13.7656 12 13.6786 12H13.0357C12.9487 12 12.8733 11.9682 12.8097 11.9046C12.7461 11.841 12.7143 11.7656 12.7143 11.6786V11.0357C12.7143 10.9487 12.7461 10.8733 12.8097 10.8097C12.8733 10.7461 12.9487 10.7143 13.0357 10.7143H13.6786C13.7656 10.7143 13.841 10.7461 13.9046 10.8097C13.9682 10.8733 14 10.9487 14 11.0357ZM16.5714 11.0357V11.6786C16.5714 11.7656 16.5396 11.841 16.476 11.9046C16.4124 11.9682 16.3371 12 16.25 12H15.6071C15.5201 12 15.4448 11.9682 15.3811 11.9046C15.3175 11.841 15.2857 11.7656 15.2857 11.6786V11.0357C15.2857 10.9487 15.3175 10.8733 15.3811 10.8097C15.4448 10.7461 15.5201 10.7143 15.6071 10.7143H16.25C16.3371 10.7143 16.4124 10.7461 16.476 10.8097C16.5396 10.8733 16.5714 10.9487 16.5714 11.0357ZM14 19.7143H17.8571V8.14286H15.2857V8.46429C15.2857 8.73214 15.192 8.95982 15.0045 9.14732C14.817 9.33482 14.5893 9.42857 14.3214 9.42857H9.82143C9.55357 9.42857 9.32589 9.33482 9.13839 9.14732C8.95089 8.95982 8.85714 8.73214 8.85714 8.46429V8.14286H6.28571V19.7143H10.1429V17.4643C10.1429 17.3772 10.1747 17.3019 10.2383 17.2383C10.3019 17.1747 10.3772 17.1429 10.4643 17.1429H13.6786C13.7656 17.1429 13.841 17.1747 13.9046 17.2383C13.9682 17.3019 14 17.3772 14 17.4643V19.7143ZM14 7.82143V4.60714C14 4.52009 13.9682 4.44475 13.9046 4.38114C13.841 4.31752 13.7656 4.28571 13.6786 4.28571H13.0357C12.9487 4.28571 12.8733 4.31752 12.8097 4.38114C12.7461 4.44475 12.7143 4.52009 12.7143 4.60714V5.57143H11.4286V4.60714C11.4286 4.52009 11.3968 4.44475 11.3331 4.38114C11.2695 4.31752 11.1942 4.28571 11.1071 4.28571H10.4643C10.3772 4.28571 10.3019 4.31752 10.2383 4.38114C10.1747 4.44475 10.1429 4.52009 10.1429 4.60714V7.82143C10.1429 7.90848 10.1747 7.98382 10.2383 8.04743C10.3019 8.11105 10.3772 8.14286 10.4643 8.14286H11.1071C11.1942 8.14286 11.2695 8.11105 11.3331 8.04743C11.3968 7.98382 11.4286 7.90848 11.4286 7.82143V6.85714H12.7143V7.82143C12.7143 7.90848 12.7461 7.98382 12.8097 8.04743C12.8733 8.11105 12.9487 8.14286 13.0357 8.14286H13.6786C13.7656 8.14286 13.841 8.11105 13.9046 8.04743C13.9682 7.98382 14 7.90848 14 7.82143ZM19.1429 7.5V20.3571C19.1429 20.5312 19.0792 20.6819 18.952 20.8092C18.8248 20.9364 18.6741 21 18.5 21H5.64286C5.46875 21 5.31808 20.9364 5.19085 20.8092C5.06362 20.6819 5 20.5312 5 20.3571V7.5C5 7.32589 5.06362 7.17522 5.19085 7.04799C5.31808 6.92076 5.46875 6.85714 5.64286 6.85714H8.85714V3.96429C8.85714 3.69643 8.95089 3.46875 9.13839 3.28125C9.32589 3.09375 9.55357 3 9.82143 3H14.3214C14.5893 3 14.817 3.09375 15.0045 3.28125C15.192 3.46875 15.2857 3.69643 15.2857 3.96429V6.85714H18.5C18.6741 6.85714 18.8248 6.92076 18.952 7.04799C19.0792 7.17522 19.1429 7.32589 19.1429 7.5Z"
                    fill="black"
                    fillOpacity="0.5"
                  />
                </svg>
              }
            />
            {touched.email && errors.email && (
              <div className="mt-1 text-base font-semibold text-red-500">
                {errors.email}
              </div>
            )}
            <Button
              disabled={!isValid || isSubmitting}
              className="mt-6"
              type="submit"
            >
              {!loading ? (
                "Sign Wallet and Login"
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
          </Form>
        </>
      )}
    </Formik>
  );
};

export default Auth;
