import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import "mapbox-gl/dist/mapbox-gl.css";

const HomePage: NextPage = () => {
  return <></>;
};

export default HomePage;

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  const { contract_address } = query;

  return {
    props: {},
  };
}
