import { useEffect, useState } from "react";
import { ManageProps } from "../../utils/interfaces/manage";
import { Auth, Inventory } from "./";

const Manage = ({ items }: ManageProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    setWalletAddress(sessionStorage.getItem("walletAddress") ?? null);
  }, []);

  return (
    <>
      {!walletAddress ? (
        <Auth setWalletAddress={setWalletAddress} />
      ) : (
        <Inventory items={items} setWalletAddress={setWalletAddress} />
      )}
    </>
  );
};

export default Manage;
