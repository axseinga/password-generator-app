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
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={isChecked}
        onChange={() => handleCheckboxChange(id, !isChecked)}
      />
    </div>
  );
};
