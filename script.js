// First-time visitors see a brief welcome. Replays stay open until dismissed.
const welcome = document.querySelector("#welcome");
const replayWelcome = document.querySelector("#replay-welcome");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const welcomeKey = "chabi-portfolio-welcome-v2";

if (typeof welcome.showModal === "function") {
  let dismissTimer;
  let fadeTimer;
  let isReplay = false;
  replayWelcome.hidden = false;

  function showWelcome(replay = false) {
    if (welcome.open) return;
    isReplay = replay;
    welcome.showModal();
    document.documentElement.classList.add("welcome-open");
    if (!replay) {
      dismissTimer = window.setTimeout(() => {
        welcome.classList.add("welcome-leaving");
        fadeTimer = window.setTimeout(() => welcome.close(), motionPreference.matches ? 0 : 230);
      }, 4300);
    }
  }

  welcome.addEventListener("close", () => {
    window.clearTimeout(dismissTimer);
    window.clearTimeout(fadeTimer);
    welcome.classList.remove("welcome-leaving");
    document.documentElement.classList.remove("welcome-open");
    const returnTo = isReplay ? replayWelcome : document.querySelector("#main");
    returnTo.focus({ preventScroll: true });
  });
  replayWelcome.addEventListener("click", () => showWelcome(true));

  const forceIntro = new URLSearchParams(window.location.search).get("intro") === "1";
  let seenWelcome = false;
  try { seenWelcome = sessionStorage.getItem(welcomeKey) === "seen"; } catch {}
  if (forceIntro || (!seenWelcome && !window.location.hash)) {
    showWelcome();
    try { sessionStorage.setItem(welcomeKey, "seen"); } catch {}
  }
}

// Keep the content visible by default, including when animation is unavailable.
if (!motionPreference.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("arrive");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  document.querySelectorAll(".section-heading, .section-intro, .feature-copy, .role h3").forEach(element => observer.observe(element));
}

// The optional guide uses only public portfolio facts and runs in the browser.
const topics = [
  {
    terms: ["previous role", "last role", "former role", "previous job", "configuration engineer", "l2 support"],
    answer: "My previous role at Digitata Networks was Configuration Engineer: QA Analyst | L2 Support, from January 2023 to March 2026. I configured workflows, tested APIs and data, and investigated production issues."
  },
  {
    terms: ["who", "current role", "job title", "what do you do", "technical systems analyst", "experience", "career", "work history"],
    answer: "I’m a Technical Systems Analyst at Digitata Networks. I analyse client requirements and system flows, support AI proofs of concept with development teams, validate integrations and investigate production issues. My background spans more than four years in software, QA, configuration and support."
  },
  {
    terms: ["ai delivery", "ai agent", "ai work", "artificial intelligence", "client use case", "proof of concept", "proofs of concept", "ai product", "ai"],
    answer: "I help clients identify AI use cases and define what their platform needs. I coordinate proofs of concept and work with developers on platform-specific agents."
  },
  {
    terms: ["prompt", "reusable skill", "ai skill", "review workflow", "output evaluation"],
    answer: "I create reusable AI prompts and skills for analysis, writing and review. I check the outputs for accuracy, consistency and suitability for the task."
  },
  {
    terms: ["test", "qa", "quality", "robot framework", "automation", "regression", "acceptance"],
    answer: "I check functionality, data and integrations with PostgreSQL, REST APIs, functional tests and regression tests. I verify fixes against business requirements and use Robot Framework for repeatable checks."
  },
  {
    terms: ["research", "study", "studying", "master", "mcom", "scrum", "dissertation"],
    answer: "I’m completing an MCom in Information Systems at the University of Cape Town. My research looks at how testing practices contribute to project success in Scrum."
  },
  {
    terms: ["degree", "education", "qualification", "university", "bsc", "mechatronic"],
    answer: "I have a BSc in Mechanical and Mechatronic Engineering from the University of Cape Town, where I’m also completing my MCom in Information Systems."
  },
  {
    terms: ["certification", "certified", "istqb", "ecsa", "candidate engineer"],
    answer: "I’m an ISTQB Certified Tester (Foundation Level) and an ECSA Candidate Engineer in Computer Engineering."
  },
  {
    terms: ["skill", "tool", "language", "sql", "python", "javascript", "bash", "devexpress", "api", "tech stack"],
    answer: "I work with SQL, PostgreSQL, MariaDB, Python, JavaScript, Bash, REST APIs, DevExpress and Robot Framework."
  },
  {
    terms: ["requirement", "stakeholder", "workflow", "business analysis", "system analysis", "data flow"],
    answer: "I work with stakeholders to clarify business rules, map workflows and data flows, and document requirements and acceptance criteria that teams can build and test."
  },
  {
    terms: ["production", "incident", "root cause", "telecom", "iot", "support"],
    answer: "In telecoms and IoT, I reproduce issues, trace requests and database records, and help teams verify fixes after release."
  },
  {
    terms: ["project", "petal trace", "rose query", "demo", "portfolio"],
    answer: "Petal Trace connects requirements, test cases and defects. Rose Query is a practice space for SQLite. You can try both live in Selected projects."
  },
  {
    terms: ["where", "location", "based", "johannesburg"],
    answer: "I’m based in Johannesburg, South Africa."
  },
  {
    terms: ["contact", "email", "linkedin", "github", "reach", "hire"],
    answer: "You can email me at chabi.seopa@gmail.com. My GitHub and LinkedIn profiles are linked in the Contact section."
  }
];

function answerQuestion(question) {
  const words = question.trim().toLowerCase();
  const tokens = words.split(/[^a-z0-9]+/);
  let bestScore = 0;
  let reply = "Try asking about my roles, tools, education or projects. For anything else, you can reach me at chabi.seopa@gmail.com.";
  for (const topic of topics) {
    const score = topic.terms.reduce((total, term) => {
      const matches = term.length <= 2 ? tokens.includes(term) : words.includes(term);
      return total + (matches ? term.length : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      reply = topic.answer;
    }
  }
  return reply;
}

const guide = document.querySelector("#portfolio-guide");
const questionForm = document.querySelector("#question-form");
const questionInput = document.querySelector("#question");
const answer = document.querySelector("#answer");
guide.hidden = false;
questionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!questionInput.value.trim()) {
    questionInput.focus();
    return;
  }
  answer.textContent = answerQuestion(questionInput.value);
});

function openLinkedSection() {
  const section = document.getElementById(window.location.hash.slice(1));
  if (section instanceof HTMLDetailsElement) section.open = true;
}
openLinkedSection();
window.addEventListener("hashchange", openLinkedSection);
