import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Mail,
  ArrowUpRight,
  X,
  Search,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  FileText,
  Sparkles,
  Terminal,
  ShieldCheck,
  Activity
} from 'lucide-react';

interface Project {
  id: string;
  category: 'AI & NLP' | 'AI Quality' | 'Support & Operations' | 'Analytics';
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  architecture: string[];
  outcomes: string[];
  technologies: string[];
  year: string;
  featured?: boolean;
  interactiveDemoType: 'sentiment' | 'rlhf' | 'api-inspector' | 'nps-calculator';
}

interface ExperienceItem {
  id: string;
  role: string;
  period: string;
  domain: string;
  summary: string;
  bullets: string[];
  metrics: string;
}

const PROJECTS: Project[] = [
  {
    id: 'feedback-management',
    category: 'AI & NLP',
    title: 'AI-Powered Feedback Management System',
    subtitle: 'Real-time customer sentiment triage & automated escalation pipeline',
    description:
      'Full-stack web application that collects real-time customer feedback, applies NLP sentiment analysis to categorize responses, and triggers priority alert notifications for engineering and support teams.',
    problem:
      'High-volume SaaS customer feedback often buries critical production defects inside thousands of general survey responses, delaying root-cause triage.',
    architecture: [
      'RESTful ingestion endpoint built with Python & Express/Node patterns validating payload schemas.',
      'NLP sentiment & intent classification pipeline scoring polarity (-1.0 to +1.0) and urgency.',
      'MongoDB document store indexed by customer tier, sentiment polarity, and defect taxonomy.',
      'Automated webhook dispatchers alerting Lead Support channels when critical negative thresholds trigger.'
    ],
    outcomes: [
      'Reduced critical feedback triage latency from 14 hours to under 3 minutes.',
      '94.2% alignment between automated NLP urgency tags and human QA audit labels.',
      'Zero missed P1 sentiment spikes across 10,000+ monthly feedback submissions.'
    ],
    technologies: ['Python', 'JavaScript', 'MongoDB', 'NLP', 'REST APIs'],
    year: '2025',
    featured: true,
    interactiveDemoType: 'sentiment'
  },
  {
    id: 'ai-model-evaluation',
    category: 'AI Quality',
    title: 'AI Model Evaluation & Quality Assessment',
    subtitle: 'RLHF alignment, rubric verification & hallucination auditing',
    description:
      'Evaluation of LLM output quality, fine-tuning validation, precision annotation, consistency verification, and structured feedback alignment against strict domain guidelines.',
    problem:
      'Large Language Models frequently produce plausible-sounding but factually ungrounded or guideline-violating responses in specialized technical support and coding workflows.',
    architecture: [
      'Multi-dimensional evaluation rubric scoring Truthfulness, Instruction Following, Tone, and Code Safety.',
      'Side-by-side SFT & RLHF response comparison workflow with granular span-level error tagging.',
      'Golden dataset curation and edge-case prompt adversarial testing for model alignment.',
      'Inter-annotator agreement calibration ensuring consistent quality benchmarks.'
    ],
    outcomes: [
      'Audited 1,200+ complex multi-turn technical & reasoning prompts with 98.5% QA consistency.',
      'Identified systematic hallucination patterns in API documentation synthesis prompts.',
      'Authored structured Golden Responses used directly for supervised fine-tuning benchmarks.'
    ],
    technologies: ['AI Evaluation', 'Data Annotation', 'Quality Assurance', 'NLP', 'RLHF'],
    year: '2025',
    featured: true,
    interactiveDemoType: 'rlhf'
  },
  {
    id: 'saas-support-architecture',
    category: 'Support & Operations',
    title: 'SaaS Production Support Architecture',
    subtitle: 'API diagnostics, root-cause investigation & SLA governance',
    description:
      'Incident management workflows, REST API debugging via Postman, root-cause investigation for recurring production defects, and cross-team coordination between L3 support, engineering, and DBA teams.',
    problem:
      'Recurring API timeout escalations and database deadlocks across enterprise educational SaaS tenants were causing SLA breaches and fragmented communication with engineering.',
    architecture: [
      'Standardized Postman diagnostic collections for reproducing authentication, payload, and pagination failures.',
      'Structured RCA runbooks linking HTTP 5xx/4xx trace logs with MongoDB query execution profiles.',
      'Jira escalation matrix with automated reproduction templates and severity SLA tracking.',
      'Weekly defect trend reviews converting top ticket drivers into permanent product fixes.'
    ],
    outcomes: [
      'Maintained 99.4% SLA compliance across high-priority enterprise production escalations.',
      'Cut average L2-to-Engineering escalation turnaround time by 38% via reproducible API traces.',
      'Mentored junior support engineers on REST inspection, log parsing, and database query analysis.'
    ],
    technologies: ['SaaS', 'REST APIs', 'Postman', 'Jira', 'MongoDB'],
    year: '2024',
    interactiveDemoType: 'api-inspector'
  },
  {
    id: 'feedback-analytics-nps',
    category: 'Analytics',
    title: 'Feedback Analytics & NPS Dashboard',
    subtitle: 'Sentiment trend telemetry, NPS cohort breakdown & webhook routing',
    description:
      'Interactive dashboard for visualization of sentiment trends, NPS breakdown, conditional feedback routing, and webhook alert integrations for customer experience leadership.',
    problem:
      'Support and product leaders lacked a unified real-time view connecting Net Promoter Score shifts with specific product releases and support ticket categories.',
    architecture: [
      'Aggregation pipelines in MongoDB computing rolling 30-day Promoters, Passives, and Detractors.',
      'Interactive Chart.js visualization modules filtering by release version and customer segment.',
      'Conditional routing rules dispatching detractor logs directly into priority recovery queues.',
      'REST webhook test harness verifying payload delivery and retry backoff behavior.'
    ],
    outcomes: [
      'Unified NPS telemetry and support ticket tags into a single operational command view.',
      'Enabled proactive outreach to at-risk enterprise accounts within 1 hour of detractor submission.',
      'Streamlined executive weekly reporting with automated CSV/JSON metric exports.'
    ],
    technologies: ['Chart.js', 'Python', 'MongoDB', 'Webhooks', 'JavaScript'],
    year: '2024',
    interactiveDemoType: 'nps-calculator'
  }
];

