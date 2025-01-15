export type CheckboxesStateT = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export type CheckboxConfigT = { id: keyof CheckboxesStateT; label: string };

export type ScoreRangeT = 0 | 1 | 2 | 3 | 4;
