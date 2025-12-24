import { Github, Linkedin, Mail, Server, Database, Cloud, Code, Terminal, Cpu, Globe, Layers } from "lucide-react";

export const SITE_CONFIG = {
  name: "SAHAD",
  title: "Software Engineer | Backend & Real-Time Systems",
  description: "Full-Stack Software Engineer specializing in NestJS, Next.js, and Cloud Infrastructure.",
  email: "sahaduzzaman.cse@gmail.com",
  socials: {
    github: "https://github.com/sahadcse", // Placeholder
    linkedin: "https://linkedin.com/in/sahadcse", // Placeholder
  },
};

export const HERO_CONTENT = {
  headline: "I build robust and scalable software solutions for modern businesses.",
  subHeadline: "Full-Stack Software Engineer specializing in NodeJS, NestJS, Next.js, and Cloud Infrastructure.",
};

export const ABOUT_CONTENT = {
  bio: [
    "I'm a software engineer dedicated to creating high-performance, scalable solutions that improve user experience and drive business success. With 3+ years of experience in JavaScript, TypeScript, DevOps, and cloud technologies, I excel at transforming complex problems into streamlined systems, delivering impactful solutions that meet both technical and business needs. Whether leading teams or coding hands-on, my passion for innovation and results shines through.",
    "Software Engineer with experience building scalable, high-performance full-stack applications and REST APIs using TypeScript (NestJS, Express) and Next.js/React. Experienced in designing containerized architectures, optimizing PostgreSQL and MongoDB, and deploying cloud-native solutions using Docker, Azure, and GitHub Actions. Proven ability to improve system performance by implementing centralized query structures, granular RBAC security, and automating CI/CD workflows."
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "4j Traders Ltd",
      location: "Dhaka, Bangladesh",
      period: "July 2025 - Dec 2025",
      description: [
        "Engineered and deployed a scalable, containerized backend (NestJS/PostgreSQL/Prisma) for a high-value e-commerce platform, handling product inventory, complex user roles (superAdmin, admin, customer), and ensuring transactional integrity for all order processes.",
        "Optimized core database performance by implementing a centralized query structure and performing schema normalization, which prepared the system for high-volume data operations across products, projects, and orders.",
        "Developed and secured a full project management CRUD API that allows administrators to dynamically publish interior design case studies and manage media assets, restricting access based on granular RBAC (Role-Based Access Control) enforced via JWT authentication and NestJS Guards.",
        "Established robust DevOps and CI/CD pipelines using Docker and GitHub Actions, drastically improving deployment reliability and enabling consistent environment setup (Local, Staging, Production) for future team collaboration."
      ]
    },
    {
      role: "Backend Engineer",
      company: "Rushkat Company Ltd",
      location: "Remote [South Korea]",
      period: "Oct 2024 - Jun 2025",
      description: [
        "Developed and optimized scalable backend services for a 3D asset store using TypeScript, Express.js, and Prisma ORM, significantly improving system performance through strategic code refactoring.",
        "Designed and implemented RESTful APIs for asset management and user interactions; managed PostgreSQL DB and integrated Redis to accelerate high-traffic endpoints.",
        "Ensured production readiness by implementing robust security protocols, collaborating with cross-functional teams to deliver key features, and conducting thorough testing and performance tuning."
      ]
    }
  ],
  education: [
    {
      degree: "BSc in Computer Science and Engineering",
      institution: "DIU",
      period: "May 2021 - Jan 2025",
      description: "Completed 148 credits with strong academic performance. Focused on core areas like algorithms, databases, Networking, web systems, AI, and software engineering."
    }
  ],
  skills: [
    "JavaScript", "Python", "DSA", "Azure", "Docker", "React", "NextJS", "TypeScript", "NodeJS", "Express", "NestJS", "MongoDB", "PostgreSQL", "Redis", "WebRTC", "Socket.io", "Stripe", "VPS", "DevOps", "CI/CD",
    "Communication", "Teamwork", "Problem-solving", "Leadership", "Time Management", "Critical Thinking"
  ]
};

