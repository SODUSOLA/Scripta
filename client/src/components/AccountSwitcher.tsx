import { useState } from "react";

const accounts = ["Brand A", "Brand B", "Brand C"];

export default function AccountSwitcher() {
  const [selected, setSelected] = useState(accounts[0]);
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold mb-2 text-blue-600">
        Switch Account
      </label>
      <select
        className="border rounded px-3 py-2"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {accounts.map((acc) => (
          <option key={acc}>{acc}</option>
        ))}
      </select>
    </div>
  );
}
