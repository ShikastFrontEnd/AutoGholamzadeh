const SelectField = ({ label, options, placeholder, value, onChange, error }) => {
  return (
    <>
      <div className="relative text-black">
        {label && (
          <label className="block text-sm font-medium text-gholamzadeh-color mb-1 backdrop-blur-sm ">
            {label}
          </label>
        )}
        <select
          className={`form-select block w-full mt-1 py-3 rounded-lg border ${
            error ? 'border-red-600 bg-red-100' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-gholamzadeh-color focus:border-gholamzadeh-color transition duration-150 ease-in-out`}
          value={value}
          onChange={onChange}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              <div className="w-full flex justify-between">
                <div className="w-full">{option.label}</div>
                
              </div>
            </option>
          ))}
        </select>
        {error && (
          <div className="absolute left-0 right-0 mt-1 text-red-600 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default SelectField;