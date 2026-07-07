/**
 * FAQ Data - High-Converting Business Questions
 * Designed to proactively handle client objections
 */

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
    {
        id: "technical-knowledge",
        question: "Do I need any technical knowledge to work with you?",
        answer: "Not at all. I handle the entire lifecycle—from domain configuration and hosting setup to deployment. Once live, I will provide a simple walk-through so you can manage your operations or text updates effortlessly."
    },
    {
        id: "code-ownership",
        question: "Who owns the source code and project assets after delivery?",
        answer: "You do. You retain 100% intellectual property and ownership. Upon project completion, the entire repository and production assets are securely handed over to your GitHub or cloud account."
    },
    {
        id: "retainer-model",
        question: "How does the 'Fixed Developer Retainer' model work?",
        answer: "It is like having a dedicated Remote CTO/Engineer on demand without the full-time overhead. For a fixed monthly fee, I take care of your priority updates, continuous performance tuning, server security audits, and urgent bug fixes, ensuring zero downtime for your systems."
    },
    {
        id: "communication-timezone",
        question: "How do we handle communication and timezone differences?",
        answer: "I am based in Bangladesh but maintain highly flexible working hours that overlap perfectly with Australian (AEST) and European/German (CET) business days. We will use tools like Slack, Zoom, and Notion for transparent, structured async and sync updates."
    },
    {
        id: "project-timeline",
        question: "What is the typical timeline for a project?",
        answer: "An elite Next.js Website or Conversion Landing Page is typically engineered and deployed within 3 to 7 business days. Complex custom business software or internal infrastructure timelines are calculated based on your specific operational requirements."
    }
];
