import { PASSWORD_STRENGTH_LABELS } from "@/utils/consts";

type PasswordStrengthIndicatorProps = {
  strength: number;
};

export const PasswordStrengthIndicator = ({
  strength,
}: PasswordStrengthIndicatorProps) => {
  return (
    <>
      <p>Strength</p>
      <div aria-live="polite" id="password-strength">
        {strength &&
          PASSWORD_STRENGTH_LABELS[
            strength as keyof typeof PASSWORD_STRENGTH_LABELS
          ]}
      </div>
    </>
  );
};
