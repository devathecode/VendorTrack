import React, { useState } from "react";
import ServiceTable from "./ServiceTable";
import { ServiceData } from "core/model/model";
import useLocalStorage from "@hooks/useLocalStorage";
import { serviceData } from "shared/data";
import { getMostFrequentPerUnitCost, getService } from "shared/utils";
import ModalHandler from "../ModalHandler";

interface DataTableProps {
  data: ServiceData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [storageData, setStorageData] = useLocalStorage("myData", serviceData);
  const [services, setServices] = useState<ServiceData[]>(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [defaultPerUnitCost, setDefaultPerUnitCost] = useState<
    number | undefined
  >(undefined);

  const openModal = (serviceName: string) => {
    setActiveService(serviceName);
    setIsModalOpen(true);
    const mostFrequentCost = getMostFrequentPerUnitCost(services, serviceName);
    setDefaultPerUnitCost(mostFrequentCost);
  };

  const closeModal = () => {
    setActiveService(null);
    setIsModalOpen(false);
    setDefaultPerUnitCost(undefined);
  };

  const handleAddRow = (newData: any) => {
    if (!activeService) return;
    setServices((prevServices) =>
      prevServices.map((service) => {
        if (service.serviceName === activeService) {
          const updatedService = getService(service, newData);

          setStorageData([
            ...prevServices.filter((s) => s.serviceName !== activeService),
            updatedService,
          ]);
          return updatedService;
        }
        return service;
      })
    );
    closeModal();
  };

  return (
    <div className="space-y-8 p-4 bg-gray-50 rounded-md shadow-lg">
      {services.map((service, index) => (
        <ServiceTable
          key={service.serviceName}
          service={service}
          index={index}
          onOpenModal={openModal}
        />
      ))}
      <ModalHandler
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleAddRow}
        activeService={activeService}
        defaultPerUnitCost={defaultPerUnitCost}
      />
    </div>
  );
};

export default DataTable;
