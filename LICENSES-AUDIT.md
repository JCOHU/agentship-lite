# Dependency license audit

Run: 2 July 2026 · `npx license-checker --production --summary`

| License | Count | Assessment |
|---|---|---|
| MIT | 24 | ✅ permissive |
| Apache-2.0 | 5 | ✅ permissive |
| ISC | 2 | ✅ permissive |
| BSD-3-Clause / 0BSD | 2 | ✅ permissive |
| CC-BY-4.0 | 1 | ✅ caniuse-lite browser data — attribution carried in package |
| UNLICENSED | 1 | ✅ this package itself (covered by LICENSE.md) |
| LGPL-3.0-or-later | 1 | ✅ `@img/sharp-libvips-*` — prebuilt libvips used by Next.js image optimisation. Not vendored in the product ZIP; buyers fetch it themselves via `npm install`. Standard across the Next.js ecosystem. |

**Conclusion:** no GPL contamination; nothing copyleft is redistributed in the product archive
(node_modules is excluded from packaging). Re-run this audit after adding dependencies:
`npx license-checker --production --summary`.
