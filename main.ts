import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The entry: one sentence making a small everyday moment strange and new.
// The last sip of tea is mostly leaves — bitter, certain — and the cup
// turns out to have been honest from the first pour, the way only old
// friends save the hard part for last. The twist lands in the final
// clause: the cup is reframed as a friend, and the bitterness becomes
// the proof of its honesty.
// 194 Unicode code points, inside the 1-200 gate. Deterministic: the
// sentence is a constant, so every run writes byte-identical output.
const TEXT =
  "The last sip of tea is mostly leaves, bitter and certain, and I drink it anyway because the cup has been honest with me from the first pour, the way only old friends tell you the hard part last.";

// Fail closed: never write a text the gate would refuse (1-200 code
// points, exactly one sentence, not only whitespace). The count is in
// Unicode code points, not bytes and not UTF-16 units.
const points = [...TEXT].length;
if (points < 1 || points > 200 || /^\s*$/.test(TEXT)) {
  throw new Error(`entry text is ${points} code points, outside the 1-200 gate`);
}
if ((TEXT.match(/\./g) || []).length !== 1 || !TEXT.endsWith(".")) {
  throw new Error("entry text must be exactly one sentence");
}

const out = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");
mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, "entry.txt"), TEXT, "utf8");
