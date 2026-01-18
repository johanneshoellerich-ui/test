import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AssetAllocation } from '../types';
import { ASSET_CLASS_NAMES, ASSET_CLASS_COLORS } from '../data/assetAllocation';

interface AllocationChartProps {
  allocation: AssetAllocation;
  title: string;
}

export const AllocationChart = ({ allocation, title }: AllocationChartProps) => {
  const data = Object.entries(allocation)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => ({
      name: ASSET_CLASS_NAMES[key as keyof AssetAllocation],
      value,
      color: ASSET_CLASS_COLORS[key as keyof AssetAllocation],
    }));

  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
