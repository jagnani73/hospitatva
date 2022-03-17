import { COMMODITIES } from "../constants";
import { InventoyItem } from "../interfaces/manage";

export const dummyInventory: InventoyItem[] = [
  { id: 1, name: COMMODITIES.BEDS, total: 10, available: 6, cost: 460000 },
  { id: 2, name: COMMODITIES.FLUIDS, total: 15, available: 2, cost: 145000 },
  {
    id: 3,
    name: COMMODITIES.OXYGEN_CYLINDERS,
    total: 8,
    available: 8,
    cost: 6969000,
  },
  {
    id: 4,
    name: COMMODITIES.VENTILATORS,
    total: 12,
    available: 10,
    cost: 5230000,
  },
];
