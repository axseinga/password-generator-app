import { CheckboxesStateT } from "@/types";
import {
  UPPERCASE_LETTERS,
  LOWERCASE_LETTERS,
  NUMBERS,
  SPECIAL_CHARACTERS,
} from "./consts";

export const handleGeneratePass = (
  e: React.FormEvent<HTMLFormElement>,
  passwordLenght: number,
  checkboxes: CheckboxesStateT,
): { generatedPassword: string; error: string } => {
  e.preventDefault();

  let generatedPassword = "";

  if (passwordLenght === 0) {
    return { generatedPassword, error: "Please select password length" };
  }

  const positiveChecks = Object.values(checkboxes).filter((value) => value);
  if (positiveChecks.length === 0) {
    return { generatedPassword, error: "Please select at list one checkbox" };
  }

  let characterSet = "";
  if (checkboxes.uppercase) characterSet += UPPERCASE_LETTERS;
  if (checkboxes.lowercase) characterSet += LOWERCASE_LETTERS;
  if (checkboxes.numbers) characterSet += NUMBERS;
  if (checkboxes.symbols) characterSet += SPECIAL_CHARACTERS;

  for (let i = 0; i < passwordLenght; i++) {
    generatedPassword +=
      characterSet[Math.floor(Math.random() * characterSet.length)];
  }

  return { generatedPassword, error: "" };
};
