import { PASSWORD_STRENGTH_LABELS } from "@/utils/consts";

type PasswordStrengthIndicatorProps = {
  strength: number;
};

export const PasswordStrengthIndicator = ({
  strength,
}: PasswordStrengthIndicatorProps) => {
  const getColor = (passStrenght: number) => {
    switch (passStrenght) {
      case 1:
        return "bg-customRed";
      case 2:
        return "bg-customOrange";
      case 3:
        return "bg-customYellow";
      case 4:
        return "bg-customGreen";
      case 0:
      default:
        return "";
    }
  };

  return (
    <div className="flex w-full items-center justify-between bg-customBlack uppercase">
      <p className="text-customGreyBlue">Strength</p>
      <div
        aria-live="polite"
        id="password-strength"
        className="flex items-center gap-2"
      >
        {strength
          ? PASSWORD_STRENGTH_LABELS[
              strength as keyof typeof PASSWORD_STRENGTH_LABELS
            ]
          : ""}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`${index}_strength`}
            className={`h-[28px] w-[10px] ${index < strength && getColor(strength)} ${index >= strength && "border-2 border-customLightGrey"}`}
          />
        ))}
      </div>
    </div>
  );
};
