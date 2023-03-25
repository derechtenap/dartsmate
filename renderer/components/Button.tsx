type Props = {
  action: () => void;
  children: React.ReactNode;
  color?: string;
  outline?: boolean;
  size?: string;
};

const Button = ({ action, children, color, outline = false, size }: Props) => {
  const c = color ? `btn-${color}` : "";
  const s = size ? `btn-${size}` : "";
  const o = outline ? `btn-outline` : "";

  return (
    <button className={`btn ${c} ${s} ${o}`} onClick={action} type="button">
      {children}
    </button>
  );
};

export default Button;
