const FormInput = ({
  type,
  label,
  placeholder,
  name,
  error,
  errorText,
  className,
}) => {
  return (
    <label className="form-control w-full mb-2">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered   ${error} ${className} `}
        name={name}
      />
      {errorText && (
        <div className="label">
          <span className="label-text-alt text-red-500 italic ">
            {errorText}
          </span>
        </div>
      )}
    </label>
  );
};

export default FormInput;
