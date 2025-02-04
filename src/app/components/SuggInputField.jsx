
const SuggInputField = ({ placeholder, iconClass,value,onChange,error,label }) => (
    <>
    <div className="relative z-10 ">
    {label && <label dir="rtl" className="PEYDA-BOLD text-nowrap  block text-sm font-medium text-gholamzadeh-color mb-1  backdrop-blur-sm">{label}</label>}
      <input
        dir="rtl"
        type="text"
        className="w-full rounded-lg border focus:outline-none focus:ring-0.5 focus:ring-gholamzadeh-color focus:border-gholamzadeh-color transition duration-150 ease-in-out border-gray-300 text-black  p-4 pe-12 text-sm shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span className="absolute inset-y-0 pt-6 start-0 grid place-content-center justify-center items-center px-4">
      <i className={`bi pt-2 ${iconClass} text-gholamzadeh-color text-2xl`}></i>
    </span>
    </div>
    <div className="w-full  z-30"><h6 className="text-red-600 w-full text-center h-full">{error}</h6></div>
    </>
  );

  export default SuggInputField