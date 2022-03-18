import { COMMODITIES } from "../constants";
import { Ticket } from "../interfaces/monitor";

export const dummyTickets: Ticket[] = [
  {
    id: 1,
    doctorName: "Dr. Jagnani",
    hospitalName: "Apollo",
    commodityName: COMMODITIES.BEDS,
    address: ["blah", "blah blah", "blah blah blah"],
    flaggedPrice: 1400000,
    predictivePrice: 800000,
  },
  {
    id: 2,
    doctorName: "Dr. Paul",
    hospitalName: "Ford",
    commodityName: COMMODITIES.VENTILATORS,
    address: ["blah", "blah blah", "blah blah blah"],
    flaggedPrice: 5000000,
    predictivePrice: 2300000,
  },
];
