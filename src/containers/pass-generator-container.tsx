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
    <div>
      <div>
        <p>{password}</p>
        <button onClick={() => handleCopyItem(password)}>
          <IconCopy />
        </button>
      </div>
      <div>
        <form noValidate onSubmit={handleGeneratePassword}>
          <p> Character Length</p>
          <p>{passLength}</p>
          <input
            type="range"
            min="0"
            max="20"
            id="passLenghtInput"
            step="1"
            value={passLength}
            onChange={handlePasswordLengthChange}
          />
          <div>
            <fieldset>
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
          </div>
          <div>
            {passError ? (
              <p aria-live="polite">{passError}</p>
            ) : (
              <PasswordStrengthIndicator strength={strength} />
            )}
          </div>
          <button type="submit">Generate</button>
        </form>
      </div>
    </div>
  );
};
