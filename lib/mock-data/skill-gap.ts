export const roleRequirements: Record<string, string[]> = {
  "AI Engineer": [
    "Python", "SQL", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "MLOps", "Data Structures"
  ],
  "Data Scientist": [
    "Python", "SQL", "Statistics", "Machine Learning", "Data Visualization", "Pandas", "Scikit-Learn", "A/B Testing"
  ],
  "Full Stack Developer": [
    "JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "REST APIs", "CSS/Tailwind"
  ],
  "Cybersecurity Analyst": [
    "Networking", "Linux", "Python", "Ethical Hacking", "Cryptography", "SIEM", "Incident Response"
  ],
  "Product Manager": [
    "Agile/Scrum", "Product Strategy", "Data Analysis", "User Research", "Wireframing", "SQL", "Stakeholder Management"
  ]
};

export const availableSkills = Array.from(new Set(Object.values(roleRequirements).flat())).sort();

export function calculateSkillGap(targetRole: string, currentSkills: string[]) {
  const required = roleRequirements[targetRole] || [];
  
  if (required.length === 0) return {
    matchPercentage: 0,
    presentSkills: [],
    missingSkills: [],
    recommendations: []
  };

  const presentSkills = required.filter(skill => currentSkills.includes(skill));
  const missingSkills = required.filter(skill => !currentSkills.includes(skill));
  
  const matchPercentage = Math.round((presentSkills.length / required.length) * 100);
  
  const recommendations = [...missingSkills];
  
  return {
    matchPercentage,
    presentSkills,
    missingSkills,
    recommendations
  };
}
