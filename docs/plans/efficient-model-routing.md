---
validated: yes
track: chore
---
# Plan — Chore efficient-model-routing

Branch: `chore/efficient-model-routing`; source fork `samulefevre/killer-saas`, PR to main.

## Goal
Avoid needless discovery delegation, explicitly escalate setup/ship decisions, and propagate
verified generic tooling to the downstream base and all seven existing story worktrees
without disturbing ongoing work or any existing index.

## Done when
- A trivial bounded lookup (one symbol/path, one grep/read, or adequate existing evidence)
  stays in the current phase worker; do not create an agent merely to lower model tier.
- Delegate bounded multi-read discovery to Luna high when isolation or material work
  justifies its overhead; return exact references and uncertainties. Cross-module contracts,
  ambiguity or conflicting evidence use Sol medium. Existing Sol high risk overrides win.
- Setup/ship mechanics stay Luna high. Ambiguous framing/settings, CI failure diagnosis or
  nonmechanical merge decisions use Sol medium, then high when existing risk rules apply.
  Keep user-owned choices/checkpoints and fail-closed ship gates: escalation never grants
  permission to merge on a red check or invent missing settings.
- Generated Codex instructions agree with the shared policy; existing mandatory isolated
  implementer/reviewer calls, model selections, Claude support and other gates are preserved.
- Generic fork content contains no downstream project name or project-specific policy.
- Installer propagates the merged source to the downstream base plus seven original story
  worktrees (s08, s21, s70, s72, s74, s75, s76), with no product-code/local-settings edits.
- Every target's raw/logical index, HEAD/branch refs, existing non-tooling changes, untracked
  files, templates, custom skills and relevant environment files are preserved.
- Expected old generated tooling differences from the preceding maintenance are accepted
  only when bytes match the known source baseline; never overwrite arbitrary local edits.
- Only generated method-owned .codex files and assembled AGENTS.md change, unstaged.
  No branch update, merge/rebase/reset/stash/stage/commit in existing downstream targets.
- Coordinate exclusive maintenance windows with active base/story owners before writes;
  defer any unavailable target and report it honestly. No overlapping writers.

## Files
Source: `src/skills/model-routing/SKILL.md`, `bin/ks-build.mjs` only as needed,
`README.md`, `DOC.md`, `tests/model-routing.test.mjs`, this plan and matching verif record.
Propagation: installer-owned `.codex/` files and `AGENTS.md` in eight named target locations.
Dedicated downstream chore worktree: matching plan/verif record only, PR to dev.
No installer code change, project-local setting or source of an application is in scope.
Temporary check scripts, backups and digest evidence may live outside repositories.

## Escalation check
No product behavior, schema, authorization, API, business rule or dependency change.
Developer tooling rules only; existing security/economic risk handling remains unchanged.

## Verification
- Generator syntax if changed; existing five focused Node generation/install tests once,
  adjusted to cover direct lookup versus delegated discovery and setup/ship escalation
  instructions, unchanged Claude output/gates and repeated-install preservation.
- Generic-content scan and source diff inspection; no claimed cost benchmark.
- One generated fixture per verified source version; per-target preflight, installer,
  exact generated-file comparison, --check and before/after preservation snapshots.
  GIT_OPTIONAL_LOCKS=0 for target reads; preserve raw index bytes as well as staged entries.
- No product suite, typecheck/build/E2E, dependencies or environment bootstrap.

## Tasks
1. [x] Implement the two generic rules and align generated instructions/documentation.
2. [ ] Publish/squash-merge source PR (source verification and single commit completed).
3. [ ] Coordinate and delegate sequential propagation to base plus seven story worktrees.
4. [ ] Record preservation evidence in downstream chore, publish/squash-merge its record PR.

## Shipping
MERGE ONLY, no deployment, activation, migration or provisioning. Never advance occupied
base/story branches during record-PR landing. Global installs and unrelated projects are
outside this chore. Fresh sessions/delegations load instructions; existing models do not switch.
