import type { GetServerSidePropsResult, NextPage } from "next";

import { Monitor } from "../components/monitor";
import { dummyTickets } from "../utils/dummy-data/admin";
import { MonitorProps } from "../utils/interfaces/monitor";

const AdminPage: NextPage<MonitorProps> = ({ activeTickets }) => {
  return (
    <>
      <Monitor activeTickets={activeTickets} />
    </>
  );
};

export default AdminPage;

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<MonitorProps>
> {
  return {
    props: {
      activeTickets: dummyTickets,
    },
  };
}
