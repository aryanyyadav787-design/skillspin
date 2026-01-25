import React, { useState } from 'react';
import { Role } from './types';
import { StudentDashboard } from './components/StudentDashboard';
import { PlacementDashboard } from './components/PlacementDashboard';
import { FacultyDashboard } from './components/FacultyDashboard';
import { LandingPage } from './components/LandingPage';
import { Sparkles, Layout, GraduationCap, School, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>(Role.STUDENT);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans selection:bg-yellow-200">
      
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentRole(Role.STUDENT)}>
            <div className="bg-black text-white p-2 rounded-xl">
               <Sparkles size={20} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold tracking-tight">SkillSpin</span>
          </div>

          {/* Role Switcher (Simulating Login) */}
          <div className="flex p-1 bg-gray-100 rounded-full">
            <button 
                onClick={() => setCurrentRole(Role.STUDENT)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currentRole === Role.STUDENT ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <Layout size={16} /> Student
            </button>
            <button 
                onClick={() => setCurrentRole(Role.PLACEMENT_OFFICER)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currentRole === Role.PLACEMENT_OFFICER ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <GraduationCap size={16} /> Placement
            </button>
            <button 
                onClick={() => setCurrentRole(Role.FACULTY)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currentRole === Role.FACULTY ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <School size={16} /> Faculty
            </button>
          </div>

          {/* User Profile Stub */}
          <div className="hidden md:flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-yellow-100 border-2 border-white shadow-sm overflow-hidden">
                 <img src="https://picsum.photos/100/100" alt="Profile" className="w-full h-full object-cover" />
             </div>
             <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Log out">
                <LogOut size={20} />
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="py-8 animate-in fade-in duration-500">
        {currentRole === Role.STUDENT && <StudentDashboard />}
        {currentRole === Role.PLACEMENT_OFFICER && <PlacementDashboard />}
        {currentRole === Role.FACULTY && <FacultyDashboard />}
      </main>

    </div>
  );
};

export default App;
