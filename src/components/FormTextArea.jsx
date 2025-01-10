import React from "react";

function FormTextArea({ label, name }) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-24 textarea-accent"
        placeholder="type here..."
        name={name}
      ></textarea>
    </label>
  );
}

export default FormTextArea;
