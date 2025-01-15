import { useEffect, useState } from "react";
import { IconCopy } from "./components/icons/icon-copy";
import { CheckboxInput } from "./components/checkbox-input";
import { CheckboxesStateT, ScoreRangeT } from "./types";
import { filterObjForTrueValues } from "./utils/filter-obj-for-true";

const App = () => {
  const [password, setPassword] = useState<string>("");
  const [passLength, setPassLength] = useState<number>(10);
  const [checkboxes, setCheckboxes] = useState<CheckboxesStateT>({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [strength, setStrength] = useState<ScoreRangeT | null>(null);
  const [error, setError] = useState<boolean>(false);


  useEffect(() => {
    const positiveChecks = filterObjForTrueValues(checkboxes);
    if (positiveChecks.length !== 0) {
      setError(false);
    }
  }, [checkboxes]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const strengthVolume = {
    0: "",
    1: "Too Weak!",
    2: "Weak",
    3: "Medium",
    4: "Strong",
  };

  const calculateStrength = (pass: string): ScoreRangeT => {
    let score = 0;
    const positiveChecks = Object.values(checkboxes).filter((value) => value);
    score += positiveChecks.length - 1;

    if (pass.length <= 5) {
      score = 1;
    } else if (pass.length < 10) {
      score = Math.max(score - 1, 1);
    }

    score = Math.min(Math.max(score, 1), 4);

    return score as ScoreRangeT;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassLength(Number(e.target.value));
  };

  const handleGeneratePass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const positiveChecks = Object.values(checkboxes).filter((value) => value);
    if (positiveChecks.length === 0) {
      setError(true);
      return "";
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

    return pass;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const pass = handleGeneratePass(e);
    const score = calculateStrength(pass);
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
            min="1"
            max="20"
            id="passLenghtInput"
            step="1"
            value={passLength}
            onChange={handleChange}
          />
          <div>
            <fieldset>
              <CheckboxInput
                label="Include Uppercase Letters"
                id="uppercase"
                isChecked={checkboxes.uppercase}
                setCheckbox={setCheckboxes}
              />
              <CheckboxInput
                label="Include Lowercase Letters"
                id="lowercase"
                isChecked={checkboxes.lowercase}
                setCheckbox={setCheckboxes}
              />
              <CheckboxInput
                label="Include Numbers"
                id="numbers"
                isChecked={checkboxes.numbers}
                setCheckbox={setCheckboxes}
              />
              <CheckboxInput
                label="Include Symbols"
                id="symbols"
                isChecked={checkboxes.symbols}
                setCheckbox={setCheckboxes}
              />
            </fieldset>
          </div>
          <div aria-live="polite">
            {error ? (
              <p>Please select at list one checkbox</p>
            ) : (
              <>
                {" "}
                <p>Strength</p>
                <div>
                  {strength &&
                    strengthVolume[
                      (strength - 1) as keyof typeof strengthVolume
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

export default App;
