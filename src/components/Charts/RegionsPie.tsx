import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import type { Country } from '../../types';

export default function RegionsPie({items}:{items:Country[]}) {
  const data = Object.entries(items.reduce<Record<string,number>>((acc,c)=>{
    acc[c.region || 'Otra'] = (acc[c.region || 'Otra'] ?? 0) + 1;
    return acc;
  }, {})).map(([name, value]) => ({name, value}));

  return (
    <div className="card chart-card" style={{padding:16}}>
      <h3>Países por región</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={140} />
          <Tooltip />
          <Legend />
          {/* sin colores custom para mantener neutral */}
          {data.map((_, i) => <Cell key={i} />)}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
