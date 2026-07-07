/**
 * Premium Services Data
 * Designed for business stakeholders and technical evaluators
 */

export interface ServiceFeature {
    title: string;
    description: string;
}

export interface Service {
    id: string;
    category: string;
    subtitle: string;
    coreFocus: string;
    businessValue: string;
    features: ServiceFeature[];
}

export const SERVICES: Service[] = [
    {
        id: "premium-websites",
        category: "Premium Websites & Conversion Landing Pages",
        subtitle: "Tailored for Startups, Service Businesses, and NDIS Providers needing an elite online presence.",
        coreFocus: "Designing and developing high-performance websites that look premium and convert visitors into paying clients.",
        businessValue: "If your website is slow, outdated, or hard to find on Google, you are losing high-ticket clients to your competitors. I build fully custom, responsive Websites and High-Converting Landing Pages using Next.js. Every build is optimized for ultra-fast load speeds, premium typography, and seamless local SEO visibility.",
        features: [
            {
                title: "Custom Next.js Website & Landing Page Development",
                description: "Tailored, pixel-perfect designs built for conversion and brand authority."
            },
            {
                title: "Technical SEO & Core Web Vitals Optimization",
                description: "100/100 Mobile/Desktop Performance scores for maximum search visibility."
            },
            {
                title: "Frictionless Lead Capture Forms, Booking Systems & CRM Automations",
                description: "Seamless integrations that turn visitors into qualified leads automatically."
            },
            {
                title: "Fixed Developer Retainer: Ongoing Technical Management",
                description: "Monthly system scaling, optimization, and maintenance so you never worry about downtime."
            }
        ]
    },
    {
        id: "enterprise-software",
        category: "Custom Enterprise Software & Invisible Infrastructure",
        subtitle: "For Logistics, Outpatient Healthcare, and Multi-vendor platforms looking to scale operations safely.",
        coreFocus: "Automating expensive manual operations, ensuring total database compliance, and securing data layers.",
        businessValue: "Chaos in backend workflows drains your margins, and vulnerable databases risk security compliance. I engineer ultra-stable, zero-downtime custom internal tools, full-stack operational management software, and secure APIs that slash bookkeeping hours and protect sensitive customer records.",
        features: [
            {
                title: "Granular Role-Based Access Control (RBAC) Security",
                description: "Enterprise-grade permission systems protecting confidential data at every level."
            },
            {
                title: "High-Concurrency Database Caching (PostgreSQL, Prisma & Redis)",
                description: "Sub-100ms response times even under heavy concurrent user loads."
            },
            {
                title: "Complex Automation Engines & Secure Third-Party API Integrations",
                description: "Eliminate manual workflows with reliable, monitored automated pipelines."
            },
            {
                title: "Strict Transactional Integrity (ACID Compliance)",
                description: "Financial-grade data consistency for logging, accounting, and transactional setups."
            }
        ]
    }
];
