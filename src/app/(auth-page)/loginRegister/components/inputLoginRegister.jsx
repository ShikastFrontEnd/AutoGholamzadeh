


export default function inputLoginRegister({getnumb}) {
    return ( <>
    
    <input onChange={getnumb} type="text" id="text" name="text" className="  py-3 px-4 block w-full border-2 dars rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm " required aria-describedby="phone-error"></input>
    </> );
}