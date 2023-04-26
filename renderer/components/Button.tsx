type Props = {
  action: () => void;
  children: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "ghost"
    | "link";
  outline?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  styles?: string;
};

const Button = ({
  action,
  children,
  color,
  outline = false,
  size = "md",
  styles,
  ...attributes
}: Props) => {
  const c = color ? `btn-${color}` : "";
  const s = size ? `btn-${size}` : "";
  const o = outline ? "btn-outline" : "";

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
