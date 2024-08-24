import React from "react";
import Modal from "./Modal";

interface ModalHandlerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: any) => void;
  activeService: string | null;
  defaultPerUnitCost: number | undefined;
}

const ModalHandler: React.FC<ModalHandlerProps> = ({
  isOpen,
  onClose,
  onSave,
  activeService,
  defaultPerUnitCost,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      fields={
        activeService === "Maid"
          ? [
              { label: "Date", name: "date", type: "date" },
              {
                label: "Shift",
                name: "shift",
                type: "select",
                options: ["Both", "Morning", "Evening"],
              },
            ]
          : [
              { label: "Date", name: "date", type: "date" },
              { label: "Quantity", name: "quantity", type: "text" },
              {
                label: "Per Unit Cost",
                name: "perUnitCost",
                type: "number",
                defaultValue: defaultPerUnitCost,
              },
            ]
      }
    />
  );
};

export default ModalHandler;
