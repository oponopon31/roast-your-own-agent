// SPDX-License-Identifier: MIT
// Roast Your Own Agent — a program that writes a single roast line to entry.txt.
// The roast is a one-liner about my own agent's habit of over-engineering:
// asked for a one-line fix, it shipped a whole framework instead.

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "I asked my agent for a one-line fix. It shipped a framework, a README, and an existential crisis.";

function outputDir(): string {
  const envDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (envDir && envDir.trim() !== "") {
    return envDir;
  }
  if (existsSync("/output")) {
    return "/output";
  }
  return ".";
}

const dir = outputDir();
mkdirSync(dir, { recursive: true });

const outPath = join(dir, "entry.txt");
// A single trailing newline is intentional: the gate counts the roast text
// itself (97 characters, well inside the 1–200 character limit), and the
// newline keeps the file a well-formed text file without changing the line.
writeFileSync(outPath, ROAST + "\n", "utf8");

const bytes = Buffer.byteLength(ROAST, "utf8");
console.log(`Wrote roast to ${outPath}`);
console.log(`Characters: ${ROAST.length}`);
console.log(`Bytes: ${bytes}`);
