// ============================================================
//  Sai Giridhar Bandla — portfolio content
//  All copy preserved from the original site, reorganized for
//  the cinematic template. Edit text here; components read from it.
// ============================================================

export const PROFILE = {
  name: "Sai Giridhar Bandla",
  short: "Giridhar",
  role: "Software Engineer",
  status: "Open to software engineering roles · Texas, USA",
  tagline: ["Once the ", "why", " clicks, the ", "how", " takes care of itself."],
  blurb:
    "I'm Giridhar, a software engineer. I build backends that stay secure and keep working under load, plus the clean screens that sit on top of them. Then I like to break down how it all actually works, in plain words. Most days I'm in Java, Spring Boot and AWS, and lately I keep getting pulled toward AI, automation, networking and cloud.",
  email: "giridhar.devpro@gmail.com",
  hashnode: "https://hashnode.com/@giridhar007",
  github: "https://github.com/",      // TODO: add your GitHub URL
  linkedin: "https://www.linkedin.com/", // TODO: add your LinkedIn URL
  location: "Texas, USA",
  education: "M.S. Computer Science, UT Arlington",
  cert: "AWS Certified Developer",
};

export const STATS = [
  { n: "~25%", l: "faster response on hot API endpoints after query & cache tuning" },
  { n: "150+", l: "monthly incidents analyzed → 25% fewer repeats" },
  { n: "30%", l: "manual reporting effort eliminated through automation" },
  { n: "50+", l: "learners I've taught C and Python, who wrote back to say thanks" },
];

export const ABOUT = {
  facts: [
    { k: "Now", v: "Software Developer · Confido Tek" },
    { k: "Roots", v: "Hyderabad → Chennai → Texas" },
    { k: "Focus", v: "Backend & distributed systems" },
    { k: "Curious about", v: "AI · Automation · Networking · Cloud" },
    { k: "Writes at", v: "hashnode.com/@giridhar007" },
  ],
  paragraphs: [
    "Hey, I'm Giridhar. Ever since I was a kid, I've been the one who keeps asking, \u201cbut why does it work that way?\u201d",
    "I grew up in Hyderabad. That's where the questions started. I'd take things apart just to see what made them tick. That same habit took me to Chennai for my engineering degree, and then all the way to the University of Texas at Arlington for my master's in Computer Science. Every move cost me something. I was far from family, and each time I had to start over as a stranger in a new place. But every step was a small bet on the same thing: getting a little closer to how the systems we all rely on really work.",
    "Most tutorials show you what to do. A few show you how. Almost none tell you why it works the way it does, and that's the part I care about most. It's how I learn, and it's how I teach. I share what I've figured out, what I'm still stuck on, and what I want to try next, explained from the ground up, the way I wish someone had explained it to me.",
    "These days I build secure backends with Java and Spring Boot, the clean screens that go on top, and the AWS setup that runs underneath. Lately I've been mixing in AI, automation and networking too. My belief is simple: once the why clicks, the how takes care of itself. I'll help you see the why. The how, you'll work out on your own.",
  ],
};

