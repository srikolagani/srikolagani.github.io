export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string;
};

export const SITE = {
  title: 'Sri Kolagani',
  tagline: 'Notes on agentic GTM workflows, CRM systems, evals, and calm engineering.',
  kitUrl: 'https://github.com/srikolagani/crm-agent-kit',
  githubUrl: 'https://github.com/srikolagani',
};

export const posts: Post[] = [

  {
    slug: 'sdrcockpit-research-sequence-send-gate',
    title: 'sdrcockpit: research → sequence with a hard send gate',
    date: '2026-09-13',
    excerpt:
      'An offline-first SDR cockpit: SQLite CRM research, multi-step sequences, MockLLM default, and golden evals that fail on fabrication or ungated sends.',
    tags: ['sdrcockpit', 'sdr', 'evals', 'agents'],
    body: `## Why sdrcockpit

Outbound agents are easy to demo and hard to trust. [sdrcockpit](https://github.com/srikolagani/sdrcockpit) keeps the loop small: research an account from fixtures → draft a sequence → **refuse to send** until a human gate opens.

## Architecture

\`\`\`mermaid
flowchart LR
  Demo[demo / evals] --> Agent[SDRCockpit]
  Agent --> LLM[MockLLM default]
  Agent --> CRM[(SQLite CRM)]
  Agent --> Gate[send gate]
  MCP[MCP stub] --> Agent
\`\`\`

MockLLM is the default — zero API keys. Optional Grok sits behind \`XAI_API_KEY\` + \`FORCE_GROK=1\` (stub client in v0.1).

## Uniqueness vs OpenSales / ai-sdr-crew / GOVR

Those projects optimize for multi-agent crew theatrics. sdrcockpit optimizes for a **send gate + no-fabrication CI**. One readable Python loop, not a swarm.

## Eval results (v0.1)

| Case | Result |
|------|--------|
| research-no-fabrication | pass |
| send-gate-blocks | pass |
| sequence-has-steps | pass |
| **Pass rate** | **100% (3/3)** |

\`\`\`bash
pip install -e ".[dev]"
python -m sdrcockpit.demo
pytest -q
python -m sdrcockpit.evals.run_evals --strict
\`\`\`
`,
  },
  {
    slug: 'closeplan-playbook-fidelity',
    title: 'closeplan: mutual action plans that honor the playbook',
    date: '2026-09-13',
    excerpt:
      'A MAP / close-plan agent where missing playbook milestones, owners, or dates fail the golden eval gate — offline, MockLLM default.',
    tags: ['closeplan', 'map', 'playbooks', 'evals'],
    body: `## Why closeplan

Close plans fail when milestones lack owners or drift from stage playbooks. [closeplan](https://github.com/srikolagani/closeplan) treats **playbook fidelity** as the product.

## Architecture

Opportunity stage → playbook milestone IDs → dated owners → fidelity check. SQLite CRM fixtures; optional external CRM adapter stub only.

## Uniqueness vs OpenSales / ai-sdr-crew / GOVR

A single MAP agent with explicit fidelity scores in CI — not a multi-role crew narrating a deal.

## Eval results (v0.1)

| Case | Result |
|------|--------|
| negotiation-playbook-complete | pass |
| milestones-have-owners-dates | pass |
| **Pass rate** | **100% (2/2)** |
`,
  },
  {
    slug: 'accountplan-completeness-grounding',
    title: 'accountplan: completeness and CRM-fact grounding',
    date: '2026-09-13',
    excerpt:
      'Account plans with required sections and objectives that must cite SQLite CRM facts — MockLLM CI with no keys.',
    tags: ['accountplan', 'account-planning', 'evals'],
    body: `## Why accountplan

Account plans are political documents. [accountplan](https://github.com/srikolagani/accountplan) requires objectives, stakeholders, whitespace, risks, and next-90-days — and grounds each objective in a CRM fact.

## Uniqueness vs OpenSales / ai-sdr-crew / GOVR

Section completeness + grounding evals are the contract. Generic CRM nouns only; no platform product branding.

## Eval results (v0.1)

| Case | Result |
|------|--------|
| complete-sections | pass |
| objectives-grounded | pass |
| **Pass rate** | **100% (2/2)** |
`,
  },
  {
    slug: 'account360-cited-claims-only',
    title: 'account360: every claim cited or the build fails',
    date: '2026-09-13',
    excerpt:
      'Account 360 rollups where uncited or invented claims trip a hallucination CI gate — citation-first, MockLLM default.',
    tags: ['account360', 'citations', 'hallucination', 'evals'],
    body: `## Why account360

Rollups that invent ARR or champions are worse than silence. [account360](https://github.com/srikolagani/account360) emits claims with sources; the golden eval fails on hallucination.

## Uniqueness vs OpenSales / ai-sdr-crew / GOVR

Citation-first contract. Sharper than open-ended multi-agent summaries.

## Eval results (v0.1)

| Case | Result |
|------|--------|
| all-claims-cited | pass |
| no-hallucination | pass |
| **Pass rate** | **100% (2/2)** |
`,
  },
  {
    slug: 'salescoach-rubric-policy',
    title: 'salescoach: rubric scores and hard policy checks',
    date: '2026-09-13',
    excerpt:
      'Coach from deal artifacts with weighted rubric dimensions and policies that ban guaranteed closes — offline evals at 100%.',
    tags: ['salescoach', 'coaching', 'rubric', 'evals'],
    body: `## Why salescoach

Chatty coaches drift. [salescoach](https://github.com/srikolagani/salescoach) scores discovery depth, champion strength, mutual-plan quality, and risk honesty — then enforces policy (no guaranteed closes, cite artifacts, actionable next step).

## Uniqueness vs OpenSales / ai-sdr-crew / GOVR

Rubric/policy-first coaching on fixture deal artifacts. CI fails on policy misses.

## Eval results (v0.1)

| Case | Result |
|------|--------|
| policy-clean | pass (score 85.0) |
| rubric-bounds | pass |
| **Pass rate** | **100% (2/2)** |
`,
  },

  {
    slug: 'introducing-crm-agent-kit',
    title: 'Introducing crm-agent-kit: a small runtime for agentic CRM workflows',
    date: '2026-09-10',
    excerpt:
      'A vendor-neutral TypeScript library with a structured agent loop, memory, tools, and four runnable demos — no API keys required.',
    tags: ['crm-agent-kit', 'agents', 'typescript'],
    body: `Enterprise AI projects often stall on the same gap: you have prompts, you have systems of record, and you somehow need a trustworthy loop between them.

[crm-agent-kit](https://github.com/srikolagani/crm-agent-kit) is my answer for that gap at the smallest useful size.

## What shipped in v0.1

- An **agent loop** with explicit steps: plan → think → tool → observe → answer
- A **memory store** for run-scoped context
- A **mock LLM provider** that is deterministic — demos and tests never need cloud credentials
- Four demos that map to familiar CRM motions:
  1. Support triage + reply draft
  2. Order / document review with a checklist
  3. Sales playbook + mutual close-plan
  4. Account planning

The kit is intentionally vendor-neutral. It models generic CRM and revenue-ops patterns so teams can prototype agentic workflows without locking the narrative (or the package names) to a single platform.

## Why a mock LLM first

Most “hello world” agent repos quietly assume an API key and a credit card. That is fine for a hack day; it is a poor foundation for teaching structure.

A deterministic provider lets you:

- teach the **control flow** without flaky outputs
- write tests that stay green in CI
- demo the product shape to stakeholders who should not be waiting on rate limits

When you are ready, swap \`MockLlmProvider\` for any object that implements \`complete(messages, tools)\`.

## Try it

\`\`\`bash
git clone https://github.com/srikolagani/crm-agent-kit.git
cd crm-agent-kit
npm install
npm test
npm run demos
\`\`\`

More on evaluation design in the next note.`,
  },
  {
    slug: 'evaluating-agentic-crm-patterns',
    title: 'Evaluating agentic CRM patterns without burning the eval budget',
    date: '2026-09-10',
    excerpt:
      'How to judge triage quality, checklist coverage, and close-plan usefulness before you wire a paid model.',
    tags: ['evals', 'crm', 'quality'],
    body: `Agent demos impress. Agent **evals** decide whether anything ships.

For CRM-shaped workflows, I care less about eloquence and more about three measurable habits:

1. **Did the agent call the right tools in a sensible order?**
2. **Did structured outputs include the fields operators actually use?**
3. **Did it stop with a decision a human can accept or reject in under a minute?**

## Start with fixtures, not live orgs

Live CRM sandboxes are noisy. Fixture tickets, purchase orders, and opportunities — like those in [crm-agent-kit](https://github.com/srikolagani/crm-agent-kit) — give you a stable substrate.

A minimal eval harness for a support triage agent might assert:

- priority is one of \`high | medium | low\`
- a draft reply exists and mentions the ticket id
- at least one tool observation was recorded before the final answer

That is not a research benchmark. It is an engineering gate.

## Score the audit trail

The kit records \`AgentStep\` kinds (\`plan\`, \`tool\`, \`observe\`, \`answer\`, \`error\`). Treat the trail as a first-class artifact:

- Missing \`observe\` before \`answer\` → incomplete grounding
- Unknown-tool \`error\` steps → schema / routing bugs
- Step count exploding past budget → prompt or tool design smell

## Reserve paid models for the top of the funnel

Use the mock provider to lock control flow. Promote a slice of fixtures to a real model only when:

- tool schemas are stable
- rubrics are written
- you know which dimensions (tone, factuality, policy) need human labels

That sequence keeps eval spend proportional to learning, not to ceremony.

A future \`crm-agent-evals\` package will codify these gates; for now the kit’s vitest suite is the seed.`,
  },
  {
    slug: 'four-demos-structured-steps',
    title: 'From triage to account plans: four demos that teach structured steps',
    date: '2026-09-10',
    excerpt:
      'A walk through the support, document-review, sales, and account-planning demos — and what each one trains you to notice.',
    tags: ['demos', 'playbooks', 'workflows'],
    body: `Abstractions agent frameworks are easy to admire and hard to operationalize. Concrete demos help.

Here is how the four [crm-agent-kit](https://github.com/srikolagani/crm-agent-kit) demos carve the problem space.

## 1. Support bot

**Motion:** fetch ticket → classify priority → draft reply → summarize.

You learn to separate *classification* from *composition*. Operators want a priority they trust and a draft they can edit — not a monologue.

\`\`\`bash
npm run demo:support
\`\`\`

## 2. Order / document review

**Motion:** load document → ask targeted questions → run checklist → recommend hold/release.

Checklists beat free-form “document Q&A” for receiving desks. The demo deliberately fails a compliance item (missing COI) so the final answer has a real decision.

\`\`\`bash
npm run demo:order
\`\`\`

## 3. Sales playbook + close-plan

**Motion:** load opportunity → fetch stage plays → build dated mutual close plan.

The interesting part is not the prose; it is the **dated ownership**. Close plans fail when milestones lack owners.

\`\`\`bash
npm run demo:sales
\`\`\`

## 4. Account planning

**Motion:** load account + stakeholders → scan whitespace → draft quarterly objectives.

Account plans are political documents. The demo surfaces champion / skeptical / neutral sentiment so the plan has a human map, not only a product map.

\`\`\`bash
npm run demo:account
\`\`\`

## What to steal for your own kit

- Keep tools small and boring
- Persist observations into memory
- Emit a final answer a manager can skim
- Prefer vendor-neutral nouns: ticket, opportunity, account, checklist

If you extend the kit, start by cloning one demo and swapping the fixtures for your domain — leave the loop intact until the audit trail looks right.`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
