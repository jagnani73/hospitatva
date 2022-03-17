export interface ManageControlProps {
  onEdit: () => void;
  onAdd: () => void;
  onDelete: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export interface InventoryItem {
  id: number;
  name: string;
  total: number;
  available: number;
  cost: number;
}

export interface InventoryProps {
  items: InventoryItem[];
}

export interface AuthProps {
  setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ManageProps {
  items: InventoryItem[];
}
