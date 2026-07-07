import { Project } from "@/types/portfolio";

/**
 * Projects portfolio data - Case Study Format
 * Designed for both business stakeholders and technical evaluators
 */
export const PROJECTS: Project[] = [
  {
    id: "cozee-care",
    title: "Cozee Care - Disability Services Operational Platform",
    clientSector: "Disability Services & Healthcare (Australia)",
    businessProblem: "The client relied on manual, disjointed processes for scheduling and tracking sensitive patient workflows, causing operational bottlenecks and increasing data vulnerability risks in a highly regulated healthcare environment.",
    businessOutcome: "Engineered an enterprise-grade internal management platform that completely automated scheduling and streamlined data handling, reducing manual scheduling errors to zero while ensuring full compliance with Australian disability service standards.",
    technicalArchitecture: "Built using Next.js for high accessibility standards (WCAG 2.1 AA compliance) and NestJS with PostgreSQL for concurrent API operations. Implemented strict role-based access control (RBAC) via JWT authentication and NestJS Guards to protect high-confidentiality healthcare records. Designed database schema to handle sensitive patient data with proper encryption at rest and in transit.",
    metrics: [
      "100% data confidentiality maintained",
      "Automated daily operational workflows",
      "Zero-trust RBAC integration",
      "WCAG 2.1 AA accessibility compliance",
      "Zero manual scheduling errors"
    ],
    tags: ["Next.js", "NestJS", "PostgreSQL", "JWT", "RBAC", "Healthcare Compliance"],
    imageUrl: "/images/projects/cozee-care.png",
    liveUrl: "https://www.cozeecare.com.au/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "violina-pflegedienst",
    title: "Violina Pflegedienst - Ambulatory Care Management Platform",
    clientSector: "Outpatient Healthcare (Germany)",
    businessProblem: "The healthcare provider struggled with unoptimized service presentations and chaotic patient scheduling data, isolating non-technical end-users and creating barriers to care access in the local German market.",
    businessOutcome: "Launched a specialized platform enhancing local patient engagement and structuring care service requests into a clean digital funnel, resulting in accelerated patient scheduling cycles and improved care accessibility.",
    technicalArchitecture: "Leveraged Next.js Server Components for optimized performance and SEO targeting German healthcare market. Connected to a lightweight, highly secure NestJS backend to route care service inquiries without exposing sensitive data. Implemented responsive design optimized for elderly users with larger touch targets and clear navigation patterns.",
    metrics: [
      "Accelerated patient scheduling cycle",
      "Enhanced localized digital presence in Germany",
      "Optimized accessible UI for eldercare interactors",
      "SEO-optimized for local healthcare search"
    ],
    tags: ["Next.js", "Server Components", "NestJS", "Responsive Design", "Accessibility"],
    imageUrl: "/images/projects/violina.png",
    liveUrl: "https://violina-pflegedienst.de",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "taqwa-group",
    title: "Taqwa Group - Vertical SaaS Plot & Land Sales Engine",
    clientSector: "Real Estate & Asset Logistics",
    businessProblem: "Complex plot inventory tracking and unoptimized heavy search queries were degrading backend response times during customer land lookups, causing lost sales opportunities and frustrated user experiences.",
    businessOutcome: "Architected a custom Vertical SaaS system capable of fluid, lightning-fast real estate inventory matching and secure transaction logging, enabling the business to scale operations without technical limitations.",
    technicalArchitecture: "Utilized Next.js for the responsive interface and NestJS with Prisma ORM for type-safe database persistence. Integrated Redis for efficient state management and caching of heavy query workloads, achieving sub-100ms response times. Implemented database indexing strategies and query optimization for complex land search filters.",
    metrics: [
      "Sub-100ms inventory query execution via Redis",
      "100% data transactional integrity across plots",
      "Eliminated manual tracking spreadsheets",
      "Zero-downtime deployment during peak traffic"
    ],
    tags: ["Next.js", "NestJS", "Prisma ORM", "Redis", "PostgreSQL", "Vertical SaaS"],
    imageUrl: "/images/projects/taqwa-group.png",
    liveUrl: "https://taqwagroupbd.com",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "online-doctor",
    title: "Online Doctor - Telemedicine Consultation Platform",
    clientSector: "Telemedicine SaaS (Personal Project)",
    businessProblem: "Traditional healthcare channels lack accessible, secure, and real-time remote consultation mechanisms, creating barriers for patients seeking timely medical advice and reducing healthcare provider efficiency.",
    businessOutcome: "Engineered a high-availability telemedicine infrastructure supporting direct end-to-end user audio/video consulting with integrated payment processing, enabling healthcare providers to scale their services beyond geographic limitations.",
    technicalArchitecture: "Implemented MERN stack (MongoDB, Express, React, Node.js) for rapid development and deployment. Leveraged WebRTC for peer-to-peer video streaming and Socket.io for low-latency bi-directional real-time synchronization. Integrated Stripe API for automated invoicing and deployed on Microsoft Azure for cloud-native scaling with global CDN distribution.",
    metrics: [
      "Real-time synchronization using Socket.io",
      "WebRTC HD video consultation",
      "Automated scheduling flow with Stripe",
      "Cloud-native scaling on Azure",
      "Sub-500ms latency for chat and video"
    ],
    tags: ["WebRTC", "Socket.io", "Stripe", "Azure", "MongoDB", "Express", "React"],
    imageUrl: "/images/projects/telemedicine.png",
    liveUrl: "https://odcp.vercel.app",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "fcsc-healthcare",
    title: "FCSC Healthcare Portal",
    clientSector: "Healthcare & Medical Services",
    businessProblem: "Healthcare facility needed a modern digital presence to showcase services, provide patient resources, and streamline appointment booking processes in an increasingly competitive local healthcare market.",
    businessOutcome: "Delivered a professional healthcare portal that improved patient information accessibility and established a strong digital foundation for future telehealth integration.",
    technicalArchitecture: "Built using Next.js with static generation for optimal performance and Core Web Vitals. Implemented responsive design with healthcare-focused UX patterns including clear service navigation and accessible appointment request forms. Added structured data for enhanced local SEO visibility.",
    metrics: [
      "95+ Google PageSpeed score",
      "Sub-2s initial page load",
      "SEO-optimized for local healthcare searches",
      "Mobile-first responsive design"
    ],
    tags: ["Next.js", "Static Generation", "SEO", "Responsive Design", "Healthcare UX"],
    imageUrl: "/images/projects/fcsc.png",
    liveUrl: "https://fcsc-nids.vercel.app/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "ndis-careplus",
    title: "NDIS CarePlus Website",
    clientSector: "Disability Services (Australia)",
    businessProblem: "NDIS service provider needed a professional web presence to clearly communicate service offerings to participants and families navigating Australia's National Disability Insurance Scheme.",
    businessOutcome: "Created a clear, accessible website that effectively communicates complex NDIS services and improves information accessibility for participants and their families.",
    technicalArchitecture: "Developed using Next.js with focus on accessibility (WCAG compliance) and clear information architecture. Implemented simplified navigation for users with varying digital literacy. Added comprehensive FAQ sections and clear contact pathways for service inquiries.",
    metrics: [
      "WCAG accessibility compliant",
      "Clear service information architecture",
      "Optimized for NDIS-related searches",
      "Mobile-responsive for all devices"
    ],
    tags: ["Next.js", "Accessibility", "Information Architecture", "NDIS Services"],
    imageUrl: "/images/projects/award-care.png",
    liveUrl: "https://award-care-landing.vercel.app/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "procourier",
    title: "ProCourier - Logistics Platform",
    clientSector: "Logistics & Supply Chain",
    businessProblem: "Logistics company needed a digital platform to manage shipments, track deliveries, and provide customers with real-time visibility into their package locations and delivery status.",
    businessOutcome: "Delivered a comprehensive logistics platform that improved operational efficiency and customer satisfaction through transparent shipment tracking and automated delivery notifications.",
    technicalArchitecture: "Built using Next.js with TypeScript for type safety across the application. Implemented real-time tracking updates and automated pricing calculations for complex shipping scenarios. Created responsive dashboards for both customers and administrators with different permission levels.",
    metrics: [
      "Real-time shipment tracking",
      "Automated pricing calculations",
      "Responsive dashboard interface",
      "Multi-user role management"
    ],
    tags: ["Next.js", "TypeScript", "Logistics", "Real-time Tracking", "Dashboards"],
    imageUrl: "/images/projects/procourier.png",
    liveUrl: "https://procourier.vercel.app",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "travellast",
    title: "TravelLast - Travel Booking System",
    clientSector: "Travel & Hospitality",
    businessProblem: "Travel booking platform needed to showcase accommodations, manage property listings, and provide seamless booking experiences for travelers seeking hotels, resorts, and holiday rentals.",
    businessOutcome: "Created an intuitive travel platform that simplified property discovery and booking, improving user engagement and conversion rates for listed properties.",
    technicalArchitecture: "Developed using React with integrated API connections for property data. Implemented advanced search and filtering capabilities for finding accommodations by location, amenities, and pricing. Built responsive property cards with detailed information displays and booking integration.",
    metrics: [
      "Advanced property search and filtering",
      "Responsive property showcase",
      "Integrated booking system",
      "Cross-platform compatibility"
    ],
    tags: ["React", "API Integration", "Search & Filtering", "Booking System"],
    imageUrl: "/images/projects/travellast.png",
    liveUrl: "https://travellast.netlify.app",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "4j-traders",
    title: "4j Traders (E-Commerce Engine)",
    clientSector: "B2B/B2C Retail & E-Commerce",
    businessProblem: "Unoptimized database schema and lack of transactional isolation levels caused inventory sync errors and order drops during high-traffic flash sales.",
    businessOutcome: "Guaranteed 100% order transactional integrity and automated multi-tenant system deployments while establishing clear administrative boundaries.",
    technicalArchitecture: "Engineered with NestJS, PostgreSQL, and Prisma ORM utilizing strict ACID transaction protocols. Implemented custom NestJS Guards for multi-role RBAC and containerized the system with Docker and GitHub Actions.",
    metrics: [
      "100% transactional integrity across all order checkouts",
      "Reduced deployment cycle down to minutes via Docker",
      "Granular RBAC architecture implemented safely"
    ],
    tags: ["NestJS", "PostgreSQL", "Prisma", "Docker", "GitHub Actions"],
    imageUrl: "/images/projects/4j-traders.png",
    liveUrl: "https://4jtraders.com",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "rushkat",
    title: "Rushkat (3D Asset Store Backend)",
    clientSector: "Digital Asset Marketplace & Creative Tech (South Korea)",
    businessProblem: "Sluggish query execution and unoptimized database reads caused significant latency spikes when concurrent users accessed heavy 3D files.",
    businessOutcome: "Drastically slashed endpoint response times and accelerated data retrieval pipelines under heavy concurrent traffic loads.",
    technicalArchitecture: "Designed and optimized RESTful APIs using TypeScript and Express.js. Managed PostgreSQL persistence layer with Prisma ORM and integrated Redis caching to offload repetitive high-traffic database queries.",
    metrics: [
      "Redis caching integration for sub-100ms API response",
      "Optimized complex SQL query parsing for large datasets",
      "Robust security protocols and endpoint rate-limiting implemented"
    ],
    tags: ["Express.js", "PostgreSQL", "Prisma", "Redis", "Performance Optimization"],
    imageUrl: "",
    liveUrl: "#",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "restaurant-hub",
    title: "Restaurant Hub (Food Delivery)",
    clientSector: "On-Demand Food Tech Marketplace",
    businessProblem: "Sluggish client-side cart states and unstructured multi-vendor filtering resulted in high user drop-off rates during checkout.",
    businessOutcome: "Accelerated the dynamic ordering loop, providing users with frictionless multi-vendor category filtering and deterministic cart tracking.",
    technicalArchitecture: "Designed with React and Redux for strict client-side state consistency across volatile cart mutations, communicating with a scalable Node.js API framework.",
    metrics: [
      "Fluid multi-vendor catalog indexing",
      "Deterministic state tracking via Redux pipeline",
      "Streamlined mobile cart navigation logic"
    ],
    tags: ["React", "Redux", "Node.js"],
    imageUrl: "/images/projects/restaurant-hub.png",
    liveUrl: "https://restaurant-hubbd.vercel.app",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "minishop",
    title: "MiniShop (Fashion Storefront)",
    clientSector: "Digital Retail & Fashion",
    businessProblem: "Clunky mobile navigation pipelines hindered clean checkouts on standard portable device displays.",
    businessOutcome: "Created an ultra-sleek, rapid retail interface focusing strictly on minimizing consumer checkout steps.",
    technicalArchitecture: "Lightweight single-page application engineered with React and pure CSS3 utility tokens, compiled for instantaneous static deployments on Netlify.",
    metrics: [
      "Frictionless mobile checkout interface layout",
      "Light bundle size for immediate client edge delivery",
      "Pure responsive CSS utility grid compliance"
    ],
    tags: ["React", "CSS3", "Netlify"],
    imageUrl: "/images/projects/minishop.png",
    liveUrl: "https://minishopbd.netlify.app",
    codeUrl: "https://github.com/sahadcse",
  },
];
