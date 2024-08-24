interface ServiceRecord {
  date: string;
}

interface ShiftRecord extends ServiceRecord {
  shift: "Morning" | "Evening" | "Both";
  perShiftCost: number;
}

interface QuantityRecord extends ServiceRecord {
  quantity: number;
  perUnitCost: number;
}

export interface ServiceData {
  serviceName: string;
  shift?: ShiftRecord[];
  quantity?: QuantityRecord[];
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: any) => void;
  fields: Array<{ label: string; name: string; type: string }>;
}
