const SelectField = ({ label, options, placeholder, value, onChange,error }) => {
  return (
    <>
    <div className="relative text-black">
      {label && <label className="block text-sm font-medium text-lucano-color mb-1  backdrop-blur-sm">{label}</label>}
      <select
        className="form-select block w-full mt-1 py-3 rounded-lg"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    <div className="w-full  z-30"><h6 className="text-red-600 w-full text-center h-full">{error}</h6></div>
    </>
  );
}; 
export default SelectField