const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'lead-tech-support',
    role: 'Lead Tech Support Engineer',
    period: 'Aug 2023 – Present',
    domain: 'Technical Support & Production Operations',
    summary:
      'Leading end-to-end technical escalation workflows, root-cause diagnostics, and service quality analytics for production SaaS environments.',
    bullets: [
      'Lead technical support workflows and resolve critical customer escalations across production systems.',
      'Perform deep root-cause analysis (RCA) using API logs, Postman, and database queries in collaboration with product, engineering, and DBA teams.',
      'Analyze support metrics, ticket trends, and SLAs to drive continuous service quality improvements and reduce repeat incidents.'
    ],
    metrics: 'P1 Escalation Lead · RCA & SLA Governance'
  },
  {
    id: 'prod-support-engineer',
    role: 'Production Support Engineer',
    period: 'Mar 2021 – Jul 2023',
    domain: 'Production Support · Enterprise SaaS',
    summary:
      'Managed application health monitoring, API troubleshooting, and cross-functional defect resolution for high-concurrency educational platforms.',
    bullets: [
      'Supported enterprise educational applications and multi-tenant SaaS platforms in live production.',
      'Cross-functionally resolved production issues, database anomalies, and REST API integration failures.',
      'Monitored real-time application health and authored internal knowledge base runbooks for recurring incidents.'
    ],
    metrics: 'Enterprise EdTech & SaaS · 24/7 Production Health'
  },
  {
    id: 'tech-support-engineer',
    role: 'Tech Support Engineer',
    period: 'Mar 2018 – Mar 2021',
    domain: 'Technical Support & Client Operations',
    summary:
      'Delivered frontline and tier-2 software/hardware diagnostics while establishing team-wide troubleshooting standards and onboarding programs.',
    bullets: [
      'Diagnosed and resolved complex software, network, and hardware issues for enterprise and commercial clients.',
      'Trained and mentored new team members on structured troubleshooting protocols, ticketing hygiene, and diagnostic tooling.',
      'Documented standard operating procedures that accelerated first-contact resolution across the support desk.'
    ],
    metrics: 'Tier 1/2 Diagnostics · Team Mentorship'
  }
];

