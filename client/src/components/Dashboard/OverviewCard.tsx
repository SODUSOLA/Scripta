import type { ReactNode } from "react";

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

const OverviewCard = ({ title, value, icon }: OverviewCardProps) => {
  return (
    <div className="bg-white border rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
      {icon && <span className="text-blue-600 text-3xl">{icon}</span>}
      <div>
        <div className="text-lg font-bold text-gray-900">{title}</div>
        <div className="text-2xl text-blue-600 font-extrabold">{value}</div>
      </div>
    </div>
  );
};

export default OverviewCard;
