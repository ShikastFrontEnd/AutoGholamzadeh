const ColorRadioOption = ({ id, label, selectedOption, handleChange }) => (
    <div className="flex justify-evenly">
      <input
        className="form-check-input ml-2"
        type="radio"
        name="flexRadioDefault"
        id={id}
        checked={selectedOption === id}
        onChange={handleChange}
      />
      <label className="form-check-label ml-2" htmlFor={id}>
        {label}
      </label>
    </div>
  );
export default ColorRadioOption