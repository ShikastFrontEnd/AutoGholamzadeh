
const PreInputField = ({ placeholder, iconClass,value,onChange,error,label }) => (
    <>
    <div className="relative z-30">
    {label && <label className="block text-sm font-medium text-gholamzadeh-color mb-1  backdrop-blur-sm">{label}</label>}
      <input
        type="text"
        className="w-full rounded-lg text-black border-gray-200 p-4 pe-12 text-sm shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span className="absolute inset-y-0 end-0 grid place-content-center justify-center items-center px-4">
      <i className={`bi pt-2 ${iconClass} text-gholamzadeh-color text-2xl`}></i>
    </span>
    </div>
    <div className="w-full  z-30"><h6 className="text-red-600 w-full text-center h-full">{error}</h6></div>
    </>
  );

  export default PreInputField