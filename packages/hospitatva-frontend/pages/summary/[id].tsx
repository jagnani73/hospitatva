import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";

import { Summary } from "../../components/summary";
import { SummaryProps } from "../../utils/interfaces/summary";

const SummaryPage: NextPage<SummaryProps> = (summary: SummaryProps) => {
  return (
    <>
      <Summary {...summary} />
    </>
  );
};

export default SummaryPage;

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<SummaryProps>> {
  const { id } = query;

  return {
    props: {
      paid: false,
      summary_id: "ABCD1234",
      date: Date.now().toString(),
      patient: {
        name: "Snehil",
        email: "gizmoclardin@gmail.com",
        sex: "Male",
        age: 22,
        address: "Estancia 1234, Chennai, TN, India",
        number: 9999999999,
      },
      doctor: {
        name: "Yashvardhan Jagnani",
        specialty: "Cardiologist",
        hospital: "Apaulo Aspataal",
        address: ["12/24", "Abode", "SRMIST"],
        number: 9999999999,
      },
      items: [
        {
          name: "Commodity One",
          price: 400,
          projectedPrice: 400,
          quantity: 9,
        },
        {
          name: "Commodity Two",
          price: 60,
          projectedPrice: 20,
          quantity: 1,
        },
        {
          name: "Commodity Three",
          price: 20,
          projectedPrice: 40,
          quantity: 100,
        },
        {
          name: "Commodity Four",
          price: 1,
          projectedPrice: 37,
          quantity: 90,
        },
      ],
    },
  };
}
