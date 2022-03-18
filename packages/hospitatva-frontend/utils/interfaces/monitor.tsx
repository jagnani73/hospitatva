export interface Ticket {
  id: number;
  hospitalName: string;
  commodityName: string;
  doctorName: string;
  address: [string, string, string];
  predictivePrice: number;
  flaggedPrice: number;
}

export interface MonitorProps {
  activeTickets: Ticket[];
}
