const SuggSelectField = ({ label, options, placeholder, value, onChange, error, isDisabled }) => {
  // Ensure value is not null or undefined
  const safeValue = value ?? ''; // Use nullish coalescing to handle undefined as well

  return (
    <div className="relative z-10 text-black">
      {label && (
        <label dir="rtl" className="block PEYDA-BOLD text-sm font-medium text-gholamzadeh-color mb-1 backdrop-blur-sm">
          {label}
        </label>
      )}
      <select
        dir="rtl"
        className={`form-select block w-full mt-1 py-3 rounded-lg border ${
          error ? 'border-red-600 bg-red-100' : 'border-gray-300'
        } focus:outline-none focus:ring-0.5 focus:ring-gholamzadeh-color focus:border-gholamzadeh-color transition duration-150 ease-in-out`}
        value={safeValue} // Use the safe value here
        onChange={(e) => onChange(e.target.value)} // Ensure the onChange function receives the correct value
        disabled={isDisabled} // Disable the select field if isDisabled is true
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} {/* Directly use the label here */}
          </option>
        ))}
      </select>
      {error && (
        <div className="w-full  z-30"><h6 className="text-red-600 w-full text-center h-full">{error}</h6></div>
      )}
    </div>
  );
};

export default SuggSelectField;