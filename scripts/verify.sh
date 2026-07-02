#!/bin/sh
# AgentShip verify script — run after every change. Fails fast.
set -e

echo "→ typecheck"
npx tsc --noEmit

echo "→ lint"
npm run lint --silent

echo "→ build"
npm run build > /tmp/agentship-build.log 2>&1 || { tail -30 /tmp/agentship-build.log; exit 1; }

echo "✓ verify passed"
