import type { GetServerSidePropsResult, NextPage } from "next";

import { Manage } from "../components/manage";
import { dummyInventory } from "../utils/dummy-data/manage";
import { InventoryProps } from "../utils/interfaces/manage";

const ManagePage: NextPage<InventoryProps> = ({ items }) => {
  return (
    <>
      <Manage items={items} />
    </>
  );
};

export default ManagePage;

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<InventoryProps>
> {
  return {
    props: {
      items: dummyInventory,
    },
  };
}
