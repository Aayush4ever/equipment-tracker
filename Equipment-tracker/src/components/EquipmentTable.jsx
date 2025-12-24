export default function EquipmentTable({ data, onEdit, onDelete, onSort, sortConfig }) {
    const renderArrow = (key) =>
      sortConfig.key === key ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : "";
  
    return (
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {[
                { label: "Name", key: "name" },
                { label: "Type", key: "type" },
                { label: "Status", key: "status" },
                { label: "Last Cleaned", key: "lastCleanedDate" },
              ].map(col => (
                <th
                  key={col.key}
                  onClick={() => onSort(col.key)}
                  className="p-3 text-left cursor-pointer hover:bg-gray-200"
                >
                  {col.label}{renderArrow(col.key)}
                </th>
              ))}
              <th className="p-3">Actions</th>
            </tr>
          </thead>
  
          <tbody>
            {data.map(e => (
              <tr key={e.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{e.name}</td>
                <td className="p-3">{e.type}</td>
                <td className="p-3">{e.status}</td>
                <td className="p-3">{e.lastCleanedDate}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => onEdit(e)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(e.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  