export const TECH_STACK = [
  { name: "JavaScript", icon: Code },
  { name: "Python", icon: Terminal },
  { name: "Docker", icon: Layers },
  { name: "Next.js", icon: Globe },
  { name: "TypeScript", icon: Code },
  { name: "Node.js", icon: Server },
  { name: "NestJS", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Redis", icon: Database },
  { name: "Azure", icon: Cloud },
];

export const PROJECTS = [
  {
    id: "4j-traders",
    title: "4j Traders (E-Commerce)",
    description: "Engineered a scalable, containerized backend using NestJS/PostgreSQL. Managed complex user roles (SuperAdmin, Customer) and ensured 100% transactional integrity. Setup CI/CD with GitHub Actions.",
    details: "A comprehensive e-commerce backend built with scalability and reliability in mind. The system handles complex inventory management, order processing, and user authentication with role-based access control. It features a robust database schema designed for high-volume transactions and seamless integration with payment gateways.",
    features: [
      "Role-Based Access Control (RBAC)",
      "Transactional Integrity with ACID compliance",
      "Containerized deployment with Docker",
      "Automated CI/CD pipelines via GitHub Actions",
      "Real-time order status updates",
    ],
    tags: ["NestJS", "PostgreSQL", "Docker", "GitHub Actions"],
    liveUrl: "https://4jtraders.com",
    codeUrl: "https://github.com/sahadcse", // Placeholder
  },
  {
    id: "procourier",
    title: "ProCourier (Logistics Platform)",
    description: "A comprehensive logistics and delivery management platform via ProCourier. Features real-time tracking, tiered pricing, and global shipping management.",
    details: "ProCourier streamlines global logistics with an intuitive booking system, shipment tracking, and automated cost calculation. It supports multiple user roles including customers and administrators for managing the delivery lifecycle.",
    features: [
      "Real-time Shipment Tracking",
      "Automated Cost Calculation",
      "Tiered Pricing Plans",
      "Global Delivery Management",
      "Admin Dashboard"
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://procourier.vercel.app",
    codeUrl: "https://github.com/sahadcse", // Placeholder
  },
  {
    id: "online-doctor",
    title: "Online Doctor Consultation Platform",
    description: "Built a real-time telemedicine app using WebRTC and Socket.io. Integrated Stripe for secure payments and Azure for hosting.",
    details: "A complete telemedicine solution enabling remote doctor-patient consultations. The platform utilizes WebRTC for high-quality video calls and Socket.io for real-time messaging. It integrates secure payment processing and appointment scheduling to provide a seamless healthcare experience.",
    features: [
      "Real-time Video Consultation via WebRTC",
      "Instant Messaging with Socket.io",
      "Secure Payment Integration (Stripe)",
      "Appointment Scheduling System",
      "Electronic Health Record (EHR) integration",
    ],
    tags: ["WebRTC", "Socket.io", "Stripe", "Azure"],
    liveUrl: "https://odcp.vercel.app",
    codeUrl: "https://github.com/sahadcse", // Placeholder
  },
  {
    id: "rushkat",
    title: "Rushkat (3D Asset Store)",
    description: "Optimized backend performance for a high-traffic asset store. Implemented Redis caching and improved database queries to handle heavy load.",
    details: "A high-performance backend solution for a 3D asset marketplace. The project focused on optimizing query performance and implementing caching strategies to handle concurrent users downloading large assets. It includes a custom content delivery system and secure file handling protocols.",
    features: [
      "Redis Caching for high-speed data retrieval",
      "Optimized SQL queries for large datasets",
      "Secure file upload and download management",
      "Scalable infrastructure layout",
      "Rate limiting and DDoS protection",
    ],
    tags: ["NestJS", "Redis", "Performance Optimization"],
    liveUrl: "#",
    codeUrl: "https://github.com/sahadcse", // Placeholder
  },
  {
    id: "restaurant-hub",
    title: "Restaurant Hub (Food Delivery)",
    description: "Multi-vendor restaurant platform facilitating seamless food ordering and delivery services with category browsing and cart management.",
    details: "An aggregator platform that connects customers with local restaurants. Features include category-based browsing, cart management, and a streamlined checkout process for an optimized food ordering experience.",
    features: [
      "Multi-vendor Listings",
      "Category Filtering",
      "Cart & Checkout System",
      "Responsive Design",
      "User Accounts"
    ],
    tags: ["React", "Redux", "Node.js"],
    liveUrl: "https://restaurant-hubbd.vercel.app",
    codeUrl: "https://github.com/sahadcse", // Placeholder
  },
  {
    id: "travellast",
    title: "TravelLast (Booking System)",
    description: "A travel booking platform offering comprehensive options for hotels, resorts, and holiday rentals with destination highlights.",
    details: "Designed to simplify travel planning, this platform allows users to explore and book various accommodations. It features listed properties, destination highlights, and exclusive offers for travelers.",
    features: [
      "Hotel & Resort Booking",
      "Destination Search",
      "Exclusive Offers",
      "Property Listings",
      "Responsive Layout"
    ],
    tags: ["React", "Netlify", "API Integration"],
    liveUrl: "https://travellast.netlify.app",
    codeUrl: "https://github.com/sahadcse", // Placeholder
  },
  {
    id: "minishop",
    title: "MiniShop (E-Commerce)",
    description: "A modern, responsive e-commerce application focused on fashion and footwear retail with a sleek UI.",
    details: "A sleek online store interface featuring product collections, new arrivals, and promotional campaigns. It ensures a smooth shopping experience with secure payment integration support and user-friendly navigation.",
    features: [
      "Product Collections",
      "Responsive UI",
      "Shopping Cart",
      "Featured Products",
      "Promotional Banners"
    ],
    tags: ["React", "CSS3", "Netlify"],
    liveUrl: "https://minishopbd.netlify.app",
    codeUrl: "https://github.com/sahadcse", // Placeholder
  },
  {
    id: "sahad-old",
    title: "Legacy Portfolio",
    description: "Previous portfolio website showcasing early development work and projects.",
    details: "My earlier portfolio site demonstrating the progression of my design and development skills. It serves as an archive of my initial projects and professional milestones.",
    features: [
      "Portfolio Showcase",
      "About Section",
      "Contact Info",
      "Responsive Design"
    ],
    tags: ["React", "Vite", "CSS"],
    liveUrl: "https://sahad.vercel.app",
    codeUrl: "https://github.com/sahadcse", // Placeholder
  },
  {
    id: "taqwa-group",
    title: "Taqwa Group BD",
    description: "Official corporate website for Taqwa Group BD built with Next.js, showcasing business units and services.",
    details: "A modern corporate platform designed to represent the diverse business portfolio of Taqwa Group. Built using Next.js for high performance and SEO optimization.",
    features: [
      "Corporate Portfolio",
      "Dynamic Content Management",
      "Responsive UI",
      "Contact System"
    ],
    tags: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://taqwagroupbd.com",
    codeUrl: "https://github.com/sahadcse", // Placeholder
  }
];
