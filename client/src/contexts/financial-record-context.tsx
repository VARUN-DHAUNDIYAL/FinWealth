import React, { createContext, useContext, useState } from "react";

// Define the FinancialRecord interface
interface FinancialRecord {
  id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

// Define the FinancialRecordsContextType interface
interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  // updateRecord: (id: string, newRecord: FinancialRecord) => void;
  // deleteRecord: (id: string) => void;
}

// Create the FinancialRecordsContext
export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

// Define the FinancialRecordProvider component
export const FinancialRecordProvider = ({ children }: { children: React.ReactNode }) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);

  const addRecord = async (record: FinancialRecord) => {
    try {
      const response = await fetch("http://localhost:3001/financial-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {
      console.error("Failed to add record:", err);
    }
  };

  return (
    <FinancialRecordsContext.Provider value={{ records, addRecord }}>
      {children}
    </FinancialRecordsContext.Provider>
  );
};

// Custom hook to use the FinancialRecordsContext
export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordsContext);
  if (!context) {
    throw new Error("useFinancialRecords must be used within a FinancialRecordProvider");
  }
  return context;
};