const SKILL_GROUPS = [
  {
    category: 'AI & Data Quality',
    description: 'Model evaluation, human-in-the-loop alignment, and NLP verification',
    items: [
      { name: 'AI Output Evaluation', level: 'Expert', detail: 'Hallucination detection, rubric scoring, factuality verification' },
      { name: 'Data Annotation', level: 'Expert', detail: 'Multi-turn dialogue labeling, entity tagging, golden set creation' },
      { name: 'AI Training & RLHF', level: 'Advanced', detail: 'SFT response rewriting, preference ranking, adversarial testing' },
      { name: 'Content Quality Assessment', level: 'Expert', detail: 'Guideline compliance auditing, edge-case policy enforcement' },
      { name: 'NLP', level: 'Advanced', detail: 'Text classification, intent extraction, tokenization workflows' },
      { name: 'Sentiment Analysis', level: 'Advanced', detail: 'Polarity scoring, urgency triage, customer feedback mining' }
    ]
  },
  {
    category: 'Technical Support & Operations',
    description: 'Enterprise SaaS incident response, diagnostics, and service governance',
    items: [
      { name: 'SaaS Support', level: 'Expert', detail: 'Multi-tenant configuration, authentication & webhook debugging' },
      { name: 'Production Support', level: 'Expert', detail: 'Live incident triage, log correlation, SLA management' },
      { name: 'Root Cause Analysis', level: 'Expert', detail: '5-Whys investigation, defect reproduction, post-mortem authoring' },
      { name: 'System Analysis', level: 'Advanced', detail: 'Distributed workflow tracing, state validation, bottleneck detection' },
      { name: 'Jira & Service Desk', level: 'Expert', detail: 'Bug lifecycle management, escalation workflows, SLA reporting' }
    ]
  },
  {
    category: 'Development & APIs',
    description: 'Practical engineering toolkit for automation, querying, and API inspection',
    items: [
      { name: 'Python', level: 'Advanced', detail: 'Data parsing, NLP scripting, automation utilities, backend APIs' },
      { name: 'JavaScript', level: 'Advanced', detail: 'Frontend interactivity, JSON manipulation, async API integrations' },
      { name: 'MongoDB', level: 'Advanced', detail: 'Document querying, aggregation pipelines, index diagnostics' },
      { name: 'REST APIs', level: 'Expert', detail: 'HTTP lifecycle, status codes, payload validation, auth headers' },
      { name: 'Postman', level: 'Expert', detail: 'Automated test collections, environment variables, endpoint debugging' }
    ]
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [skillSearch, setSkillSearch] = useState<string>('');
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');

  // Interactive Sandbox states inside Modal or Interactive Workbench
  const [sampleFeedback, setSampleFeedback] = useState<string>(
    'Urgent: Our production webhook endpoint is returning HTTP 504 timeouts after the latest v4.2 update, blocking student logins!'
  );
  const [rlhfSelectedModel, setRlhfSelectedModel] = useState<'A' | 'B'>('A');

  const email = 'shubhamsrivastava4971@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    });
  };

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  // Live sentiment evaluator for interactive case study preview
  const evaluateFeedbackText = (text: string) => {
    const lower = text.toLowerCase();
    const negativeKeywords = ['urgent', '504', 'timeout', 'error', 'blocking', 'broken', 'fail', 'crash', 'bug', 'slow'];
    const positiveKeywords = ['great', 'smooth', 'resolved', 'thank', 'helpful', 'fast', 'love', 'excellent'];

    let negHits = 0;
    let posHits = 0;
    negativeKeywords.forEach((k) => {
      if (lower.includes(k)) negHits++;
    });
    positiveKeywords.forEach((k) => {
      if (lower.includes(k)) posHits++;
    });

    if (negHits > posHits) {
      const score = Math.max(-0.96, -0.45 - negHits * 0.14).toFixed(2);
      return {
        sentiment: 'Negative / Critical Escalation',
        score,
        priority: negHits >= 2 ? 'P1 — Immediate L3 Triage' : 'P2 — High Priority',
        route: 'Webhook → #prod-incidents-alert'
      };
    } else if (posHits > negHits) {
      const score = Math.min(0.98, 0.55 + posHits * 0.14).toFixed(2);
      return {
        sentiment: 'Positive / Promoter',
        score: `+${score}`,
        priority: 'P4 — Log & Archive',
        route: 'MongoDB → NPS Promoter Cohort'
      };
    }
    return {
      sentiment: 'Neutral / Informational',
      score: '0.05',
      priority: 'P3 — Standard Queue',
      route: 'Support Triage Inbox'
    };
  };

  const liveSentiment = evaluateFeedbackText(sampleFeedback);

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f3f6fc] relative selection:bg-[#6366f1]/30 selection:text-white">
      {/* Subtle Ambient Background Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-28 -left-28 w-[500px] h-[500px] rounded-full bg-[#6366f1] opacity-20 blur-[140px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[38%] -right-36 w-[500px] h-[500px] rounded-full bg-[#a855f7] opacity-15 blur-[140px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-28 left-[18%] w-[500px] h-[500px] rounded-full bg-[#06b6d4] opacity-15 blur-[140px] -z-10"
      />

      {/* Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-50 bg-[#090d16]/85 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-[1140px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-display text-xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Shubham<span className="text-[#6366f1]">.</span>
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94a3b8]">
            <a
              href="#about"
              className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#6366f1] whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#experience"
              className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#6366f1] whitespace-nowrap"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#6366f1] whitespace-nowrap"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#6366f1] whitespace-nowrap"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#6366f1] whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 text-xs font-semibold text-[#f3f6fc] bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              {copiedToast ? 'Email Copied' : 'Copy Email'}
            </button>
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#6366f1] hover:bg-[#5558e6] rounded-lg transition-colors whitespace-nowrap"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1140px] mx-auto px-6">
        {/* Hero Section */}
        <section className="py-20 lg:py-28 border-b border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Headline & Lead */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 text-xs font-medium text-[#94a3b8] mb-5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981]" />
                <span className="text-[#e2e8f0] font-semibold">Open for New Opportunities</span>
                <span aria-hidden="true">·</span>
                <span>Lead Technical Support & AI Quality</span>
              </div>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight leading-[1.08] text-white mb-6"
                style={{ textWrap: 'balance' }}
              >
                Technical Support &{' '}
                <span className="bg-gradient-to-r from-[#818cf8] via-[#c084fc] to-[#38bdf8] bg-clip-text text-transparent">
                  AI Quality Specialist
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed max-w-[62ch] mb-8">
                7+ years of experience in SaaS production support, API troubleshooting, and system
                analysis, combined with hands-on expertise in AI evaluation, model alignment, and
                quality assurance.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:opacity-95 transition-all shadow-[0_8px_20px_rgba(99,102,241,0.25)] inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span>View My Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-[#121929]/80 hover:bg-[#1c263e]/90 border border-white/[0.08] transition-colors whitespace-nowrap"
                >
                  Get in Touch
                </a>
                <button
                  onClick={() => setActiveProject(PROJECTS[0])}
                  className="px-5 py-3 rounded-xl font-semibold text-sm text-[#cbd5e1] hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Try Live NLP Triage Demo</span>
                  <ChevronRight className="w-4 h-4 text-[#06b6d4]" />
                </button>
              </div>
            </div>

            {/* Right Column: Profile Card */}
            <aside className="lg:col-span-5">
              <div className="bg-[#121929]/75 border border-white/[0.08] rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex items-center gap-5 pb-6 border-b border-white/[0.08]">
                  <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center text-2xl font-extrabold text-white shrink-0 shadow-lg">
                    SS
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Shubham Srivastava
                    </h2>
                    <p className="text-sm text-[#94a3b8] mt-1">
                      Lead Technical Support & AI Quality
                    </p>
                    <p className="text-xs text-[#06b6d4] mt-1.5 font-mono-tabular">
                      shubhamsrivastava4971@gmail.com
                    </p>
                  </div>
                </div>

                {/* Unboxed Clean Metrics Row */}
                <div className="grid grid-cols-2 gap-6 py-6 border-b border-white/[0.08]">
                  <div>
                    <div className="font-mono-tabular text-2xl font-extrabold text-white">
                      7+ Years
                    </div>
                    <div className="text-xs text-[#94a3b8] mt-1">
                      Production & Tech Experience
                    </div>
                  </div>
                  <div>
                    <div className="font-mono-tabular text-2xl font-extrabold text-white">
                      AI + Support
                    </div>
                    <div className="text-xs text-[#94a3b8] mt-1">Core Specialization</div>
                  </div>
                </div>

                {/* Operational Focus Summary */}
                <div className="pt-6 space-y-3 text-xs text-[#94a3b8]">
                  <div className="flex items-center justify-between">
                    <span>Primary Stack</span>
                    <span className="text-[#e2e8f0] font-medium">
                      Python · JS · MongoDB · REST APIs
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AI Specialization</span>
                    <span className="text-[#e2e8f0] font-medium">
                      RLHF · LLM Evaluation · NLP QA
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Operations</span>
                    <span className="text-[#e2e8f0] font-medium">
                      RCA · Postman · Jira · SLA Analytics
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Subtle Editorial Marquee Divider */}
        <div className="py-4 border-b border-white/[0.08] overflow-hidden select-none">
          <div className="animate-marquee flex items-center gap-8 text-xs font-medium text-[#94a3b8]/70">
            <span>SaaS Production Support</span>
            <span aria-hidden="true">·</span>
            <span>AI Output Evaluation & RLHF Alignment</span>
            <span aria-hidden="true">·</span>
            <span>Root Cause Analysis (RCA)</span>
            <span aria-hidden="true">·</span>
            <span>REST API Diagnostics via Postman</span>
            <span aria-hidden="true">·</span>
            <span>Python & MongoDB Automation</span>
            <span aria-hidden="true">·</span>
            <span>NLP Sentiment Triage</span>
            <span aria-hidden="true">·</span>
            <span>SaaS Production Support</span>
            <span aria-hidden="true">·</span>
            <span>AI Output Evaluation & RLHF Alignment</span>
            <span aria-hidden="true">·</span>
            <span>Root Cause Analysis (RCA)</span>
            <span aria-hidden="true">·</span>
            <span>REST API Diagnostics via Postman</span>
            <span aria-hidden="true">·</span>
            <span>Python & MongoDB Automation</span>
            <span aria-hidden="true">·</span>
            <span>NLP Sentiment Triage</span>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="py-20 border-b border-white/[0.08]">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-wider text-[#06b6d4] mb-2">
              01. About Me
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Problem solver with a technical mindset.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121929]/75 border border-white/[0.08] rounded-2xl p-8">
              <div className="text-xs font-mono-tabular text-[#818cf8] mb-2">
                Production Engineering & Escalations
              </div>
              <h3 className="text-xl font-bold text-white mb-3">What I Bring</h3>
              <p className="text-[#94a3b8] text-[15px] leading-relaxed">
                Strong troubleshooting and system-analysis capabilities, experience handling
                high-priority escalations and production incidents, and practical knowledge of
                Python, JavaScript, MongoDB, REST APIs, and Postman. I bridge the gap between
                customer-facing incidents and deep backend engineering fixes.
              </p>
            </div>

            <div className="bg-[#121929]/75 border border-white/[0.08] rounded-2xl p-8">
              <div className="text-xs font-mono-tabular text-[#06b6d4] mb-2">
                Model Alignment & Quality Assurance
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI & Data Focus</h3>
              <p className="text-[#94a3b8] text-[15px] leading-relaxed">
                Recent focus on AI evaluation, output validation against strict guidelines, dataset
                annotation, RLHF quality control, prompt evaluation, and NLP-driven feedback
                analysis. I apply rigorous production QA standards to ensure LLM outputs are
                accurate, safe, and helpful.
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 border-b border-white/[0.08]">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-wider text-[#06b6d4] mb-2">
              02. Experience
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Professional Journey
            </h2>
          </div>

          <div className="space-y-6">
            {EXPERIENCE.map((item, idx) => (
              <div
                key={item.id}
                className="bg-[#121929]/75 border border-white/[0.08] hover:border-[#6366f1]/40 rounded-2xl p-7 sm:p-8 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono-tabular text-xs text-[#6366f1] font-semibold">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                  </div>
                  <div className="font-mono-tabular text-xs text-[#94a3b8]">
                    {item.period}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-[#06b6d4] font-medium mb-4">
                  <span>{item.domain}</span>
                  <span aria-hidden="true" className="text-[#94a3b8]">
                    ·
                  </span>
                  <span className="text-[#94a3b8]">{item.metrics}</span>
                </div>

                <p className="text-sm text-[#cbd5e1] mb-4">{item.summary}</p>

                <ul className="space-y-2 text-sm text-[#94a3b8] list-disc pl-5">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section — Dynamic Bento Grid + Interactive Case Study Modal */}
        <section id="projects" className="py-20 border-b border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold tracking-wider text-[#06b6d4] mb-2">
                03. Projects
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                Selected Work & Case Studies
              </h2>
            </div>

            {/* Interactive Filter Controls (Functional Buttons per Frontend Design Skill) */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#121929] border border-white/[0.08] rounded-xl self-start">
              {['All', 'AI & NLP', 'AI Quality', 'Support & Operations', 'Analytics'].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-[#6366f1] text-white'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group bg-[#121929]/75 border border-white/[0.08] hover:border-[#a855f7]/50 rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  {/* Quiet unboxed 1-line text kicker with typographic separators */}
                  <div className="flex items-center justify-between text-xs text-[#94a3b8] mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#818cf8]">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{project.year}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#cbd5e1] group-hover:text-white transition-colors">
                      <span>Inspect Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#818cf8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#c084fc] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs font-medium text-[#cbd5e1] mb-3">{project.subtitle}</p>

                  <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Clean unboxed technology metadata with typographic separators */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono-tabular text-[#cbd5e1]">
                    {project.technologies.map((tech, index) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {index < project.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-[#94a3b8]/50">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Live Interactive AI & Support Quality Workbench (Embedded Proof) */}
          <div className="mt-10 bg-[#121929]/90 border border-white/[0.08] rounded-2xl p-7 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <div className="text-xs font-semibold text-[#06b6d4] mb-1">
                  Interactive Verification Workbench
                </div>
                <h3 className="text-lg font-bold text-white">
                  Live NLP Feedback Triage & Sentiment Simulator
                </h3>
                <p className="text-xs text-[#94a3b8] mt-1">
                  Test how incoming customer tickets are automatically scored for polarity, urgency
                  SLA, and webhook routing.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    setSampleFeedback(
                      'Urgent: Our production webhook endpoint is returning HTTP 504 timeouts after the latest v4.2 update, blocking student logins!'
                    )
                  }
                  className="px-3 py-1.5 text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg text-[#e2e8f0] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Load P1 Outage Sample
                </button>
                <button
                  onClick={() =>
                    setSampleFeedback(
                      'The new dashboard export works great! Support resolved our API token question super fast. Thank you!'
                    )
                  }
                  className="px-3 py-1.5 text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg text-[#e2e8f0] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Load Promoter Sample
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-start">
              <div className="lg:col-span-7">
                <label
                  htmlFor="feedback-input"
                  className="block text-xs font-medium text-[#94a3b8] mb-2"
                >
                  Incoming Customer Ticket / Feedback Payload
                </label>
                <textarea
                  id="feedback-input"
                  rows={3}
                  value={sampleFeedback}
                  onChange={(e) => setSampleFeedback(e.target.value)}
                  className="w-full rounded-xl bg-[#090d16] border border-white/[0.1] p-3.5 text-sm text-white placeholder-[#94a3b8]/50 focus:outline-none focus:border-[#6366f1] transition-colors"
                  placeholder="Type a support ticket or customer feedback message to test classification..."
                />
              </div>

              <div className="lg:col-span-5 bg-[#090d16]/80 border border-white/[0.08] rounded-xl p-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-white/[0.06]">
                  <span className="text-[#94a3b8]">Classification</span>
                  <span className="font-semibold text-white">{liveSentiment.sentiment}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/[0.06]">
                  <span className="text-[#94a3b8]">Polarity Score</span>
                  <span className="font-mono-tabular font-semibold text-[#06b6d4]">
                    {liveSentiment.score}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/[0.06]">
                  <span className="text-[#94a3b8]">Assigned SLA Queue</span>
                  <span className="font-semibold text-[#c084fc]">{liveSentiment.priority}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#94a3b8]">Automated Action</span>
                  <span className="font-mono-tabular text-[#cbd5e1]">{liveSentiment.route}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 border-b border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold tracking-wider text-[#06b6d4] mb-2">
                04. Skills
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                Tools & Capabilities
              </h2>
            </div>

            {/* Interactive Skill Filter & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder="Filter capabilities..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-[#121929] border border-white/[0.08] rounded-lg text-white placeholder-[#94a3b8] focus:outline-none focus:border-[#6366f1]"
                />
              </div>
              <div className="flex items-center gap-1 p-1 bg-[#121929] border border-white/[0.08] rounded-lg">
                {['All', 'AI & Data Quality', 'Technical Support & Operations', 'Development & APIs'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveSkillCategory(cat)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        activeSkillCategory === cat
                          ? 'bg-[#6366f1] text-white'
                          : 'text-[#94a3b8] hover:text-white'
                      }`}
                    >
                      {cat === 'Technical Support & Operations'
                        ? 'Support & Ops'
                        : cat === 'AI & Data Quality'
                        ? 'AI & Quality'
                        : cat === 'Development & APIs'
                        ? 'Dev & APIs'
                        : 'All'}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {SKILL_GROUPS.filter(
              (group) => activeSkillCategory === 'All' || group.category === activeSkillCategory
            ).map((group) => {
              const filteredItems = group.items.filter(
                (item) =>
                  item.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
                  item.detail.toLowerCase().includes(skillSearch.toLowerCase())
              );

              if (filteredItems.length === 0) return null;

              return (
                <div
                  key={group.category}
                  className="bg-[#121929]/75 border border-white/[0.08] rounded-2xl p-7"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-5 mb-5 border-b border-white/[0.08]">
                    <h3 className="text-lg font-bold text-[#06b6d4]">{group.category}</h3>
                    <p className="text-xs text-[#94a3b8]">{group.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredItems.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-4 rounded-xl bg-[#090d16]/60 border border-white/[0.06] hover:border-[#6366f1]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-sm font-bold text-white">{skill.name}</span>
                          <span className="text-[11px] font-mono-tabular text-[#818cf8]">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">{skill.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/90 border border-white/[0.08] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-xs font-bold tracking-wider text-[#06b6d4] mb-2">
                05. Contact
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Let’s work together.
              </h2>
              <p className="text-[#94a3b8] text-sm sm:text-base mt-2 max-w-xl">
                Open for Lead Tech Support, AI Data Evaluation, and AI Operations roles. Available
                for immediate collaboration and technical interviews.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#cbd5e1]">
                <span>Direct Email: {email}</span>
                <span aria-hidden="true">·</span>
                <span>Response Time: &lt; 24 Hours</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href={`mailto:${email}`}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:opacity-95 transition-all shadow-[0_8px_20px_rgba(99,102,241,0.25)] inline-flex items-center gap-2 whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                <span>Email Me</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#121929] hover:bg-[#1c263e] border border-white/[0.1] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                {copiedToast ? (
                  <>
                    <Check className="w-4 h-4 text-[#10b981]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#94a3b8]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Case Study Inspection Lightbox / Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-[#0f172a] border border-white/[0.12] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#94a3b8] mb-1">
                  <span className="text-[#818cf8] font-semibold">{activeProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{activeProject.year}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {activeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                aria-label="Close modal"
                className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6 text-sm">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#06b6d4] mb-2">
                  Problem Context
                </h4>
                <p className="text-[#cbd5e1] leading-relaxed">{activeProject.problem}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#06b6d4] mb-2">
                  Technical Architecture & Workflow
                </h4>
                <ul className="space-y-2 text-[#94a3b8] list-disc pl-5">
                  {activeProject.architecture.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive RLHF comparison preview if AI Quality project is selected */}
              {activeProject.interactiveDemoType === 'rlhf' && (
                <div className="p-4 rounded-xl bg-[#090d16] border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#c084fc]">
                      RLHF Evaluation Rubric Sample
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setRlhfSelectedModel('A')}
                        className={`px-2.5 py-1 text-xs rounded font-mono-tabular cursor-pointer ${
                          rlhfSelectedModel === 'A'
                            ? 'bg-[#6366f1] text-white'
                            : 'bg-white/[0.05] text-[#94a3b8]'
                        }`}
                      >
                        Response A (Preferred)
                      </button>
                      <button
                        onClick={() => setRlhfSelectedModel('B')}
                        className={`px-2.5 py-1 text-xs rounded font-mono-tabular cursor-pointer ${
                          rlhfSelectedModel === 'B'
                            ? 'bg-[#6366f1] text-white'
                            : 'bg-white/[0.05] text-[#94a3b8]'
                        }`}
                      >
                        Response B (Rejected)
                      </button>
                    </div>
                  </div>
                  {rlhfSelectedModel === 'A' ? (
                    <div className="text-xs text-[#cbd5e1] space-y-1.5">
                      <p className="font-mono-tabular text-[#10b981]">
                        Factuality: Pass · Instruction Following: 5/5 · Safety: Verified
                      </p>
                      <p className="text-[#94a3b8]">
                        Provides exact MongoDB <code className="text-white">aggregate()</code> stage
                        syntax with proper <code className="text-white">$match</code> index usage
                        and zero fabricated flags.
                      </p>
                    </div>
                  ) : (
                    <div className="text-xs text-[#cbd5e1] space-y-1.5">
                      <p className="font-mono-tabular text-amber-400">
                        Factuality: Hallucination Flagged · Instruction Following: 2/5
                      </p>
                      <p className="text-[#94a3b8]">
                        Invents a non-existent <code className="text-white">--auto-repair-shard</code>{' '}
                        CLI parameter and omits authentication header verification steps.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#06b6d4] mb-2">
                  Key Outcomes & Impact
                </h4>
                <ul className="space-y-1.5 text-[#cbd5e1] list-disc pl-5">
                  {activeProject.outcomes.map((outcome, i) => (
                    <li key={i}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono-tabular text-[#94a3b8]">
                {activeProject.technologies.map((t, idx) => (
                  <React.Fragment key={t}>
                    <span>{t}</span>
                    {idx < activeProject.technologies.length - 1 && <span>·</span>}
                  </React.Fragment>
                ))}
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#6366f1] text-white hover:bg-[#5558e6] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 bg-[#6366f1] text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl transition-opacity duration-300 ${
          copiedToast ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        Email address copied to clipboard!
      </div>

      {/* Footer */}
      <footer className="text-center py-8 px-6 text-[#94a3b8] text-xs border-t border-white/[0.08]">
        © 2026 Shubham Srivastava · Technical Support & AI Specialist Portfolio
      </footer>
    </div>
  );
}
