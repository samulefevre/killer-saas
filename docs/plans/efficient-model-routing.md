---
validated: yes
track: chore
---
# Plan — Chore efficient-model-routing

Branch: `chore/efficient-model-routing`; source fork PR to `main`.

## Goal
Avoid needless discovery delegation, explicitly escalate setup/ship decisions, and preserve
the shared routing policy and existing pipeline gates.

## Done when
- A trivial bounded lookup stays in the current phase worker; do not create an agent merely
  to lower the model tier.
- Delegate bounded multi-read discovery when isolation or material work justifies its overhead;
  return exact references and uncertainties. Cross-module ambiguity or conflicting evidence
  uses the defined escalation path. Existing high-risk rules remain in force.
- Setup/ship mechanics use the defined lightweight route. Ambiguous framing, CI diagnosis or
  nonmechanical merge decisions escalate while retaining user checkpoints and fail-closed gates.
- Generated instructions preserve mandatory isolated implementer/reviewer calls, model
  selections, Claude support and other established gates.
- Source content remains generic and focused verification exercises these contracts.

## Files
Source: `src/skills/model-routing/SKILL.md`, `bin/ks-build.mjs` only as needed,
`README.md`, `DOC.md`, `tests/model-routing.test.mjs`, this plan and its verification record.

## Escalation check
No product behavior, schema, authorization, API, business rule or dependency change.
Developer tooling rules only; existing security/economic risk handling remains unchanged.

## Verification
- Generator syntax if changed; run the focused Node generation/install tests once.
- Inspect generic content and the source diff; make no cost benchmark claim.
- No application suite, typecheck, build, E2E, dependency installation or environment setup.

## Tasks
1. [x] Implement the shared discovery and setup/ship escalation rules and align documentation.
2. [x] Record source verification and complete the source change.

## Historical scope
The matching verification record retains the original source checks and their limitations.
Publication and propagation activities are outside this source plan.

## Shipping
MERGE ONLY. No deployment, activation, migration or provisioning. Fresh sessions and
delegations load instructions; existing models do not switch.
