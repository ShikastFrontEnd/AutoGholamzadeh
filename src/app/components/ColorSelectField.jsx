const ColorSelectField = ({ label, options, placeholder, value, onChange, error }) => {
    return (
        <div className="relative text-black">
            {label && (
                <label className="block text-sm font-medium text-gholamzadeh-color mb-1 backdrop-blur-sm">
                    {label}
                </label>
            )}
            <select
                className={`block w-full mt-1 py-3 px-1 rounded-lg border ${
                    error ? 'border-red-600 bg-red-100' : 'border-gray-300 bg-white'
                } text-gray-700 focus:outline-none focus:ring-2 focus:ring-gholamzadeh-color focus:border-gholamzadeh-color transition duration-150 ease-in-out`}
                value={value}
                onChange={onChange}
            >
                <option value="" disabled className="text-gray-400">
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value} style={{color:`#ffff` , backgroundColor:`${option.colorCode}`}}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <div className="absolute left-0 right-0 mt-1 text-red-600 text-sm text-center">
                    {error}
                </div>
            )}
        </div>
    );
};

export default ColorSelectField;