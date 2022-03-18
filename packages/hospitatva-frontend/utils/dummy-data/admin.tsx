import { COMMODITIES } from "../constants";
import { Ticket } from "../interfaces/monitor";

export const dummyTickets: Ticket[] = [
  {
    id: 1,
    doctorName: "Dr. Jagnani",
    hospitalName: "Apollo",
    commodityName: COMMODITIES.E_SEMI_FOWLER_BED,
    address: ["12/7", "ABC Street", "Navi Mumbai"],
    flaggedPrice: 1400000,
    predictivePrice: 800000,
  },
  {
    id: 2,
    doctorName: "Dr. Paul",
    hospitalName: "Ford",
    commodityName: COMMODITIES.OXYGEN_CYLINDERS_20L,
    address: ["12/7", "ABC Street", "Navi Mumbai"],
    flaggedPrice: 5000000,
    predictivePrice: 2300000,
  },
];
