import React, { type ReactNode } from "react"

const bookingHref = "#book"
const upworkHref = "https://www.upwork.com/freelancers/~013a012b9ce9380050?mp_source=share"
const linkedInHref = "https://www.linkedin.com/in/melisa-gjika-95a960201/"
const instagramHref = "https://www.instagram.com/fitnessxmarketing/"

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mt-0.5 size-5 shrink-0"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="m5 10 3.2 3.2L15 6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function SocialIcon({ name }: { name: "instagram" | "linkedin" }) {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {name === "linkedin" ? (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
          <path d="M2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </>
      ) : (
        <>
          <rect height="20" rx="5" width="20" x="2" y="2" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </>
      )}
    </svg>
  )
}

function ButtonLink({
  children,
  href = bookingHref,
  inverse = false,
  coral = false,
}: {
  children: ReactNode
  href?: string
  inverse?: boolean
  coral?: boolean
}) {
  return (
    <a
      className={`${coral ? "cta-coral " : ""}inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 ${
        inverse
          ? "bg-white text-ink hover:bg-lavender focus-visible:outline-white"
          : "bg-brand text-ink shadow-[0_10px_30px_rgba(8,217,214,0.2)] hover:bg-lilac focus-visible:outline-ink"
      }`}
      href={href} data-booking-cta={href === bookingHref ? "true" : undefined}
    >
      {children}
    </a>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-xs font-extrabold tracking-[0.16em] text-brand-deep uppercase">
      {children}
    </p>
  )
}

function SectionTitle({
  eyebrow,
  title,
  intro,
  centered = false,
}: {
  eyebrow?: string
  title: string
  intro?: string
  centered?: boolean
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-balance text-3xl leading-tight font-extrabold tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">{intro}</p>
      )}
    </div>
  )
}

const faqs = [
  {
    question: "Do I need AI experience?",
    answer:
      "No. Before we meet, I audit your business and your daily tasks. Then I tell you what’s possible, and on the call we clarify things together. After that you get the plan. The call is free.",
  },
  {
    question: "Do I need a paid Claude plan?",
    answer:
      "Yes. We’ll set it up so you stay within the $20 a month plan, cut hours from your admin and be more hands-free in your business overall.",
  },
  {
    question: "I use ChatGPT. Can you still help?",
    answer:
      "Yes. I use Claude because I think it’s the better fit for small businesses, and I’ll explain why on the call. We can talk it through together, and I can still help. The call is free.",
  },
  {
    question: "How is this different from writing better prompts?",
    answer:
      "Prompts live in one chat. Your workspace holds your business details, examples and rules, so every chat starts informed. Off-the-shelf software and third-party rules have worked so far, but the near future is custom-built setups made around your business. And you don’t have to learn a new way of working. Each workflow is fitted to the way you already do the task.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Show me how you do your recurring tasks today and share a few examples you’re happy with. I do the audit first, and if I need more from you, I’ll let you know.",
  },
  {
    question: "What happens after seven days?",
    answer:
      "You own the workspace and run it yourself with the personalized Loom walkthrough. I’d be happy if our relationship continued.",
  },
  {
    question: "What if it doesn’t fit my business?",
    answer:
      "That’s what the call is for. You hear it from me before you pay anything.",
  },
  {
    question: "How is my information handled?",
    answer:
      "I only ask for the offers, writing samples and weekly context needed to build your workspace and workflows. We’ll agree how your materials are handled before the sprint begins.",
  },
]

