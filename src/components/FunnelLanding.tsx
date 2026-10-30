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

type WorkflowIconName = "activity" | "calendar-check" | "dumbbell" | "message-square-text" | "timer"

function WorkflowIcon({
  name,
  className = "size-5",
}: {
  name: WorkflowIconName
  className?: string
}) {
  const paths: Record<WorkflowIconName, ReactNode> = {
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    "calendar-check": (
      <>
        <path d="M8 2v4M16 2v4M3 10h18" />
        <path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="m9 16 2 2 4-4" />
      </>
    ),
    dumbbell: (
      <>
        <path d="m6.5 6.5 11 11M21 21l-1-1M3 3l1 1M18 22l4-4M2 6l4-4M3 10l7-7M14 21l7-7" />
      </>
    ),
    "message-square-text": (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
        <path d="M8 8h8M8 12h6" />
      </>
    ),
    timer: (
      <>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2 2M9 2h6M5 3l2 2M19 3l-2 2" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name]}
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
}: {
  children: ReactNode
  href?: string
  inverse?: boolean
}) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 ${
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

const workflows = [
  {
    icon: "message-square-text" as const,
    title: "Front desk",
    description:
      "Drafts replies to new inquiries using your real schedule, pricing and program details.",
  },
  {
    icon: "dumbbell" as const,
    title: "Coach’s assistant",
    description:
      "Drafts check-in replies and weekly recaps from your notes. You review before sending.",
  },
  {
    icon: "calendar-check" as const,
    title: "Content planner",
    description:
      "Plans your week of posts from the questions your clients actually ask.",
  },
]

const faqs = [
  {
    question: "Do I need AI experience?",
    answer: "No. Bring one task you repeat every week.",
  },
  {
    question: "Do I need a paid Claude plan?",
    answer:
      "We’ll confirm the right Claude plan for your setup on the call before you commit to anything.",
  },
  {
    question: "How is this different from writing better prompts?",
    answer:
      "Prompts live in one chat. Your workspace holds your business details, examples and rules, so every chat starts informed.",
  },
  {
    question: "What do you need from me?",
    answer:
      "Your offers, a few writing samples and a clear picture of how a typical week runs.",
  },
  {
    question: "What happens after seven days?",
    answer:
      "You own the workspace and run it yourself with the personalized Loom walkthrough.",
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
      <header data-landing-header="true" className="relative z-20 border-b border-line/80 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <a
            className="font-display text-xl font-extrabold tracking-[-0.05em] text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            href="#top"
          >
            FxM<span className="text-brand-deep">.</span>
          </a>
          <a
            className="group inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-brand-deep/30 underline-offset-4 transition hover:decoration-brand-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            href={bookingHref} data-booking-cta="true"
          >
            Book a free strategy call
          </a>
        </div>
      </header>

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
                You’ve tried Claude, but every draft still needs rewriting. I
                organize one Claude workspace for your fitness business and
                build three workflows inside it. They work like one team member
                covering three roles.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink>Book a free strategy call</ButtonLink>
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 px-3 text-sm font-bold text-ink transition hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  href="#sprint"
                >
                  See what’s included
                </a>
              </div>
              <p className="mt-5 text-sm leading-6 text-muted">
                Free 30-minute call. No obligation. The sprint is $297, only if
                it’s a fit.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -top-6 -right-5 size-28 rounded-full border border-brand/20 sm:size-40" />
              <div className="absolute -bottom-7 -left-7 h-24 w-24 rounded-3xl bg-mint sm:h-32 sm:w-32" />
              <div className="relative rotate-1 rounded-[2rem] border border-ink/10 bg-white p-4 shadow-[0_30px_80px_rgba(37,42,52,0.12)] sm:p-6">
                <div className="flex items-center justify-between border-b border-line px-2 pb-5">
                  <div>
                    <p className="text-xs font-bold tracking-[0.12em] text-muted uppercase">
                      Workspace
                    </p>
                    <h2 className="mt-1 text-xl font-extrabold tracking-tight text-ink">
                      Your Claude workspace
                    </h2>
                  </div>
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-brand text-ink">
                    <WorkflowIcon className="size-6" name="activity" />
                  </div>
                </div>
                <div className="space-y-3 py-5">
                  {workflows.map((workflow) => (
                    <div
                      className="group flex items-start gap-4 rounded-2xl border border-line bg-paper p-4 transition hover:-translate-y-0.5 hover:border-brand-deep/30 hover:bg-lavender/50"
                      key={workflow.title}
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-deep shadow-sm">
                        <WorkflowIcon name={workflow.icon} />
                      </span>
                      <div>
                        <p className="font-bold text-ink">{workflow.title}</p>
                        <p className="mt-1 text-sm leading-5 text-muted">
                          {workflow.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="border-t border-line px-2 pt-4 text-sm leading-6 text-muted">
                  Example roles. Yours are chosen on the call.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Professional credentials"
          className="border-y border-line bg-white"
        >
          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
            <p className="text-lg font-extrabold text-ink">
              AI-Native Marketing Manager
            </p>
            <p className="mt-2 max-w-4xl leading-7 text-slate">
              Working with personal trainers, gyms like GymNation and platforms
              like ABC Trainerize and ABC Glofox.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Top Rated Plus on Upwork · $100K+ earned · 11 client reviews ·{" "}
              <a
                className="font-bold text-brand-deep underline decoration-brand-deep/40 underline-offset-4 hover:decoration-brand-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                href={upworkHref}
                rel="noreferrer"
                target="_blank"
              >
                View my Upwork profile
              </a>
            </p>
            <p className="mt-2 text-xs text-muted">
              As of October 2026
              .
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <SectionTitle
              eyebrow="The real problem"
              title="Claude isn’t the problem. It just doesn’t know your business."
            />
            <div className="space-y-6 text-lg leading-8 text-slate">
              <p>
                Maybe the posts sound like everyone else’s. The replies leave
                out your offer details. Or the weekly plan ignores the hours you
                actually have.
              </p>
              <p>
                Every new chat starts from zero. So you explain your business
                again, then fix the draft anyway.
              </p>
              <div className="rounded-3xl border-l-4 border-brand bg-lavender p-6 font-semibold text-ink sm:p-8">
                Some work suits Claude. Some needs your judgment. The call helps
                you tell which is which.
              </div>
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
                I don’t give you prompts. I organize your Claude workspace.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-slate-light">
              <p>
                Your offers, your writing examples and your rules go into Claude
                once. After that, every chat starts knowing how your business
                runs. No more re-explaining. No prompt library to copy and paste
                from.
              </p>
              <p className="font-bold text-white">
                You still review everything. You just stop starting from
                scratch.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <SectionTitle
            centered
            eyebrow="See the difference"
            title="Same question. Two very different replies."
            intro="The inquiry: “Would your coaching work around shift work?”"
          />
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-6 text-muted">
            Illustrative example from a fictional coaching business. Not a
            client result.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <article className="rounded-3xl border border-line bg-white p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-paper text-sm font-extrabold text-muted">
                  A
                </span>
                <h3 className="font-extrabold text-ink">
                  Claude with no context
                </h3>
              </div>
              <blockquote className="text-lg leading-8 text-slate">
                “Great question! Shift work can make training tricky. Many
                coaches offer flexible scheduling. I’d suggest getting in touch
                to see whether our program is a good fit for you.”
              </blockquote>
            </article>
            <article className="relative overflow-hidden rounded-3xl border border-brand-deep/30 bg-lavender p-6 sm:p-8">
              <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-brand/10" />
              <div className="relative mb-6 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-ink">
                  B
                </span>
                <h3 className="font-extrabold text-ink">
                  Claude set up on your business
                </h3>
              </div>
              <blockquote className="relative text-lg leading-8 font-medium text-ink">
                “Yes. Most of my clients work rotating shifts. Check-ins are
                voice notes you can send after a night shift, and your weekly
                plan is built around your actual days off. Send me your usual
                rota and I’ll show you what week one looks like.”
              </blockquote>
            </article>
          </div>

          <p className="mx-auto mt-7 max-w-3xl text-center text-base leading-7 font-semibold text-slate">
            Reply B only works because Claude knows the support schedule and
            what the program includes.
          </p>

          <div className="mt-14 grid border-y border-line md:grid-cols-3">
            {[
              [
                "1",
                "Your business context",
                "Your actual support schedule, what your program includes and examples of how you answer inquiries.",
              ],
              [
                "2",
                "Claude’s draft",
                "A reply grounded in those details, with unanswered questions flagged.",
              ],
              [
                "3",
                "Your review",
                "Check the facts, suitability and tone before sending.",
              ],
            ].map(([number, title, description], index) => (
              <div
                className={`py-8 md:px-8 ${
                  index > 0
                    ? "border-t border-line md:border-t-0 md:border-l"
                    : ""
                }`}
                key={number}
              >
                <p className="mb-5 text-sm font-extrabold text-brand-deep">
                  0{number}
                </p>
                <h3 className="text-lg font-extrabold text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink>Book a free strategy call</ButtonLink>
          </div>
        </section>

        <section className="bg-lavender" id="sprint">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <SectionTitle
                eyebrow="The Claude Workspace Sprint"
                title="One workspace. Three workflows. One team member covering three roles."
                intro="The sprint sets Claude up around your business. Then it builds the three workflows that will take the most off your plate."
              />
              <div className="rounded-3xl bg-ink p-7 text-white shadow-xl sm:p-8 lg:justify-self-end">
                <p className="text-sm font-bold tracking-wide text-brand uppercase">
                  One-time investment
                </p>
                <p className="mt-2 text-5xl font-extrabold tracking-[-0.05em]">
                  $297
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-light">
                  Delivered within seven days of kickoff.
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {workflows.map((workflow) => (
                <article
                  className="rounded-3xl border border-brand/10 bg-white p-6 sm:p-8"
                  key={workflow.title}
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-ink">
                    <WorkflowIcon className="size-6" name={workflow.icon} />
                  </span>
                  <h3 className="mt-6 text-xl font-extrabold tracking-tight text-ink">
                    {workflow.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted">
                    {workflow.description}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-5 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
              {[
                [
                  "An organized workspace",
                  "Your offers, voice, examples and rules, set up once.",
                ],
                [
                  "A personalized Loom",
                  "See exactly how to run each role in Claude.",
                ],
                [
                  "A written plan",
                  "What Claude handles, what stays with you and what to build next.",
                ],
              ].map(([title, description]) => (
                <div className="bg-white p-6" key={title}>
                  <p className="font-bold text-ink">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <figure className="max-w-2xl rounded-3xl border border-brand-deep/20 bg-white p-6">
                <blockquote className="leading-7 text-ink">
                  “...she helped me all around with my business, giving helpful
                  suggestions for improving workflows and processes.”
                </blockquote>
                <figcaption className="mt-4 text-sm font-bold text-muted">
                  Upwork client, 5.0 · 2023
                </figcaption>
              </figure>
              <div className="lg:text-right">
                <ButtonLink>Book a free strategy call</ButtonLink>
                <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
                  Time savings depend on how often you do each task. We’ll
                  estimate them together on the call.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <SectionTitle
            eyebrow="A simple process"
            title="How it works"
            intro="No complicated onboarding. No open-ended consulting project."
          />
          <div className="mt-12 rounded-3xl border border-line bg-white p-5 sm:p-7">
            <div className="flex items-center gap-3 border-b border-line pb-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-ink">
                <WorkflowIcon className="size-6" name="timer" />
              </span>
              <div>
                <p className="font-extrabold text-ink">Your training week</p>
                <p className="mt-1 text-sm text-muted">
                  From kickoff to handoff in seven days
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-ink p-4 text-white sm:flex sm:items-center sm:justify-between">
              <p className="text-sm font-extrabold text-brand">Day 0</p>
              <p className="mt-1 font-bold sm:mt-0">Free call</p>
            </div>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              {[
                ["Day 1", "Kickoff and materials"],
                ["Day 2", "Build"],
                ["Day 3", "Build"],
                ["Day 4", "Build"],
                ["Day 5", "Build"],
                ["Day 6", "Build"],
                ["Day 7", "Handoff, Loom walkthrough and plan"],
              ].map(([day, task], index) => (
                <li
                  className={`relative rounded-2xl border p-4 ${
                    index === 6
                      ? "border-brand-deep/30 bg-lavender"
                      : "border-line bg-paper"
                  }`}
                  key={day}
                >
                  <span
                    aria-hidden="true"
                    className={`mb-4 block size-2.5 rounded-full ${
                      index === 6 ? "bg-brand-deep" : "bg-brand"
                    }`}
                  />
                  <p className="text-xs font-extrabold tracking-wide text-brand-deep uppercase">
                    {day}
                  </p>
                  <p className="mt-2 text-sm leading-5 font-bold text-ink">
                    {task}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm leading-6 text-muted">
              Days 2–6 are the build. Day 7 is your handoff, Loom walkthrough
              and written plan.
            </p>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {[
              [
                "01",
                "Free 30-minute call",
                "I come with a short audit of your business and ideas for your first workflows. You leave with real insight into your setup. No obligation.",
              ],
              [
                "02",
                "Choose the sprint",
                "If it’s a fit, you pay $297 and send me your offers, examples and the context I need.",
              ],
              [
                "03",
                "Ready within seven days",
                "You get your workspace, three workflows, Loom walkthrough and written plan.",
              ],
            ].map(([number, title, description]) => (
              <article className="relative pt-7" key={number}>
                <div className="absolute top-0 left-0 h-1 w-14 rounded-full bg-brand" />
                <p className="text-sm font-extrabold text-brand-deep">
                  {number}
                </p>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-4 leading-7 text-muted">{description}</p>
              </article>
            ))}
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
            Your business doesn’t run like a template.{" "}
            <span className="text-brand-deep">
              Your Claude shouldn’t either.
            </span>
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate">
            Your offers, your pricing, your hours, the way you talk to clients.
            Claude only works with what it’s been given. I give it all of it,
            once.
          </p>
        </section>

        <section className="bg-white" id="founder">
          <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl">
                Hi, I’m Melisa.
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate">
                I’m an AI-native marketing manager for the fitness industry. I
                run my own business on the same kind of Claude setup I build for
                clients.
              </p>
              <div className="mt-8">
                <ButtonLink>Start with a free strategy call</ButtonLink>
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
                  Get one Claude team member covering three roles.
                </h2>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-light">
                  Within seven days: one organized Claude workspace for your
                  fitness business and three custom workflows. Each is aimed at
                  saving you 2–4+ hours a week.
                </p>
              </div>
              <div className="lg:text-right">
                <p className="text-5xl font-extrabold tracking-[-0.05em]">
                  $297
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-light">
                  one-time
                </p>
                <div className="mt-7">
                  <ButtonLink inverse>Book a free strategy call</ButtonLink>
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-light">
                  Free with no obligation. You only pay if you want the plan and
                  the build.
                </p>
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
          <a className="hover:text-ink hover:underline" href="/posts/">Articles</a><a className="hover:text-ink hover:underline" href="/tools/">Free tools</a>
        </nav>
      </footer>
    </div>
  )
}
