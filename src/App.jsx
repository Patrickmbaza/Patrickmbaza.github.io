import { useEffect, useRef, useState } from 'react'
import { getAiConfig, sendPortfolioQuestion } from './lib/ai'

const coreSkills = [
  'AWS & Azure DevOps',
  'Terraform, Ansible & CloudFormation',
  'Docker, Kubernetes & Helm',
  'Jenkins, GitHub Actions, Azure DevOps, SonarQube, ArgoCD',
  'Bash, Python, Groovy, Java, Node.js',
  'Prometheus, Grafana & CloudWatch',
]

const aiSkills = [
  'LLM Integration & Prompt Engineering',
  'AI-Powered SaaS Architecture',
  'OpenAI / Anthropic API Development',
  'AI-Augmented Security & Cyber Analysis',
  'Full-Stack AI Web Applications',
  'RAG Pipelines & AI Workflow Automation',
]

const projects = [
  {
    title: '3-Tier Chat App',
    description:
      'Built with Docker Compose, container networking, and multi-service orchestration for scalable real-time communication.',
    href: 'https://github.com/Patrickmbaza/mychat-app-react-nodejs',
  },
  {
    title: 'Kubernetes Cluster Management',
    description:
      'Provisioned production-ready Kubernetes clusters with Terraform and integrated AWS ALB Ingress Controller for routing.',
    href: 'https://github.com/Patrickmbaza/EKS_deployment_service_scripts',
  },
  {
    title: 'CI/CD Pipeline',
    description:
      'Automated delivery with Jenkins and GitHub for predictable integration and zero-downtime releases.',
    href: 'https://github.com/Patrickmbaza/Patclass1',
  },
  {
    title: 'EasyShop',
    description:
      'Full-stack e-commerce platform built with Next.js, TypeScript, MongoDB, secure authentication, and polished UX.',
    href: 'https://github.com/Patrickmbaza/E-commerce-app_EKS_Project',
  },
  {
    title: '3-Tier K8s GitOps',
    description:
      'GitOps-driven Kubernetes deployment with dynamic PVC provisioning and Route 53 integration.',
    href: 'https://github.com/Patrickmbaza/3-Tier-K8s-Project-GitOps.git',
  },
  {
    title: 'Amazon DevSecOps',
    description:
      'Shopping platform pipeline with automated security scans, CI/CD controls, and release automation.',
    href: 'https://github.com/Patrickmbaza/amazon-Devsecops.git',
  },
  {
    title: 'AutoDock Deployer',
    description:
      'Production-grade Bash automation for end-to-end deployment of Dockerized applications to remote Linux servers.',
    href: 'https://github.com/Patrickmbaza/AutoDock-Deployer.git',
  },
  {
    title: 'Blue/Green Deployment',
    description:
      'Zero-downtime blue/green release system with auto-failover, traffic routing, health checks, and Slack alerting.',
    href: 'https://github.com/Patrickmbaza/blue-green-nginx-failover.git',
  },
  {
    title: 'Local Linux VPC Emulator',
    description:
      'Bash-based VPC emulation environment for learning and testing cloud networking patterns without cloud spend.',
    href: 'https://github.com/Patrickmbaza/Local-Linux-VPC-emulator.git',
  },
  {
    title: 'Azure Multi-Environment CI/CD',
    description:
      'Azure DevOps pipeline spanning Dev, QA, and Production with automated testing, approvals, and monitoring.',
    href: 'https://github.com/Patrickmbaza/Azure-repo.git',
  },
]

const aiProjects = [
  {
    title: 'Consultation SaaS App',
    description:
      'AI-powered consultation platform with context-aware interactions, smart scheduling, and operational analytics.',
    href: 'https://github.com/Patrickmbaza/Consultation-SaaS-App.git',
  },
  {
    title: 'AI SaaS Application',
    description:
      'Multi-tenant AI platform with usage metering, secure key handling, and scalable LLM-backed features.',
    href: 'https://github.com/Patrickmbaza/AI-SAAS-APPLICATION.git',
  },
  {
    title: 'AI-Augmented Web App',
    description:
      'Modern web application blending standard product flows with NLP, recommendations, and live AI-assisted interactions.',
    href: 'https://github.com/Patrickmbaza/AI-Augmented-Web-App.git',
  },
  {
    title: 'Cyber Analysis Project',
    description:
      'AI-assisted cybersecurity analysis tool for threat detection, log interpretation, and actionable reporting.',
    href: 'https://github.com/Patrickmbaza/Cyber_Analysis_Project.git',
  },
]

