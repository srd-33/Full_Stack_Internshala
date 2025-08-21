import React, { useEffect, useState } from "react";
import axios from "axios";

const Records = () => {
  const [recordsData, setRecordsData] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard");
        setRecordsData(res.data);
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    };
    fetchRecords();
  }, []);

  if (!recordsData) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Distributed Records</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recordsData.recordsPerAgent.map((agentBlock) => (
          <div
            key={agentBlock._id}
            className="bg-white shadow rounded-xl p-4 border"
          >
            <h2 className="text-lg font-semibold mb-2">
              {agentBlock.agent?.name || "Unassigned"}{" "}
              <span className="text-gray-500">
                ({agentBlock.count} items)
              </span>
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {agentBlock.agent?.email}
            </p>

            <table className="w-full text-sm border-t">
              <thead>
                <tr className="text-left">
                  <th className="py-1">Record ID</th>
                  <th className="py-1">Uploaded At</th>
                </tr>
              </thead>
              <tbody>
                {agentBlock.records.map((rec) => (
                  <tr key={rec._id} className="border-t">
                    <td className="py-1">{rec._id}</td>
                    <td className="py-1">
                      {new Date(rec.uploadedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Records;
