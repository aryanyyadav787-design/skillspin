import React from 'react';
import { SpinCard } from './SpinCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Briefcase, TrendingDown, CheckCircle, AlertOctagon } from 'lucide-react';

const READINESS_DATA = [
  { name: 'Ready', value: 45, color: '#4ADE80' },
  { name: 'Near Ready', value: 30, color: '#FACC15' },
  { name: 'Needs Work', value: 25, color: '#F87171' },
];

const FAILURE_DATA = [
  { skill: 'Data Structures', failures: 42 },
  { skill: 'System Design', failures: 35 },
  { skill: 'SQL', failures: 18 },
  { skill: 'React', failures: 12 },
];

export const PlacementDashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Placement Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* US-12: Readiness Dashboard (Summary Cards) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-gray-400 font-bold text-sm uppercase">Total Students</p>
             <p className="text-3xl font-black text-gray-800">1,240</p>
           </div>
           <div className="bg-blue-50 p-3 rounded-full text-blue-500"><Briefcase size={24}/></div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-gray-400 font-bold text-sm uppercase">Placed</p>
             <p className="text-3xl font-black text-gray-800">856</p>
           </div>
           <div className="bg-green-50 p-3 rounded-full text-green-500"><CheckCircle size={24}/></div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-gray-400 font-bold text-sm uppercase">At Risk</p>
             <p className="text-3xl font-black text-gray-800">145</p>
           </div>
           <div className="bg-red-50 p-3 rounded-full text-red-500"><TrendingDown size={24}/></div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-gray-400 font-bold text-sm uppercase">Avg Readiness</p>
             <p className="text-3xl font-black text-gray-800">76%</p>
           </div>
           <div className="bg-purple-50 p-3 rounded-full text-purple-500"><AlertOctagon size={24}/></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* US-12: Readiness Visual */}
        <SpinCard title="Batch Readiness" variant="green" className="lg:col-span-1">
            <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={READINESS_DATA}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {READINESS_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="text-3xl font-black text-gray-800">45%</span>
                    <span className="text-xs font-bold text-gray-400 uppercase">Ready</span>
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
                {READINESS_DATA.map(d => (
                    <div key={d.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                        <span className="text-xs font-bold text-gray-500">{d.name}</span>
                    </div>
                ))}
            </div>
        </SpinCard>

        {/* US-13: Interview Failure Patterns */}
        <SpinCard title="Interview Bottlenecks" subtitle="Top skills causing rejection" variant="red" className="lg:col-span-2">
             <div className="h-64 mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={FAILURE_DATA} layout="vertical" margin={{ left: 40 }}>
                         <XAxis type="number" hide />
                         <YAxis dataKey="skill" type="category" width={100} axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontWeight: 600, fontSize: 12}} />
                         <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                         <Bar dataKey="failures" fill="#F87171" radius={[0, 4, 4, 0]} barSize={20} />
                     </BarChart>
                 </ResponsiveContainer>
             </div>
             <div className="bg-red-50 p-4 rounded-xl mt-4 flex justify-between items-center">
                 <span className="text-sm font-bold text-red-800">Action Required:</span>
                 <button className="bg-white text-red-600 px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-red-50 transition-colors border border-red-100">
                    Assign Targeted Training
                 </button>
             </div>
        </SpinCard>

        {/* US-14: Targeted Training Assignment */}
        <SpinCard title="Intervention Planner" subtitle="Assign drills to weak cohorts" variant="purple" className="lg:col-span-3">
             <div className="grid md:grid-cols-3 gap-6">
                 {['Data Structures', 'System Design', 'Communication'].map((skill) => (
                     <div key={skill} className="bg-gray-50 p-5 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-gray-100 group">
                         <div className="flex justify-between items-center mb-3">
                             <h4 className="font-bold text-gray-800">{skill}</h4>
                             <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">High Priority</span>
                         </div>
                         <p className="text-xs text-gray-500 mb-4">42 students failed interviews recently due to this skill.</p>
                         <button className="w-full bg-purple-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors opacity-90 group-hover:opacity-100">
                             Assign Bootcamp
                         </button>
                     </div>
                 ))}
             </div>
        </SpinCard>

      </div>
    </div>
  );
};
