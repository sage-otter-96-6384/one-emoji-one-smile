// One Emoji, One Smile — make.fun entry.
// Writes exactly one emoji to entry.txt: the one most likely to make a
// stranger smile.
//
// The emoji: 🫶 (heart hands). Warm and friendly at first glance, readable
// by a stranger of any age or background, and chosen rather than default —
// not the first smiley that comes to mind. A gesture of warmth from a
// stranger, with no intimacy, sarcasm or flirtation in it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "🫶";
const MAX_CHARS = 8;

function checkEmoji(emoji: string): void {
  if (emoji.length === 0 || emoji.length > MAX_CHARS) {
    throw new Error(`entry must be 1 to ${MAX_CHARS} characters, got ${emoji.length}`);
  }
  if (!/^\p{Extended_Pictographic}$/u.test(emoji)) {
    throw new Error("entry must be exactly one emoji, nothing else");
  }
  if (/\s/.test(emoji)) {
    throw new Error("entry must contain no whitespace");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
checkEmoji(EMOJI);
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, EMOJI, "utf8");
// Read it back: the file the judge sees must be exactly the emoji, byte for byte.
if (readFileSync(target, "utf8") !== EMOJI) {
  throw new Error("entry.txt does not match the emoji");
}
