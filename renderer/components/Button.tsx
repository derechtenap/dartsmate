type Props = {
  action: () => void;
  children: React.ReactNode;
  color?: string;
  outline?: boolean;
  size?: string;
  styles?: string;
};

const Button = ({
  action,
  children,
  color,
  outline = false,
  size,
  styles,
  ...attributes
}: Props) => {
  const c = color ? `btn-${color}` : "";
  const s = size ? `btn-${size}` : "";
  const o = outline ? `btn-outline` : "";

  return (
    <button
      className={`btn ${c} ${s} ${o} ${styles}`}
      onClick={action}
      type="button"
      {...attributes}
    >
      {children}
    </button>
  );
};

export default Button;
