---
validated: yes
track: chore
---
# Plan — Chore generic-model-policy

Branch: `chore/generic-model-policy`

## Goal
Keep the shared method policy generic, preserve generic escalation and existing Claude
support, and retain truthful source verification evidence.

## Done when
- Shared policy, documentation and tests describe transaction guarantees and cross-language
  determinism without tying them to a particular application or stack.
- Existing risk categories and model/effort selections remain unchanged.
- Claude source agents, commands and installer behavior remain unchanged.
- Historical source records retain actual checks and results without claiming later checks.

## Files
Source method files: `src/skills/model-routing/SKILL.md`, `DOC.md`,
`tests/model-routing.test.mjs`, this plan and its verification record.

## Escalation check
No product code, schema, authorization, API contract, business rule or runtime dependency
change. Text-only developer tooling cleanup and adjustment of its existing focused test.

## Verification
- Case-insensitive content scan and inspection of the generic policy.
- Run `node --test tests/model-routing.test.mjs` once; the existing five checks cover
  generation, canonical Claude source parity and preservation during repeated installation.
- No application suite, build, E2E or environment setup is needed for this tooling change.

## Tasks
1. [x] Generalize shared policy, documentation, historical records and verification assertions.
2. [x] Run focused checks, record source evidence and commit the source chore.

## Historical scope
The source verification record describes checks performed for the method repository.
Installation and merge follow-through performed elsewhere are outside this source record.
