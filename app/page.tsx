"use client";
import useLocalStorage from "@hooks/useLocalStorage";
import DataTable from "core/components/table/DataTable";
import { serviceData } from "shared/data";
import { sortedData } from "shared/utils";

export default function Home() {
  const [data, setData] = useLocalStorage("myData", serviceData);
  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded shadow-lg mb-8">
          <h1 className="text-4xl font-bold mb-4">Service Data</h1>
          {/* <img
            src="https://example.com/your-header-image.jpg"
            alt="Header"
            className="w-full h-40 object-cover rounded mb-6"
          /> */}
          <DataTable data={sortedData(data)} />
        </div>
      </div>
    </main>
  );
}
