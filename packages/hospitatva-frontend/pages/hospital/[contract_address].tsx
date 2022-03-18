import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";

import { Hospital } from "../../components/hospital";
import { DetailedHospitals } from "../../utils/dummy-data/home";
import { HospitalProps } from "../../utils/interfaces/hospital";

const HospitalPage: NextPage<HospitalProps> = (hospital) => {
  return (
    <>
      <Hospital {...hospital} />
    </>
  );
};

export default HospitalPage;

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<HospitalProps>
> {
  const { contract_address } = query;

  return {
    props: DetailedHospitals.find(
      (hospital) => hospital.contract_address === contract_address
    )!,
  };
}
