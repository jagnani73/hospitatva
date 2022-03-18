import { COMMODITIES } from "../constants";
import { InventoryItem } from "../interfaces/manage";

export const dummyInventory: InventoryItem[] = [
  {
    id: 1,
    name: COMMODITIES.E_SEMI_FOWLER_BED,
    total: 10,
    available: 6,
    cost: 460000,
  },
  { id: 2, name: COMMODITIES.GATCH_BED, total: 15, available: 2, cost: 145000 },
  {
    id: 3,
    name: COMMODITIES.OXYGEN_CYLINDERS_40L,
    total: 8,
    available: 8,
    cost: 6969000,
  },
  {
    id: 4,
    name: COMMODITIES.OXYGEN_CYLINDERS_20L,
    total: 12,
    available: 10,
    cost: 5230000,
  },
];
