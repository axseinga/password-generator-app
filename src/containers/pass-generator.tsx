import { useEffect, useState } from "react";
import { IconCopy } from "@/components/icons/icon-copy";
import { CheckboxInput } from "@/components/checkbox-input";
import { CheckboxesStateT, ScoreRangeT } from "@/types";
import { filterObjForTrueValues } from "@/utils/filter-obj-for-true";
import { calculatePassStrength } from "@/utils/calculate-pass-strenght";
import { handleGeneratePass } from "@/utils/generate-password";
import { STRENGHT_PASS_LABELS } from "@/utils/consts";

export const GeneratePasswordContainer = () => {
  const [password, setPassword] = useState<string>("");
  const [passLength, setPassLength] = useState<number>(10);
  const [checkboxes, setCheckboxes] = useState<CheckboxesStateT>({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [strength, setStrength] = useState<ScoreRangeT | null>(null);
  const [passError, setPassError] = useState("");

  const checkboxComponents = [
    {
      id: "uppercase",
      value: checkboxes.uppercase,
      label: "Include Uppercase Letters",
    },
    {
      id: "lowercase",
      value: checkboxes.lowercase,
      label: "Include Lowercase Letters",
    },
    { id: "numbers", value: checkboxes.numbers, label: "Include Numbers" },
    { id: "symbols", value: checkboxes.symbols, label: "Include Symbols" },
  ];

  useEffect(() => {
    const positiveChecks = filterObjForTrueValues(checkboxes);
    if (positiveChecks.length !== 0) {
      setPassError("");
    }
  }, [checkboxes]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassLength(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { pass, error } = handleGeneratePass(e, passLength, checkboxes);
    const positiveChecks = filterObjForTrueValues(checkboxes);
    const score = calculatePassStrength(pass, positiveChecks);
    setPassError(error);
    setPassword(pass);
    setStrength(score);
  };

  return (
    <div>
      <div>
        <p>{password}</p>
        <button onClick={handleCopy}>
          <IconCopy />
        </button>
      </div>
      <div>
        <form noValidate onSubmit={handleSubmit}>
          <p> Character Length</p>
          <p>{passLength}</p>
          <input
            type="range"
            min="0"
            max="20"
            id="passLenghtInput"
            step="1"
            value={passLength}
            onChange={handleChange}
          />
          <div>
            <fieldset>
              {checkboxComponents.map((checkbox, index) => (
                <CheckboxInput
                  key={`${index}-${checkbox.id}`}
                  label={checkbox.label}
                  id={checkbox.id}
                  isChecked={checkbox.value}
                  setCheckbox={setCheckboxes}
                />
              ))}
            </fieldset>
          </div>
          <div aria-live="polite">
            {passError ? (
              <p>{passError}</p>
            ) : (
              <>
                <p>Strength</p>
                <div>
                  {strength &&
                    STRENGHT_PASS_LABELS[
                      strength as keyof typeof STRENGHT_PASS_LABELS
                    ]}
                </div>
              </>
            )}
          </div>
          <button type="submit">Generate</button>
        </form>
      </div>
    </div>
  );
};
