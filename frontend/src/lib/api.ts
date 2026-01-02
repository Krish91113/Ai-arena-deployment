import { AskResponse, HistoryItem, FeedbackLabel } from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8002';

// Attractive dummy data for non-authenticated users
const DUMMY_HISTORY: HistoryItem[] = [
  {
    turn_id: 1,
    question: "What are the key differences between React and Vue.js for building modern web applications?",
    chosen_agent: "agent_a",
    enhanced_answer: "React and Vue.js are both powerful JavaScript frameworks, but they differ in several key aspects. React uses a virtual DOM and JSX syntax, offering more flexibility and a larger ecosystem. Vue.js provides a more opinionated structure with its template syntax, making it easier for beginners. React is maintained by Meta and has stronger corporate backing, while Vue is community-driven. For large-scale applications, React's component architecture and state management solutions like Redux are widely adopted. Vue's progressive framework approach allows gradual adoption. Both support TypeScript, but React has more mature TypeScript integration.",
    referee: {
      scores: { correctness: 9, clarity: 9, usefulness: 9 },
      critique: "Agent A provided a comprehensive and balanced comparison covering architecture, syntax, ecosystem, and use cases. The response accurately highlights the strengths of both frameworks without bias.",
      chosen_agent: "agent_a"
    },
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    human_label: null
  },
  {
    turn_id: 2,
    question: "How does machine learning differ from traditional programming approaches?",
    chosen_agent: "agent_b",
    enhanced_answer: "Traditional programming involves explicitly writing rules and logic to solve problems, where developers define every step. Machine learning, however, learns patterns from data without being explicitly programmed. In traditional programming, you write: 'if condition A, then do B.' In ML, you provide examples and the system learns the patterns. Traditional programs are deterministic and predictable, while ML models are probabilistic. ML excels at tasks like image recognition, natural language processing, and pattern detection where writing explicit rules is impractical. Traditional programming is better for well-defined, rule-based tasks. ML requires large datasets for training, while traditional programs need clear specifications.",
    referee: {
      scores: { correctness: 9, clarity: 10, usefulness: 9 },
      critique: "Agent B delivered an exceptionally clear explanation with concrete examples. The comparison effectively illustrates the fundamental paradigm shift between the two approaches, making it accessible to both technical and non-technical audiences.",
      chosen_agent: "agent_b"
    },
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    human_label: null
  },
  {
    turn_id: 3,
    question: "What are the best practices for securing a REST API?",
    chosen_agent: "agent_a",
    enhanced_answer: "Securing a REST API requires multiple layers of protection. First, always use HTTPS to encrypt data in transit. Implement robust authentication using OAuth 2.0 or JWT tokens, never relying on API keys alone. Use rate limiting to prevent abuse and DDoS attacks. Validate and sanitize all input to prevent injection attacks. Implement proper authorization checks ensuring users can only access their own resources. Use CORS policies to control which domains can access your API. Keep dependencies updated and scan for vulnerabilities regularly. Log all API access for monitoring and auditing. Implement API versioning to manage changes safely. Use security headers like Content-Security-Policy and X-Frame-Options. Consider API gateways for centralized security management.",
    referee: {
      scores: { correctness: 10, clarity: 8, usefulness: 10 },
      critique: "Agent A provided a comprehensive security checklist covering all critical aspects from encryption to monitoring. The response is actionable and follows industry best practices, making it highly valuable for developers.",
      chosen_agent: "agent_a"
    },
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    human_label: null
  },
  {
    turn_id: 4,
    question: "Explain the concept of microservices architecture and its advantages over monolithic architecture",
    chosen_agent: "agent_b",
    enhanced_answer: "Microservices architecture breaks down applications into small, independent services that communicate via APIs. Each service handles a specific business capability and can be developed, deployed, and scaled independently. Advantages include: independent deployment allowing faster releases, technology flexibility where each service can use different tech stacks, better fault isolation preventing system-wide failures, easier scaling of specific components, and improved team autonomy. However, microservices add complexity in deployment, monitoring, and inter-service communication. Monolithic architecture, where all components are tightly coupled in a single codebase, is simpler to develop initially but becomes harder to maintain and scale as the application grows. The choice depends on team size, application complexity, and scalability requirements.",
    referee: {
      scores: { correctness: 9, clarity: 9, usefulness: 8 },
      critique: "Agent B provided a balanced explanation covering both architectures' trade-offs. The response acknowledges that microservices aren't always the best choice, showing nuanced understanding of architectural decisions.",
      chosen_agent: "agent_b"
    },
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    human_label: null
  }
];

export async function askQuestion(question: string, userId?: string): Promise<AskResponse> {
  const response = await fetch(`${API_BASE_URL}/api/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, user_id: userId }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error: ${response.status} - ${text}`);
  }

  return response.json();
}

export async function getHistory(userId?: string): Promise<HistoryItem[]> {
  // If no user is authenticated, return attractive dummy data
  if (!userId) {
    return DUMMY_HISTORY;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/history?user_id=${userId}`);

    if (!response.ok) {
      // If the endpoint doesn't exist yet, fall back to the old endpoint
      const fallbackResponse = await fetch(`${API_BASE_URL}/api/conversations`);
      if (!fallbackResponse.ok) {
        return [];
      }

      const conversations = await fallbackResponse.json();
      return conversations.map((conv: any, idx: number) => ({
        turn_id: idx,
        question: conv.title || 'Conversation',
        chosen_agent: 'agent_a',
        enhanced_answer: '',
        referee: {
          scores: { correctness: 0, clarity: 0, usefulness: 0 },
          critique: 'History details unavailable in this build.',
          chosen_agent: 'agent_a',
        },
        created_at: conv.created_at,
        human_label: null,
      }));
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
}

export async function submitLabel(turnId: number, label: FeedbackLabel): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ turn_id: turnId, label }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error: ${response.status} - ${text}`);
  }
}
