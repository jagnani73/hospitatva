import type { GetServerSidePropsResult, NextPage } from "next";

import { Home } from "../components/home";
import { getHospitals } from "../services/rest";
import { Hospitals } from "../utils/dummy-data/home";
import { HomeProps } from "../utils/interfaces/home";

const HomePage: NextPage<HomeProps> = ({ hospitals }) => {
  return (
    <>
      <Home hospitals={hospitals} />
    </>
  );
};

export default HomePage;

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<HomeProps>
> {
  try {
    const newHospitals = await getHospitals();

    return {
      props: {
        hospitals: [...newHospitals, ...Hospitals],
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
