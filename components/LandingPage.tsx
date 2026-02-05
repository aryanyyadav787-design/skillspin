import React from 'react';
import { Play, CheckCircle2, Sparkles, ArrowRight, CornerRightDown } from 'lucide-react';

interface LandingPageProps {
    onLogin: () => void;
    onSignup: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onSignup }) => {
    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-yellow-200 overflow-x-hidden flex flex-col text-[#1e1e1e]">

            {/* Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
                <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <span className="text-2xl font-extrabold tracking-tight text-gray-900 flex items-center gap-1">
                            SkillSpin
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={onLogin} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Log in</button>
                        <button
                            onClick={onSignup}
                            className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:scale-105 hover:shadow-xl transition-all duration-300"
                        >
                            Signup
                        </button>
                    </div>
                </nav>
            </div>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center md:items-start pt-10 pb-20 relative max-w-[1600px] mx-auto w-full">

                {/* Floating Cards Fan */}
                <div className="relative w-full h-[400px] md:h-[500px] mb-8 hidden md:flex justify-center items-center perspective-1000">

                    {/* 1. Yellow Card (AI Learning) - Far Left */}
                    <div className="absolute z-10 cursor-pointer group card-bounce"
                        style={{ transform: 'translateX(-480px) translateY(40px) rotate(-12deg)' }}>
                        <div className="bg-[#FFF9C4] p-5 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] w-[340px] border-[6px] border-white">
                            <div className="mb-6 flex justify-between items-start">
                                <span className="text-[13px] font-bold text-[#8d7b32] bg-[#fffde7] px-3 py-1.5 rounded-xl">Learn efficiently with AI</span>
                            </div>

                            {/* Audio Widget */}
                            <div className="bg-white rounded-[1.5rem] p-5 shadow-sm mb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[11px] font-bold text-gray-400">Listen and type in the same phrase</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#2d2d2d] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                                        <Play size={20} fill="currentColor" className="ml-1" />
                                    </div>
                                    <div className="flex-1 h-10 flex items-center justify-between px-2 gap-[3px]">
                                        {[4, 8, 12, 16, 24, 16, 20, 12, 8, 4, 8, 12, 18, 12, 6, 4, 12, 16, 8, 4].map((h, i) => (
                                            <div key={i} className="w-[3px] bg-black rounded-full" style={{ height: `${h}px`, opacity: i > 12 ? 0.2 : 1 }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Chat Bubble */}
                            <div className="bg-white rounded-[1.5rem] p-5 shadow-sm relative">
                                <p className="text-[15px] font-bold text-[#1e1e1e] leading-snug">
                                    Yeah! <span className="text-[#3b82f6]">React</span> is my favorite framework in the whole world 💙
                                </p>
                                <div className="absolute -right-2 -top-2 bg-[#22c55e] text-white p-1 rounded-full border-[3px] border-[#FFF9C4]">
                                    <CheckCircle2 size={14} strokeWidth={4} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Cyan Card (Progress) - Mid Left */}
                    <div className="absolute z-20 cursor-pointer group card-bounce"
                        style={{ transform: 'translateX(-180px) translateY(-20px) rotate(-4deg)' }}>
                        <div className="bg-[#E0F7FA] p-5 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] w-[300px] border-[6px] border-white">
                            <div className="mb-6">
                                <span className="text-[13px] font-bold text-[#006064] opacity-80">Know your progress</span>
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-5xl">🐣</div>
                                <div>
                                    <h3 className="font-extrabold text-2xl text-[#1e1e1e]">Rookie</h3>
                                    <p className="text-[13px] text-gray-400 font-bold">your current league</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-4 rounded-[1.25rem] shadow-sm">
                                    <Sparkles className="text-yellow-400 mb-2" size={20} fill="currentColor" />
                                    <p className="text-2xl font-black text-[#1e1e1e] mb-1">420</p>
                                    <p className="text-[11px] text-gray-400 font-bold">spins earned</p>
                                </div>
                                <div className="bg-white p-4 rounded-[1.25rem] shadow-sm">
                                    <div className="text-blue-400 mb-2 font-black text-[10px]">⌛</div>
                                    <p className="text-2xl font-black text-[#1e1e1e] mb-1">4420</p>
                                    <p className="text-[11px] text-gray-400 font-bold">minutes in app</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Purple Card (Calendar) - Mid Right */}
                    <div className="absolute z-30 cursor-pointer group card-bounce"
                        style={{ transform: 'translateX(140px) translateY(-10px) rotate(4deg)' }}>
                        <div className="bg-[#F3E5F5] p-5 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] w-[300px] border-[6px] border-white">
                            <div className="mb-6">
                                <span className="text-[13px] font-bold text-[#6a1b9a] opacity-80">Plan your lessons</span>
                            </div>

                            <div className="bg-white rounded-[1.5rem] p-5 shadow-sm">
                                <div className="flex justify-between items-center mb-6 px-1">
                                    <span className="text-xs font-bold text-gray-300 cursor-pointer hover:text-black">&lt;</span>
                                    <span className="text-[15px] font-extrabold text-[#1e1e1e]">December 2022</span>
                                    <span className="text-xs font-bold text-gray-300 cursor-pointer hover:text-black">&gt;</span>
                                </div>

                                <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center text-[11px] text-gray-300 font-bold mb-2">
                                    <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
                                </div>

                                <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center text-[13px] font-bold text-[#1e1e1e]">
                                    {/* Empty slots for previous month */}
                                    <div className="text-gray-200">28</div><div className="text-gray-200">29</div><div className="text-gray-200">30</div>
                                    {[...Array(31)].map((_, i) => (
                                        <div key={i} className={`h-7 w-7 flex items-center justify-center rounded-full mx-auto 
                                    ${i === 21 ? 'bg-[#1e1e1e] text-white shadow-lg' : ''} 
                                    ${i === 23 ? 'bg-purple-100 text-purple-600' : ''}
                                    ${i === 5 || i === 6 || i === 12 || i === 13 || i === 19 || i === 20 || i === 26 || i === 27 ? 'text-gray-400' : ''}
                                `}>
                                            {i + 1}
                                        </div>
                                    ))}
                                    <div className="text-gray-200">1</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Green Card (Leaderboard) - Far Right */}
                    <div className="absolute z-20 cursor-pointer group card-bounce"
                        style={{ transform: 'translateX(440px) translateY(40px) rotate(12deg)' }}>
                        <div className="bg-[#E8F5E9] p-5 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] w-[300px] border-[6px] border-white">
                            <div className="mb-6">
                                <span className="text-[13px] font-bold text-[#2e7d32] opacity-80">Compete with others</span>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { name: 'Artem A.', score: '24231', medal: '🥇' },
                                    { name: 'Daniel S.', score: '16742', medal: '🥈' },
                                    { name: 'Daniella M.', score: '15819', medal: '🥉' },
                                    { name: 'Dima L.', score: '14634', medal: '' },
                                ].map((user, idx) => (
                                    <div key={idx} className="flex items-center justify-between group-hover:bg-white/50 p-2 rounded-xl transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                                            </div>
                                            <div className="text-[14px] font-bold text-[#1e1e1e]">
                                                {user.name} <span className="text-lg">{user.medal}</span>
                                            </div>
                                        </div>
                                        <span className="text-[14px] font-extrabold text-[#1e1e1e]">{user.score}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile View Slider */}
                <div className="md:hidden w-full overflow-x-auto flex gap-4 px-6 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar">
                    <div className="snap-center shrink-0 w-[280px] bg-[#FFF9C4] p-5 rounded-[2rem] border-4 border-white shadow-xl transform -rotate-1">
                        <div className="mb-4"><span className="text-xs font-bold text-yellow-800 bg-yellow-400/20 px-2 py-1 rounded-lg">AI Learning</span></div>
                        <div className="bg-white rounded-2xl p-4 mb-4"><div className="flex items-center gap-2"><div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white"><Play size={14} fill="currentColor" /></div><div className="h-4 flex-1 bg-gray-100 rounded-full overflow-hidden"><div className="w-1/2 h-full bg-black"></div></div></div></div>
                        <div className="bg-white rounded-2xl p-4"><p className="text-sm font-bold text-gray-800">React is my favorite! 💙</p></div>
                    </div>
                    <div className="snap-center shrink-0 w-[280px] bg-[#E0F7FA] p-5 rounded-[2rem] border-4 border-white shadow-xl transform rotate-1">
                        <div className="mb-4"><span className="text-xs font-bold text-cyan-800">Progress</span></div>
                        <div className="flex items-center gap-2 mb-4"><span className="text-4xl">🐣</span><span className="font-bold text-xl text-gray-800">Rookie</span></div>
                        <div className="grid grid-cols-2 gap-2"><div className="bg-white p-3 rounded-xl"><p className="font-black text-xl">420</p><p className="text-[10px] text-gray-400 font-bold">SPINS</p></div><div className="bg-white p-3 rounded-xl"><p className="font-black text-xl">4420</p><p className="text-[10px] text-gray-400 font-bold">MINS</p></div></div>
                    </div>
                </div>

                {/* Hero Text */}
                <div className="text-left z-40 relative px-6 md:px-12 mt-4 max-w-5xl">
                    <h1 className="text-[3.5rem] md:text-[6.5rem] font-extrabold text-[#1e1e1e] tracking-tighter leading-[1] mb-6 md:mb-8">
                        Your "swiss knife" for learning any <span className="relative inline-block">
                            skill
                        </span>
                    </h1>
                    <p className="text-lg md:text-2xl text-[#6b7280] font-medium max-w-2xl mb-10 leading-relaxed tracking-tight">
                        Using AI, Spin makes learning multiple skills easy. With 80+ topics,
                        realistic mock interviews, progress tracking, custom schedules, and more.
                    </p>


                </div>

                <div className="mt-auto pt-16 w-full flex justify-center md:justify-start md:pl-12">
                    <button className="text-gray-300 flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-gray-400 transition-colors animate-bounce">
                        <span className="transform rotate-45 border-r-2 border-b-2 border-current w-3 h-3 block mt-[-6px]"></span>
                        scroll to learn more
                    </button>
                </div>

            </main>
        </div>
    );
};
