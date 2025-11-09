import React from "react";

const bgColorMap = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-green-50 text-green-700",
  red: "bg-red-50 text-red-700",
  purple: "bg-purple-50 text-purple-700",
};

export const MetricCard = ({ title, value, icon, bg }) => {
  const color = bgColorMap[bg] || bgColorMap.blue;
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-2xl`}>
        {icon}
      </div>
    </div>
  );
};

export const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export const CustomPieChart = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;

  const slices = data.map((d, i) => {
    const startAngle = (cumulative / total) * 2 * Math.PI;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 2 * Math.PI;
    const largeArc = d.value / total > 0.5 ? 1 : 0;

    const x1 = 100 + 80 * Math.cos(startAngle);
    const y1 = 100 + 80 * Math.sin(startAngle);
    const x2 = 100 + 80 * Math.cos(endAngle);
    const y2 = 100 + 80 * Math.sin(endAngle);

    const pathData = `M100,100 L${x1},${y1} A80,80 0 ${largeArc} 1 ${x2},${y2} Z`;

    return <path key={i} d={pathData} fill={d.color} stroke="white" strokeWidth="2" />;
  });

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
      {slices}
      <circle cx="100" cy="100" r="40" fill="white" />
    </svg>
  );
};

export const CustomBarChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center space-x-3">
          <span className="w-24 text-sm text-gray-600 truncate">{d.name}</span>
          <div className="flex-1 bg-gray-200 h-5 rounded-full">
            <div
              className="bg-blue-500 h-5 rounded-full text-white text-xs flex justify-end pr-2 items-center"
              style={{ width: `${(d.value / max) * 100}%` }}
            >
              {d.value}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Legend = ({ items }) => (
  <div className="mt-4 space-y-2 text-sm">
    {items.map((d, i) => (
      <div key={i} className="flex justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
          <span>{d.name}</span>
        </div>
        <span>{d.value}</span>
      </div>
    ))}
  </div>
);

