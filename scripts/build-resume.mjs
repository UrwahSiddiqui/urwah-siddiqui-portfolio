// Local authoring dependencies: npm.cmd install --prefix .local-tools playwright-core
// Run from the repository root: node scripts/build-resume.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '../.local-tools/node_modules/playwright-core/index.mjs';
const data = JSON.parse(await fs.readFile('lib/professional.json', 'utf8'));
const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('AES-256', '<span class="nowrap">AES-256</span>');
const bullets = items => `<ul>${items.map(item => `<li>• ${esc(item)}</li>`).join('')}</ul>`;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Urwah Siddiqui – Résumé</title>
<style>
@font-face { font-family: Resume; src: url('file:///C:/Windows/Fonts/arial.ttf') format('truetype'); font-weight: 400; }
@font-face { font-family: Resume; src: url('file:///C:/Windows/Fonts/arialbd.ttf') format('truetype'); font-weight: 600 900; }
@page { size: A4; margin: 10mm 12mm; }
* { box-sizing: border-box; } body { font: 10.5pt/1.15 Resume, Arial, sans-serif; color: #20252b; margin: 0; hyphens: none; }
h1 { font-size: 23pt; line-height: 1.05; margin: 0 0 3pt; } .positioning { font-weight: 650; font-size: 11.5pt; margin: 0 0 5pt; color: #234754; }
.contact { font-size: 9.5pt; line-height: 1.25; margin: 0; } a { color: inherit; text-decoration: none; }
h2 { font-size: 11pt; color: #234754; margin: 5pt 0 3pt; padding-bottom: 2pt; border-bottom: 0.5pt solid #abb7bb; break-after: avoid; }
p { margin: 0 0 3pt; } ul { margin: 3pt 0 0; padding-left: 13pt; list-style: none; } li { margin: 0 0 2pt; text-indent: -10pt; break-inside: avoid; } .nowrap { white-space: nowrap; }
.entry { break-inside: avoid; margin-bottom: 3pt; } .entry-title { font-weight: 650; } .date { font-weight: 400; } .skills p { margin-bottom: 3pt; } .training { font-size: 10.5pt; }
</style></head><body>
<h1>${data.name}</h1><p class="positioning">${esc(data.positioning)}</p>
<p class="contact">Karachi, Pakistan · Email: <a href="mailto:urwahsiddiqui6@gmail.com">urwahsiddiqui6@gmail.com</a><br>
LinkedIn: <a href="https://www.linkedin.com/in/urwah-siddiqui">linkedin.com/in/urwah-siddiqui</a> · GitHub: <a href="https://github.com/UrwahSiddiqui">github.com/UrwahSiddiqui</a></p>
<h2>Professional Summary</h2><p>${esc(data.summary)}</p>
<h2>Technical Skills</h2><div class="skills">${data.skills.map(s => `<p><strong>${esc(s.group)}:</strong> ${esc(s.text)}</p>`).join('')}</div>
<h2>Professional Experience</h2><p class="entry-title">${esc(data.experience.role)} · ${data.experience.employer}<br><span class="date">${data.experience.dates} · ${data.experience.location}</span></p>
${bullets([...data.experience.highlights, ...data.experience.details])}
<h2>Selected Projects</h2>${data.projects.map(p => `<div class="entry"><p class="entry-title">${esc(p.name)} <span class="date">| ${p.dates}</span></p>${p.id === 'offline-payments' ? '<p><strong>Team project · Backend, application security &amp; DevSecOps contribution</strong></p>' : ''}<p>${esc(p.description)}</p></div>`).join('')}
<h2>Education</h2><p><strong>${data.education.degree}</strong> · ${data.education.dates} · CGPA: ${data.education.cgpa}<br>${esc(data.education.institution)}</p>
<h2>Selected Achievements</h2>${bullets(data.achievements)}
<h2>Certifications and Training</h2><div class="training"><p><strong>Completed:</strong> ${esc(data.training.completed)}</p><p><strong>Job simulations:</strong> ${esc(data.training.simulations)}</p><p><strong>In progress:</strong> ${data.training.inProgress}</p></div>
</body></html>`;
await fs.mkdir('resume', { recursive: true });
await fs.mkdir('public/documents', { recursive: true });
await fs.writeFile('resume/Urwah-Siddiqui-Resume.html', html);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.resolve('resume/Urwah-Siddiqui-Resume.html')).href);
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: 'public/documents/Urwah-Siddiqui-Resume.pdf', format: 'A4', preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, tagged: true });
  console.log('Generated public/documents/Urwah-Siddiqui-Resume.pdf');
} finally { await browser.close(); }
