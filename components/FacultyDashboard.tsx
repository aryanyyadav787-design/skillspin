import React from 'react';
import { SpinCard } from './SpinCard';
import { MOCK_CURRICULUM } from '../constants';
import { BookOpen, Users, AlertTriangle } from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Curriculum Health</h1>
      
      {/* US-15: Curriculum Mapping & Risk View */}
      <SpinCard title="Topic Risk Analysis" subtitle="Curriculum vs Student Performance" variant="yellow">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-yellow-200">
                        <th className="pb-4 pt-2 font-bold text-gray-600 pl-4">Topic</th>
                        <th className="pb-4 pt-2 font-bold text-gray-600">Mapped Skill</th>
                        <th className="pb-4 pt-2 font-bold text-gray-600">At-Risk Students</th>
                        <th className="pb-4 pt-2 font-bold text-gray-600">Action</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {MOCK_CURRICULUM.map(topic => (
                        <tr key={topic.id} className="hover:bg-yellow-50/50 transition-colors group border-b border-gray-50 last:border-0">
                            <td className="py-4 pl-4 font-bold text-gray-800 flex items-center gap-2">
                                <BookOpen size={16} className="text-yellow-500"/>
                                {topic.topicName}
                            </td>
                            <td className="py-4 text-gray-500 font-medium">Skill ID: {topic.mappedSkillId}</td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-24 bg-gray-100 rounded-full h-2">
                                        <div 
                                            className="bg-red-400 h-2 rounded-full" 
                                            style={{width: `${Math.min(topic.atRiskCount * 5, 100)}%`}}
                                        ></div>
                                    </div>
                                    <span className="font-bold text-red-500">{topic.atRiskCount}</span>
                                </div>
                            </td>
                            <td className="py-4">
                                <button className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
                                    Notify <Users size={14}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-6 bg-yellow-50 p-4 rounded-xl flex gap-3 items-start">
            <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
            <div>
                <h4 className="font-bold text-yellow-800 text-sm">Insight</h4>
                <p className="text-xs text-yellow-700 mt-1">
                    "Graph Algorithms" has the highest decay rate this month. Consider scheduling a refresher session for the batch before next week's placement drive.
                </p>
            </div>
        </div>
      </SpinCard>
    </div>
  );
};
