---
validated: yes
track: chore
---
# Plan — Chore generic-model-policy

Branch: `chore/generic-model-policy`
Source: `samulefevre/killer-saas`, PR to `main`.

## Goal
Remove downstream-project references from the method fork, preserve generic escalation
and existing Claude support, then propagate with the installer.

## Done when
- No tracked file in the fork names the downstream game project, case-insensitively.
- Shared policy, documentation and tests describe database transaction guarantees and
  cross-language determinism without naming a particular engine, language pair or DB stack.
- Existing economy, identity/session/security, transaction/concurrency/idempotency and
  determinism escalation categories and model/effort selections remain unchanged.
- Claude source agents, commands and installer behavior remain unchanged.
- Historical plan/verification records retain truthful evidence in project-neutral terms;
  no claims of rerunning their historical checks or rewriting Git history.
- Updated Codex tooling is installed in the downstream repository via the verified source
  installer; local settings and unrelated work are preserved. Other projects/global
  installations receive the generic policy on update, without per-project model settings.

## Files
Source: `src/skills/model-routing/SKILL.md`, `DOC.md`,
`tests/model-routing.test.mjs`, `docs/plans/ai-model-routing.md`,
`docs/verif/ai-model-routing.md`, this plan, `docs/verif/generic-model-policy.md`.
Propagation: installer-owned `.codex/` and `AGENTS.md`, plus plan/verification record,
inside a dedicated downstream `chore/generic-model-policy` worktree and PR to `dev`.
Installer code, Claude definitions and project-local settings are outside scope.

## Escalation check
No product code, schema, authorization, API contract, business rule or runtime dependency
change. Text-only developer tooling cleanup and adjustment of its existing focused test.

## Verification
- One tracked-file, case-insensitive scan for the project name; generic policy inspection.
- `node --test tests/model-routing.test.mjs` once: existing five generation/installation
  checks include exact Claude source parity and preservation on repeated installation.
- Installer in downstream worktree, then `--check --target codex`; compare generated skills,
  original local-settings hash and scoped diff. No product suite, build, E2E or environment.

## Tasks
1. [x] Generalize shared policy, docs, historical records and existing verification assertions.
2. [x] Run focused checks, record evidence and commit the source chore.
3. [ ] Propagate verified source through installer; parent-owned and pending. Record downstream checks and commit.

## Ship follow-through
Publish source PR and downstream propagation PR; squash-merge per authorized settings,
then synchronize/reinstall the downstream base and remove clean chore worktrees only
following proven merges. MERGE ONLY: no deployment, activation, remote migration or provisioning.
