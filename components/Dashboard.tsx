import React, { useState } from 'react';
import { User, TrendingUp, Target, Clock, BookOpen, Award, Edit, LogOut, ChevronRight, Sparkles, Brain } from 'lucide-react';

interface ProfileData {
    fullName: string;
    currentRole: string;
    experienceLevel: string;
    industry: string;
    currentSkills: Array<{ name: string; proficiency: number }>;
    targetRole: string;
    skillsToLearn: string[];
    timeline: string;
    learningPace: string;
    weeklyHours: string;
    goals: string;
}

interface DashboardProps {
    profileData: ProfileData;
    onEditProfile: () => void;
    onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profileData, onEditProfile, onLogout }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Calculate statistics
    const totalCurrentSkills = profileData.currentSkills.length;
    const avgProficiency = totalCurrentSkills > 0
        ? Math.round(profileData.currentSkills.reduce((sum, skill) => sum + skill.proficiency, 0) / totalCurrentSkills)
        : 0;
    const targetSkillsCount = profileData.skillsToLearn.length;

    // Calculate skill gap - how many target skills user already has
    const skillsAlreadyKnown = profileData.skillsToLearn.filter(targetSkill =>
        profileData.currentSkills.some(currentSkill =>
            currentSkill.name.toLowerCase() === targetSkill.toLowerCase()
        )
    ).length;
    const skillGapPercentage = targetSkillsCount > 0
        ? Math.round(((targetSkillsCount - skillsAlreadyKnown) / targetSkillsCount) * 100)
        : 0;

    // Calculate overall progress (based on avg proficiency and skill coverage)
    const overallProgress = targetSkillsCount > 0
        ? Math.round((100 - skillGapPercentage) * 0.7 + (avgProficiency * 10) * 0.3)
        : avgProficiency * 10;

    // Get proficiency color
    const getProficiencyColor = (proficiency: number) => {
        if (proficiency >= 8) return 'bg-green-500';
        if (proficiency >= 6) return 'bg-blue-500';
        if (proficiency >= 4) return 'bg-yellow-500';
        return 'bg-gray-400';
    };

    const getProficiencyLabel = (proficiency: number) => {
        if (proficiency >= 8) return 'Expert';
        if (proficiency >= 6) return 'Advanced';
        if (proficiency >= 4) return 'Intermediate';
        return 'Beginner';
    };

    // Generate learning recommendations based on target skills
    const recommendations = profileData.skillsToLearn.slice(0, 3).map(skill => ({
        skill,
        course: `Master ${skill}`,
        duration: '6-8 weeks',
        level: 'Intermediate',
        priority: profileData.skillsToLearn.indexOf(skill) === 0 ? 'High' : 'Medium'
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <Sparkles className="text-white" size={20} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">SkillSpin</h1>
                                <p className="text-xs text-gray-500">Learning Dashboard</p>
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                                    <User className="text-white" size={20} />
                                </div>
                                <div className="text-left hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900">{profileData.fullName}</p>
                                    <p className="text-xs text-gray-500">{profileData.currentRole}</p>
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                                    <button
                                        onClick={() => {
                                            setShowProfileMenu(false);
                                            onEditProfile();
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                                    >
                                        <Edit size={16} />
                                        <span className="text-sm font-medium">Edit Profile</span>
                                    </button>
                                    <hr className="my-2 border-gray-100" />
                                    <button
                                        onClick={() => {
                                            setShowProfileMenu(false);
                                            onLogout();
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-3 text-red-600"
                                    >
                                        <LogOut size={16} />
                                        <span className="text-sm font-medium">Log Out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {profileData.fullName.split(' ')[0]}! 👋
                    </h2>
                    <p className="text-gray-600">Here's your learning progress and next steps</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Skills */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Award className="text-blue-600" size={24} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{totalCurrentSkills}</h3>
                        <p className="text-sm text-gray-500 mt-1">Current Skills</p>
                    </div>

                    {/* Average Proficiency */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="text-green-600" size={24} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{avgProficiency}/10</h3>
                        <p className="text-sm text-gray-500 mt-1">Avg Proficiency</p>
                    </div>

                    {/* Target Skills */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Target className="text-purple-600" size={24} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{targetSkillsCount}</h3>
                        <p className="text-sm text-gray-500 mt-1">Skills to Learn</p>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Clock className="text-orange-600" size={24} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{profileData.timeline}</h3>
                        <p className="text-sm text-gray-500 mt-1">Timeline</p>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Skills & Progress */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Target Role Progress */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Target Role Progress</h3>
                                <span className="text-sm font-semibold text-indigo-600">{overallProgress}%</span>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">{profileData.currentRole}</span>
                                    <ChevronRight className="text-gray-400" size={20} />
                                    <span className="text-sm font-medium text-gray-900">{profileData.targetRole}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${overallProgress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 mb-1">Timeline</p>
                                    <p className="text-sm font-semibold text-gray-900">{profileData.timeline}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 mb-1">Learning Pace</p>
                                    <p className="text-sm font-semibold text-gray-900 capitalize">{profileData.learningPace}</p>
                                </div>
                            </div>
                        </div>

                        {/* Current Skills */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">My Current Skills</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {profileData.currentSkills.map((skill) => (
                                    <div key={skill.name} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                                            <span className={`text-xs px-2 py-1 rounded-lg text-white ${getProficiencyColor(skill.proficiency)}`}>
                                                {skill.proficiency}/10
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                            <div
                                                className={`h-2 rounded-full ${getProficiencyColor(skill.proficiency)}`}
                                                style={{ width: `${skill.proficiency * 10}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500">{getProficiencyLabel(skill.proficiency)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skill Gap Analysis */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Skill Gap Analysis</h3>
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-600">Skills Gap to Close</span>
                                    <span className="text-sm font-semibold text-gray-900">{skillGapPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full"
                                        style={{ width: `${skillGapPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-gray-700 mb-3">Skills to Learn:</p>
                                <div className="flex flex-wrap gap-2">
                                    {profileData.skillsToLearn.map((skill, index) => (
                                        <div
                                            key={skill}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium ${index === 0
                                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                                    : 'bg-purple-100 text-purple-800'
                                                }`}
                                        >
                                            {skill}
                                            {index === 0 && <span className="ml-2 text-xs">🔥 Priority</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Recommendations & Actions */}
                    <div className="space-y-8">
                        {/* Recommended Learning Paths */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <Brain size={24} />
                                <h3 className="text-xl font-bold">Recommended for You</h3>
                            </div>
                            <p className="text-sm text-indigo-100 mb-6">Based on your target role and skill gaps</p>

                            <div className="space-y-3">
                                {recommendations.map((rec, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-semibold">{rec.course}</h4>
                                            {rec.priority === 'High' && (
                                                <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded">High Priority</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-indigo-100 mb-2">Focus: {rec.skill}</p>
                                        <div className="flex items-center gap-4 text-xs text-indigo-200">
                                            <span>⏱️ {rec.duration}</span>
                                            <span>📊 {rec.level}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={onEditProfile}
                                    className="w-full bg-black text-white px-4 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center justify-between group"
                                >
                                    <span>Edit Profile</span>
                                    <Edit size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-between group">
                                    <span>Track Progress</span>
                                    <TrendingUp size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-between group">
                                    <span>Find Courses</span>
                                    <BookOpen size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Learning Preferences */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Learning Plan</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Weekly Commitment</p>
                                    <p className="text-sm font-semibold text-gray-900">{profileData.weeklyHours} hours</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Learning Style</p>
                                    <p className="text-sm font-semibold text-gray-900 capitalize">{profileData.learningPace}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Your Goal</p>
                                    <p className="text-sm text-gray-700 italic">"{profileData.goals}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
