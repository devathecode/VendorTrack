import React, { useRef } from "react";

import { ServiceData } from "core/model/model";
import { formatDate } from "shared/utils";
import PrintHandler from "../PrintHandler";

interface ServiceTableProps {
  service: ServiceData;
  index: number;
  onOpenModal: (serviceName: string) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  service,
  index,
  onOpenModal,
}) => {
  const printableRef = useRef<HTMLDivElement>(null);
  const getShiftCount = (entry: any) => (entry.shift === "Both" ? 2 : 1);
  let totalCost = 0;
  if (service.quantity) {
    totalCost = service.quantity.reduce(
      (sum, entry) => sum + entry.quantity * entry.perUnitCost,
      0
    );
  } else {
    if (service.shift) {
      totalCost = service.shift.reduce(
        (sum, entry) => sum + getShiftCount(entry) * entry.perShiftCost,
        0
      );
    }
  }

  return (
    <div
      ref={printableRef}
      className="overflow-x-auto bg-white p-4 rounded-md shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{service.serviceName}</h2>
        <div className="flex space-x-2">
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => onOpenModal(service.serviceName)}
            title="Add a new record"
          >
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Add Record
            </span>
          </button>
          <PrintHandler index={index} printableRef={printableRef} />
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          {service.quantity ? (
            <tr>
              <th className="px-4 py-2 border-b border-gray-200">Date</th>
              <th className="px-4 py-2 border-b border-gray-200">
                Quantity{" "}
                {service.serviceName === "Milkman" ? "(liters)" : "(units)"}
              </th>
              <th className="px-4 py-2 border-b border-gray-200">
                Per Unit Cost (₹)
              </th>
              <th className="px-4 py-2 border-b border-gray-200">
                Total Cost (₹)
              </th>
            </tr>
          ) : (
            <tr>
              <th className="px-4 py-2 border-b border-gray-200">Date</th>
              <th className="px-4 py-2 border-b border-gray-200">Shift</th>
              <th className="px-4 py-2 border-b border-gray-200">
                Per Shift Cost (₹)
              </th>
              <th className="px-4 py-2 border-b border-gray-200">
                Total Cost (₹)
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {service.quantity ? (
            <>
              {service.quantity.map((entry, idx) => (
                <tr
                  key={idx}
                  className={`text-center ${
                    entry.quantity === 0 ? "bg-red-100" : ""
                  } hover:bg-gray-50`}
                >
                  <td className="px-4 py-2 border-b border-gray-200">
                    {formatDate(entry.date)}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {entry.quantity}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {entry.perUnitCost}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {entry.quantity * entry.perUnitCost}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            service.shift?.map((entry, idx) => (
              <tr
                key={idx}
                className={`text-center ${
                  entry.shift !== "Both" ? "bg-red-100" : ""
                } hover:bg-gray-50`}
              >
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.date}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.shift}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {entry.perShiftCost}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {getShiftCount(entry) * entry.perShiftCost}
                </td>
              </tr>
            ))
          )}
          <tr className="text-center bg-gray-100">
            <td colSpan={3} className="px-4 py-2 font-bold text-right">
              Total:
            </td>
            <td className="px-4 py-2 font-bold border-b border-gray-200">
              {totalCost}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
