import { useEffect, useState } from "react";
import { IconCopy } from "@/components/icons/icon-copy";
import { CheckboxInput } from "@/components/checkbox-input";
import { CheckboxesStateT, ScoreRangeT } from "@/types";
import { filterObjForTrueValues } from "@/utils/filter-obj-for-true";
import { calculatePasswordStrength } from "@/utils/calculate-pass-strenght";
import { handleGeneratePass } from "@/utils/generate-password";
import { CHECKBOX_CONFIG } from "@/utils/consts";
import { handleCopyItem } from "@/utils/handle-copy-item";
import { PasswordStrengthIndicator } from "@/components/password-strength-indicator";
import { IconArrowRight } from "@/components/icons/icon-arrow-right";

export const GeneratePasswordContainer = () => {
  const [password, setPassword] = useState<string>("");
  const [passLength, setPassLength] = useState<number>(10);
  const [strength, setStrength] = useState<ScoreRangeT>(0);
  const [passError, setPassError] = useState("");
  const [checkboxes, setCheckboxes] = useState<CheckboxesStateT>({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  useEffect(() => {
    const positiveChecks = filterObjForTrueValues(checkboxes);
    if (positiveChecks.length !== 0) {
      setPassError("");
    }
  }, [checkboxes]);

  const handleCheckboxChange = (id: keyof CheckboxesStateT, value: boolean) => {
    setCheckboxes((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordLengthChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassLength(Number(e.target.value));
  };

  const handleGeneratePassword = (e: React.FormEvent<HTMLFormElement>) => {
    const { generatedPassword, error } = handleGeneratePass(
      e,
      passLength,
      checkboxes,
    );
    const positiveChecks = filterObjForTrueValues(checkboxes);
    const score = calculatePasswordStrength(generatedPassword, positiveChecks);
    setPassError(error);
    setPassword(generatedPassword);
    setStrength(score);
  };

  return (
    <div className="flex min-w-[21.438rem] flex-col items-stretch gap-4 font-bold">
      <h1 className="text-body-xs text-center text-customGreyBlue">
        Password Generator
      </h1>
      <div className="flex h-[4rem] w-full items-center justify-between bg-customDarkGrey p-4">
        <p
          className={`text-heading-m font-normal ${password === "" && "opacity-25"}`}
        >
          {password === "" ? "P4$5W0rD!" : password}
        </p>
        <button onClick={() => handleCopyItem(password)}>
          <IconCopy />
        </button>
      </div>
      <form
        noValidate
        onSubmit={handleGeneratePassword}
        className="flex w-full flex-col items-center justify-between gap-5 bg-customDarkGrey px-4 pb-4 pt-5"
      >
        <div className="flex w-full items-center justify-between">
          <label htmlFor="passLenghtInput">Character Length</label>
          <p className="text-customGreen text-heading-m">{passLength}</p>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          id="passLenghtInput"
          step="1"
          value={passLength}
          onChange={handlePasswordLengthChange}
          className="h-2 w-full cursor-pointer appearance-none bg-transparent accent-customLightGrey [&::-webkit-slider-thumb]:h-[28px] [&::-webkit-slider-thumb]:w-[28px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-customLightGrey"
          style={{
            background: `linear-gradient(to right, #A4FFAF ${(passLength / 20) * 100}%, #24232C ${(passLength / 20) * 100}%)`,
          }}
        />
        <fieldset className="flex w-full flex-col gap-3 py-3">
          {CHECKBOX_CONFIG.map(({ id, label }, index) => (
            <CheckboxInput
              key={`${index}-${id}`}
              label={label}
              id={id}
              isChecked={checkboxes[id as keyof CheckboxesStateT]}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </fieldset>
        <div className="flex h-[3.625rem] w-full items-center justify-center bg-customBlack px-4">
          {passError ? (
            <p aria-live="polite" className="text-body-xxs text-center text-customRed">
              {passError}
            </p>
          ) : (
            <PasswordStrengthIndicator strength={strength} />
          )}
        </div>
        <button
          type="submit"
          className="flex h-[3.625rem] w-full items-center justify-center gap-4 bg-customGreen uppercase text-customDarkGrey"
        >
          <p>Generate</p>
          <IconArrowRight />
        </button>
      </form>
    </div>
  );
};
