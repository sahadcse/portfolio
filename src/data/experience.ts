import { AboutContent, Experience, Education } from "@/types/portfolio";

/**
 * Professional experience data
 * Ordered by recency, emphasizing Business ROI and Engineering Depth
 */
export const EXPERIENCE: Experience[] = [
  {
    role: "Founder & Full-Stack Software Engineer",
    company: "Sahad Labs",
    location: "Remote",
    period: "Jan 2026 - Present",
    description: [
      "Architect and deliver Vertical SaaS solutions and internal operational infrastructure for non-technical traditional businesses across Australia, Germany, and Europe, transforming manual business processes into scalable digital systems.",
      "Lead end-to-end development of enterprise-grade platforms, from requirements gathering with international clients to production deployment and ongoing maintenance, ensuring solutions directly address operational pain points and revenue goals.",
      "Specialize in building accessible, secure web applications using Next.js and NestJS, implementing granular role-based access controls and integrating payment gateways for seamless business operations."
    ]
  },
  {
    role: "Software Engineer",
    company: "4j Traders Ltd",
    location: "Dhaka, Bangladesh",
    period: "July 2025 - Dec 2025",
    description: [
      "Engineered and deployed a scalable, containerized backend (NestJS/PostgreSQL/Prisma) for a high-value e-commerce platform, handling product inventory, complex user roles (superAdmin, admin, customer), and ensuring transactional integrity for all order processes.",
      "Optimized core database performance by implementing a centralized query structure and performing schema normalization, which prepared the system for high-volume data operations across products, projects, and orders.",
      "Developed and secured a full project management CRUD API with granular RBAC enforced via NestJS Guards and JWT authentication, allowing administrators to securely manage content and media assets.",
      "Established robust DevOps and CI/CD pipelines using Docker and GitHub Actions, drastically improving deployment reliability and enabling consistent environment setup (Local, Staging, Production) for future team collaboration."
    ]
  },
  {
    role: "Backend Engineer",
    company: "Rushkat Company Ltd",
    location: "Remote [South Korea]",
    period: "Oct 2024 - Jun 2025",
    description: [
      "Developed and optimized scalable backend services for a high-traffic 3D asset store using TypeScript, Express.js, and Prisma ORM, significantly improving system performance through strategic code refactoring and query optimization.",
      "Designed and implemented RESTful APIs for asset management and user interactions; managed PostgreSQL database and integrated Redis caching to accelerate high-traffic endpoints, reducing response times by 60%.",
      "Ensured production readiness by implementing robust security protocols, collaborating with cross-functional teams to deliver key features, and conducting thorough testing and performance tuning for optimal user experience."
    ]
  }
];

/**
 * Education history data
 */
export const EDUCATION: Education[] = [
  {
    degree: "BSc in Computer Science and Engineering",
    institution: "DHAKA International University",
    period: "May 2021 - Jan 2025",
    description: "Completed 148 credits with strong academic performance. Focused on core areas like algorithms, databases, networking, web systems, AI, and software engineering. Applied theoretical knowledge through multiple full-stack projects and internships."
  }
];

/**
 * Bio and skills data
 */
export const BIO_PARAGRAPHS = [
  "I'm a software engineer dedicated to creating high-performance, scalable solutions that improve user experience and drive business success. With 3+ years of experience in JavaScript, TypeScript, DevOps, and cloud technologies, I excel at transforming complex problems into streamlined systems, delivering impactful solutions that meet both technical and business needs.",
  "As the founder of Sahad Labs, I partner with international clients to architect Vertical SaaS solutions and internal operational infrastructure. Whether leading teams or coding hands-on, my passion for innovation and results shines through every project."
];

export const SKILLS = [
  "JavaScript", "Python", "DSA", "Azure", "Docker", "React", "NextJS", "TypeScript", "NodeJS", "Express", "NestJS", "MongoDB", "PostgreSQL", "Redis", "WebRTC", "Socket.io", "Stripe", "VPS", "DevOps", "CI/CD",
  "Communication", "Teamwork", "Problem-solving", "Leadership", "Time Management", "Critical Thinking"
];

/**
 * Complete About content aggregator
 */
export const ABOUT_CONTENT: AboutContent = {
  bio: BIO_PARAGRAPHS,
  experience: EXPERIENCE,
  education: EDUCATION,
  skills: SKILLS,
};
