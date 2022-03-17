import { useEffect, useState } from "react";
import { ManageProps } from "../../utils/interfaces/manage";
import { Auth, Inventory } from "./";

const Manage = ({ items }: ManageProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>("null");

  return (
    <>
      {!walletAddress ? (
        <Auth setWalletAddress={setWalletAddress} />
      ) : (
        <Inventory items={items} />
      )}
    </>
  );
};

export default Manage;