export const CASES = [
  {
    num: "01", year: "2025", title: "Loan Eligibility & Management System",
    one: "A full financial-services platform that handles onboarding, eligibility checks, repayments and audit logs. I built it as Spring Boot microservices with an Angular front end.",
    tags: ["Spring Boot", "Angular", "PostgreSQL", "Kafka", "JWT", "AWS"],
    viz: "loan",
    problem: "Lending is messier than it looks. The rules for who qualifies keep changing, repayments have to add up to the last cent, and every change needs an audit trail a regulator can read. The old version was one big app, so a single slow query could hold up an entire loan application.",
    approach: [
      "Split the one big app into smaller, focused services for eligibility, repayments and audit. Each one owns its own data.",
      "Set up a Kafka event pipeline so loan events flow in the background, instead of blocking the user's request.",
      "Built the officer-facing screens in Angular, using reactive forms and RxJS."
    ],
    decisions: [
      "Went with events instead of direct calls, so the audit work never sits in the critical path.",
      "Measured the slow endpoints first, then fixed indexes and added caching where it mattered. No rewriting code I only assumed was slow.",
      "Secured every service on its own with Spring Security and JWT, not just the front door."
    ],
    metrics: [
      { n: "~25%", l: "faster hot endpoints" },
      { n: "3", l: "independent services" },
      { n: "100%", l: "lifecycle events audited" }
    ],
    lesson: "Performance work is about measuring, not guessing. That 25% came from reading the query plans, not from rewriting code I thought was slow."
  },
  {
    num: "02", year: "2024", title: "Secure Note: Encrypted Note Sharing",
    one: "A full-stack MERN app for sharing notes that delete themselves after they're read. Notes are password-protected and encrypted end to end, and it runs on AWS behind HTTPS.",
    tags: ["React", "Node.js", "Express", "MongoDB", "AWS", "Crypto"],
    viz: "securenote",
    problem: "People paste sensitive things, like passwords, keys and private messages, into tools that keep them forever. I wanted a note that gets encrypted before it ever leaves your browser, and is truly gone once it's read.",
    approach: [
      "Encrypted the note text with Node's crypto module, so the server only ever stores data it can't read.",
      "Made notes self-destruct, either on the first read or when they expire, whichever comes first.",
      "Added optional passwords and kept the React UI clean and simple."
    ],
    decisions: [
      "Stored only the encrypted text and a little metadata, so even a database leak gives away nothing useful.",
      "Kept the keys in AWS Secrets Manager, not in files saved to the code history.",
      "Put it behind HTTPS with auto-scaling, so a link going viral wouldn't take it down."
    ],
    metrics: [
      { n: "E2E", l: "encryption by default" },
      { n: "0", l: "plaintext at rest" },
      { n: "Auto", l: "scaling on AWS" }
    ],
    lesson: "Security is a real feature, not a box to tick. Building as if the database will leak one day pushed me to a cleaner design than planning for the happy path ever would."
  },
  {
    num: "03", year: "2024", title: "Comprehensive E-Wallet Microservices",
    one: "A scalable e-wallet split into separate services for profiles, transactions, balances and notifications. They talk over Kafka, the busiest reads are cached in Redis, and everything runs in Docker.",
    tags: ["Java", "Spring Boot", "Kafka", "Redis", "OAuth2", "Docker"],
    viz: "ewallet",
    problem: "A wallet has to do a few things that pull against each other. Balance reads need to be instant, transactions can never double-spend, and notifications shouldn't slow either one down. One service trying to do all three becomes a bottleneck and a single point of failure.",
    approach: [
      "Split the wallet into four services, each one deployed and scaled on its own.",
      "Used Kafka to pass messages in the background between transactions, balances and notifications.",
      "Cached the most-read balances in Redis, to keep those reads off the main database."
    ],
    decisions: [
      "Used OAuth2 across services, so identity stays the same everywhere instead of being bolted on later.",
      "Kept notifications fully in the background, so a slow email provider can never delay a transaction.",
      "Ran everything in Docker, so my local, test and cloud setups all match."
    ],
    metrics: [
      { n: "4", l: "decoupled services" },
      { n: "Redis", l: "hot-path cache" },
      { n: "OAuth2", l: "unified identity" }
    ],
    lesson: "The real work was drawing the lines. Deciding what each service owns, and what it's allowed to ignore, mattered more than any single line of code inside it."
  }
];

export const PRINCIPLES = [
  { n: "01", t: "Understand the why first", d: "I don't ship what I can't explain. If I can't tell you why a system behaves the way it does, I'm not done learning it yet." },
  { n: "02", t: "Boring on purpose", d: "I pick proven tools before shiny new ones. The interesting part should be the problem I'm solving, not the stack it runs on." },
  { n: "03", t: "Secure by default", d: "Auth, encryption and least-privilege go into the first draft. Not into a rushed cleanup the week before launch." },
  { n: "04", t: "If I can't see it, I can't trust it", d: "Logs, metrics and traces come first, not last. A service I can't see inside is one I can't trust at 2am." },
  { n: "05", t: "Measure, then optimize", d: "I check before I tune. The real wins come from reading the query plan and the trace, not from guessing what's slow." },
  { n: "06", t: "Learn it well enough to teach it", d: "If I can explain something from scratch, I know I really understand it. Teaching is just me debugging my own knowledge." }
];

