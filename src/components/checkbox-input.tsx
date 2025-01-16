import { CheckboxesStateT } from "@/types";

type CheckboxInputProps = {
  label: string;
  id: keyof CheckboxesStateT;
  isChecked: boolean;
  handleCheckboxChange: (id: keyof CheckboxesStateT, value: boolean) => void;
};

export const CheckboxInput = ({
  label,
  id,
  isChecked,
  handleCheckboxChange,
}: CheckboxInputProps) => {
  return (
    <div className="text-body-xs flex shrink-0 flex-row-reverse items-center justify-end gap-4">
      <label htmlFor={id}>{label}</label>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={isChecked}
        onChange={() => handleCheckboxChange(id, !isChecked)}
        className="peer relative mt-1 h-5 w-5 -translate-y-1 appearance-none border-2 border-customLightGrey bg-contain bg-center bg-no-repeat checked:border-customGreen checked:bg-customGreen checked:bg-[url('./assets/images/icon-check.svg')] transition-all"
      />
    </div>
  );
};
