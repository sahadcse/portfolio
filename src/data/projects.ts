import { Project } from "@/types/portfolio";

/**
 * Projects portfolio data — case-study system (plan §9).
 *
 * Curation (§15.2 V2-10): 3 flagships (full §9.1 template) + 5 supporting
 * (light) + 4 archived demos (routes kept, off the index and sitemap).
 * Evidence tiers per §9.2 — exactly one per case study. Taqwa Group is
 * employment-tier work (recorded finding #1: employer, not a client).
 *
 * Every outcome carries a `basis` stating how it is known; mechanisms are
 * stated instead of unverifiable numbers (claims dispositions §9.6).
 */
export const PROJECTS: Project[] = [
  {
    id: "cozee-care",
    title: "Cozee Care — Disability Services Operational Platform",
    shortTitle: "Cozee Care",
    clientSector: "Disability Services (Australia)",
    sectorShort: "Disability services",
    status: "flagship",
    evidenceLevel: "client-system",
    role: "Solo engineer — architecture, build, and deployment",
    timeframe: "2025",
    businessProblem:
      "The client relied on manual, disjointed processes for scheduling and tracking sensitive patient workflows, causing operational bottlenecks and increasing data vulnerability risks in a highly regulated healthcare environment.",
    businessOutcome:
      "Engineered an internal management platform that automated scheduling and streamlined data handling for daily operations in a regulated disability-services environment, alongside the client's public website.",
    oneLineOutcome:
      "Automated the scheduling workflow end to end behind a public site live at cozeecare.com.au.",
    technicalArchitecture:
      "Built using Next.js to meet WCAG 2.1 AA accessibility criteria and NestJS with PostgreSQL for concurrent API operations. Implemented strict role-based access control (RBAC) via JWT authentication and NestJS Guards to protect high-confidentiality healthcare records. Designed database schema to handle sensitive patient data with proper encryption at rest and in transit.",
    constraints:
      "Australian disability-services context: sensitive participant records, strict confidentiality expectations, and staff using the system on low-end devices — accessibility and data protection were hard requirements, not nice-to-haves.",
    decisions: [
      {
        decision: "Route-level authorization with NestJS Guards and JWT",
        because:
          "role boundaries had to protect health records at every endpoint by default, rather than relying on per-page checks that silently rot.",
      },
      {
        decision: "PostgreSQL with a relational schema over a document store",
        because:
          "scheduling relationships and audit trails need transactions and constraints to stay consistent under concurrent use.",
      },
      {
        decision: "Next.js server rendering with WCAG 2.1 AA as the build target",
        because:
          "care staff work on low-end devices and assistive technology must work from day one — client-side-only rendering would have compromised both.",
      },
    ],
    screenshots: [
      {
        src: "/images/projects/cozee-care.webp",
        alt: "Cozee Care website homepage with NDIS Registered Provider badge and service overview",
        caption: "Fig. 01 — Cozee Care public site. The operational platform is internal to the client.",
      },
    ],
    metrics: [
      "Role-based access control over sensitive records (JWT + NestJS Guards)",
      "End-to-end automation of the scheduling workflow",
      "Built to WCAG 2.1 AA accessibility criteria",
      "Sensitive data protected in transit and at rest",
    ],
    outcomes: [
      {
        statement: "Scheduling workflow automated end to end",
        basis: "delivered system capability, in production use by the client",
      },
      {
        statement: "Isolated role-based access to sensitive participant records",
        basis: "part of the delivered architecture (JWT + NestJS Guards)",
      },
      {
        statement: "Public site live at cozeecare.com.au",
        basis: "live-URL verification, 2026-10",
      },
    ],
    tags: ["Next.js", "NestJS", "PostgreSQL", "JWT", "RBAC", "Healthcare Compliance"],
    imageUrl: "/images/projects/cozee-care.webp",
    cardImageUrl: "/images/projects/cozee-care-card.webp",
    ogImageUrl: "/images/projects/cozee-care-og.jpg",
    liveUrl: "https://www.cozeecare.com.au/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "violina-pflegedienst",
    title: "Violina Pflegedienst — Ambulatory Care Platform",
    shortTitle: "Violina Pflegedienst",
    clientSector: "Outpatient Healthcare (Germany)",
    sectorShort: "Healthcare",
    status: "flagship",
    evidenceLevel: "client-system",
    role: "Solo engineer — design implementation, build, and deployment",
    timeframe: "2025",
    businessProblem:
      "The healthcare provider struggled with unoptimized service presentations and chaotic patient scheduling data, isolating non-technical end-users and creating barriers to care access in the local German market.",
    businessOutcome:
      "Launched a specialized platform that structures care service requests into a clear digital funnel, making services easier to find and request for patients and their families.",
    oneLineOutcome:
      "Turned a German ambulatory-care provider's services into a clear digital request funnel for patients and families.",
    technicalArchitecture:
      "Leveraged Next.js Server Components for optimized performance and SEO targeting the German healthcare market. Connected to a lightweight, highly secure NestJS backend to route care service inquiries without exposing sensitive data. Implemented responsive design optimized for elderly users with larger touch targets and clear navigation patterns.",
    constraints:
      "German ambulatory-care market: the audience is largely elderly and non-technical, content is German-language, and local search visibility drives how families find care providers.",
    decisions: [
      {
        decision: "Next.js Server Components over client-side data fetching",
        because:
          "the German healthcare search traffic the client depends on needs fast first paints and crawlable content, not a client-side waterfall.",
      },
      {
        decision: "A lightweight NestJS routing layer over a heavier service mesh",
        because:
          "the inquiry funnel is structurally simple — a small, auditable backend keeps the security surface minimal.",
      },
      {
        decision: "Elderly-first interaction design (larger touch targets, flat navigation)",
        because:
          "the primary users are patients and their families, often under stress — clarity outranks visual novelty.",
      },
    ],
    screenshots: [
      {
        src: "/images/projects/violina.webp",
        alt: "Violina Pflegedienst website with German navigation and care service introduction",
        caption: "Fig. 01 — Violina Pflegedienst, German-language care service platform.",
      },
    ],
    metrics: [
      "Care-service requests structured into a clear digital funnel",
      "Localized German-language web presence",
      "Accessible UI designed for elderly users",
      "Technical SEO foundations for local healthcare search",
    ],
    outcomes: [
      {
        statement: "Care-service requests structured into a clear digital funnel",
        basis: "delivered system capability, visible in the live product",
      },
      {
        statement: "Live at violina-pflegedienst.de",
        basis: "live-URL verification, 2026-10",
      },
    ],
    tags: ["Next.js", "Server Components", "NestJS", "Responsive Design", "Accessibility"],
    imageUrl: "/images/projects/violina.webp",
    cardImageUrl: "/images/projects/violina-card.webp",
    ogImageUrl: "/images/projects/violina-og.jpg",
    liveUrl: "https://violina-pflegedienst.de",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "taqwa-group",
    title: "Taqwa Group — Land Sales & Plot Booking Engine",
    shortTitle: "Taqwa Group",
    clientSector: "Real Estate (Bangladesh)",
    sectorShort: "Real estate",
    status: "flagship",
    evidenceLevel: "employment",
    role: "Software engineer (Taqwa Group) — platform backend and admin tooling",
    timeframe: "Feb 2024 – Aug 2025",
    businessProblem:
      "Complex plot inventory tracking and unoptimized heavy search queries were degrading backend response times during customer land lookups, causing lost sales opportunities and frustrated user experiences.",
    businessOutcome:
      "Architected an internal vertical SaaS system for real estate inventory matching and secure transaction logging, replacing manual spreadsheet tracking and enabling the business to scale operations without technical limitations.",
    oneLineOutcome:
      "Replaced spreadsheet-driven plot tracking with a shared system: inventory search, installment calculation, and transactional sales logging.",
    technicalArchitecture:
      "Utilized Next.js for the responsive interface and NestJS with Prisma ORM for type-safe database persistence. Integrated Redis for caching of heavy query workloads. Implemented database indexing strategies and query optimization for complex land search filters.",
    constraints:
      "In-house platform for a real-estate business that previously ran on spreadsheets: non-technical admin staff, heavy inventory search over land plots, and installment-based sales that needed reliable transactional records.",
    decisions: [
      {
        decision: "Redis caching over raw database reads for hot inventory queries",
        because:
          "land-search filters hit the same heavy joins repeatedly during sales hours — caching absorbs the load without weakening consistency for writes.",
      },
      {
        decision: "Prisma ORM with deliberate indexing over raw SQL strings",
        because:
          "type-safe queries caught schema drift at build time while the team was still small and moving fast.",
      },
      {
        decision: "Transactional logging for plot sales over status-field updates",
        because:
          "installment sales need an auditable sequence of events, not a mutable state that can't answer 'what happened'.",
      },
    ],
    screenshots: [
      {
        src: "/images/projects/taqwa-group.webp",
        alt: "Taqwa Group website with land plot booking interface",
        caption: "Fig. 01 — Taqwa Group public site; the booking engine is the internal system behind it.",
      },
    ],
    metrics: [
      "Redis caching for hot inventory queries",
      "Database indexing for complex land-search filters",
      "Replaced manual spreadsheet tracking with a shared system",
      "Transactional logging for plot sales",
    ],
    outcomes: [
      {
        statement: "Spreadsheet tracking replaced by a shared platform (inventory, booking, installments, admin dashboard)",
        basis: "delivered employment work in daily operational use",
      },
      {
        statement: "Public business site live at taqwagroupbd.com",
        basis: "live-URL verification, 2026-10",
      },
    ],
    tags: ["Next.js", "NestJS", "Prisma ORM", "Redis", "PostgreSQL", "Vertical SaaS"],
    imageUrl: "/images/projects/taqwa-group.webp",
    cardImageUrl: "/images/projects/taqwa-group-card.webp",
    ogImageUrl: "/images/projects/taqwa-group-og.jpg",
    liveUrl: "https://taqwagroupbd.com",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "online-doctor",
    title: "Online Doctor — Telemedicine Consultation Platform",
    clientSector: "Telemedicine (Own Product)",
    sectorShort: "Telemedicine",
    status: "supporting",
    evidenceLevel: "own-production",
    role: "Solo founder-engineer — product, architecture, and build",
    businessProblem:
      "Traditional healthcare channels lack accessible, secure, and real-time remote consultation mechanisms, creating barriers for patients seeking timely medical advice and reducing healthcare provider efficiency.",
    businessOutcome:
      "Engineered a telemedicine infrastructure supporting direct end-to-end user audio/video consulting with integrated payment processing, deployed as a working product preview.",
    oneLineOutcome:
      "Own product: real-time video consultations with scheduling and payments, live as a deployable preview.",
    technicalArchitecture:
      "Implemented MERN stack (MongoDB, Express, React, Node.js) for rapid development and deployment. Leveraged WebRTC for peer-to-peer video streaming and Socket.io for low-latency bi-directional real-time synchronization. Integrated Stripe API for automated invoicing and deployed on Microsoft Azure for cloud-native scaling with global CDN distribution.",
    metrics: [
      "Real-time synchronization using Socket.io",
      "WebRTC video consultation",
      "Automated scheduling flow with Stripe",
      "Cloud-native deployment on Azure",
    ],
    tags: ["WebRTC", "Socket.io", "Stripe", "Azure", "MongoDB", "Express", "React"],
    imageUrl: "/images/projects/telemedicine.webp",
    cardImageUrl: "/images/projects/telemedicine-card.webp",
    ogImageUrl: "/images/projects/telemedicine-og.jpg",
    liveUrl: "https://odcp.vercel.app",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "fcsc-healthcare",
    title: "FCSC Healthcare Portal",
    clientSector: "Healthcare Services",
    sectorShort: "Healthcare",
    status: "supporting",
    evidenceLevel: "client-site",
    role: "Solo engineer — build and deployment",
    businessProblem:
      "Healthcare facility needed a modern digital presence to showcase services, provide patient resources, and streamline appointment booking processes in an increasingly competitive local healthcare market.",
    businessOutcome:
      "Delivered a professional healthcare portal that improved patient information accessibility and established a strong digital foundation for future telehealth integration.",
    oneLineOutcome:
      "Performance-budgeted healthcare portal with structured data and accessible appointment requests.",
    technicalArchitecture:
      "Built using Next.js with static generation for optimal performance and Core Web Vitals. Implemented responsive design with healthcare-focused UX patterns including clear service navigation and accessible appointment request forms. Added structured data for enhanced local SEO visibility.",
    metrics: [
      "Performance-budgeted build with static generation",
      "Structured data for local SEO",
      "Mobile-first responsive design",
      "Accessible appointment request flows",
    ],
    tags: ["Next.js", "Static Generation", "SEO", "Responsive Design", "Healthcare UX"],
    imageUrl: "/images/projects/fcsc.webp",
    cardImageUrl: "/images/projects/fcsc-card.webp",
    ogImageUrl: "/images/projects/fcsc-og.jpg",
    liveUrl: "https://fcsc-nids.vercel.app/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "ndis-careplus",
    title: "Award Care — NDIS Services Website",
    shortTitle: "Award Care",
    clientSector: "Disability Services (Australia)",
    sectorShort: "Disability services",
    status: "supporting",
    evidenceLevel: "client-site",
    role: "Solo engineer — build and deployment",
    ongoing: true,
    businessProblem:
      "NDIS service provider needed a professional web presence to clearly communicate service offerings to participants and families navigating Australia's National Disability Insurance Scheme.",
    businessOutcome:
      "Created a clear, accessible website that effectively communicates complex NDIS services and improves information accessibility for participants and their families.",
    oneLineOutcome:
      "Accessible NDIS service website with clear information architecture for participants and families.",
    technicalArchitecture:
      "Developed using Next.js with focus on accessibility (WCAG compliance) and clear information architecture. Implemented simplified navigation for users with varying digital literacy. Added comprehensive FAQ sections and clear contact pathways for service inquiries.",
    metrics: [
      "Built to WCAG accessibility criteria",
      "Clear service information architecture",
      "Mobile-responsive across devices",
    ],
    tags: ["Next.js", "Accessibility", "Information Architecture", "NDIS Services"],
    imageUrl: "/images/projects/award-care.webp",
    cardImageUrl: "/images/projects/award-care-card.webp",
    ogImageUrl: "/images/projects/award-care-og.jpg",
    liveUrl: "https://award-care-landing.vercel.app/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "midpac-charter-intake",
    title: "Mid-Pacific Jets — Charter Intake Concept",
    shortTitle: "Mid-Pacific Charter Intake",
    clientSector: "Private Aviation (Concept Prototype)",
    sectorShort: "Aviation",
    status: "supporting",
    evidenceLevel: "demo",
    role: "Solo engineer — concept, design, and build",
    ongoing: true,
    businessProblem:
      "Charter customers need a structured way to describe a private-flight mission — route, timing, and passenger load — before talking to a charter desk.",
    businessOutcome:
      "Designed a five-step intake concept that turns a flight brief into a clean, hand-off-ready summary — explicitly a prototype, not connected to any operator's systems.",
    oneLineOutcome:
      "Five-step charter-request intake prototype: mission, route, and passengers distilled into a hand-off summary.",
    technicalArchitecture:
      "Deployed as a static preview on Vercel. The form runs entirely client-side — nothing is submitted anywhere — by design.",
    metrics: [
      "Five-step guided intake flow",
      "Client-side only — no data leaves the browser",
      "Explicitly labelled a concept prototype",
    ],
    tags: ["Prototype", "UX Flow", "Aviation"],
    imageUrl: "/images/projects/midpac-charter.webp",
    cardImageUrl: "/images/projects/midpac-charter-card.webp",
    ogImageUrl: "/images/projects/midpac-charter-og.jpg",
    liveUrl: "https://midpac-charter-intake.vercel.app/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "flipo-concept",
    title: "Flipo — Brand Licensing Market Intelligence (Concept)",
    shortTitle: "Flipo",
    clientSector: "Market Intelligence (Concept Prototype)",
    sectorShort: "Market research",
    status: "supporting",
    evidenceLevel: "demo",
    role: "Solo engineer — concept site for Sahad Labs",
    ongoing: true,
    businessProblem:
      "A brand-licensing market-intelligence concept needed a pitch-ready site explaining its methodology — simulated purchase scenarios, audience profiling, and global data extrapolation.",
    businessOutcome:
      "Built the concept site presenting FLIPO's methodology, team, and track record — labelled a Sahad Labs concept prototype throughout.",
    oneLineOutcome:
      "Concept site pitching a brand-licensing intelligence service: methodology, team, and enquiry flow.",
    technicalArchitecture:
      "Deployed as a static concept preview on Vercel under the Sahad Labs prototype label.",
    metrics: [
      "Methodology and track-record presentation",
      "Enquiry flow and FAQ",
      "Labelled a Sahad Labs concept prototype",
    ],
    tags: ["Prototype", "Landing Page", "Concept"],
    imageUrl: "/images/projects/flipo.webp",
    cardImageUrl: "/images/projects/flipo-card.webp",
    ogImageUrl: "/images/projects/flipo-og.jpg",
    liveUrl: "https://flipo-concept.vercel.app/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "hodgkins-bookkeeping",
    title: "Hodgkins Bookkeeping — Program Landing Page",
    shortTitle: "Hodgkins Bookkeeping",
    clientSector: "Financial Services (Demonstration Prototype)",
    sectorShort: "Financial services",
    status: "supporting",
    evidenceLevel: "demo",
    role: "Solo engineer — concept, design, and build",
    ongoing: true,
    businessProblem:
      "A remote bookkeeping service needed a focused landing page for a year-end books-cleanup program: program steps, deliverables, pricing shape, and an inquiry path.",
    businessOutcome:
      "Built the program landing page — steps, deliverables, audience fit, FAQ, and inquiry form — labelled a demonstration prototype.",
    oneLineOutcome:
      "Year-end books-cleanup program page: steps, deliverables, FAQ, and inquiry flow for a Georgia bookkeeping firm.",
    technicalArchitecture:
      "Deployed as a static demonstration prototype on Vercel; the inquiry form is not yet connected to a backend, by prototype design.",
    metrics: [
      "Program steps and deliverables presented",
      "FAQ and audience-fit sections",
      "Explicitly labelled a demonstration prototype",
    ],
    tags: ["Prototype", "Landing Page", "Bookkeeping"],
    imageUrl: "/images/projects/hodgkins.webp",
    cardImageUrl: "/images/projects/hodgkins-card.webp",
    ogImageUrl: "/images/projects/hodgkins-og.jpg",
    liveUrl: "https://hodgkins-bookkeeping.vercel.app/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "glass-cleaning",
    title: "Sea of Glass — Window Cleaning Website",
    shortTitle: "Sea of Glass",
    clientSector: "Home Services (Australia)",
    sectorShort: "Home services",
    status: "supporting",
    evidenceLevel: "client-site",
    role: "Solo engineer — design implementation, build, and deployment",
    ongoing: true,
    businessProblem:
      "A premium window-cleaning business in Northern Rivers, NSW needed a site presenting its commercial, domestic, and accommodation (short-stay turnover) service streams with a clear quote-request path.",
    businessOutcome:
      "Launched a service website covering the three service streams with testimonials, FAQ, and before/after showcases.",
    oneLineOutcome:
      "Three-stream service website with before/after showcases and a quote-request flow for an NSW window-cleaning business.",
    technicalArchitecture:
      "Built with Next.js and deployed on Vercel: responsive service pages, quote-request flow, and locally relevant content for the Byron Bay area.",
    metrics: [
      "Commercial, domestic, and accommodation streams",
      "Quote-request flow",
      "Before/after showcases and FAQ",
    ],
    tags: ["Next.js", "Service Business", "Australia"],
    imageUrl: "/images/projects/glass-cleaning.webp",
    cardImageUrl: "/images/projects/glass-cleaning-card.webp",
    ogImageUrl: "/images/projects/glass-cleaning-og.jpg",
    liveUrl: "https://glass-cleaning.vercel.app/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "omr-portal",
    title: "Online OMR Portal — Exam Platform Landing",
    shortTitle: "OMR Portal",
    clientSector: "Education Technology",
    sectorShort: "Education tech",
    status: "supporting",
    evidenceLevel: "own-production",
    role: "Solo founder-engineer — concept and build",
    ongoing: true,
    businessProblem:
      "Coaching institutes and students need a modern way to run OMR-based practice exams with performance tracking and real-time evaluation management.",
    businessOutcome:
      "Launched the platform landing presence for an online OMR portal — practice exams, performance tracking, and real-time evaluation management. Product build ongoing.",
    oneLineOutcome:
      "Landing presence for an online OMR exam platform — practice, tracking, and real-time evaluation. Build ongoing.",
    technicalArchitecture:
      "Deployed on Vercel. The landing presence is live; the product itself is under active development.",
    metrics: [
      "Practice-exam platform positioning",
      "Performance tracking and evaluation messaging",
    ],
    tags: ["EdTech", "Landing Page", "Ongoing"],
    imageUrl: "/images/projects/omrportal.webp",
    cardImageUrl: "/images/projects/omrportal-card.webp",
    ogImageUrl: "/images/projects/omrportal-og.jpg",
    liveUrl: "https://omrportal.vercel.app/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "landfutter",
    title: "Landfutter — Feed & Pet Supply Website",
    shortTitle: "Landfutter",
    clientSector: "Retail (Germany)",
    sectorShort: "Retail",
    status: "supporting",
    evidenceLevel: "client-site",
    role: "Solo engineer — design implementation, build, and deployment",
    ongoing: true,
    businessProblem:
      "A Thuringian feed and pet-supply retailer needed a German-language site presenting its brands, advice, opening hours, and a delivery-request path for the Erfurt region.",
    businessOutcome:
      "Launched a German-language website covering the retailer's ranges (poultry, pigeon, horse, and pet feed from known brands), advice positioning, delivery requests, and legal pages.",
    oneLineOutcome:
      "German-language retailer site: brands, advice, opening hours, and delivery requests for the Erfurt region.",
    technicalArchitecture:
      "Built with Next.js and deployed on Vercel: German-language content, delivery-request flow, and legal pages (Impressum/Datenschutz) for the German market.",
    metrics: [
      "German-language retail presentation",
      "Delivery-request flow",
      "German legal pages included",
    ],
    tags: ["Next.js", "German Market", "Retail"],
    imageUrl: "/images/projects/landfutter.webp",
    cardImageUrl: "/images/projects/landfutter-card.webp",
    ogImageUrl: "/images/projects/landfutter-og.jpg",
    liveUrl: "https://landfutter.vercel.app/",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "sahad-labs-site",
    title: "Sahad Labs — Agency Website",
    shortTitle: "Sahad Labs",
    clientSector: "Digital Agency (Own Website)",
    sectorShort: "Agency",
    status: "supporting",
    evidenceLevel: "own-production",
    role: "Founder-engineer — design, build, and multilingual delivery",
    ongoing: true,
    businessProblem:
      "Sahad Labs needed its own site to present services, case studies, its delivery process, and founder background to an international audience — separate from this personal portfolio.",
    businessOutcome:
      "Launched the agency's own multilingual website (English, Arabic, French, German) covering services, case studies, a six-stage delivery process, and insights.",
    oneLineOutcome:
      "The agency's own multilingual site (EN/AR/FR/DE): services, case studies, process, and background.",
    technicalArchitecture:
      "Built with Next.js and deployed on Vercel with four-locale routing and RTL support for the Arabic version.",
    metrics: [
      "Four languages including RTL Arabic",
      "Services, case studies, process, and FAQ",
    ],
    tags: ["Next.js", "Multilingual", "Sahad Labs"],
    imageUrl: "/images/projects/sahadlabs.webp",
    cardImageUrl: "/images/projects/sahadlabs-card.webp",
    ogImageUrl: "/images/projects/sahadlabs-og.jpg",
    liveUrl: "https://sahadlabs.tech/en",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "4j-traders",
    title: "4j Traders (E-Commerce Engine)",
    clientSector: "B2B/B2C Retail & E-Commerce",
    sectorShort: "E-commerce",
    status: "supporting",
    evidenceLevel: "employment",
    role: "Backend engineer (4j Traders) — order-processing backend",
    timeframe: "Sep – Dec 2025",
    businessProblem:
      "Unoptimized database schema and lack of transactional isolation levels caused inventory sync errors and order drops during high-traffic flash sales.",
    businessOutcome:
      "Delivered a dependable order-processing backend for the e-commerce platform, built on strict transaction protocols with containerized deployment pipelines and clearly separated administrative roles.",
    oneLineOutcome:
      "ACID-isolated order backend with containerized deploys and multi-role admin separation.",
    technicalArchitecture:
      "Engineered with NestJS, PostgreSQL, and Prisma ORM utilizing strict ACID transaction protocols. Implemented custom NestJS Guards for multi-role RBAC and containerized the system with Docker and GitHub Actions.",
    metrics: [
      "ACID transaction isolation for order workflows",
      "Containerized deployments via Docker and GitHub Actions",
      "Granular multi-role RBAC via NestJS Guards",
    ],
    tags: ["NestJS", "PostgreSQL", "Prisma", "Docker", "GitHub Actions"],
    // Live URL removed (V2-03): 4jtraders.com served a "currently
    // unavailable" page (verified 2026-10-15). Restore only if the
    // deployment comes back and the owner approves (O2).
    imageUrl: "/images/projects/4j-traders.webp",
    cardImageUrl: "/images/projects/4j-traders-card.webp",
    ogImageUrl: "/images/projects/4j-traders-og.jpg",
    liveUrl: "",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "rushkat",
    title: "Rushkat (3D Asset Store Backend)",
    clientSector: "Digital Asset Marketplace (South Korea)",
    sectorShort: "Digital assets",
    status: "supporting",
    evidenceLevel: "employment",
    role: "Backend engineer (Rushkat) — API performance and caching",
    timeframe: "Oct 2024 – Jan 2025",
    businessProblem:
      "Sluggish query execution and unoptimized database reads caused significant latency spikes when concurrent users accessed heavy 3D files.",
    businessOutcome:
      "Improved endpoint response times under concurrent load through Redis caching and query optimization.",
    oneLineOutcome:
      "Redis caching and query optimization for heavy 3D-asset endpoints under concurrent load.",
    technicalArchitecture:
      "Designed and optimized RESTful APIs using TypeScript and Express.js. Managed PostgreSQL persistence layer with Prisma ORM and integrated Redis caching to offload repetitive high-traffic database queries.",
    metrics: [
      "Redis caching for high-traffic endpoints",
      "Query optimization for large datasets",
      "Endpoint rate limiting and security hardening",
    ],
    tags: ["Express.js", "PostgreSQL", "Prisma", "Redis", "Performance Optimization"],
    imageUrl: "",
    // No live URL exists for this employment-tier project (V2-03):
    // the previous "#" value rendered a broken external-link icon.
    liveUrl: "",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "procourier",
    title: "ProCourier (Logistics Demo)",
    clientSector: "Logistics & Supply Chain",
    status: "archived",
    evidenceLevel: "demo",
    role: "Solo engineer — concept build",
    businessProblem:
      "Logistics company needed a digital platform to manage shipments, track deliveries, and provide customers with real-time visibility into their package locations and delivery status.",
    businessOutcome:
      "Delivered a comprehensive logistics platform concept that improved operational efficiency and customer satisfaction through transparent shipment tracking and automated delivery notifications.",
    technicalArchitecture:
      "Built using Next.js with TypeScript for type safety across the application. Implemented real-time tracking updates and automated pricing calculations for complex shipping scenarios. Created responsive dashboards for both customers and administrators with different permission levels.",
    metrics: [
      "Real-time shipment tracking",
      "Automated pricing calculations",
      "Responsive dashboard interface",
      "Multi-user role management",
    ],
    tags: ["Next.js", "TypeScript", "Logistics", "Real-time Tracking", "Dashboards"],
    imageUrl: "",
    liveUrl: "https://procourier.vercel.app",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "travellast",
    title: "TravelLast (Travel Booking Demo)",
    clientSector: "Travel & Hospitality",
    status: "archived",
    evidenceLevel: "demo",
    role: "Solo engineer — concept build",
    businessProblem:
      "Travel booking platform needed to showcase accommodations, manage property listings, and provide seamless booking experiences for travelers seeking hotels, resorts, and holiday rentals.",
    businessOutcome:
      "Created an intuitive travel platform concept that simplified property discovery and booking.",
    technicalArchitecture:
      "Developed using React with integrated API connections for property data. Implemented advanced search and filtering capabilities for finding accommodations by location, amenities, and pricing. Built responsive property cards with detailed information displays and booking integration.",
    metrics: [
      "Advanced property search and filtering",
      "Responsive property showcase",
      "Integrated booking system",
      "Cross-platform compatibility",
    ],
    tags: ["React", "API Integration", "Search & Filtering", "Booking System"],
    imageUrl: "",
    liveUrl: "https://travellast.netlify.app",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "restaurant-hub",
    title: "Restaurant Hub (Food Delivery Demo)",
    clientSector: "On-Demand Food Tech Marketplace",
    status: "archived",
    evidenceLevel: "demo",
    role: "Solo engineer — concept build",
    businessProblem:
      "Sluggish client-side cart states and unstructured multi-vendor filtering resulted in high user drop-off rates during checkout.",
    businessOutcome:
      "Accelerated the dynamic ordering loop, providing users with frictionless multi-vendor category filtering and deterministic cart tracking.",
    technicalArchitecture:
      "Designed with React and Redux for strict client-side state consistency across volatile cart mutations, communicating with a scalable Node.js API framework.",
    metrics: [
      "Fluid multi-vendor catalog indexing",
      "Deterministic state tracking via Redux pipeline",
      "Streamlined mobile cart navigation logic",
    ],
    tags: ["React", "Redux", "Node.js"],
    imageUrl: "",
    liveUrl: "https://restaurant-hubbd.vercel.app",
    codeUrl: "https://github.com/sahadcse",
  },
  {
    id: "minishop",
    title: "MiniShop (Storefront Demo)",
    clientSector: "Digital Retail & Fashion",
    status: "archived",
    evidenceLevel: "demo",
    role: "Solo engineer — concept build",
    businessProblem:
      "Clunky mobile navigation pipelines hindered clean checkouts on standard portable device displays.",
    businessOutcome:
      "Created an ultra-sleek, rapid retail interface concept focusing strictly on minimizing consumer checkout steps.",
    technicalArchitecture:
      "Lightweight single-page application engineered with React and pure CSS3 utility tokens, compiled for instantaneous static deployments on Netlify.",
    metrics: [
      "Frictionless mobile checkout interface layout",
      "Light bundle size for immediate client edge delivery",
      "Pure responsive CSS utility grid compliance",
    ],
    tags: ["React", "CSS3", "Netlify"],
    imageUrl: "",
    liveUrl: "https://minishopbd.netlify.app",
    codeUrl: "https://github.com/sahadcse",
  },
];

/** Curated set for the index and homepage (plan §6.4: count ≈ 8). */
export const CURATED_PROJECTS = PROJECTS.filter((p) => p.status !== "archived");

/** Flagships in homepage order (§6.3 #4): Cozee Care, Violina, Taqwa. */
export const FLAGSHIP_PROJECTS = PROJECTS.filter((p) => p.status === "flagship");
