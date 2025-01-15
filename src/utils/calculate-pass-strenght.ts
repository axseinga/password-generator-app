import { ScoreRangeT } from "@/types";
export const calculatePassStrength = (
  pass: string,
  checks: boolean[],
): ScoreRangeT => {
  let score = 0;
  score += checks.length;

  if (pass.length <= 5) {
    score = 1;
  } else if (pass.length < 10) {
    score = Math.max(score - 1, 1);
  }

  score = Math.min(Math.max(score, 1), 5);

  return score as ScoreRangeT;
};
