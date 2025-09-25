import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { Country } from '../../types';

export default function Top10PopulationBar({items}:{items:Country[]}) {
  const top = items
    .slice()
    .sort((a,b)=>b.population-a.population)
    .slice(0,10)
    .map(c=>({ name: c.name.common, population: c.population }));

  return (
    <div className="card chart-card" style={{padding:16}}>
      <h3>Top 10 países por población</h3>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={top} margin={{left:20, right:20, bottom:40}}>
          <CartesianGrid vertical={false}/>
          <XAxis dataKey="name" interval={0} tick={{fontSize:12}} angle={-30} textAnchor="end"/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="population" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
