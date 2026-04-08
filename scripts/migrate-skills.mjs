// One-time migration script — replaces all skills in Supabase with skills.json.
// Run from the project root:  node scripts/migrate-skills.mjs
//
// Reads credentials from .env.local automatically (no dotenv needed).

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));

// ── Parse .env.local ─────────────────────────────────────────────────────────
const envPath = join(__dir, '../.env.local');
let envText;
try {
  envText = readFileSync(envPath, 'utf8');
} catch {
  console.error('Could not read .env.local — make sure it exists in the project root.');
  process.exit(1);
}

const get = key => envText.match(new RegExp(`^${key}=(.+)`, 'm'))?.[1]?.trim();
const SUPABASE_URL = get('VITE_SUPABASE_URL');
const SUPABASE_KEY = get('VITE_SUPABASE_ANON_KEY');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

// ── Load skills.json ──────────────────────────────────────────────────────────
const skills = JSON.parse(readFileSync(join(__dir, 'skills.json'), 'utf8'));
console.log(`Loaded ${skills.length} skills from skills.json\n`);

// ── Connect ───────────────────────────────────────────────────────────────────
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── 1. Fetch existing rows ────────────────────────────────────────────────────
const { data: existing, error: fetchErr } = await supabase.from('skills').select('id');
if (fetchErr) {
  console.error('Failed to fetch existing skills:', fetchErr.message);
  process.exit(1);
}
console.log(`Found ${existing.length} existing skill(s) — deleting…`);

// ── 2. Delete each existing row (mirrors deleteSkill in db.ts) ────────────────
let deleted = 0;
for (const { id } of existing) {
  const { error } = await supabase.from('skills').delete().eq('id', id);
  if (error) console.warn(`  ⚠ Could not delete ${id}: ${error.message}`);
  else deleted++;
}
console.log(`  ✓ Deleted ${deleted} row(s)\n`);

// ── 3. Insert new skills ──────────────────────────────────────────────────────
console.log('Inserting new skills…');
const { error: insErr } = await supabase.from('skills').insert(skills);
if (insErr) {
  console.error('Insert failed:', insErr.message);
  process.exit(1);
}
console.log(`  ✓ Inserted ${skills.length} skills\n`);
console.log('Migration complete. Refresh /admin/skills to verify.');
