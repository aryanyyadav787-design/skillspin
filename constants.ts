import { Skill, SkillStatus, StudentProfile, Peer, CurriculumTopic, InterviewFeedback } from './types';

export const MOCK_SKILLS: Skill[] = [
  { id: '1', name: 'React', score: 85, decay: 10, lastPracticed: '2 days ago', trend: [70, 75, 80, 82, 85] },
  { id: '2', name: 'TypeScript', score: 78, decay: 20, lastPracticed: '5 days ago', trend: [60, 65, 70, 75, 78] },
  { id: '3', name: 'Data Structures', score: 45, decay: 80, lastPracticed: '3 weeks ago', trend: [80, 70, 60, 50, 45] },
  { id: '4', name: 'System Design', score: 60, decay: 40, lastPracticed: '1 week ago', trend: [50, 55, 58, 62, 60] },
];

export const MOCK_INTERVIEWS: InterviewFeedback[] = [
  { id: '1', company: 'TechCorp', role: 'Frontend Dev', date: '2023-10-15', result: 'FAIL', weakSkills: ['Data Structures'], feedback: 'Struggled with tree traversal algorithms.' },
  { id: '2', company: 'StartUp Inc', role: 'Full Stack', date: '2023-11-01', result: 'PASS', weakSkills: [], feedback: 'Excellent cultural fit and React knowledge.' },
];

export const MOCK_STUDENT: StudentProfile = {
  name: 'Alex Johnson',
  targetRole: 'Senior Frontend Engineer',
  skills: MOCK_SKILLS,
  interviews: MOCK_INTERVIEWS,
  readinessScore: 72,
};

export const MOCK_PEERS: Peer[] = [
  { id: '1', name: 'Sarah Lee', role: 'Backend Lead', strongSkills: ['Data Structures', 'Java'], learningSkills: ['React'], contributionScore: 420 },
  { id: '2', name: 'Mike Chen', role: 'DevOps', strongSkills: ['System Design', 'Docker'], learningSkills: ['TypeScript'], contributionScore: 350 },
  { id: '3', name: 'Jessica Davis', role: 'Frontend', strongSkills: ['CSS', 'Figma'], learningSkills: ['Data Structures'], contributionScore: 120 },
];

export const MOCK_CURRICULUM: CurriculumTopic[] = [
  { id: '1', topicName: 'Graph Algorithms', mappedSkillId: '3', atRiskCount: 15 },
  { id: '2', topicName: 'React Hooks', mappedSkillId: '1', atRiskCount: 3 },
  { id: '3', topicName: 'Microservices', mappedSkillId: '4', atRiskCount: 8 },
];
