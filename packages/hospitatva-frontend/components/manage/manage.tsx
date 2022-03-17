import { useState } from "react";
import { InventoryProps } from "../../utils/interfaces/manage";
import { Auth, Inventory } from "./";

const Manage = ({ items }: InventoryProps) => {
  const [walletId, setWalletId] = useState<string>("0xABCD");

  return <>{!walletId ? <Auth /> : <Inventory items={items} />}</>;
};

export default Manage;
