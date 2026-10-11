const fs = require('fs');

const primitives = JSON.parse(fs.readFileSync('./design.tokens/Primitives.tokens.json', 'utf8'));
const semantics = JSON.parse(fs.readFileSync('./design.tokens/Semantics.tokens.json', 'utf8'));

let css = `@import "tailwindcss";

@theme {
  --font-sans: var(--font-abar), ui-sans-serif, system-ui, sans-serif;
`;

// Helper to sanitize variable names
const clean = (str) => str.trim().replace(/\s+/g, '-');

// Primitives Colors
const colors = primitives['Primitives']['Colors '];
for (const [groupName, groupTokens] of Object.entries(colors)) {
  for (const [tokenName, tokenData] of Object.entries(groupTokens)) {
    if (tokenData.$value && !tokenData.$value.includes('{')) {
       css += `  --color-${clean(tokenName).replace('color-', '')}: ${tokenData.$value};\n`;
    }
  }
}

css += `\n  /* Semantics */\n`;
// Semantics Colors mappings (Bg, Text, Border)
// We will just create standard CSS variables for semantics that reference primitives
const semanticSections = semantics['Semantics'];
let rootVars = `\n@layer base {\n  :root {\n`;

const mapRef = (val) => {
  if (val.includes('{')) {
     const refParts = val.replace(/[{}]/g, '').split('.');
     const leaf = refParts[refParts.length - 2].trim(); // e.g. color-neutral-50
     return `var(--color-${leaf.replace('color-', '')})`;
  }
  return val;
};

for (const [secName, secTokens] of Object.entries(semanticSections)) {
  if (secName === '$extensions') continue;
  for (const [groupName, groupTokens] of Object.entries(secTokens)) {
     for (const [tokenName, tokenData] of Object.entries(groupTokens)) {
         if (tokenData.$value) {
            rootVars += `    --${clean(tokenName)}: ${mapRef(tokenData.$value)};\n`;
         }
     }
  }
}
rootVars += `  }\n}\n`;

css += `}\n\n${rootVars}`;

fs.writeFileSync('src/app/globals.css', css);
console.log('globals.css updated');
