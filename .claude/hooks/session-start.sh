#!/bin/bash
set -euo pipefail

# Only bootstrap in remote (Claude Code on the web) sessions.
# Local machines manage ~/.claude/ themselves.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

log() { echo "[session-start] $*"; }

mkdir -p "$HOME/.claude/skills" "$HOME/.claude/agents" "$HOME/.claude/rules"

# 1. Skills + agents + rules from everything-claude-code
ECC_DIR="${TMPDIR:-/tmp}/everything-claude-code"
if [ ! -d "$ECC_DIR/.git" ]; then
  log "cloning everything-claude-code"
  git clone --depth=1 https://github.com/affaan-m/everything-claude-code.git "$ECC_DIR" >/dev/null 2>&1 || \
    log "clone failed (offline?)"
fi

if [ -d "$ECC_DIR" ]; then
  for skill in search-first tdd-workflow; do
    src="$ECC_DIR/skills/$skill"
    dst="$HOME/.claude/skills/$skill"
    if [ -d "$src" ] && [ ! -e "$dst" ]; then
      cp -r "$src" "$dst"
      log "installed skill: $skill"
    fi
  done

  if [ -d "$ECC_DIR/agents" ]; then
    for f in "$ECC_DIR/agents"/*.md; do
      [ -f "$f" ] || continue
      target="$HOME/.claude/agents/$(basename "$f")"
      [ -e "$target" ] || cp "$f" "$target"
    done
    log "agents synced"
  fi

  if [ -d "$ECC_DIR/rules/common" ] && [ ! -e "$HOME/.claude/rules/common" ]; then
    cp -r "$ECC_DIR/rules/common" "$HOME/.claude/rules/common"
    log "rules synced"
  fi
fi

# 2. Skills installed via the `skills` CLI.
# Format: "<repo-slug>:<resulting-skill-dir-name>"
SKILLS_CLI_PACKAGES=(
  "remotion-dev/skills:remotion-best-practices"
  "emilkowalski/skill:emil-design-eng"
  "pbakaus/impeccable:impeccable"
)
for entry in "${SKILLS_CLI_PACKAGES[@]}"; do
  repo="${entry%%:*}"
  name="${entry##*:}"
  if [ ! -e "$HOME/.claude/skills/$name" ]; then
    log "installing $name from $repo"
    npx --yes skills@1.5.3 add "$repo" -g -y --all >/dev/null 2>&1 || \
      log "$name install failed (continuing)"
  fi
done

# 3. claude-mem plugin (idempotent; checks installed_plugins.json)
PLUGINS_JSON="$HOME/.claude/plugins/installed_plugins.json"
if [ ! -f "$PLUGINS_JSON" ] || ! grep -q '"claude-mem' "$PLUGINS_JSON" 2>/dev/null; then
  log "installing claude-mem plugin"
  npx --yes claude-mem install >/dev/null 2>&1 || log "claude-mem install failed (continuing)"
fi

log "bootstrap complete"
