export interface ManageControlProps {
  onEdit: () => void;
  onAdd: () => void;
  onDelete: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export interface InventoyItem {
  id: number;
  name: string;
  total: number;
  available: number;
  cost: number;
}
