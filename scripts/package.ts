import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SKILLS_DIR = "plugins/team-skills/skills";
const DIST = join(process.cwd(), "dist");

// claude.ai rejects any other frontmatter key
const ALLOWED_KEYS = new Set([
  "name",
  "description",
  "license",
  "allowed-tools",
  "compatibility",
  "metadata",
]);

/** Read the top-level keys of a skill's frontmatter. */
function frontmatter(text: string): Map<string, string> {
  const block = text.match(/^---\n([\s\S]*?)\n---/);
  if (!block) throw new Error("frontmatter must start on the first line");

  const fields = new Map<string, string>();

  for (const line of block[1].split("\n")) {
    const field = line.match(/^([a-z-]+):\s*(.*)$/);
    if (field) fields.set(field[1], field[2].replace(/^["']|["']$/g, ""));
  }

  return fields;
}

/** List what would block a claude.ai upload. */
function check(skill: string): string[] {
  const fields = frontmatter(
    readFileSync(join(SKILLS_DIR, skill, "SKILL.md"), "utf8"),
  );
  const name = fields.get("name") ?? "";
  const description = fields.get("description") ?? "";
  const problems: string[] = [];

  if (name !== skill)
    problems.push(`name "${name}" must match the folder name`);
  if (name.length > 64) problems.push("name is over 64 characters");
  if (!description) problems.push("description is missing");
  if (description.length > 200)
    problems.push(`description is ${description.length} characters (max 200)`);

  for (const key of fields.keys()) {
    if (!ALLOWED_KEYS.has(key))
      problems.push(`key "${key}" is not allowed on claude.ai`);
  }

  return problems;
}

mkdirSync(DIST, { recursive: true });

const skills = readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

let failed = false;

for (const skill of skills) {
  const problems = check(skill);

  if (problems.length > 0) {
    failed = true;
    console.error(`✗ ${skill}\n  ${problems.join("\n  ")}`);
    continue;
  }

  // the skill folder is the zip root; -FS drops files that no longer exist
  const zip = Bun.spawnSync(
    [
      "zip",
      "-r",
      "-q",
      "-FS",
      join(DIST, `${skill}.zip`),
      skill,
      "-x",
      "*.DS_Store",
    ],
    { cwd: SKILLS_DIR },
  );

  if (zip.exitCode !== 0) {
    failed = true;
    console.error(`✗ ${skill}: zip failed\n${zip.stderr.toString()}`);
    continue;
  }

  console.log(`✓ ${skill} → dist/${skill}.zip`);
}

process.exit(failed ? 1 : 0);