export default function FunnelLanding() {
  return (
    <div className="min-h-screen overflow-hidden bg-cream text-ink">

      <main id="top">
        <section className="relative">
          <div className="pointer-events-none absolute top-0 right-0 h-full w-2/5 bg-lavender/60 [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)]" />
          <div data-hero="true" className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-32">
            <div>
              <Eyebrow>For fitness business owners</Eyebrow>
              <h1 className="max-w-3xl text-balance text-5xl leading-[1.02] font-extrabold tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">
                Tried Claude.{" "}
                <span className="text-brand-deep">
                  Still doing all the work?
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate sm:text-xl sm:leading-9">
                I organize one Claude workspace for your fitness business and
                set up three workflows inside it, fitted to how you already
                work. You keep your habits. Claude takes the repetitive part.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink coral>Book a free strategy call</ButtonLink>
                <a
                  className="inline-flex min-h-12 items-center gap-2 text-lg font-extrabold text-brand-deep underline decoration-brand-deep/40 underline-offset-4 transition hover:decoration-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  href="#included"
                >
                  See what’s included
                </a>
              </div>
              <p className="mt-6 text-base leading-7 font-bold text-muted">
                Top Rated Plus on Upwork · 4.9/5 · Worked with GymNation, ABC
                Trainerize and ABC Glofox
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -top-6 -right-5 size-28 rounded-full border border-brand/20 sm:size-40" />
              <div className="absolute -bottom-7 -left-7 h-24 w-24 rounded-3xl bg-mint sm:h-32 sm:w-32" />
              <ol aria-label="How it works" className="relative rounded-[2rem] border border-ink/10 bg-white p-6 shadow-[0_30px_80px_rgba(37,42,52,0.12)] sm:p-8">
                {[
                  ["1", "Free", "Free 30-minute call."],
                  ["2", "Optional · $297", "If it’s a fit, the optional Claude Workspace Sprint is $297, one-time, built in 7 days."],
                ].map(([number, label, text], index) => (
                  <li className={`relative flex gap-5 ${index === 0 ? "pb-10" : ""}`} key={number}>
                    {index === 0 && <span aria-hidden="true" className="hero-step-line pointer-events-none absolute top-11 bottom-0 left-[21px] w-0.5 overflow-hidden bg-line" />}
                    <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-base font-extrabold text-white">
                      {number}
                    </span>
                    <div>
                      <p className="text-xs font-extrabold tracking-[0.16em] text-brand-deep uppercase">
                        Step {number} · {label}
                      </p>
                      <p className="mt-2 text-lg leading-7 font-bold text-ink">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-ink text-white">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-12">
            <div>
              <p className="mb-5 text-xs font-extrabold tracking-[0.16em] text-brand uppercase">
                The mechanism
              </p>
              <h2 className="text-balance text-3xl leading-tight font-extrabold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                I won’t give you prompts. I organize your Claude workspace.
              </h2>
            </div>
            <div className="text-lg leading-8 text-slate-light">
              <p>
                Your offers, your writing examples and your rules go into Claude
                once. Then Claude takes the recurring tasks we agree on. You do
                yours. Your business keeps moving, and you still review
                everything.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
            <div aria-label="How the workspace is set up: your business details are loaded once, into one assistant, then workflows chosen on the call" className="os-flow" data-stage="8" role="group">
              <div className="os-row">
                <div className="os-card">
                  <p className="os-label">Loaded once: How you do each task today</p>
                  <ul className="os-list">
                    {[
                      "Your offers and pricing",
                      "Your schedule and hours",
                      "Your writing examples and tone",
                      "Your rules, including what you review",
                    ].map((item, index) => (
                      <li className="os-item" key={item}>
                        <span className="os-dot" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <span aria-hidden="true" className="os-arrow">→</span>
                <div className="os-core">
                  <p className="os-label os-label-core">Your gym or coach OS</p>
                  <p className="os-core-text">One workspace that works the way you do.</p>
                </div>
                <span aria-hidden="true" className="os-arrow">→</span>
                <div className="os-builds">
                  <p className="os-label">Workflows, chosen with you on the call</p>
                  <div className="os-build-row">
                    {["Workflow 1", "Workflow 2", "Workflow 3"].map((item, index) => (
                      <div className="os-build" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="os-note">
                What your OS looks like is agreed with you on the call, based on
                where your week goes.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-cream" id="included">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="max-w-3xl">
              <Eyebrow>Claude Workspace Sprint · $297 · 7 days</Eyebrow>
              <h2 className="text-balance text-3xl leading-tight font-extrabold tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">
                Get{" "}
                <mark className="rounded-lg bg-brand px-2 py-0.5 text-ink [box-decoration-break:clone]">
                  3 Claude workflows
                </mark>{" "}
                built around how your business actually runs.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">
                The call is free. The Sprint is optional and only if it’s a fit.
                Here is exactly what it includes.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ["layers", "Your workspace", "Your offers, pricing, writing examples and rules, loaded into Claude once, so every chat starts knowing your business."],
                ["flow", "Three workflows", "Chosen with you on the call. Each starts from your daily tasks and how you do it daily. Each aims to save you 2–4 hours a week. Typical picks: replying to inquiries, check-in replies and weekly recaps, planning a week of posts."],
                ["video", "A Loom and a plan", "A personalized video showing how to run each workflow, plus a plan covering what Claude handles, what stays with you and what to build next."],
              ].map(([icon, title, description], index) => (
                <article className={`included-card included-card-${index + 1}`} key={title}>
                  <span aria-hidden="true" className="included-icon">
                    <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" width="20">
                      {icon === "layers" && (<><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>)}
                      {icon === "flow" && (<><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="12" r="2" /><path d="M6 7v10M8 5h3a5 5 0 0 1 5 5M8 19h3a5 5 0 0 0 5-5" /></>)}
                      {icon === "video" && (<><rect height="14" rx="2" width="15" x="2" y="5" /><path d="m17 10 5-3v10l-5-3" /></>)}
                    </svg>
                  </span>
                  <h3 className="text-lg font-extrabold tracking-tight text-ink">{title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-slate">{description}</p>
                </article>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-lg leading-8 text-slate">
              <strong className="font-extrabold text-ink">What I need from you:</strong>{" "}
              on the call, show me how you do each task today and share a few
              examples you’re happy with. I do the audit first and tell you if
              I need anything else. Afterward you own it and run it yourself.
            </p>
            <h3 className="mt-14 text-3xl font-extrabold tracking-tight text-ink">
              How it works
            </h3>
            <div className="mt-8 max-w-3xl">
              <ol className="grid gap-3">
                {[
                  ["1", "Book the free call", "Pick a time for 30 minutes. No obligation."],
                  ["2", "I audit your business", "Before we talk, I look at your business and daily tasks and work out where Claude fits."],
                  ["3", "We agree the setup", "On the call we choose your three workflows. If it’s a fit, you start the Sprint for $297."],
                  ["4", "Receive it within 7 days", "Your workspace, three workflows, the Loom and the plan arrive within seven days of starting."],
                ].map(([number, title, description]) => (
                  <li className="climb-step" key={number}>
                    <span className="climb-num">{number}</span>
                    <div>
                      <h4 className="text-lg font-extrabold text-ink">{title}</h4>
                      <p className="mt-1 text-[15px] leading-6 text-slate">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                className="cta-coral inline-flex min-h-14 items-center justify-center rounded-full border-2 border-ink bg-brand px-8 py-3 text-lg font-extrabold text-ink shadow-[0_10px_30px_rgba(8,217,214,0.25)] transition duration-200 hover:bg-lilac focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                data-booking-cta="true"
                href={bookingHref}
              >
                Book my free strategy call
              </a>
              <span className="text-slate">30 minutes · No obligation</span>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:px-12">
            <article className="rounded-3xl bg-mint p-7 sm:p-10">
              <p className="text-xs font-extrabold tracking-[0.16em] text-forest uppercase">
                It’s for you if
              </p>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink">
                You want practical help, not AI hype.
              </h2>
              <ul className="mt-8 space-y-5">
                {[
                  "You run a coaching, studio, gym, online or hybrid fitness business.",
                  "You’ve used Claude and still edit most of what it writes.",
                  "You have tasks that repeat every week.",
                  "You’re new to AI. No experience needed. Bring one recurring task.",
                ].map((item) => (
                  <li className="flex gap-3 leading-7 text-slate" key={item}>
                    <span className="text-forest">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl bg-paper p-7 sm:p-10">
              <p className="text-xs font-extrabold tracking-[0.16em] text-muted uppercase">
                It’s not for you if
              </p>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink">
                You want to hand over the whole business.
              </h2>
              <ul className="mt-8 space-y-5">
                {[
                  "You want Claude to run the business unsupervised.",
                  "You want someone to create and post your content for you.",
                  "You need custom software or an app.",
                ].map((item) => (
                  <li className="flex gap-3 leading-7 text-slate" key={item}>
                    <span className="text-muted">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <p className="font-display text-4xl leading-tight font-extrabold tracking-[-0.045em] text-ink sm:text-5xl lg:text-6xl">
            Not sure it fits your business?{" "}
            <span className="text-brand-deep">
              That’s what the free call is for.
            </span>
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate">
            You hear it from me before you pay anything.
          </p>
          <p className="mt-9 text-xl font-extrabold text-ink">
            Find where you can save 4h+ a week
          </p>
          <div className="mt-5">
            <ButtonLink>Let’s meet</ButtonLink>
          </div>
        </section>

        <section className="bg-white" id="founder">
          <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl">
                Hi, I’m Melisa.
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate">
                I’m an AI-native marketing manager for the fitness industry. I
                run my own businesses on the same kind of Claude setup I build for
                clients.
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">
                I’ve worked with personal trainers, gyms like GymNation and
                platforms like ABC Trainerize and ABC Glofox.
              </p>
              <p className="mt-6 text-sm leading-6 text-muted">
                Top Rated Plus on Upwork · 4.9/5 · $100K+ earned
              </p>
              <div className="mt-6 grid max-w-2xl gap-4">
                {[
                  "“Very satisfied with all the work Melisa did for my business. Even though I hired her for email marketing copywriting, she helped me all around with my business, giving helpful suggestions for improving workflows and processes.”",
                  "“Melissa was fabulous to work with and completed tasks on brief and on time! Thank you so much.”",
                  "“Amazing to work with, thanks so much.”",
                ].map((quote) => (
                  <blockquote className="leading-7 text-ink italic" key={quote}>
                    {quote}
                  </blockquote>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink coral>Don’t be shy 😉</ButtonLink>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <a
                  aria-label="Melisa on LinkedIn"
                  className="flex size-12 items-center justify-center rounded-full text-muted transition hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  href={linkedInHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  <SocialIcon name="linkedin" />
                </a>
                <a
                  aria-label="FitnessxMarketing on Instagram"
                  className="flex size-12 items-center justify-center rounded-full text-muted transition hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  href={instagramHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  <SocialIcon name="instagram" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionTitle centered eyebrow="FAQ" title="Questions, answered." />
          <div className="mt-12 divide-y divide-line border-y border-line">
            {faqs.map((faq, index) => (
              <details
                className="group py-1"
                key={faq.question}
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-extrabold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lavender text-xl font-medium text-brand-deep transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pr-10 leading-7 text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-5 pb-5 sm:px-8 sm:pb-8" id="final-call">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-20">
            <div className="absolute -top-28 -right-20 size-80 rounded-full border-[48px] border-brand/25" />
            <div className="absolute -bottom-28 left-1/3 size-56 rounded-full bg-brand/10" />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-extrabold tracking-[0.16em] text-lilac uppercase">
                  Claude Workspace Sprint
                </p>
                <h2 className="max-w-3xl text-balance text-4xl leading-tight font-extrabold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Get one Claude workspace with three workflows, fitted to how you work.
                </h2>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-light">
                  Within seven days: one organized Claude workspace for your
                  fitness business and three workflows fitted to how you work. Each is aimed at
                  saving you 2–4+ hours a week.
                </p>
              </div>
              <div className="lg:text-right">
                <ButtonLink inverse>Book my free strategy call</ButtonLink>
                <p className="mt-5 text-lg leading-7 text-slate-light">
                  Free 30-minute call. No obligation.
                </p>
                <div className="mt-6 rounded-3xl border border-white/20 p-6 sm:p-7">
                  <p className="text-sm font-extrabold tracking-[0.16em] text-lilac uppercase">
                    If it’s a fit, after the call
                  </p>
                  <p className="mt-3 flex items-baseline gap-3 lg:justify-end">
                    <span className="text-5xl font-extrabold tracking-[-0.05em]">$297</span>
                    <span className="text-lg font-bold text-slate-light">one-time</span>
                  </p>
                  <p className="mt-3 leading-7 text-slate-light">
                    You only pay if you want the plan and the build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm leading-6 text-muted sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div>
          <p className="font-display text-lg font-extrabold text-ink">FxM.</p>
          <p className="mt-2">
            © {new Date().getFullYear()} FxM.
          </p>
          <p>Independent consultancy. Not affiliated with or endorsed by Anthropic or Upwork.</p>
        </div>
        <nav
          aria-label="Footer links"
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          <a className="hover:text-ink hover:underline" href={bookingHref} data-booking-cta="true">
            Contact
          </a>
          <a className="hover:text-ink hover:underline" href="/privacy-policy/">
            Privacy
          </a>
          <a className="hover:text-ink hover:underline" href="/">Home</a>
          <a className="hover:text-ink hover:underline" href="/posts/">Articles</a>
          <a className="hover:text-ink hover:underline" href="/tools/">Free tools</a>
          <a className="hover:text-ink hover:underline" href="/newsletter/">Newsletter</a>
        </nav>
      </footer>
    </div>
  )
}
