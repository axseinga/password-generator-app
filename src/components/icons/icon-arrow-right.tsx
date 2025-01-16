type IconProps = {
  color?: string;
  title?: string;
};

export const IconArrowRight = ({ color = "#24232C", title }: IconProps) => {
  return (
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      {title && <title>{title}</title>}
      <path
        fill={color}
        d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
        className="duration-300 group-hover:fill-customGreen"
      />
    </svg>
  );
};
