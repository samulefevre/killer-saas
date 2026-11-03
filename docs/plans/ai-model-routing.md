---
validated: yes
track: chore
---
# Plan — Chore ai-model-routing

Branch: `chore/ai-model-routing`

## Goal
Route Codex work to explicit cost-conscious models, generalize implementation-context risks
into automatic escalation, and distribute the shared policy through the existing installer.

## Done when
- Codex commands and agent skills select explicit model and reasoning effort at delegation;
  inherited session model does not determine Codex routing.
- The shared policy defines phase/role defaults, targeted discovery, and risk-based escalation.
- Routing preserves existing pipeline phases, gates, Claude behavior, project settings and
  unrelated installed skills.
- A host that cannot select a model reports that limit instead of claiming the prompt changed it.
- Installer output matches generated output, without changing unrelated working directories.

## Files
Source method files: `src/AGENTS.md`, `src/commands/`, `src/agents/`, `src/skills/`,
`src/templates/agents-local.md`, `bin/ks-build.mjs`, `install.sh` only if necessary,
`README.md`, `DOC.md`, focused tests under `tests/`, and this plan with its verification record.

## Escalation check
No product behavior, schema, authorization, API contract, business rule or runtime dependency
changes. Changes affect shared developer tooling and configuration only.

## Verification
- Node syntax check for a changed generator and focused behavioral tests for generated routing,
  escalation instructions, Claude preservation and installer settings/unrelated-file preservation.
- Generate and install into a temporary fixture; compare installed output with generation and
  inspect installer check results.
- No application suite, build, E2E or environment setup is needed for this tooling change.

## Tasks (ordered)
1. [x] Implement shared model/effort routing and explicit Codex delegation instructions.
2. [x] Add generic risk escalation and generator/installer verification.
3. [x] Record source checks and commit source changes.

## Implementation handoff
Source implementation and fixture verification were recorded in the matching verification
record. Historical publication and installation activities are outside this source plan.
Installer edits were made because the remote fallback selected the upstream instead of the
intended source, and generated manifests claimed unrelated pre-existing skills. The new
manifest lists staging-generated skills only. Legacy manifests with existing custom-skill
claims require inspection before updating; automatic repair could remove legitimate files.
