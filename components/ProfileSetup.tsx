import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Briefcase, Target, BookOpen, Sparkles } from 'lucide-react';

interface ProfileData {
    // Step 1: Personal Info
    fullName: string;
    currentRole: string;
    experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert' | '';
    industry: string;

    // Step 2: Current Skills
    currentSkills: Array<{ name: string; proficiency: number }>;

    // Step 3: Target Role
    targetRole: string;
    skillsToLearn: string[];
    timeline: string;

    // Step 4: Learning Preferences
    learningPace: 'self-paced' | 'structured' | 'intensive' | '';
    weeklyHours: string;
    goals: string;
}

interface ProfileSetupProps {
    initialName?: string;
    onComplete: (data: ProfileData) => void;
}

const POPULAR_SKILLS = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java',
    'SQL', 'AWS', 'Docker', 'Git', 'CSS', 'HTML',
    'Machine Learning', 'Data Analysis', 'Project Management', 'UI/UX Design',
    'Communication', 'Leadership', 'Problem Solving', 'Team Collaboration'
];

const INDUSTRIES = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Marketing',
    'Design', 'Sales', 'Engineering', 'Data Science', 'Other'
];

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ initialName = '', onComplete }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [profileData, setProfileData] = useState<ProfileData>({
        fullName: initialName,
        currentRole: '',
        experienceLevel: '',
        industry: '',
        currentSkills: [],
        targetRole: '',
        skillsToLearn: [],
        timeline: '',
        learningPace: '',
        weeklyHours: '',
        goals: ''
    });

    const [skillInput, setSkillInput] = useState('');
    const [targetSkillInput, setTargetSkillInput] = useState('');

    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete(profileData);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updateProfileData = (field: keyof ProfileData, value: any) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const addSkill = (skillName: string) => {
        if (skillName && !profileData.currentSkills.find(s => s.name === skillName)) {
            updateProfileData('currentSkills', [...profileData.currentSkills, { name: skillName, proficiency: 5 }]);
            setSkillInput('');
        }
    };

    const removeSkill = (skillName: string) => {
        updateProfileData('currentSkills', profileData.currentSkills.filter(s => s.name !== skillName));
    };

    const updateSkillProficiency = (skillName: string, proficiency: number) => {
        updateProfileData('currentSkills', profileData.currentSkills.map(s =>
            s.name === skillName ? { ...s, proficiency } : s
        ));
    };

    const addTargetSkill = (skill: string) => {
        if (skill && !profileData.skillsToLearn.includes(skill)) {
            updateProfileData('skillsToLearn', [...profileData.skillsToLearn, skill]);
            setTargetSkillInput('');
        }
    };

    const removeTargetSkill = (skill: string) => {
        updateProfileData('skillsToLearn', profileData.skillsToLearn.filter(s => s !== skill));
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return profileData.fullName && profileData.currentRole && profileData.experienceLevel && profileData.industry;
            case 2:
                return profileData.currentSkills.length > 0;
            case 3:
                return profileData.targetRole && profileData.skillsToLearn.length > 0 && profileData.timeline;
            case 4:
                return profileData.learningPace && profileData.weeklyHours && profileData.goals;
            default:
                return false;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 font-sans">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 md:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
                        <Sparkles className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                        Create Your Profile
                    </h1>
                    <p className="text-gray-500">
                        Step {currentStep} of {totalSteps}: {
                            currentStep === 1 ? 'Personal Information' :
                                currentStep === 2 ? 'Current Skills' :
                                    currentStep === 3 ? 'Target Role & Goals' :
                                        'Learning Preferences'
                        }
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {[1, 2, 3, 4].map((step) => (
                            <div
                                key={step}
                                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${step < currentStep
                                        ? 'bg-green-500 text-white'
                                        : step === currentStep
                                            ? 'bg-black text-white'
                                            : 'bg-gray-200 text-gray-400'
                                    }`}
                            >
                                {step < currentStep ? <Check size={20} /> : step}
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Step Content */}
                <div className="min-h-[400px]">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={profileData.fullName}
                                    onChange={(e) => updateProfileData('fullName', e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Current Role
                                </label>
                                <input
                                    type="text"
                                    value={profileData.currentRole}
                                    onChange={(e) => updateProfileData('currentRole', e.target.value)}
                                    placeholder="e.g., Frontend Developer, Marketing Manager"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Experience Level
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {(['beginner', 'intermediate', 'advanced', 'expert'] as const).map((level) => (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => updateProfileData('experienceLevel', level)}
                                            className={`px-4 py-3 rounded-xl font-semibold capitalize transition-all ${profileData.experienceLevel === level
                                                    ? 'bg-black text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Industry
                                </label>
                                <select
                                    value={profileData.industry}
                                    onChange={(e) => updateProfileData('industry', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                                >
                                    <option value="">Select your industry</option>
                                    {INDUSTRIES.map((industry) => (
                                        <option key={industry} value={industry}>{industry}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Current Skills */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Add Your Current Skills
                                </label>
                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="text"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(skillInput))}
                                        placeholder="Type a skill and press Enter"
                                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addSkill(skillInput)}
                                        className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
                                    >
                                        Add
                                    </button>
                                </div>

                                {/* Popular Skills */}
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 mb-2">Popular skills:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {POPULAR_SKILLS.filter(s => !profileData.currentSkills.find(cs => cs.name === s)).slice(0, 8).map((skill) => (
                                            <button
                                                key={skill}
                                                type="button"
                                                onClick={() => addSkill(skill)}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-all"
                                            >
                                                + {skill}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Selected Skills with Proficiency */}
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    {profileData.currentSkills.map((skill) => (
                                        <div key={skill.name} className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-semibold text-gray-800">{skill.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeSkill(skill.name)}
                                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500 w-20">Proficiency:</span>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="10"
                                                    value={skill.proficiency}
                                                    onChange={(e) => updateSkillProficiency(skill.name, parseInt(e.target.value))}
                                                    className="flex-1"
                                                />
                                                <span className="text-sm font-semibold text-gray-700 w-8">{skill.proficiency}/10</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Target Role & Goals */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Target Role
                                </label>
                                <input
                                    type="text"
                                    value={profileData.targetRole}
                                    onChange={(e) => updateProfileData('targetRole', e.target.value)}
                                    placeholder="e.g., Senior Developer, Product Manager"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Skills You Want to Learn
                                </label>
                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="text"
                                        value={targetSkillInput}
                                        onChange={(e) => setTargetSkillInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTargetSkill(targetSkillInput))}
                                        placeholder="Type a skill and press Enter"
                                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => addTargetSkill(targetSkillInput)}
                                        className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
                                    >
                                        Add
                                    </button>
                                </div>

                                {/* Popular Skills to Learn */}
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 mb-2">Suggested skills:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {POPULAR_SKILLS.filter(s => !profileData.skillsToLearn.includes(s)).slice(0, 8).map((skill) => (
                                            <button
                                                key={skill}
                                                type="button"
                                                onClick={() => addTargetSkill(skill)}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-all"
                                            >
                                                + {skill}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Selected Target Skills */}
                                <div className="flex flex-wrap gap-2">
                                    {profileData.skillsToLearn.map((skill) => (
                                        <div key={skill} className="flex items-center gap-2 bg-indigo-100 text-indigo-800 px-3 py-2 rounded-lg">
                                            <span className="text-sm font-medium">{skill}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeTargetSkill(skill)}
                                                className="text-indigo-600 hover:text-indigo-800"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Timeline to Achieve Goal
                                </label>
                                <select
                                    value={profileData.timeline}
                                    onChange={(e) => updateProfileData('timeline', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                                >
                                    <option value="">Select timeline</option>
                                    <option value="3-months">3 Months</option>
                                    <option value="6-months">6 Months</option>
                                    <option value="1-year">1 Year</option>
                                    <option value="2-years">2+ Years</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Learning Preferences */}
                    {currentStep === 4 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Preferred Learning Pace
                                </label>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { value: 'self-paced', label: 'Self-Paced', desc: 'Learn at your own speed' },
                                        { value: 'structured', label: 'Structured', desc: 'Follow a guided curriculum' },
                                        { value: 'intensive', label: 'Intensive', desc: 'Fast-track your learning' }
                                    ].map((pace) => (
                                        <button
                                            key={pace.value}
                                            type="button"
                                            onClick={() => updateProfileData('learningPace', pace.value)}
                                            className={`px-4 py-4 rounded-xl font-semibold text-left transition-all ${profileData.learningPace === pace.value
                                                    ? 'bg-black text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <div className="font-bold">{pace.label}</div>
                                            <div className={`text-sm mt-1 ${profileData.learningPace === pace.value ? 'text-gray-300' : 'text-gray-500'}`}>
                                                {pace.desc}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Weekly Time Commitment
                                </label>
                                <select
                                    value={profileData.weeklyHours}
                                    onChange={(e) => updateProfileData('weeklyHours', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                                >
                                    <option value="">Select hours per week</option>
                                    <option value="1-3">1-3 hours</option>
                                    <option value="4-7">4-7 hours</option>
                                    <option value="8-15">8-15 hours</option>
                                    <option value="15+">15+ hours</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    What's Your Main Learning Goal?
                                </label>
                                <textarea
                                    value={profileData.goals}
                                    onChange={(e) => updateProfileData('goals', e.target.value)}
                                    placeholder="e.g., Switch to a new career, get promoted, start a side project..."
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors resize-none"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${currentStep === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <ChevronLeft size={20} />
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${isStepValid()
                                ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {currentStep === totalSteps ? 'Complete Profile' : 'Next'}
                        {currentStep < totalSteps && <ChevronRight size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};
