import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (...parts) => readFileSync(join(...parts), 'utf8');
function fixture(run) {
  const path = mkdtempSync(join(tmpdir(), 'ks-model-routing-'));
  try { return run(path); } finally { rmSync(path, { recursive: true, force: true }); }
}
function generate(target, out, src = join(root, 'src')) {
  return execFileSync(process.execPath, [join(root, 'bin/ks-build.mjs'), '--target', target, '--src', src, '--out', out], { encoding: 'utf8' });
}

test('Codex generation selects explicit phase/role routes and preserves pipeline contracts', () => fixture((path) => {
  generate('codex', path);
  const expected = {
    'gpt-6.1-sol/low': ['ks-orchestrator'],
    'gpt-6-luna/high': ['ks-help', 'ks-status', 'ks-setup', 'ks-ship', 'ks-chore'],
    'gpt-6.1-sol/medium': ['ks-prd', 'ks-stories', 'ks-research', 'ks-plan', 'ks-flow', 'ks-execute', 'implementer', 'ks-test-prune'],
    'gpt-6.1-sol/high': ['ks-architect', 'ks-stories-review', 'stories-reviewer', 'ks-review', 'reviewer'],
    'gpt-6.1-terra/medium': ['ks-design', 'ks-design-system'],
  };
  for (const [route, names] of Object.entries(expected)) {
    const [model, effort] = route.split('/');
    for (const name of names) {
      const output = read(path, 'skills', name, 'SKILL.md');
      assert.ok(output.includes(`model \`${model}\`, reasoning_effort \`${effort}\``), name);
      assert.match(output, /fork_turns: "none"/);
      assert.match(output, /model-routing/);
      assert.match(output, /Trivial grep\/read lookups and reuse of adequate evidence stay in the current phase worker/);
      assert.match(output, /do not dispatch a discovery agent merely to lower the model tier/);
      assert.match(output, /Mandatory isolated implementation and fresh review still apply/);
      assert.doesNotMatch(output, /choose an equivalent tier|using your current session model/);
      const kind = name.startsWith('ks-') ? 'commands' : 'agents';
      const body = read(root, 'src', kind, `${name}.md`).split('\n---\n').slice(1).join('\n---\n')
        .replace(/@templates\//g, 'templates/').replace(/@AGENTS\.md/g, 'AGENTS.md');
      assert.ok(output.endsWith(body), `${name} body/gates preserved`);
      if (kind === 'commands') {
        const ui = read(path, 'skills', name, 'agents/openai.yaml');
        assert.doesNotMatch(ui, /gpt-6|reasoning_effort|fork_turns/);
      }
    }
  }
  for (const name of ['ks-orchestrator', 'ks-flow', 'ks-execute', 'ks-review', 'ks-chore', 'ks-stories-review']) {
    assert.match(read(path, 'skills', name, 'SKILL.md'), /do not add a wrapper agent/);
  }
  const policy = read(path, 'skills/model-routing/SKILL.md');
  assert.equal(policy, read(root, 'src/skills/model-routing/SKILL.md'));
  const discovery = policy.split('## Targeted research in every project')[1].split('## Automatic risk')[0];
  assert.match(discovery, /one symbol\/path, one grep\/read, or reuse of adequate existing evidence/);
  assert.match(discovery, /stays in the current phase worker/);
  assert.match(discovery, /Delegate meaningful bounded multi-read discovery to Luna high only when isolation or the\nmaterial work justifies dispatch overhead/);
  assert.match(discovery, /Cross-module contracts, ambiguity, conflicting evidence or expanded scope\nrequire Sol medium/);
  assert.match(discovery, /strongest risk override still wins/);
  assert.match(discovery, /source `path:line` references/);
  const decisions = policy.split('## Setup and ship decisions')[1].split('## Targeted research')[0];
  assert.match(decisions, /Luna high handles setup\/bootstrap and ship mechanics/);
  assert.match(decisions, /Ambiguous framing or setup settings,\nCI-failure diagnosis and nonmechanical merge decisions require Sol medium/);
  assert.match(decisions, /require Sol high when applicable/);
  assert.match(decisions, /never invents missing settings/);
  assert.match(decisions, /user-owned choices\/checkpoints or permits merging with red checks/);
  assert.match(decisions, /fail-closed ship gates/);
  for (const required of ['gpt-6-astra', 'reasoning_effort: medium', 'reasoning_effort: high', 'path:line', 'transactional database behavior', 'cross-language determinism', 'Cross-module contracts', 'conflicting evidence', 'Tightly scoped chores', 'No max/ultra', 'stop that dependent work', 'authorization/tenant scope/security']) {
    assert.ok(policy.includes(required), required);
  }
}));

test('unknown commands fail closed instead of inheriting an unspecified model', () => fixture((path) => {
  mkdirSync(join(path, 'src/commands'), { recursive: true });
  writeFileSync(join(path, 'src/commands/ks-unknown.md'), '---\ndescription: unknown\n---\nBody');
  const result = spawnSync(process.execPath, [join(root, 'bin/ks-build.mjs'), '--target', 'codex', '--src', join(path, 'src'), '--out', join(path, 'out')], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing explicit Codex route/);
}));

test('Claude generation keeps canonical commands, agents and skills byte-for-byte', () => fixture((path) => {
  generate('claude', path);
  function compare(src, dest) {
    for (const entry of readdirSync(src, { withFileTypes: true })) {
      if (entry.isDirectory()) compare(join(src, entry.name), join(dest, entry.name));
      else assert.equal(read(dest, entry.name), read(src, entry.name));
    }
  }
  for (const kind of ['commands', 'agents', 'skills']) compare(join(root, 'src', kind), join(path, kind));
  assert.match(read(path, 'agents/implementer.md'), /model: opus/);
  assert.match(read(path, 'agents/reviewer.md'), /model: inherit/);
}));

test('repeated project installs preserve custom settings/skills/templates and match generated output', () => fixture((path) => {
  const project = join(path, 'project');
  const home = join(path, 'home');
  mkdirSync(join(project, '.codex/skills/custom'), { recursive: true });
  mkdirSync(home);
  const local = 'Target branch: dev\nShip confirmation: automatic\nProject conventions: retain me\n';
  const config = 'model = "custom-model"\n';
  writeFileSync(join(project, 'AGENTS.local.md'), local);
  writeFileSync(join(project, '.codex/config.toml'), config);
  writeFileSync(join(project, '.codex/skills/custom/SKILL.md'), 'custom skill');
  writeFileSync(join(project, 'CLAUDE.md'), 'existing Claude file');
  const install = (...args) => execFileSync('bash', [join(root, 'install.sh'), ...args], {
    cwd: project, env: { ...process.env, HOME: home }, encoding: 'utf8',
  });
  install('--target', 'codex');
  writeFileSync(join(project, 'templates/plan.md'), 'locally edited template');
  install('update', '--target', 'codex');
  assert.equal(read(project, 'AGENTS.local.md'), local);
  assert.equal(read(project, '.codex/config.toml'), config);
  assert.equal(read(project, '.codex/skills/custom/SKILL.md'), 'custom skill');
  assert.equal(read(project, 'CLAUDE.md'), 'existing Claude file');
  assert.equal(read(project, 'templates/plan.md'), 'locally edited template');
  assert.equal(read(project, 'AGENTS.md'), read(root, 'src/AGENTS.md') + '\n---\n\n' + local);
  const expected = join(path, 'expected');
  generate('codex', expected);
  const manifest = read(project, '.codex/.ks-manifest').trim().split('\n');
  assert.deepEqual(manifest.sort(), readdirSync(join(expected, 'skills')).map(name => `skills/${name}`).sort());
  for (const skill of manifest) {
    assert.equal(read(project, '.codex', skill, 'SKILL.md'), read(expected, skill, 'SKILL.md'));
  }
  const check = install('--check', '--target', 'codex');
  assert.match(check, /conforme à la méthode/);
  assert.doesNotMatch(check, /modifié localement|n.existe plus|supprimé localement/);
}));

test('curl and cached-installer fallback fetch the approved fork', () => fixture((path) => {
  const bin = join(path, 'bin');
  const project = join(path, 'project');
  mkdirSync(bin); mkdirSync(project);
  const log = join(path, 'git-arguments');
  // Exercise fallback without network: this fake git accepts exactly the approved clone.
  writeFileSync(join(bin, 'git'), `#!/bin/sh\nif [ "$1" = clone ]; then\n  [ "$4" = https://github.com/samulefevre/killer-saas.git ] || exit 23\n  printf '%s' "$4" > "$KS_TEST_LOG"\n  cp -R "$KS_TEST_SOURCE/." "$5/"\nelse\n  printf fixture\nfi\n`, { mode: 0o755 });
  const payload = join(path, 'payload');
  mkdirSync(payload);
  cpSync(join(root, 'src'), join(payload, 'src'), { recursive: true });
  cpSync(join(root, 'bin'), join(payload, 'bin'), { recursive: true });
  cpSync(join(root, 'install.sh'), join(payload, 'install.sh'));
  execFileSync('bash', ['-s', '--', '--target', 'codex'], {
    input: read(root, 'install.sh'), cwd: project,
    env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, KS_TEST_SOURCE: payload, KS_TEST_LOG: log },
  });
  assert.equal(read(log), 'https://github.com/samulefevre/killer-saas.git');
  assert.match(read(project, '.codex/skills/ks-plan/SKILL.md'), /gpt-6.1-sol/);
}));
