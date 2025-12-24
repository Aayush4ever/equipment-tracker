import { useState, useEffect } from "react";

const initialState = {
  name: "",
  type: "",
  status: "",
  lastCleanedDate: ""
};

export default function EquipmentForm({ onSave, editing }) {
  const [form, setForm] = useState(initialState);

  // Populate form when editing
  useEffect(() => {
    if (editing) setForm(editing);
    else setForm(initialState); // CLEAR when editing is null
  }, [editing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.status || !form.lastCleanedDate) {
      alert("All fields are required");
      return;
    }

    onSave(form);
    setForm(initialState); // CLEAR FORM AFTER SUBMIT
  };

  return (
    <form className="bg-white p-6 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-5 gap-4" onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Equipment Name"
        className="border px-3 py-2 rounded"
      />

      <select name="type" value={form.type} onChange={handleChange} className="border px-3 py-2 rounded">
        <option value="">Type</option>
        <option>Machine</option>
        <option>Vessel</option>
        <option>Tank</option>
        <option>Mixer</option>
      </select>

      <select name="status" value={form.status} onChange={handleChange} className="border px-3 py-2 rounded">
        <option value="">Status</option>
        <option>Active</option>
        <option>Inactive</option>
        <option>Under Maintenance</option>
      </select>

      <input
        type="date"
        name="lastCleanedDate"
        value={form.lastCleanedDate}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
      />

      <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
        {editing ? "Update" : "Add"}
      </button>
    </form>
  );
}
