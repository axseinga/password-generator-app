import { ScoreRangeT } from "@/types";

export const calculatePasswordStrength = (
  password: string,
  criteriaChecks: boolean[],
): ScoreRangeT => {
  let strengthScore = criteriaChecks.length;

  if (password.length <= 5) {
    strengthScore = 1;
  } else if (password.length < 10) {
    strengthScore = Math.max(strengthScore - 1, 1);
  }

  strengthScore = Math.min(Math.max(strengthScore, 1), 5);

  return strengthScore as ScoreRangeT;
};
