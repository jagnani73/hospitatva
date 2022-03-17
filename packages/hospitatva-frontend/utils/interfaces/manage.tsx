export interface ManageControlProps {
  onEdit: () => void;
  onAdd: () => void;
  onDelete: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
}
