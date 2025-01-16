type PassLenghtSliderProps = {
  passLength: number;
  handlePasswordLengthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PassLenghtSlider = ({
  passLength,
  handlePasswordLengthChange,
}: PassLenghtSliderProps) => {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <label htmlFor="passLenghtInput" className="sm:text-body-s font-normal">
          Character Length
        </label>
        <p
          className="text-heading-m text-customGreen sm:text-heading-l"
          ara-live="polite"
        >
          {passLength}
        </p>
      </div>
      <input
        type="range"
        min="0"
        max="20"
        id="passLenghtInput"
        step="1"
        value={passLength}
        onChange={handlePasswordLengthChange}
        className="h-2 w-full cursor-pointer appearance-none bg-transparent accent-customLightGrey transition-all [&::-moz-range-thumb]:h-[28px] [&::-moz-range-thumb]:w-[28px] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-customLightGrey [&::-moz-range-thumb]:bg-customLightGrey hover:[&::-moz-range-thumb]:border-customGreen hover:[&::-moz-range-thumb]:bg-customBlack [&::-webkit-slider-thumb]:h-[28px] [&::-webkit-slider-thumb]:w-[28px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-customLightGrey hover:[&::-webkit-slider-thumb]:bg-customBlack hover:[&::-webkit-slider-thumb]:shadow-[0_0_0_2px_#A4FFAF]"
        style={{
          background: `linear-gradient(to right, #A4FFAF ${(passLength / 20) * 100}%, #18171F ${(passLength / 20) * 100}%)`,
        }}
      />
    </>
  );
};
