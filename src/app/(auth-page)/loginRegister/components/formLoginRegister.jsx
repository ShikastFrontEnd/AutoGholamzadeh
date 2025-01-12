import inputLoginRegister from './inputLoginRegister';
// import { cookies } from "next/headers"; // Ensure you import cookies if you need it

export default function formLoginRegister({ onSubmit }) {
    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log(cookies.get('')); // Access cookies if needed
        if (onSubmit) {
            await onSubmit(); // Call the onSubmit prop if provided
        }
    };

    const getNumb = (e) => {
        console.log(`key changed ${e.target.value}`);
    };

    return (
        <>
            <div className="mt-5">
                <form onSubmit={submitHandler}> {/* Attach submitHandler to the form */}
                    <div className="grid gap-y-4">
                        <div>
                            <label htmlFor="text" className="block text-sm font-bold ml-1 mb-2 dark:text-white">شماره موبایل مورد نظر</label>
                            <div className="relative">
                                <input 
                                    onChange={getNumb} 
                                    type="text" 
                                    id="text" 
                                    name="text" 
                                    className="py-3 px-4 block w-full border-2 dark:text-black dars rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" 
                                    required
                                    aria-describedby="email-error" 
                                />
                            </div>
                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">لطفاً یک آدرس ایمیل معتبر وارد کنید تا بتوانیم با شما تماس بگیریم</p>
                        </div>
                        <button 
                            type="submit" 
                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        >
                            ورود
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}