export interface ProjectItem {
  title: string;
  blurb: string;
  story: string;
  stack: string[];
  year: string;
  links: {
    live?: string;
    source?: string;
    release?: string;
  };
  featured?: boolean;
  status?: string;
  categories: ('Native & Desktop' | 'AI & Agents' | 'Fullstack')[];
  highlights: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  blurb: string;
  highlights: string[];
  url?: string;
}

export interface WritingItem {
  title: string;
  date: string;
  summary: string;
  readingTime: string;
  url: string;
  category: string;
}

export interface SpeakingItem {
  event: string;
  title: string;
  year: string;
  type: string;
  description: string;
  url?: string;
}

export const PORTFOLIO = {
  name: 'Sri Kolagani',
  firstName: 'Sri',
  initials: 'SK',
  url: 'https://srikolagani.github.io',
  role: 'Director of Enterprise Applications, RevOps & AI GTM Engineering',
  roles: [
    'Director, Enterprise Apps & AI GTM @ Elastic',
    'Agentic GTM & Revenue Systems Architect',
    '10x Certified Salesforce Application Architect',
    'Builder of Glassforce & TinyCRM',
  ],
  location: 'Dallas, TX',
  timezone: 'America/Chicago',
  email: 'sriharideep@live.com',
  avatar: '/avatar-pixel.png',
  greeting: "Hey, I'm Sri",
  tagline:
    'Architecting autonomous AI GTM systems, enterprise revenue platforms, and native developer tools.',
  about: [
    "I'm Sri Kolagani, Director of Enterprise Applications, RevOps & AI GTM Engineering at Elastic. With 13+ years of experience leading global engineering teams across SaaS, Medical Devices, FinTech, and Hi-Tech, I bridge enterprise systems of record with production-grade AI.",
    'At Elastic, I lead global teams across Salesforce, MuleSoft, and AI GTM engineering—building multi-agent frameworks on AWS Bedrock, LangGraph, and Elasticsearch Vector Databases that drive millions in pipeline velocity, self-service case deflection, and automated revenue operations.',
    'Beyond enterprise architecture, I love building fast, local-first, native tools like Glassforce (a macOS liquid-glass Salesforce desktop client in Rust + Tauri + React) and TinyCRM (a multi-platform SwiftUI + Rust + MCP personal CRM for macOS, iOS, and iPadOS).',
  ],
  tldr: [
    'Director of Enterprise Apps & AI GTM @ Elastic',
    '10x Certified Salesforce Application Architect',
    'Multi-Agent Systems (Bedrock, LangGraph, ES Vector)',
    'Creator of Glassforce & TinyCRM',
    'Featured Speaker: Google DevFest, TrailheaDX, Dreamforce',
    'MBA (CSU Chico) & B.Tech (Shiv Nadar University)',
  ],
  socials: {
    github: 'https://github.com/srikolagani',
    linkedin: 'https://www.linkedin.com/in/srikolagani/',
    email: 'mailto:sriharideep@live.com',
    resume: '/Sri_Kolagani_Resume.pdf',
    blog: 'https://www.elastic.co/search-labs/author/sri-kolagani',
    sfdcbrewery: 'https://sfdcbrewery.github.io',
  },
  github: {
    username: 'srikolagani',
  },
  projects: [
    {
      title: 'Glassforce',
      blurb:
        'A native macOS Liquid Glass desktop workspace for Salesforce developers and architects. Combines SOQL Studio, Schema Explorer, Org Compare, Security Health Check, and a multi-provider AI Assistant in a fast Rust + Tauri 2 app.',
      story: `Glassforce reimagines how Salesforce engineers, architects, and admins interact with their orgs on macOS. Instead of juggling dozens of browser tabs and slow web consoles, Glassforce delivers a native Liquid Glass desktop experience powered by a Rust + Tauri 2 core and React 19 + TypeScript frontend.

It features a full Monaco-powered SOQL Studio with syntax autocomplete, inline record editing, and CSV/JSON export; an interactive Schema Explorer with live ERD relationship graphing; side-by-side Org Metadata Comparison; and a real-time Apex Debug Log analyzer.

Every credential is stored strictly in the macOS Keychain via OAuth 2.0 PKCE—zero intermediate cloud servers. It also ships with a multi-provider AI assistant (OpenAI, Anthropic Claude, Google Gemini, and local Ollama) that understands your org schema to generate SOQL, Apex, and validation rules on the fly. Installable directly via Homebrew (\`brew install --cask srikolagani/tap/glassforce\`).`,
      stack: [
        'Rust',
        'Tauri 2',
        'React 19',
        'TypeScript',
        'Tailwind CSS',
        'Monaco Editor',
        'Salesforce API',
        'macOS Keychain',
        'OpenAI / Claude / Ollama',
      ],
      year: '2026',
      links: {
        live: 'https://srikolagani.github.io/glassforce-public/',
        source: 'https://github.com/srikolagani/glassforce-public',
        release: 'https://github.com/srikolagani/glassforce-public/releases/tag/v0.1.0',
      },
      featured: true,
      status: 'v0.1.0 Released',
      categories: ['Native & Desktop', 'AI & Agents', 'Fullstack'],
      highlights: [
        'SOQL Studio + Monaco Editor + Live Inline Editing',
        'Interactive Schema Explorer & Org Diffing',
        'Native macOS Keychain OAuth 2.0 PKCE Security',
        'Homebrew Cask: brew install --cask srikolagani/tap/glassforce',
      ],
    },
    {
      title: 'TinyCRM',
      blurb:
        'A calm, local-first personal CRM and relationship intelligence workspace for macOS, iPhone, and iPad—built with SwiftUI, a Rust + Tauri desktop shell, and a Model Context Protocol (MCP) server for AI agents.',
      story: `TinyCRM is built for founders, operators, and GTM leaders who want a fast, tactile relationship workspace without enterprise CRM bloat. It spans native SwiftUI apps for macOS, iOS, and iPadOS alongside a Rust + Tauri desktop runtime and optional Supabase cloud sync.

Instead of manual data entry, TinyCRM features an AI-powered Inbox and Live Session capture flow (backed by OpenRouter & structured extraction) that turns meeting notes, transcripts, and voice memos into reviewed contact updates, follow-up tasks, and relationship timelines with a strict human-in-the-loop accept/reject gate.

TinyCRM also includes a first-class Model Context Protocol (MCP) server, allowing Claude, Cursor, and custom AI agents to query relationship context, draft follow-ups, and propose structured CRM mutations safely with optimistic concurrency control and offline recovery.`,
      stack: [
        'Swift 6',
        'SwiftUI',
        'Rust',
        'Tauri',
        'Model Context Protocol (MCP)',
        'Supabase',
        'OpenRouter LLM',
        'macOS / iOS / iPadOS',
      ],
      year: '2026',
      links: {
        source: 'https://github.com/srikolagani/tiny-crm',
      },
      featured: true,
      status: 'Multi-Platform',
      categories: ['Native & Desktop', 'AI & Agents', 'Fullstack'],
      highlights: [
        'Native SwiftUI across macOS, iPhone, and iPad Split-View',
        'Human-in-the-Loop AI Inbox & Live Session Extraction',
        'First-Class MCP Server for Agentic Workflows',
        'Local-First Store with Stale-Write Protection & Supabase Sync',
      ],
    },
  ] as ProjectItem[],
  experience: [
    {
      company: 'Elastic',
      role: 'Director, Enterprise Applications, RevOps & AI GTM Engineering',
      period: 'Apr 2021 – Present',
      location: 'Dallas, TX',
      url: 'https://www.elastic.co',
      blurb:
        'Leading a global organization of 20+ engineers, architects, and PMs across Salesforce, MuleSoft, and AI GTM Engineering. Progressed from Principal Architect → Senior Manager → Director while spearheading agentic AI systems across Sales, Marketing, and Support.',
      highlights: [
        'Architected and deployed a multi-agent AI SDR & Outbound GTM engine using AWS Bedrock, LangGraph, Elasticsearch Vector DB, and Retell AI—generating $2M+ in qualified pipeline and automating 10,000+ personalized prospect interactions.',
        'Built an AI Support Engineer & Case Deflection platform powered by RAG over Elasticsearch, reducing MTTR by 35% and deflecting 28%+ of Tier-1/Tier-2 cases.',
        'Engineered an automated AI Deal Desk & Order Review system combining LLMs with CPQ/Billing rules to cut contract review cycles by 60%.',
        'Led enterprise-wide Quote-to-Cash, PLG cloud marketplaces (AWS, GCP, Azure), and RevOps transformation scaling Elastic past $1.3B+ ARR.',
      ],
    },
    {
      company: 'Western Union',
      role: 'Lead Solution Architect',
      period: 'Oct 2019 – Apr 2021',
      location: 'Denver, CO',
      url: 'https://www.westernunion.com',
      blurb:
        'Led global B2B/B2C digital transformation and enterprise CRM architecture across 200+ countries and territories, integrating core payment rails with Salesforce Sales, Service, and Marketing Clouds.',
      highlights: [
        'Architected high-volume partner onboarding and real-time KYC/AML compliance integrations handling millions of global transactions.',
        'Designed event-driven MuleSoft and Kafka integration patterns connecting legacy mainframes with modern cloud applications.',
        'Established global DevOps CI/CD governance, automated testing gates, and multi-org release management.',
      ],
    },
    {
      company: 'Intuitive Surgical',
      role: 'Senior Salesforce Platform Architect',
      period: 'May 2017 – Oct 2019',
      location: 'Sunnyvale, CA',
      url: 'https://www.intuitivesurgical.com',
      blurb:
        'Architected global Field Service, IoT telemetry, and Commercial platforms supporting the da Vinci robotic surgical ecosystem across hospitals worldwide.',
      highlights: [
        'Engineered proactive IoT diagnostic alerting from da Vinci surgical systems into Salesforce Field Service Lightning for predictive maintenance.',
        'Scaled global contract lifecycle, clinical training, and medical device compliance workflows (FDA 21 CFR Part 11).',
      ],
    },
    {
      company: 'Hitachi Data Systems',
      role: 'Senior Enterprise Applications Engineer',
      period: 'Jan 2015 – May 2017',
      location: 'Santa Clara, CA',
      blurb:
        'Built global partner portal, CPQ pricing engines, and enterprise quote-to-order integrations for cloud infrastructure and storage hardware.',
      highlights: [
        'Delivered global Partner Community and Deal Registration workflows serving 5,000+ channel partners.',
        'Automated complex hardware/software bundle configurations and ERP order fulfillment.',
      ],
    },
  ] as ExperienceItem[],
  speakingAndPublications: [
    {
      event: 'Google DevFest Troy 2025',
      title: 'Building Production Multi-Agent Systems with RAG & Vector Search',
      year: '2025',
      type: 'Featured Speaker',
      description:
        'Deep dive into architecting grounded multi-agent workflows using Elasticsearch Vector Database, LangGraph, and hybrid retrieval patterns.',
      url: 'https://www.youtube.com/watch?v=OzStbTUZqyw',
    },
    {
      event: 'Salesforce TrailheaDX & Dreamforce',
      title: 'Enterprise Event-Driven Architecture & AI-Powered Revenue Workflows',
      year: '2024',
      type: 'Conference Speaker',
      description:
        'Presented scalable enterprise patterns for combining Salesforce, MuleSoft, and generative AI agents with strict governance and observability.',
      url: 'https://www.youtube.com/watch?v=iwec6dpAiMw',
    },
    {
      event: 'Elastic Search Labs',
      title: 'Author — AI Agents, Vector Search & RAG Architecture Series',
      year: '2025',
      type: 'Technical Publications',
      description:
        'Published technical deep-dives on building agentic GTM workflows, semantic reranking, and enterprise RAG pipelines on Elastic Search Labs.',
      url: 'https://www.elastic.co/search-labs/author/sri-kolagani',
    },
    {
      event: 'Elastic Executive Blog',
      title: 'How Elastic Scales AI-Driven Revenue Operations & Customer Support',
      year: '2025',
      type: 'Executive Blog',
      description:
        'Executive perspective on transforming enterprise IT and RevOps into an AI-native engineering organization.',
      url: 'https://www.elastic.co/blog/author/sri-kolagani',
    },
    {
      event: 'n8n Creator Hub',
      title: 'Automate Lead Qualification Voice Calls with Salesforce, Retell AI & OpenAI',
      year: '2025',
      type: 'Open Workflow Template',
      description:
        'Published an open-source production workflow template orchestrating autonomous AI voice qualification calls with real-time CRM sync.',
      url: 'https://n8n.io/workflows/8929-automate-lead-qualification-calls-with-salesforce-retell-ai-and-openai-analysis/',
    },
  ] as SpeakingItem[],
  educationAndCerts: {
    education: [
      {
        school: 'California State University, Chico',
        degree: 'Master of Business Administration (MBA) — Enterprise Information Systems',
        period: 'Chico, CA',
      },
      {
        school: 'Shiv Nadar University',
        degree: 'Bachelor of Technology (B.Tech) — Electronics & Communication Engineering',
        period: 'India',
      },
    ],
    certifications: [
      'Salesforce Certified Application Architect (10x Salesforce Certified)',
      'Salesforce Certified System Architect & Data Architect',
      'AWS Certified Solutions Architect – Associate',
      'MuleSoft Certified Platform Architect & Developer',
      'Certified ScrumMaster (CSM)',
    ],
  },
  skillsByCategory: {
    'AI & Agents': [
      'AWS Bedrock',
      'LangGraph',
      'LangChain',
      'Elasticsearch Vector DB',
      'RAG & Hybrid Search',
      'Model Context Protocol (MCP)',
      'OpenAI / Anthropic Claude',
      'Retell Voice AI',
      'n8n Automation',
    ],
    'Native & Web': [
      'Rust',
      'Tauri 2',
      'Swift 6',
      'SwiftUI',
      'TypeScript',
      'React 19',
      'Python',
      'Node.js',
      'Tailwind CSS',
    ],
    'Enterprise & RevOps': [
      'Salesforce Architecture',
      'Apex & LWC',
      'Salesforce CPQ & Billing',
      'MuleSoft Anypoint',
      'Quote-to-Cash',
      'PLG Cloud Marketplaces',
      'Workato',
    ],
    'Cloud & Data': [
      'AWS',
      'Elasticsearch / ES|QL',
      'Supabase / PostgreSQL',
      'Snowflake',
      'Docker',
      'Kafka',
      'GitHub Actions CI/CD',
    ],
  },
};
