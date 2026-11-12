// Everything written on the site lives here: edit this file to update the portfolio.
import elhakimHome from "./assets/projects/elhakim-home.webp";
import elhakimScan from "./assets/projects/elhakim-ai-check.webp";
import learnuStudents from "./assets/projects/learnu-students.webp";
import learnuDashboard from "./assets/projects/learnu-dashboard.webp";

export const profile = {
  firstName: "Amina",
  lastName: "Aimeur",
  role: "Full-stack developer",
  status: "Master's student at EFREI Paris",
  availability: "Looking for an alternating internship from November 2026 to June 2027 (1 week at school, 2 weeks in the company)",
  punchline: "I think big, code clean, and build what's next.",
  intro:
    "I started with data and AI in Algeria, got hooked on building the whole product around them (the interface, the API and the model), and moved to Paris to level up at EFREI. I speak four languages. Five, if you count Python 🐍",
  email: "amina.aimeur@efrei.net",
  linkedin: "https://www.linkedin.com/in/amina-aimeur-2223ab25b/",
  github: "https://github.com/AIMAMINA",
  cv: "./cv-amina-aimeur.pdf",
  location: "Paris, Île-de-France",
  languages: [
    { name: "French", level: "mother tongue (DALF C1)" },
    { name: "Arabic", level: "mother tongue" },
    { name: "English", level: "professional" },
    { name: "Spanish", level: "basics" },
  ],
  interests: ["collecting passport stamps ✈️", "taking way too many photos 📸", "a daily walk (the best debugging tool ever)"],
};

export const projects = [
  {
    name: "ElHakim AI",
    tagline: "Pneumonia screening from chest X-rays",
    summary:
      "Patients upload a chest X-ray, a convolutional neural network screens it for pneumonia in about a second, and they can download a PDF report or book a doctor.",
    highlights: [
      "CNN trained on about 14,000 X-rays, served by a Django REST API",
      "JWT accounts, scan credits, appointment booking with conflict checks",
      "React interface redesigned from scratch, with 16 backend tests",
    ],
    stack: ["React", "Tailwind CSS", "Django REST", "TensorFlow", "JWT"],
    images: [elhakimHome, elhakimScan],
    code: "https://github.com/AIMAMINA/pneumonia-detection",
    accent: "coral",
  },
  {
    name: "LearnU",
    tagline: "A campus platform in microservices",
    summary:
      "Students, universities, courses and enrollments, plus an AI assistant that translates and summarises, split into 8 services behind a JWT-secured API gateway.",
    highlights: [
      "Spring Cloud Gateway checks every token and logs every write",
      "Spring Boot, Django and GraphQL services, one database each",
      "The whole platform starts with a single docker compose command",
    ],
    stack: ["Spring Boot", "Spring Cloud Gateway", "Django", "GraphQL", "React", "Docker"],
    images: [learnuStudents, learnuDashboard],
    code: "https://github.com/AIMAMINA/learnu-microservices",
    accent: "gold",
  },
];

// Smaller projects, shown as a compact list under the featured ones
export const moreProjects = [
  {
    name: "Data4Travel",
    text: "Sentiment analysis on about one million tourist reviews.",
    stack: ["Python", "Pandas", "Transformers", "Docker"],
  },
  {
    name: "Hate speech detection",
    text: "Classifying hateful and offensive tweets with natural language processing.",
    stack: ["Python", "Scikit-learn", "RoBERTa"],
  },
  {
    name: "Business intelligence dashboard",
    text: "Cleaning a database, handling missing values and tracking KPIs.",
    stack: ["Power BI"],
  },
];

export const skills = [
  { group: "Front end", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Flutter"] },
  { group: "Back end", items: ["Spring Boot", "Spring Cloud Gateway", "Django REST", "Node.js", "GraphQL", "REST APIs", "Microservices"] },
  { group: "Data and AI", items: ["Python", "Pandas", "Scikit-learn", "TensorFlow / Keras", "PyTorch", "Hugging Face", "Power BI", "Spark"] },
  { group: "Databases and tools", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker", "Git / GitHub", "Postman", "Linux"] },
];

export const journey = [
  { period: "2026 — 2028", title: "Mastère Dev Manager Full Stack", place: "EFREI Paris · RNCP title no. 39765, level 7 (Bac+5)" },
  { period: "2025 — 2026", title: "Master 1, Data Science and Intelligent Systems", place: "Université Constantine 2, Algeria" },
  { period: "2022 — 2025", title: "Bachelor's degree in computer science", place: "Université Constantine 2, Algeria" },
];

export const experience = [
  {
    period: "Oct 2025 — 2026",
    title: "Technical sales engineer",
    place: "SARL ENTEC, Constantine",
    text: "Analysed client needs across 3 regions, designed technical solutions with field teams and digitalised internal processes with generative AI tools.",
  },
  {
    period: "Jun — Jul 2025",
    title: "IT intern",
    place: "SARL ENTEC, Constantine",
    text: "User support and incident resolution, gathering team needs, structuring and cleaning internal data.",
  },
];

export const marquee = ["React", "Spring Boot", "Django", "TensorFlow", "GraphQL", "Docker", "PostgreSQL", "Microservices", "Hugging Face"];

// Trips shown on the travel map: one pin per country (coords = [longitude, latitude]).
// `label` nudges the name so that labels do not overlap; `note` is optional.
export const trips = [
  { country: "Algeria", city: "Constantine", coords: [6.61, 36.37], note: "home 🏡", label: { dx: -2, dy: 22, anchor: "middle" } },
  { country: "France", city: "Paris", coords: [2.35, 48.86], note: "now 📍", label: { dx: -9, dy: 4, anchor: "end" } },
  { country: "Spain", city: "Andalusia", coords: [-4.42, 37.39], label: { dx: -9, dy: -6, anchor: "end" } },
  { country: "Morocco", city: "Rabat", coords: [-6.84, 34.02], label: { dx: -9, dy: 12, anchor: "end" } },
  { country: "United Kingdom", city: "London", coords: [-0.13, 51.51], label: { dx: -9, dy: -4, anchor: "end" } },
  { country: "Belgium", city: "Brussels", coords: [4.35, 50.85], label: { dx: 9, dy: -6 } },
  { country: "Germany", city: "Berlin", coords: [13.4, 52.52], label: { dx: 9, dy: 4 } },
  { country: "Switzerland", city: "Bern", coords: [7.45, 46.95], label: { dx: 9, dy: 4 } },
  { country: "Italy", city: "Rome", coords: [12.5, 41.9], label: { dx: 9, dy: 4 } },
  { country: "Tunisia", city: "Tunis", coords: [10.18, 36.81], label: { dx: 9, dy: 10 } },
  { country: "Turkey", city: "Istanbul", coords: [28.98, 41.01], label: { dx: 0, dy: -12, anchor: "middle" } },
  { country: "Lebanon", city: "Beirut", coords: [35.5, 33.89], label: { dx: 9, dy: 4 } },
];
export const countries = trips.map((t) => t.country);

// Hello in the four languages, cycled in the hero
export const greetings = [
  { text: "hello, world", lang: "en" },
  { text: "bonjour, le monde", lang: "fr" },
  { text: "مرحبا بالعالم", lang: "ar", dir: "rtl" },
  { text: "hola, mundo", lang: "es" },
];
