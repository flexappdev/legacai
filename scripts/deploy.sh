#!/usr/bin/env bash
# Legacai — Vercel deploy helper. Blocked at project-create time on CLI v54
# with a personal-account 403 (see BACKLOG.md § V6). Run manually once the
# account permission is sorted — either from the Vercel dashboard, or with:
#
#   1. Create the project in the dashboard (matsiems scope, framework=Next.js)
#   2. Copy the prj_… id, then link locally:
#
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .env.local ]; then
  echo "❌ .env.local missing. Sync from ~/context-2026/agents/.env first."
  exit 1
fi

# --- Option A: dashboard-created project, headless link ---
#   VERCEL_ORG_ID=<team_or_matsiems> VERCEL_PROJECT_ID=prj_... \
#     vercel link --yes --non-interactive
#
# --- Option B: CLI create (currently returns 403 for matsiems scope) ---
vercel link --yes --non-interactive --project legacai

# Sync .env.local → prod env
while IFS='=' read -r key value; do
  [[ "$key" =~ ^#.*$ ]] && continue
  [[ -z "$key" ]] && continue
  # Strip surrounding whitespace on URL values (avoid the corrupted-env trap).
  value="${value## }"; value="${value%% }"
  printf '%s' "$value" | vercel env add "$key" production --yes >/dev/null 2>&1 || true
done < .env.local

vercel --prod --yes
echo "✓ Deploy complete. Patch NEXT_PUBLIC_APP_URL to the prod alias in Vercel envs."
