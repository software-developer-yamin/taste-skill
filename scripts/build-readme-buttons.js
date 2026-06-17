const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "assets/readme-buttons");
fs.mkdirSync(outDir, { recursive: true });

const logoB64 = fs
  .readFileSync(path.join(root, "assets/taste-skill-logo.png"))
  .toString("base64");

function splitBadge(id, width, label, value, labelWidth) {
  const valueWidth = width - labelWidth;
  const valueX = labelWidth + valueWidth / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="44" viewBox="0 0 ${width} 44" role="img" aria-label="${label} ${value}">
  <rect width="${width}" height="44" rx="8" fill="#0a0a0a" stroke="#ffffff" stroke-width="1.25"/>
  <line x1="${labelWidth}" y1="10" x2="${labelWidth}" y2="34" stroke="#525252" stroke-width="1"/>
  <text x="${labelWidth / 2}" y="27" text-anchor="middle" fill="#a3a3a3" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" font-size="12" font-weight="600" letter-spacing="0.04em">${label.toUpperCase()}</text>
  <text x="${valueX}" y="27" text-anchor="middle" fill="#ffffff" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" font-size="12" font-weight="600">${value}</text>
</svg>`;
}

const siteButton = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="320" height="72" viewBox="0 0 320 72" role="img" aria-label="Visit tasteskill.dev">
  <rect width="320" height="72" rx="10" fill="#0a0a0a" stroke="#ffffff" stroke-width="1.5"/>
  <image xlink:href="data:image/png;base64,${logoB64}" x="18" y="12" width="48" height="48" preserveAspectRatio="xMidYMid meet"/>
  <text x="168" y="42" text-anchor="middle" fill="#ffffff" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" font-size="20" font-weight="600" letter-spacing="0.02em">tasteskill.dev</text>
</svg>`;

const badges = [
  ["btn-site", siteButton],
  ["btn-mit", splitBadge("mit", 132, "License", "MIT", 72)],
  ["btn-agent-skills", splitBadge("agent-skills", 248, "Agent Skills", "Compatible", 118)],
  ["btn-tools", splitBadge("tools", 292, "Agents", "Cursor · Codex · Claude", 78)],
  ["btn-changelog", splitBadge("changelog", 176, "Changelog", "Latest", 98)],
];

for (const [name, svg] of badges) {
  const svgPath = path.join(outDir, `${name}.svg`);
  const pngPath = path.join(outDir, `${name}.png`);
  fs.writeFileSync(svgPath, svg);
  execSync(`npx --yes @resvg/resvg-js-cli "${svgPath}" "${pngPath}"`, {
    stdio: "inherit",
    cwd: root,
  });
  console.log(name, fs.statSync(pngPath).size, "bytes");
}
