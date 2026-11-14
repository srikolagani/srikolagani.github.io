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
  role: 'Director, Enterprise Applications & GTM Engineering',
  roles: [
    'Director, Enterprise Apps, RevOps & AI GTM @ Elastic',
    'Enterprise Applications & AI GTM Engineering Leader',
    'Lead-to-Cash, RevOps & Agentic AI Transformation',
    'Builder of Glassforce & TinyCRM',
  ],
  location: 'Dallas, TX (Remote)',
  timezone: 'America/Chicago',
  email: 'sriharideep@live.com',
  phone: '+1 (469) 600-8651',
  avatar: '/avatar-pixel.png',
  greeting: "Hey, I'm Sri",
  tagline:
    'Leading global enterprise engineering organizations, lead-to-cash ecosystems, and AI-first GTM transformation.',
  about: [
    "I'm Sri Kolagani, Director of Enterprise Applications, RevOps & AI GTM Engineering at Elastic with more than 10 years of experience leading global engineering organizations, enterprise platform strategy, and AI-driven business transformation initiatives.",
    'I have a proven track record modernizing lead-to-cash ecosystems, scaling secure enterprise platforms, and driving operational excellence across CRM, RevOps, revenue, and customer-facing systems—leading 30+ globally distributed leaders, engineers, and administrators across Financial Operations, Field Effectiveness, Corporate Functions, and Security Operations.',
    'Alongside enterprise engineering leadership, I build fast, local-first native tools like Glassforce (a macOS Liquid Glass Salesforce workspace built with Rust + Tauri 2 + React) and TinyCRM (a native SwiftUI + Rust + MCP relationship workspace for macOS, iPhone, and iPad).',
  ],
  tldr: [
    'Director, Enterprise Apps, RevOps & AI GTM @ Elastic',
    'Leading 30+ Global Engineers, Leaders & Admins',
    'Enterprise RevOps MCP-as-a-Service & AI Agents',
    'Creator of Glassforce & TinyCRM',
    'Speaker: Google DevFest Troy, Dreamforce, TrailheaDX',
    'MBA (CSU Chico) & B.Tech Computer Engineering (SNU)',
  ],
  socials: {
    github: 'https://github.com/srikolagani',
    linkedin: 'https://www.linkedin.com/in/srikolagani/',
    email: 'mailto:sriharideep@live.com',
    resume: '/Sri_Kolagani_Resume.pdf',
    blog: 'https://www.elastic.co/search-labs/author/sri-kolagani',
    executiveBlog: 'https://www.elastic.co/blog/author/sri-kolagani',
    sfdcbrewery: 'https://sfdcbrewery.github.io',
  },
  github: {
    username: 'srikolagani',
  },
  projects: [
    {
      title: 'Glassforce',
      blurb:
        'A native macOS Liquid Glass desktop workspace for Salesforce developers and admins. Combines SOQL Studio, Schema Explorer, Org Compare, Security Health Check, and a multi-provider AI Assistant in a fast Rust + Tauri 2 app.',
      story: `Glassforce reimagines how Salesforce engineers and administrators interact with their orgs on macOS. Instead of juggling dozens of browser tabs and slow web consoles, Glassforce delivers a native Liquid Glass desktop experience powered by a Rust + Tauri 2 core and React 19 + TypeScript frontend.

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
        live: 'https://srikolagani.github.io/glassforce/',
        source: 'https://github.com/srikolagani/glassforce',
        release: 'https://github.com/srikolagani/glassforce/releases/tag/v0.1.0',
      },
      featured: true,
      status: 'v0.1.0 Released',
      categories: ['Native & Desktop', 'AI & Agents', 'Fullstack'],
      highlights: [
        'SOQL Studio + Monaco Editor + Live Inline Editing',
        'Interactive Schema Explorer & Org Metadata Diffing',
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
      role: 'Director of Enterprise Applications, RevOps & AI GTM Engineering',
      period: 'Nov 2025 – Present',
      location: 'Dallas, TX (Remote)',
      url: 'https://www.elastic.co',
      blurb:
        'Leading an enterprise CRM, RevOps, and AI GTM engineering organization of 30+ globally distributed leaders, engineers, and administrators across Financial Operations, Field Effectiveness, Corporate Functions, and Security Operations.',
      highlights: [
        'Lead Forward Deployed Engineers (FDE) to build autonomous AI assistants and agentic workflows—including IT Support, Sales Assistants, and Pricing Estimators—improving quoting speed, support responsiveness, and overall productivity.',
        'Spearheaded enterprise RevOps MCP-as-a-Service and centralized AI Skills Repository initiatives to establish foundational infrastructure for scalable enterprise AI adoption.',
        'Established an enterprise AI governance council to standardize patterns, reduce platform sprawl, enforce security controls, and oversee responsible AI adoption across business and engineering teams.',
        'Own the complete lead-to-cash technology stack across Quote-to-Cash, billing, subscriptions, RevOps, Customer Success, Marketing, Legal, HR, IT, and compliance.',
      ],
    },
    {
      company: 'Elastic',
      role: 'Sr. Engineering Manager, Enterprise Applications',
      period: 'Jun 2022 – Nov 2025',
      location: 'Dallas, TX (Remote)',
      url: 'https://www.elastic.co',
      blurb:
        'Built and scaled domain-specific engineering teams, directing global hiring, performance management, capacity planning, and technical leadership development across enterprise GTM and revenue systems.',
      highlights: [
        'Designed and led engineering teams implementing enterprise GTM solutions including Salesforce Sales Engagement, Marketo, Drift, LeanData, and revenue intelligence platforms (Gong, Clari, Aviso).',
        'Owned multi-year platform programs including Revenue Cloud migration (CPQ), Professional Services Automation, CLM automation, SoX alignment, and FedRAMP High readiness.',
        'Embedded zero-trust security and test-driven engineering while replacing third-party SaaS dependencies with native Salesforce capabilities to eliminate technical debt.',
        'Championed an internal innovation culture through Elastic-on-Elastic initiatives, engineering hackathons, operational monitoring dashboards, and published engineering blogs.',
      ],
    },
    {
      company: 'Elastic',
      role: 'Manager, Software Engineering · Member of Technical Staff',
      period: 'Nov 2018 – Jun 2022',
      location: 'Dallas, TX (Remote)',
      url: 'https://www.elastic.co',
      blurb:
        'Progressed from Member of Technical Staff (11/2018 – 03/2020) to Manager, Software Engineering (03/2020 – 06/2022), directing agile Business-Technology Flex squads shipping high-impact features across Sales, Service, and Experience Clouds.',
      highlights: [
        'Directed the opportunity-related technical roadmap, embedding zero-trust security, TDD/BDD discipline, refactoring, and collective code ownership into every sprint.',
        'Established rigorous change-management and SDLC processes satisfying legal, info-sec, and engineering compliance requirements.',
        'Boosted team engagement and performance through continuous mentoring, regular 1-1s, and merit reviews.',
      ],
    },
    {
      company: 'Western Union',
      role: 'Sr. Salesforce Developer',
      period: 'Feb 2018 – Nov 2018',
      location: 'San Francisco, CA',
      url: 'https://www.westernunion.com',
      blurb:
        'Engineered enterprise Salesforce applications, integrations, and automated workflows across global financial services operations.',
      highlights: [
        'Delivered Sales, Service, and Experience Cloud features supporting high-volume partner and customer onboarding workflows.',
      ],
    },
    {
      company: 'Intuitive Surgical',
      role: 'Business Apps Intern',
      period: 'Oct 2017 – Dec 2017',
      location: 'Santa Clara, CA',
      url: 'https://www.intuitivesurgical.com',
      blurb:
        'Supported enterprise business applications and CRM automation initiatives for medical device operations.',
      highlights: [
        'Contributed to business application enhancements, workflow automation, and system testing.',
      ],
    },
    {
      company: 'Hitachi Data Systems',
      role: 'Systems Analyst',
      period: 'Jan 2017 – Oct 2017',
      location: 'Santa Clara, CA',
      blurb:
        'Analyzed, configured, and supported enterprise CRM and quote-to-order systems for storage and cloud infrastructure lines.',
      highlights: [
        'Partnered with cross-functional business and IT teams on requirements analysis, system configuration, and release validation.',
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
        'Deep dive into building grounded multi-agent workflows using Elasticsearch Vector Database, LangGraph, and hybrid retrieval patterns.',
      url: 'https://www.youtube.com/watch?v=OzStbTUZqyw',
    },
    {
      event: 'Salesforce TrailheaDX & Dreamforce',
      title: 'Enterprise Engineering & AI-Powered Revenue Workflows',
      year: '2024',
      type: 'Conference Speaker',
      description:
        'Presented scalable enterprise patterns for combining Salesforce, MuleSoft, and generative AI agents with governance and observability.',
      url: 'https://www.youtube.com/watch?v=iwec6dpAiMw',
    },
    {
      event: 'Elastic Search Labs',
      title: 'Elastic Search Developer Blogs — AI Agents, Vector Search & RAG',
      year: '2025',
      type: 'Developer Blog',
      description:
        'Published technical articles on building agentic GTM workflows, semantic reranking, and enterprise RAG pipelines on Elastic Search Labs.',
      url: 'https://www.elastic.co/search-labs/author/sri-kolagani',
    },
    {
      event: 'Elastic Executive Blog',
      title: 'How Elastic Scales AI-Driven Revenue Operations & Customer Support',
      year: '2025',
      type: 'Executive Blog',
      description:
        'Executive perspective on transforming enterprise applications and RevOps into an AI-first engineering organization.',
      url: 'https://www.elastic.co/blog/author/sri-kolagani',
    },
    {
      event: 'n8n Creator Hub',
      title: 'Automate Lead Qualification Calls with Salesforce, Retell AI & OpenAI Analysis',
      year: '2025',
      type: 'Open Source Template',
      description:
        'Published an open-source production workflow template orchestrating autonomous AI voice qualification calls with real-time CRM sync.',
      url: 'https://n8n.io/workflows/8929-automate-lead-qualification-calls-with-salesforce-retell-ai-and-openai-analysis/',
    },
  ] as SpeakingItem[],
  educationAndCerts: {
    education: [
      {
        school: 'California State University, Chico',
        degree: 'Master of Business Administration (MBA)',
        period: '2015 – 2017',
      },
      {
        school: 'Shiv Nadar University',
        degree: 'Bachelor of Technology, Computer Engineering',
        period: '2011 – 2015',
      },
    ],
    certifications: [
      '10x Salesforce Certified (Application Architect & CPQ Specialist)',
      'AWS Certified Solutions Architect – Associate',
      'Certified MuleSoft Developer – Level 1',
      'SAFe 5 Product Owner / Product Manager (POPM)',
      'SAFe 5 Scrum Master',
      'SAP HANA Technology Associate',
    ],
  },
  skillsByCategory: {
    'AI & Agentic Systems': [
      'LangChain',
      'LangGraph',
      'Model Context Protocol (MCP)',
      'RAG Systems',
      'Elastic Agent Builder',
      'OpenAI / Azure OpenAI',
      'Vertex AI & LiteLLM',
      'Vector Search & Embeddings',
      'Prompt Caching',
      'n8n / OpenClaw / Hermes',
    ],
    'GTM, CRM & Revenue': [
      'Salesforce Sales & Service Cloud',
      'Revenue Cloud & Salesforce CPQ',
      'Agentforce',
      'Certinia (FinancialForce PSA)',
      'MuleSoft & NetSuite',
      'ServiceNow & Workday',
      'Gong / Clari / Aviso',
      'Marketo / Drift / LeanData',
      'Ironclad / DocuSign / Tackle.io',
    ],
    'Engineering & Native': [
      'Rust',
      'Tauri 2',
      'Swift 6 & SwiftUI',
      'TypeScript & React 19',
      'Python',
      'Apex, SOQL & LWC',
      'OmniStudio',
      'SFDX / Salesforce CLI',
      'Git & CI/CD',
    ],
    'Data & Analytics': [
      'Elasticsearch / Kibana',
      'BigQuery',
      'Tableau',
      'Supabase / PostgreSQL',
      'Alteryx',
      'Outreach & Seismic',
    ],
  },
};