export const EXPERTISE = [
  { cat: "Languages", items: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "Bash"] },
  { cat: "Backend", items: ["Spring Boot", "Spring Security", "JPA / Hibernate", "Node.js", "Express", "REST", "Microservices"] },
  { cat: "Frontend", items: ["Angular", "React", "RxJS", "Reactive Forms", "Tailwind"] },
  { cat: "Data & Messaging", items: ["PostgreSQL", "MySQL", "Oracle", "MongoDB", "Redis", "Apache Kafka"] },
  { cat: "Cloud & DevOps", items: ["AWS EC2 / RDS / S3", "IAM", "CloudWatch", "Docker", "Kubernetes", "Jenkins", "CI/CD"] },
  { cat: "Security & Testing", items: ["OAuth2", "JWT", "JUnit", "Mockito", "Pytest", "Postman", "Swagger"] }
];

export const TIMELINE = [
  {
    when: "Aug 2025 to Now", where: "Irving, TX", chip: "Full-time",
    role: "Software Developer", org: "Confido Tek Inc",
    pts: [
      "Built features across the Loan Eligibility and Management System, using Spring Boot microservices and Angular.",
      "Built and tuned REST APIs with Spring Boot and JPA, cutting response time on the busiest endpoints by about 25%.",
      "Designed a Kafka event pipeline for loan-lifecycle events, with CloudWatch for monitoring.",
      "Packaged services in Docker and shipped them to AWS (EC2, RDS, S3) through Jenkins CI/CD, working in Agile Scrum."
    ]
  },
  {
    when: "Jan 2024 to Jul 2025", where: "Arlington, TX", chip: "Part-time",
    role: "Student Technical Assistant", org: "University of Texas at Arlington",
    pts: [
      "Went through 150+ incident records a month with SQL and Python, which helped cut repeat incidents by 25%.",
      "Built automated reports that took about 30% off the manual analysis work."
    ]
  },
  {
    when: "Aug 2023 to May 2025", where: "Arlington, TX", chip: "Education",
    role: "M.S., Computer Science", org: "University of Texas at Arlington",
    pts: ["Focused on distributed systems, databases and applied software engineering."]
  },
  {
    when: "Aug 2019 to May 2023", where: "Chennai, India", chip: "Education",
    role: "B.Tech, Computer Science & Engineering", org: "Bharath Institute of Higher Education",
    pts: [
      "Built my foundations in algorithms, systems and how software fits together. This is where the curiosity really started.",
      "Class representative for my batch, the link between students and faculty.",
      "Joint Secretary of the Environment Club, helping plan and run campus drives.",
      "Mentored juniors on their careers: what to learn first, and how to pick projects worth doing."
    ]
  }
];

export const NOW = [
  { ic: "ai", t: "Building with AI, not just using it", d: "Going past the chat box into how models, embeddings and retrieval actually work, and where they fall apart." },
  { ic: "auto", t: "Automating the boring parts", d: "Small scripts, pipelines and tools that kill manual work. If I do something twice by hand, I'd rather teach a machine to do it." },
  { ic: "net", t: "Networking from the wire up", d: "Protocols, DNS, TLS, load balancing. The quiet layers sitting under every request I send." },
  { ic: "cloud", t: "Cloud from first principles", d: "Designing for AWS by understanding what 'scalable' really costs: compute, storage and the ways things fail." }
];

export const POSTS = [
  { date: "MAR 2025", t: "Designing event-driven microservices with Kafka & Spring Boot", e: "How I broke a monolith into separate services behind a Kafka event bus, and what running it in production taught me." },
  { date: "FEB 2025", t: "JWT, OAuth2 & Spring Security without the pain", e: "A practical guide to securing REST APIs: handing out tokens, refreshing them, role-based access, and the gotchas." },
  { date: "JAN 2025", t: "From PostgreSQL to performance: indexing out of slow queries", e: "Real query-tuning notes from a financial app: indexes, locking, and the JPA traps that bite." }
];

export const QUOTES = [
  {
    text: "The way you explained concepts with clarity and practical examples made learning much easier and more engaging. Because of your classes, I now feel more confident in my programming skills and problem-solving approach.",
    name: "A Jaya Krishna", handle: "Python student", initial: "J", topic: "Python"
  },
  {
    text: "The C programming sessions are very helpful and easy to understand. Thank you for your guidance and support.",
    name: "P. Rachana", handle: "C programming student", initial: "P", topic: "C Programming"
  },
  {
    text: "Giridhar bro's teaching style is clear and easy to follow. The examples he provides make the concepts easier to understand. Overall, it is a very good and helpful class.",
    name: "Raj Nimmanagoti", handle: "C & Python student", initial: "R", topic: "Fundamentals"
  }
];
