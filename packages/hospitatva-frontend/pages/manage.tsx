import type { GetServerSidePropsResult, NextPage } from "next";

import { Manage } from "../components/manage";
import { dummyInventory } from "../utils/dummy-data/manage";
import { ManageProps } from "../utils/interfaces/manage";

const ManagePage: NextPage<ManageProps> = ({ items }) => {
  return (
    <>
      <Manage items={items} />
    </>
  );
};

export default ManagePage;

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<ManageProps>
> {
  return {
    props: {
      items: dummyInventory,
    },
  };
}