const spotlightProjects = [
  {
    title: 'Blue/Green Deployment',
    category: 'Release Engineering',
    summary:
      'Zero-downtime delivery system with automatic failover, live health checks, and Slack alerting built for resilient production releases.',
    impact: 'Automated traffic switching and instant rollback behavior',
    stack: ['Nginx', 'Bash', 'Health Monitoring', 'Slack Alerts'],
    href: 'https://github.com/Patrickmbaza/blue-green-nginx-failover.git',
  },
  {
    title: '3-Tier K8s GitOps',
    category: 'Platform Engineering',
    summary:
      'GitOps-driven Kubernetes deployment architecture with dynamic storage provisioning and DNS-aware delivery across environments.',
    impact: 'Declarative operations for repeatable multi-service deployment',
    stack: ['Kubernetes', 'GitOps', 'PVC', 'Route 53'],
    href: 'https://github.com/Patrickmbaza/3-Tier-K8s-Project-GitOps.git',
  },
  {
    title: 'AI SaaS Application',
    category: 'AI Product Systems',
    summary:
      'Multi-tenant AI application designed around usage metering, secure API handling, and scalable LLM-backed product features.',
    impact: 'Production-minded AI delivery with operational controls',
    stack: ['LLM APIs', 'Multi-tenancy', 'Security', 'SaaS Architecture'],
    href: 'https://github.com/Patrickmbaza/AI-SAAS-APPLICATION.git',
  },
]

const highlights = [
  {
    value: '4+',
    label: 'Years building cloud and DevOps systems',
  },
  {
    value: 'CI/CD',
    label: 'Delivery automation across build, release, and deploy stages',
  },
  {
    value: 'AI',
    label: 'LLM-backed product workflows and modern SaaS integrations',
  },
]

const focusAreas = [
  'Platform engineering for scalable cloud environments',
  'Release pipelines with security, automation, and observability built in',
  'Containerized application delivery using Docker, Kubernetes, and Helm',
  'AI-enabled product systems with production discipline',
]

const starterQuestions = [
  'What are Patrick’s strongest DevOps skills?',
  'Which projects are most relevant for a platform engineering role?',
  'How can I contact Patrick for an opportunity?',
]

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section reveal">
      <div className="section-heading">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function SkillGrid({ items, tone = 'default' }) {
  return (
    <div className="skill-grid">
      {items.map((item, index) => (
        <article
          key={item}
          className={`skill-card ${tone} reveal`}
          style={{ transitionDelay: `${index * 70}ms` }}
        >
          <span className="skill-bullet" aria-hidden="true" />
          <span>{item}</span>
        </article>
      ))}
    </div>
  )
}

function ProjectGrid({ items, tone = 'default' }) {
  return (
    <div className="project-grid">
      {items.map((project, index) => (
        <article
          key={project.title}
          className={`project-card ${tone} reveal`}
          style={{ transitionDelay: `${index * 90}ms` }}
        >
          <p className="project-kicker">{tone === 'accent' ? 'AI Project' : 'Case Study'}</p>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href={project.href} target="_blank" rel="noreferrer">
            View Source
          </a>
        </article>
      ))}
    </div>
  )
}

function SpotlightCarousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % items.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [items.length])

  const activeProject = items[currentIndex]

  return (
    <div className="spotlight reveal">
      <div className="spotlight-copy">
        <p className="spotlight-label">Project Spotlight</p>
        <div className="spotlight-meta">
          <span>{activeProject.category}</span>
          <span>
            {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
        <h3>{activeProject.title}</h3>
        <p className="spotlight-summary">{activeProject.summary}</p>
        <p className="spotlight-impact">{activeProject.impact}</p>
        <div className="spotlight-stack" aria-label={`${activeProject.title} technologies`}>
          {activeProject.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <a href={activeProject.href} target="_blank" rel="noreferrer" className="spotlight-link">
          View Spotlight Project
        </a>
      </div>

      <div className="spotlight-panel">
        <div className="spotlight-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="spotlight-panel-card">
          <p className="spotlight-panel-label">Featured Build</p>
          <h4>{activeProject.title}</h4>
          <p>{activeProject.summary}</p>
        </div>

        <div className="spotlight-controls">
          <button
            type="button"
            className="spotlight-arrow"
            onClick={() =>
              setCurrentIndex((index) => (index - 1 + items.length) % items.length)
            }
            aria-label="Previous spotlight project"
          >
            Prev
          </button>
          <div className="spotlight-dots" role="tablist" aria-label="Spotlight projects">
            {items.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Show ${item.title}`}
                className={index === currentIndex ? 'active' : ''}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="spotlight-arrow"
            onClick={() => setCurrentIndex((index) => (index + 1) % items.length)}
            aria-label="Next spotlight project"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

function AiAssistant() {
  const config = getAiConfig()
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'intro',
      role: 'assistant',
      content:
        config.mode === 'live' && config.isLiveConfigured
          ? 'Live AI mode is active. Ask about skills, projects, delivery experience, or how to reach Patrick.'
          : 'Mock AI mode is active. Ask about skills, projects, or contact details to preview the assistant experience safely on GitHub Pages.',
    },
  ])

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedQuestion = question.trim()
    if (!trimmedQuestion || isLoading) {
      return
    }

    const nextHistory = [...messages, { id: crypto.randomUUID(), role: 'user', content: trimmedQuestion }]
    setMessages(nextHistory)
    setQuestion('')
    setIsLoading(true)

    try {
      const result = await sendPortfolioQuestion(
        trimmedQuestion,
        nextHistory.map((item) => ({
          role: item.role,
          content: item.content,
        })),
      )

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: result.answer,
        },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'The live AI request failed. Keep using mock mode for Pages, or verify that VITE_API_BASE_URL points to a running backend.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="ai-assistant reveal">
      <div className="ai-header">
        <div>
          <p className="spotlight-label">AI Assistant</p>
          <h3>Ask Patrick</h3>
        </div>
        <span className={`ai-mode ${config.mode}`}>
          {config.mode === 'live' && config.isLiveConfigured ? 'Live Mode' : 'Mock Mode'}
        </span>
      </div>

      <p className="ai-description">
        This assistant can answer questions about Patrick’s experience, projects, contact details,
        and AI/DevOps focus areas. Use mock mode on GitHub Pages and switch to live mode when a
        backend with an OpenAI key is available.
      </p>

      <div className="ai-starters">
        {starterQuestions.map((item) => (
          <button key={item} type="button" onClick={() => setQuestion(item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="ai-chatlog" aria-live="polite">
        {messages.map((message) => (
          <article key={message.id} className={`ai-message ${message.role}`}>
            <span className="ai-role">{message.role === 'assistant' ? 'AI' : 'You'}</span>
            <p>{message.content}</p>
          </article>
        ))}
        {isLoading ? (
          <article className="ai-message assistant loading">
            <span className="ai-role">AI</span>
            <p>Thinking...</p>
          </article>
        ) : null}
      </div>

      <form className="ai-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="ai-question">
          Ask a question about Patrick
        </label>
        <textarea
          id="ai-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about skills, projects, DevOps experience, AI work, or contact details"
          rows={3}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Ask AI'}
        </button>
      </form>
    </div>
  )
}

export default function App() {
  const rootRef = useRef(null)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return undefined
    }

    const revealNodes = root.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )

    revealNodes.forEach((node) => revealObserver.observe(node))

    const trackedSections = Array.from(root.querySelectorAll('main section[id]'))
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]?.target?.id) {
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-20% 0px -45% 0px' },
    )

    trackedSections.forEach((section) => sectionObserver.observe(section))

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  return (
    <div className="page-shell" ref={rootRef}>
      <header className="hero">
        <nav className="top-nav" aria-label="Primary navigation">
          <a href="#about" className={activeSection === 'about' ? 'active' : ''}>
            About
          </a>
          <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>
            Skills
          </a>
          <a href="#assistant" className={activeSection === 'assistant' ? 'active' : ''}>
            AI
          </a>
          <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>
            Projects
          </a>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>
            Contact
          </a>
        </nav>

        <div className="hero-content">
          <div className="hero-copy reveal is-visible">
            <p className="eyebrow">DevOps Engineer • Cloud • Kubernetes • AI Engineering</p>
            <h1>Goteh Mbaza Patrick</h1>
            <p className="lede">
              I build production systems that are automated, observable, secure, and ready to
              scale. My work spans cloud infrastructure, delivery pipelines, container platforms,
              and modern AI-enabled applications.
            </p>

            <div className="hero-pill-row" aria-label="Core focus">
              <span>Cloud Infrastructure</span>
              <span>Kubernetes Delivery</span>
              <span>Automation Systems</span>
              <span>AI Product Engineering</span>
            </div>

            <div className="hero-actions">
              <a className="button primary" href="/resume.pdf" download>
                Download Resume
              </a>
              <a className="button secondary" href="#projects">
                Explore Projects
              </a>
            </div>

            <ul className="hero-metrics" aria-label="Career highlights">
              {highlights.map((item) => (
                <li key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-card reveal is-visible">
            <div className="hero-signal">
              <span className="signal-dot" aria-hidden="true" />
              <span>Production mindset</span>
            </div>
            <div className="portrait-wrap">
              <img src="/profile-v2.jpg.webp" alt="Portrait of Goteh Mbaza Patrick" />
            </div>
            <div className="hero-card-body">
              <p className="availability">Available for DevOps, platform, and AI engineering roles</p>
              <p>Based in Port Harcourt, Nigeria</p>
              <p>
                I design dependable systems that move from local build to production with clear
                operational standards.
              </p>
              <div className="hero-card-links">
                <a href="mailto:gotehmbaza@gmail.com">Email</a>
                <a href="https://github.com/Patrickmbaza" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/goteh-mbaza" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Section id="about" eyebrow="Profile" title="About">
          <div className="about-layout">
            <div className="about-copy">
              <p>
                I am a DevOps engineer with hands-on experience building scalable, secure, and
                automated infrastructure across AWS and Azure. My work is centered on reducing
                manual overhead, improving release confidence, and making systems easier to
                operate.
              </p>
              <p>
                My toolkit includes Terraform, CloudFormation, Docker, Kubernetes, Prometheus,
                Grafana, and Git-based CI/CD systems. I care about reliability, repeatability,
                observability, and clean operational handoff.
              </p>
              <p>
                More recently, I have been applying that same production mindset to AI-enabled
                products, combining LLM APIs and workflow automation with solid software delivery
                practices.
              </p>
            </div>

            <aside className="focus-panel">
              <p className="section-label compact">What I Focus On</p>
              <ul>
                {focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </Section>

        <Section id="skills" eyebrow="Capabilities" title="Skills">
          <p className="section-label reveal">Core DevOps & Cloud</p>
          <SkillGrid items={coreSkills} />

          <p className="section-label accent reveal">AI Engineering</p>
          <SkillGrid items={aiSkills} tone="accent" />
        </Section>

        <Section id="assistant" eyebrow="Interactive Layer" title="AI Assistant">
          <AiAssistant />
        </Section>

        <Section id="projects" eyebrow="Selected Work" title="Projects">
          <SpotlightCarousel items={spotlightProjects} />
          <ProjectGrid items={projects} />
          <div className="divider reveal">
            <span>AI Engineering Projects</span>
          </div>
          <ProjectGrid items={aiProjects} tone="accent" />
        </Section>

        <Section id="contact" eyebrow="Get In Touch" title="Contact">
          <div className="contact-card reveal">
            <p className="contact-intro">
              If you need someone who can connect infrastructure, automation, and delivery into a
              production-ready system, reach out.
            </p>
            <p>Port Harcourt, Rivers State, Nigeria</p>
            <a href="mailto:gotehmbaza@gmail.com">gotehmbaza@gmail.com</a>
            <a href="tel:+2348136320012">+234 813 632 0012</a>
            <div className="contact-links">
              <a href="https://linkedin.com/in/goteh-mbaza" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/Patrickmbaza" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="site-footer">
        <p>Built with React, deployed on GitHub Pages, and packaged for Docker-based delivery.</p>
      </footer>
    </div>
  )
}
