import { useEffect, useState } from "react";
import { MonitorProps } from "../../utils/interfaces/monitor";
import { Auth, Tickets } from "./";

const Monitor = ({ activeTickets }: MonitorProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>("lahsun");

  useEffect(() => {
    setWalletAddress(sessionStorage.getItem("walletAddress") ?? null);
  }, []);

  console.log(walletAddress);

  return (
    <>
      {!walletAddress ? (
        <Auth setWalletAddress={setWalletAddress} />
      ) : (
        <Tickets
          activeTickets={activeTickets}
          setWalletAddress={setWalletAddress}
        />
      )}
    </>
  );
};

export default Monitor;
