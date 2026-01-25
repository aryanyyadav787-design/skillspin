export enum Role {
  STUDENT = 'STUDENT',
  PLACEMENT_OFFICER = 'PLACEMENT_OFFICER',
  FACULTY = 'FACULTY'
}

export enum SkillStatus {
  STRONG = 'STRONG',
  AVERAGE = 'AVERAGE',
  WEAK = 'WEAK',
  DECAYING = 'DECAYING'
}

export interface Skill {
  id: string;
  name: string;
  score: number; // 0-100
  decay: number; // 0-100 (high means decaying fast)
  lastPracticed: string;
  trend: number[]; // Historical scores
}

export interface InterviewFeedback {
  id: string;
  company: string;
  role: string;
  date: string;
  result: 'PASS' | 'FAIL' | 'PENDING';
  weakSkills: string[];
  feedback: string;
}

export interface Peer {
  id: string;
  name: string;
  role: string;
  strongSkills: string[]; // Skills they can teach
  learningSkills: string[]; // Skills they want to practice
  contributionScore: number;
}

export interface StudentProfile {
  name: string;
  targetRole: string;
  skills: Skill[];
  interviews: InterviewFeedback[];
  readinessScore: number;
}

export interface CurriculumTopic {
  id: string;
  topicName: string;
  mappedSkillId: string;
  atRiskCount: number;
}
