const portfolioFacts = {
  owner: 'Goteh Mbaza Patrick',
  location: 'Port Harcourt, Rivers State, Nigeria',
  summary:
    'DevOps engineer focused on AWS, Azure DevOps, Kubernetes, CI/CD automation, observability, and AI-enabled product systems.',
  skills: [
    'AWS',
    'Azure DevOps',
    'Terraform',
    'CloudFormation',
    'Docker',
    'Kubernetes',
    'Helm',
    'GitHub Actions',
    'Jenkins',
    'Prometheus',
    'Grafana',
    'Python',
    'Node.js',
    'LLM integration',
  ],
  featuredProjects: [
    'Blue/Green Deployment with Auto-Failover & Slack Alerting',
    '3-Tier K8s GitOps',
    'AI SaaS Application',
    'Kubernetes Cluster Management',
  ],
  contact: {
    email: 'gotehmbaza@gmail.com',
    github: 'https://github.com/Patrickmbaza',
    linkedin: 'https://linkedin.com/in/goteh-mbaza',
  },
}

const cannedResponses = [
  {
    match: ['skills', 'stack', 'technology', 'technologies', 'tooling'],
    answer:
      'Patrick works across AWS, Azure DevOps, Terraform, CloudFormation, Docker, Kubernetes, Helm, Jenkins, GitHub Actions, Prometheus, Grafana, Python, Node.js, and LLM-backed product workflows.',
  },
  {
    match: ['project', 'projects', 'portfolio', 'work'],
    answer:
      'Key portfolio projects include Blue/Green Deployment with auto-failover, a 3-Tier Kubernetes GitOps platform, AI SaaS Application architecture, Kubernetes cluster management, and multiple CI/CD delivery systems.',
  },
  {
    match: ['contact', 'email', 'reach', 'hire'],
    answer:
      'You can reach Patrick at gotehmbaza@gmail.com. His GitHub is https://github.com/Patrickmbaza and LinkedIn is https://linkedin.com/in/goteh-mbaza.',
  },
  {
    match: ['ai', 'llm', 'openai'],
    answer:
      'Patrick has expanded into AI engineering by building AI-powered SaaS applications, AI-augmented web apps, and workflow automation that combines LLM integrations with dependable delivery practices.',
  },
  {
    match: ['location', 'where', 'based'],
    answer: 'Patrick is based in Port Harcourt, Rivers State, Nigeria.',
  },
]

function buildMockAnswer(question) {
  const normalized = question.toLowerCase()
  const matched = cannedResponses.find((item) =>
    item.match.some((term) => normalized.includes(term)),
  )

  if (matched) {
    return matched.answer
  }

  return `${portfolioFacts.owner} is a DevOps and AI engineer based in ${portfolioFacts.location}. He focuses on ${portfolioFacts.summary.toLowerCase()} Featured projects include ${portfolioFacts.featuredProjects.join(', ')}.`
}

export function getAiConfig() {
  const mode = import.meta.env.VITE_AI_MODE === 'live' ? 'live' : 'mock'
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || ''

  return {
    mode,
    apiBaseUrl,
    isLiveConfigured: mode === 'live' && Boolean(apiBaseUrl),
  }
}

export async function sendPortfolioQuestion(question, history = []) {
  const config = getAiConfig()

  if (config.mode === 'mock' || !config.apiBaseUrl) {
    return {
      mode: 'mock',
      answer: buildMockAnswer(question),
    }
  }

  const response = await fetch(`${config.apiBaseUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question,
      history,
      context: portfolioFacts,
    }),
  })

  if (!response.ok) {
    throw new Error(`Live AI request failed with status ${response.status}`)
  }

  const payload = await response.json()

  return {
    mode: 'live',
    answer: payload.answer ?? 'No answer returned from the live AI service.',
  }
}
