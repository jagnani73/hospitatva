import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";

import { Hospital } from "../../components/hospital";
import { COMMODITIES } from "../../utils/constants";
import { HospitalProps } from "../../utils/interfaces/hospital";

const HomePage: NextPage<HospitalProps> = (hospital) => {
  return (
    <>
      <Hospital {...hospital} />
    </>
  );
};

export default HomePage;

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<HospitalProps>
> {
  const { contract_address } = query;

  return {
    props: {
      specialists: [""],
      contract_address: "Labore",
      name: "Appaulo",
      address: ["12/7", "ABC Street", "Navi Mumbai"],
      commodities: [
        {
          count: 100,
          in_use: 58,
          name: COMMODITIES.BEDS,
          price: 6000,
        },
      ],
    },
  };
}
