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
import { Button } from "@/components/button";
import { PassLenghtSlider } from "@/components/pass-lenght-slider";

export const GeneratePasswordContainer = () => {
  const [password, setPassword] = useState<string>("");
  const [passLength, setPassLength] = useState<number>(10);
  const [strength, setStrength] = useState<ScoreRangeT>(0);
  const [passError, setPassError] = useState("");
  const [showCopiedConfirmation, setShowCopiedConfirmation] = useState(false);
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

  useEffect(() => {
    if (showCopiedConfirmation) {
      const timeout = setTimeout(() => {
        setShowCopiedConfirmation(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [showCopiedConfirmation]);

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
    <div className="flex w-full max-w-[21.438rem] flex-col items-stretch gap-4 px-4 font-bold sm:mt-[1rem] sm:max-w-[36rem] md:mt-[6rem]">
      <h1 className="text-body-xs text-center text-customGreyBlue sm:text-heading-m">
        Password Generator
      </h1>
      <div className="flex h-[4rem] w-full items-center justify-between bg-customDarkGrey p-4 sm:mt-6 sm:h-[5rem] sm:p-8">
        <p
          className={`text-heading-m font-normal ${password === "" && "opacity-25"} sm:text-heading-l`}
        >
          {password === "" ? "P4$5W0rD!" : password}
        </p>
        <div className="flex items-center gap-2">
          <p aria-live="polite"> {showCopiedConfirmation && "Copied!"}</p>
          <button
            onClick={() => {
              handleCopyItem(password);
              setShowCopiedConfirmation(true);
            }}
          >
            <IconCopy />
          </button>
        </div>
      </div>
      <form
        noValidate
        onSubmit={handleGeneratePassword}
        className="flex w-full flex-col items-center justify-between gap-5 bg-customDarkGrey px-4 pb-4 pt-5 sm:px-8 sm:pb-10 sm:pt-7"
      >
        <PassLenghtSlider
          passLength={passLength}
          handlePasswordLengthChange={handlePasswordLengthChange}
        />
        <fieldset className="flex w-full flex-col gap-3 py-3 sm:mt-2 sm:gap-5">
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
        <div className="flex w-full flex-col gap-4 sm:gap-8">
          <div className="sm:text-body-s flex h-[3.625rem] w-full items-center justify-center bg-customBlack px-4 sm:h-[4.5rem]">
            {passError ? (
              <p
                aria-live="polite"
                className="text-body-xxs text-center text-customRed"
              >
                {passError}
              </p>
            ) : (
              <PasswordStrengthIndicator strength={strength} />
            )}
          </div>
          <Button type="submit" label="Generate" hasIcon />
        </div>
      </form>
    </div>
  );
};
