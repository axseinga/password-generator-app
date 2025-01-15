import { CheckboxesStateT } from "@/types";

export const handleGeneratePass = (
  e: React.FormEvent<HTMLFormElement>,
  passLength: number,
  checkboxes: CheckboxesStateT,
) => {
  e.preventDefault();

  let error = "";

  if (passLength === 0) {
    return { pass: "", error: "Please select password length" };
  }

  const positiveChecks = Object.values(checkboxes).filter((value) => value);
  if (positiveChecks.length === 0) {
    error = "Please select at list one checkbox";
    return { pass: "", error };
  }

  let selection = "";
  if (checkboxes.uppercase) selection += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (checkboxes.lowercase) selection += "abcdefghijklmnopqrstuvwxyz";
  if (checkboxes.numbers) selection += "0123456789";
  if (checkboxes.symbols) selection += "!@#$%^&*()";

  let pass = "";

  for (let i = 0; i < passLength; i++) {
    pass += selection[Math.floor(Math.random() * selection.length)];
  }

  return { pass, error };
};
