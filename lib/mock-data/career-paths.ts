export interface RoleDetails {
  id: string;
  title: string;
  description: string;
  experience: string;
  skills: string[];
  projects: string[];
  salary: string;
}

export interface CareerPath {
  id: string;
  name: string;
  roles: RoleDetails[];
}

export const careerPaths: CareerPath[] = [
  {
    id: "ai-engineer",
    name: "AI Engineer Path",
    roles: [
      {
        id: "junior-ai",
        title: "Junior AI Engineer",
        description: "Focuses on data preprocessing, simple model training, and basic MLOps pipelines.",
        experience: "0-2 Years",
        skills: ["Python", "SQL", "Scikit-Learn", "Data Cleaning", "Git"],
        projects: ["Sentiment Analysis Model", "Predictive Sales Dashboard", "Data Cleaning Pipeline"],
        salary: "$70k - $90k"
      },
      {
        id: "ml-engineer",
        title: "Machine Learning Engineer",
        description: "Designs, trains, and deploys scalable machine learning models to production environments.",
        experience: "2-5 Years",
        skills: ["Deep Learning", "TensorFlow", "PyTorch", "Docker", "REST APIs", "MLflow"],
        projects: ["Image Classification API", "Recommendation System", "Automated Retraining Pipeline"],
        salary: "$100k - $140k"
      },
      {
        id: "senior-ml",
        title: "Senior ML Engineer",
        description: "Architects complex distributed ML systems and leads model optimization efforts.",
        experience: "5-7 Years",
        skills: ["Distributed Systems", "Model Optimization", "Kubernetes", "Advanced Deep Learning", "System Design"],
        projects: ["Real-time Fraud Detection System", "Large Language Model Fine-tuning", "Medical Imaging Diagnostic Tool"],
        salary: "$150k - $200k+"
      },
      {
        id: "ai-architect",
        title: "AI Architect",
        description: "Defines the strategic vision for AI initiatives across the organization and designs the underlying infrastructure.",
        experience: "7-10+ Years",
        skills: ["AI Strategy", "Cloud Architecture (AWS/GCP)", "Data Governance", "Leadership", "Cost Optimization"],
        projects: ["Enterprise AI Platform Design", "Multi-region ML Infrastructure setup"],
        salary: "$200k - $250k+"
      },
      {
        id: "head-of-ai",
        title: "Head of AI",
        description: "Executive leadership role guiding the entire AI department, driving business value through AI transformation.",
        experience: "10+ Years",
        skills: ["Executive Leadership", "Business Strategy", "Budget Management", "Team Building", "Innovation Management"],
        projects: ["Company-wide AI Transformation", "Strategic AI Partnerships"],
        salary: "$250k+"
      }
    ]
  },
  {
    id: "full-stack",
    name: "Full Stack Developer Path",
    roles: [
      {
        id: "junior-fs",
        title: "Junior Full Stack Developer",
        description: "Builds UI components and simple API endpoints.",
        experience: "0-2 Years",
        skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Git"],
        projects: ["Personal Portfolio", "Task Management App", "Weather Dashboard"],
        salary: "$60k - $80k"
      },
      {
        id: "mid-fs",
        title: "Full Stack Developer",
        description: "Develops end-to-end features, manages databases, and handles deployment.",
        experience: "2-5 Years",
        skills: ["TypeScript", "Next.js", "PostgreSQL", "Docker", "CI/CD"],
        projects: ["E-commerce Platform", "Real-time Chat App", "SaaS Dashboard"],
        salary: "$90k - $130k"
      },
      {
        id: "senior-fs",
        title: "Senior Full Stack Engineer",
        description: "Leads technical architecture, performance optimization, and complex system integrations.",
        experience: "5-8 Years",
        skills: ["System Architecture", "Microservices", "GraphQL", "Performance Tuning", "AWS/Azure"],
        projects: ["High-traffic Streaming Service", "Distributed Payment Gateway"],
        salary: "$140k - $180k"
      }
    ]
  }
];
