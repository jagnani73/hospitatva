import { useState } from "react";
import { Auth, Inventory } from "./";

const Manage = () => {
  const [walletId, setWalletId] = useState<string>("lahsun");

  return <>{!walletId ? <Auth /> : <Inventory />}</>;
};

export default Manage;
