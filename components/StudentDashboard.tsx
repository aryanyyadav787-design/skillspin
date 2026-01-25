import React, { useState, useEffect } from 'react';
import { SpinCard } from './SpinCard';
import { MOCK_STUDENT, MOCK_PEERS } from '../constants';
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { 
  Zap, 
  Target, 
  Activity, 
  Users, 
  MessageCircle, 
  Award, 
  BrainCircuit, 
  AlertTriangle,
  Play
} from 'lucide-react';
import { generateRecoveryPlan } from '../services/geminiService';

export const StudentDashboard: React.FC = () => {
  const [student, setStudent] = useState(MOCK_STUDENT);
  const [recoveryPlan, setRecoveryPlan] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [peers, setPeers] = useState(MOCK_PEERS);

  // US-5: Personalized Recovery Plan
  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    const weakSkills = student.skills.filter(s => s.score < 60);
    const plan = await generateRecoveryPlan(weakSkills, student.targetRole);
    setRecoveryPlan(plan);
    setIsGenerating(false);
  };

  const weakSkills = student.skills.filter(s => s.score < 60);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* US-1 & US-7: Header & Readiness Score */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Hello, {student.name} 👋</h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">Target Role: <span className="text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-full">{student.targetRole}</span></p>
        </div>
        <div className="bg-white px-8 py-4 rounded-3xl shadow-lg border border-gray-100 flex items-center gap-4">
            <div className="text-right">
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Placement Readiness</p>
                <p className="text-3xl font-black text-gray-900">{student.readinessScore}%</p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-indigo-500 flex items-center justify-center">
                <Target size={20} className="text-indigo-500" />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* US-2: Skill Health & Decay */}
        <SpinCard title="Skill Health" subtitle="Real-time decay analysis" variant="cyan" icon={<Activity size={20}/>}>
          <div className="space-y-4 mt-2">
            {student.skills.map(skill => (
              <div key={skill.id} className="group">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-gray-700">{skill.name}</span>
                  <span className={`text-sm font-semibold ${skill.decay > 50 ? 'text-red-500' : 'text-gray-400'}`}>
                    {skill.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      skill.score > 80 ? 'bg-green-400' : skill.score > 50 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
                {skill.decay > 30 && (
                   <div className="mt-1 flex items-center gap-1 text-xs text-red-400 font-medium animate-pulse">
                      <AlertTriangle size={10} /> 
                      High decay detected! Practice needed.
                   </div>
                )}
              </div>
            ))}
          </div>
        </SpinCard>

        {/* US-3: Trend Analysis */}
        <SpinCard title="Progress Trends" subtitle="Your growth over time" variant="purple" icon={<Target size={20}/>}>
           <div className="h-64 w-full mt-2 -ml-4">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={student.skills[0].trend.map((val, i) => ({ name: `W${i}`, value: val }))}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                 <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                 />
                 <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={4} dot={{r: 4, fill: '#8B5CF6'}} activeDot={{ r: 6 }} />
               </LineChart>
             </ResponsiveContainer>
           </div>
           <p className="text-center text-sm text-gray-400 font-medium">Showing trend for your top skill</p>
        </SpinCard>

        {/* US-5: AI Recovery Plan */}
        <SpinCard 
            title="AI Coach" 
            subtitle="Personalized recovery" 
            variant="yellow" 
            icon={<BrainCircuit size={20}/>}
            action={
                <button 
                    onClick={handleGeneratePlan}
                    disabled={isGenerating}
                    className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded-full text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
                >
                    {isGenerating ? 'Thinking...' : 'Generate Plan'}
                </button>
            }
        >
          <div className="mt-2 h-full flex flex-col">
            {recoveryPlan ? (
                <div className="bg-yellow-50/50 p-4 rounded-xl text-sm text-gray-700 leading-relaxed border border-yellow-100" dangerouslySetInnerHTML={{ __html: recoveryPlan }} />
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 py-8">
                    <Zap size={48} className="mb-2 text-yellow-500" />
                    <p className="text-sm font-medium">Detect weak skills and get a custom plan.</p>
                </div>
            )}
             {weakSkills.length > 0 && !recoveryPlan && (
                 <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100">
                     <p className="text-xs font-bold text-red-600 mb-1">Attention Needed:</p>
                     <div className="flex gap-2 flex-wrap">
                        {weakSkills.map(s => (
                            <span key={s.id} className="text-xs bg-white text-red-500 px-2 py-1 rounded-md shadow-sm border border-red-100">{s.name}</span>
                        ))}
                     </div>
                 </div>
             )}
          </div>
        </SpinCard>

        {/* US-8, 9, 10, 11: Peer Matching */}
        <SpinCard title="Peer Learning" subtitle="Match & Practice" variant="green" icon={<Users size={20}/>} className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-4">
                {peers.map(peer => (
                    <div key={peer.id} className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-green-100 rounded-2xl transition-all">
                        <div className="h-12 w-12 rounded-full bg-green-200 text-green-700 flex items-center justify-center font-bold text-lg">
                            {peer.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800">{peer.name}</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Teaches:</span>
                                {peer.strongSkills.slice(0, 2).map(skill => (
                                    <span key={skill} className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-indigo-50 hover:border-indigo-200 text-gray-500 hover:text-indigo-600 transition-colors" title="Chat">
                                <MessageCircle size={16} />
                            </button>
                             <button className="p-2 bg-green-500 border border-green-600 rounded-full hover:bg-green-600 text-white shadow-sm transition-colors" title="Start Session">
                                <Play size={16} fill="currentColor" />
                            </button>
                        </div>
                        <div className="text-center min-w-[50px]">
                            <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold text-sm">
                                <Award size={14} />
                                {peer.contributionScore}
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium">Points</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-center">
                 <button className="text-sm font-bold text-green-600 hover:text-green-700 bg-green-50 px-6 py-3 rounded-xl transition-colors">
                    Find More Peers
                 </button>
            </div>
        </SpinCard>

        {/* US-6: Interview Feedback Analysis */}
        <SpinCard title="Interview Insights" subtitle="Failure Analysis" variant="red" icon={<AlertTriangle size={20}/>}>
             <div className="space-y-4">
                 {student.interviews.map(interview => (
                     <div key={interview.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                         <div className="flex justify-between items-start mb-2">
                             <div>
                                 <h5 className="font-bold text-gray-800">{interview.company}</h5>
                                 <p className="text-xs text-gray-500">{interview.role} • {interview.date}</p>
                             </div>
                             <span className={`px-2 py-1 rounded-lg text-xs font-bold ${interview.result === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                 {interview.result}
                             </span>
                         </div>
                         <p className="text-sm text-gray-600 italic bg-gray-50 p-2 rounded-lg border border-gray-100">"{interview.feedback}"</p>
                         {interview.weakSkills.length > 0 && (
                             <div className="mt-2 flex gap-2 items-center">
                                 <span className="text-xs font-bold text-red-400">Weakness:</span>
                                 {interview.weakSkills.map(ws => (
                                     <span key={ws} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded border border-red-100">{ws}</span>
                                 ))}
                             </div>
                         )}
                     </div>
                 ))}
             </div>
        </SpinCard>

      </div>
    </div>
  );
};
