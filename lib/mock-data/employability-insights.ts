export interface StudentProfile {
  id: string;
  name: string;
  role: string;
  skills: string[];
  projects: number;
  hoursLearned: number;
  assessments: number;
  activityScore: number;
}

export const mockStudents: StudentProfile[] = [
  {
    id: "student-1",
    name: "Alex",
    role: "AI Engineer",
    skills: ["Python", "Machine Learning", "Git"],
    projects: 2,
    hoursLearned: 74,
    assessments: 85,
    activityScore: 70
  }
];

export function generateReadinessScore(profile: StudentProfile): number {
  // Mock logic combining assessment, projects, and skills
  const assessmentWeight = profile.assessments * 0.4;
  const projectWeight = Math.min(profile.projects * 10, 30); // Max 30 from projects
  const skillWeight = Math.min(profile.skills.length * 5, 30); // Max 30 from skills
  return Math.round(assessmentWeight + projectWeight + skillWeight);
}

export function generatePortfolioStrength(profile: StudentProfile): number {
  const projectStrength = Math.min(profile.projects * 15, 45); // Max 45
  const skillStrength = Math.min(profile.skills.length * 8, 35); // Max 35
  const activityStrength = Math.min(profile.activityScore * 0.2, 20); // Max 20
  return Math.round(projectStrength + skillStrength + activityStrength);
}

export function generateGrowthMetrics() {
  // Weekly trend analytics for line charts
  return [
    { week: "Week 1", score: 45, skills: 1 },
    { week: "Week 2", score: 52, skills: 2 },
    { week: "Week 3", score: 58, skills: 2 },
    { week: "Week 4", score: 65, skills: 4 },
    { week: "Week 5", score: 71, skills: 5 },
    { week: "Week 6", score: 78, skills: 7 }
  ];
}

export function generateWeeklyProgress() {
  return [
    { day: "Mon", hours: 2, projects: 0 },
    { day: "Tue", hours: 3.5, projects: 1 },
    { day: "Wed", hours: 1, projects: 0 },
    { day: "Thu", hours: 4, projects: 0 },
    { day: "Fri", hours: 2.5, projects: 1 },
    { day: "Sat", hours: 5, projects: 0 },
    { day: "Sun", hours: 0, projects: 0 }
  ];
}

export function generateRadarData(profile: StudentProfile) {
  return [
    { subject: "Projects", A: Math.min(profile.projects * 20, 100), fullMark: 100 },
    { subject: "Skills", A: Math.min(profile.skills.length * 15, 100), fullMark: 100 },
    { subject: "Assessments", A: profile.assessments, fullMark: 100 },
    { subject: "Documentation", A: 65, fullMark: 100 }, // Mock static metric
    { subject: "Activity", A: profile.activityScore, fullMark: 100 }
  ];
}

export function getRecommendations(role: string) {
  return [
    "Complete TensorFlow Path module to boost your deep learning score.",
    "Build a Recommendation System Project to enhance portfolio strength.",
    "Improve Portfolio Documentation by adding detailed READMEs.",
    "Practice Data Structures assessments to improve interview readiness."
  ];
}
