import { ServiceData } from "core/model/model";

export const sortedData = (data: ServiceData[]) => {
  const newData = data;
  newData.sort((a: ServiceData, b: ServiceData) => {
    if (a.serviceName < b.serviceName) return -1;
    if (a.serviceName > b.serviceName) return 1;
    return 0;
  });
  return sortByDate(newData);
};

const sortByDate = (services: ServiceData[]) => {
  return services.map((service: ServiceData) => {
    // Sort quantity array if it exists
    if (service.quantity) {
      if (service.quantity.length > 0) {
        service.quantity.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      }
    }

    // Sort shift array if it exists
    if (service.shift && service.shift.length > 0) {
      service.shift.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    return service;
  });
};

export const formatDate = (dateString: string): string => {
  if (dateString !== "") {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return formatter.format(date);
  } else {
    return dateString;
  }
};

export const getMostFrequentPerUnitCost = (
  services: ServiceData[],
  serviceName: string
): number | undefined => {
  const service = services.find((s) => s.serviceName === serviceName);
  if (!service || !service.quantity) return undefined;

  const costCounts: Record<number, number> = {};

  service.quantity.forEach((entry) => {
    costCounts[entry.perUnitCost] = (costCounts[entry.perUnitCost] || 0) + 1;
  });

  let mostFrequentCost: number | undefined;
  let maxCount = 0;

  Object.entries(costCounts).forEach(([cost, count]) => {
    const numericCost = Number(cost);
    if (count > maxCount) {
      maxCount = count;
      mostFrequentCost = numericCost;
    }
  });

  return mostFrequentCost;
};

export const getService = (service: any, newData: any) => {
  if (service.quantity) {
    return {
      ...service,
      quantity: [
        ...service.quantity,
        {
          date: newData.date || "",
          quantity: parseFloat(newData.quantity) || 0,
          perUnitCost: parseFloat(newData.perUnitCost) || 0,
        },
      ],
    };
  } else if (service.shift) {
    return {
      ...service,
      shift: [
        ...service.shift,
        {
          date: newData.date || "",
          shift: newData.shift || "",
          perShiftCost: 75,
        },
      ],
    };
  }
};
