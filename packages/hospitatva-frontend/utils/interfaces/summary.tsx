export interface SummaryProps {
  paid: boolean;
  summary_id: string;
  date: string;
  patient: {
    name: string;
    age: number;
    sex: string;
    address: string;
    number: number;
    email: string;
  };
  doctor: {
    name: string;
    hospital: string;
    specialty: string;
    address: [string, string, string];
    number: number;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}
