export const Button = ({
  type = "primary",
  size = "md",

  outline = false,
  loading = false,
  buttonType = "submit",
  disabled = false,
  children,
  ...props
}) => {
  const typeClass = outline ? `btn-outline btn-${type}` : `btn-${type}`;
  const sizeClass = `btn-${size}`;

  return (
    <button
      disabled={loading || disabled}
      className={`btn btn-${type} ${typeClass} ${sizeClass} btn-block`}
      type={buttonType}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
