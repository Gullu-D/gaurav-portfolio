export const profile = {
  name: 'Gaurav Upadhyay',
  headline: 'Software Engineer',
  tagline: 'Building intelligent software at the intersection of AI and full-stack development.',
  about: [
    'I am a Computer Science undergraduate at MIT School of Computing, Pune, with a strong focus on AI engineering and full-stack development. My work spans building production-quality RAG pipelines, real-time OSINT dashboards, and AI-powered analytics agents.',
    'I recently completed an internship at DIAT (DRDO), Pune, gaining hands-on experience with advanced research and engineering workflows. I am actively seeking opportunities where I can contribute to impactful software products.',
  ],
  location: 'Pune, Maharashtra',
  resumePath: '/Gaurav_Upadhyay_Resume.pdf',
  social: {
    github: 'https://github.com/Gullu-D',
    linkedin: 'https://www.linkedin.com/in/gauravupadhyay12062004',
    email: 'ugaurav034@gmail.com',
  },
} as const

export interface Project {
  title: string
  description: string
  longDescription: string
  tech: string[]
  status: 'Completed' | 'In Progress' | 'Prototype'
  github?: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    title: 'Aegis Scan',
    description: 'Real-time OSINT analytics dashboard for discovering publicly available information across web search, Reddit, X, WHOIS, and breach databases.',
    longDescription: 'A full-featured cybersecurity research tool that auto-detects name/email/domain inputs and runs concurrent modules over WebSocket for real-time streaming results. Includes an AI assistant grounded in scan data and a VPN/Tor anonymity demonstration with live world map visualization.',
    tech: ['Python', 'FastAPI', 'React', 'WebSockets', 'D3.js', 'Docker'],
    status: 'Completed',
    highlights: [
      'Async concurrent I/O — all data source modules fire simultaneously via asyncio',
      'Rate limiting on both REST and WebSocket endpoints for API protection',
      'Stateless, containerized backend ready for horizontal scaling',
      'AI assistant (Claude) answers grounded in actual scan data',
    ],
  },
  {
    title: 'AI Document Search',
    description: 'Full-stack RAG chatbot for querying PDF documents with semantic search, page-level citations, and grounded answers.',
    longDescription: 'A production-quality Retrieval-Augmented Generation application with a modular, testable pipeline: PDF ingestion, LangChain-powered chunking and embeddings, FAISS vector search, and grounded generation that explicitly refuses to hallucinate. 103-test offline suite.',
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'LangChain', 'FAISS', 'OpenAI'],
    status: 'Completed',
    github: 'https://github.com/Gullu-D/AI-Document-Search-RAG-Chatbot',
    highlights: [
      'Clean-architecture service layer over LangChain with swappable abstractions',
      '103 automated tests — fully offline, no real API calls',
      'Atomic FAISS persistence with integrity validation on load',
      'Idempotent re-indexing and configurable chunking parameters',
    ],
  },
  {
    title: 'Banking Assistant Agent',
    description: 'AI-powered transaction analysis agent with deterministic financial math and a modern Streamlit dashboard.',
    longDescription: 'An intelligent agent that parses natural-language banking queries, filters and categorizes transactions using Pandas, detects anomalies via statistical methods, and generates AI-grounded summaries — all with a fintech-style dashboard featuring KPI cards and Plotly charts.',
    tech: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'Plotly', 'Pydantic', 'OpenAI'],
    status: 'Completed',
    github: 'https://github.com/Gullu-D/banking-assistant-agent',
    highlights: [
      'Every financial calculation is deterministic — LLM never touches the numbers',
      'Statistical anomaly detection (outliers, duplicates, spending bursts)',
      'Graceful degradation — works fully without any API key',
      '48+ automated tests covering filtering, analytics, and query parsing',
    ],
  },
  {
    title: 'Smart Krishi Mitra',
    description: 'AI-powered agriculture platform helping farmers choose profitable crops, detect pests, and access real-time market prices.',
    longDescription: 'An agriculture technology platform combining CNN-based pest detection via TensorFlow, weather-based crop advisory using OpenWeather API, and real-time mandi pricing from Agmarknet API. Features farmer and buyer dashboards for direct crop trading.',
    tech: ['Python', 'TensorFlow', 'React.js', 'Node.js', 'MongoDB', 'Streamlit'],
    status: 'In Progress',
    highlights: [
      'CNN model trained for pest detection via crop leaf image classification',
      'Intelligent crop advisory based on soil, weather, and budget inputs',
      'Real-time district-wise market pricing from Agmarknet API',
      'Farmer dashboard for crop uploads and buyer portal for direct purchasing',
    ],
  },
]

export interface SkillGroup {
  category: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'HTML5', 'CSS3', 'PHP'],
  },
  {
    category: 'Web Development',
    skills: ['React.js', 'Node.js', 'Express.js', 'FastAPI', 'Tailwind CSS', 'MySQL', 'MongoDB'],
  },
  {
    category: 'Generative AI',
    skills: ['LLMs', 'LangChain', 'RAG', 'Prompt Engineering', 'Multi-Agent Systems', 'FAISS'],
  },
  {
    category: 'AI / ML',
    skills: ['TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit', 'Neo4j'],
  },
  {
    category: 'Dev Tools',
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Linux', 'Vite', 'API Integration'],
  },
]

export interface TimelineItem {
  title: string
  subtitle: string
  location: string
  period: string
  description: string[]
  type: 'experience' | 'education'
}

export const timeline: TimelineItem[] = [
  {
    title: 'Research Intern',
    subtitle: 'DIAT (DRDO)',
    location: 'Pune, Maharashtra',
    period: 'June 2026 — October 2026',
    description: [
      'Research and development under DRDO guidance on advanced technologies',
      'Gained practical exposure to real-world engineering workflows',
    ],
    type: 'experience',
  },
  {
    title: 'B.Tech in Computer Science and Engineering',
    subtitle: 'MIT School of Computing',
    location: 'Pune, Maharashtra',
    period: '2023 — Expected September 2027',
    description: ['Current CGPA: 8.0 / 10.0'],
    type: 'education',
  },
  {
    title: 'Class XII — Science Stream',
    subtitle: 'Army Public School',
    location: 'Ranchi, Jharkhand',
    period: '2021 — 2022',
    description: [],
    type: 'education',
  },
]

export interface Certification {
  title: string
  issuer: string
}

export const certifications: Certification[] = [
  { title: 'Meta Front-End Developer Professional Certificate', issuer: 'Meta / Coursera' },
  { title: 'Google Data Analytics Professional Certificate', issuer: 'Google / Coursera' },
  { title: 'Generative AI Developer Course', issuer: 'DeepLearning.AI' },
  { title: 'Introduction to AI Agents', issuer: 'IBM' },
  { title: 'Generative AI Fundamentals', issuer: 'IBM' },
  { title: 'Introduction to Artificial Intelligence', issuer: 'IBM' },
  { title: 'Developer & Technology Virtual Experience', issuer: 'Accenture UK / Forage' },
  { title: 'Data Analytics Virtual Experience', issuer: 'Deloitte Australia / Forage' },
  { title: 'Data Visualisation Virtual Experience', issuer: 'Tata / Forage' },
  { title: 'Python Programming', issuer: 'Meta / Coursera' },
  { title: 'C++ Programming', issuer: 'Coursera' },
  { title: 'Introduction to Retrieval-Augmented Generation', issuer: 'DeepLearning.AI' },
  { title: 'Google AI Essentials', issuer: 'Google' },
  { title: 'Operating Systems', issuer: 'Coursera' },
  { title: 'Computational Thinking for Problem Solving', issuer: 'Coursera' },
]
