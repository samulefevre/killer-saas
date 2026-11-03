---
name: model-routing
description: Codex-only runtime model and reasoning selection for killer-saas phases and delegates; automatic risk escalation and targeted discovery.
---
# Codex model routing

This contract applies only to Codex. Claude keeps its canonical agent frontmatter,
permissions and invocation semantics. No project setting or project model table is needed.
These are runtime delegation instructions, not model configuration for the current session.

| Work | Model | reasoning_effort |
| --- | --- | --- |
| Orchestration / coordination | gpt-6.1-sol | low |
| Status, help, bootstrap, ship mechanics | gpt-6-luna | high |
| PRD, stories, research synthesis, plan, flow, ordinary implementation | gpt-6.1-sol | medium |
| Architecture, story breakdown review, code review | gpt-6.1-sol | high |
| Visual design / design system | gpt-6.1-terra | medium |
| Tightly scoped chores, targeted code discovery | gpt-6-luna | high |

## Select before dispatch

Read the request, acceptance criteria, plan and available findings before selecting the
worker. Apply the strongest applicable risk override below. Commands carry their explicit
default; this table supplies task and role overrides. In particular an implementer in
`track: chore` uses Luna high only while its task remains tightly scoped; uncertain or
cross-module tooling changes use Sol medium. A worktree-manager, when available, uses
Luna high for bootstrap mechanics. Never add phases, reviewers or tests merely to route.

Use the host's real `spawn_agent` with `model`, `reasoning_effort` and `fork_turns: "none"`
when overriding model/effort (this host requires a fresh context). Send the absolute
worktree, exact branch, command/agent skill path, task, authorization and gate state,
required document paths, verified evidence and unresolved questions. Fresh context means
read those files, not assume inherited history. Wait before handing ownership of a writable
workspace to another agent; only read-only discovery can overlap safely.

The coordinating session cannot switch its own model through a prompt. State its limit,
then delegate the substantive work to the selected worker. If the host cannot select the
required model or effort, report the unavailable selection and stop that dependent work;
do not silently inherit a session model or claim a prompt switched it. `agents/openai.yaml`
is interface metadata, not a runtime model selector. No Claude opus-to-Codex equivalence.

## Targeted research in every project

For code discovery needed by any phase, give Luna high a bounded read-only question with
specific paths/symbols and requested facts. Return source `path:line` references, observed
behavior, relevant signatures and explicit uncertainties. Do not ask it to decide architecture
or perform substantive high-risk analysis. The phase's Sol medium worker synthesizes the
findings and owns conclusions. Cross-module contracts, conflicting evidence or expanded scope
escalate the discovery to Sol medium with the evidence already found. This is delegation
within the existing phase, not a new pipeline phase. Reuse adequate existing findings.

## Automatic risk overrides (all projects)

Economy/resource/reward mutations, authentication, authorization/tenant scope/security or sessions, database transactions,
rollback/concurrency/idempotency, and cross-language determinism require **gpt-6.1-sol,
reasoning_effort: high** for substantive analysis, planning, implementation and review.
This includes SQLite/D1 transactional behavior and Godot/TypeScript parity without any
project-specific policy. Luna may still locate exact source references for a bounded
read-only question; it does not make the risk decision. Mechanical status/bootstrap/ship
can remain Luna while any substantive risk work is handed to Sol high. Visual work that
requires a high-risk rule decision hands that decision to Sol high first.

A persistent hard problem escalates from Sol to **gpt-6-astra, reasoning_effort: medium**:
a failed serious attempt with a reproducible unresolved cause, incompatible evidence or a
reasoning impasse. If Astra medium cannot resolve it, use **gpt-6-astra,
reasoning_effort: high**. State the reason, attempted approaches, exact errors, source
references and remaining unknowns in each handoff. Do not loop without new evidence.
No max/ultra and no extra review by default. All plan validation, isolated implementation,
fresh review, verification, ship gates and explicit user restrictions remain in force.
