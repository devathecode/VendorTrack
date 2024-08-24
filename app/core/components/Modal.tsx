import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: any) => void;
  fields: {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    options?: string[];
    defaultValue?: any;
  }[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, fields }) => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newData: any = {};
    formData.forEach((value, key) => {
      newData[key] = value;
    });
    onSave(newData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Record</h2>
        <form onSubmit={handleSave} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="font-semibold mb-1">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select {field.label}
                  </option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  defaultValue={field.defaultValue}
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
