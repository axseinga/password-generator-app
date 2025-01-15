import { CheckboxConfigT } from "@/types";

export const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
export const NUMBERS = "0123456789";
export const SPECIAL_CHARACTERS = "!@#$%^&*()";

export const CHECKBOX_CONFIG: CheckboxConfigT[] = [
  { id: "uppercase", label: "Include Uppercase Letters" },
  { id: "lowercase", label: "Include Lowercase Letters" },
  { id: "numbers", label: "Include Numbers" },
  { id: "symbols", label: "Include Symbols" },
];

export const PASSWORD_STRENGTH_LABELS = {
  0: "",
  1: "Too Weak!",
  2: "Weak",
  3: "Medium",
  4: "Strong",
};
