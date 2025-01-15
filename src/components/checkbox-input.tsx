import { CheckboxesStateT } from "@/types";

type CheckboxInputProps = {
  label: string;
  id: string;
  isChecked: boolean;
  setCheckbox: React.Dispatch<React.SetStateAction<CheckboxesStateT>>;
};

export const CheckboxInput = ({
  label,
  id,
  isChecked,
  setCheckbox,
}: CheckboxInputProps) => {
  const handleChange = (value: boolean) => {
    setCheckbox((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={isChecked}
        onChange={() => handleChange(!isChecked)}
      />
    </div>
  );
};
