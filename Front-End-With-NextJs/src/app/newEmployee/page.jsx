'use client';

import { useRouter } from 'next/navigation'
import React, { useState } from 'react';

export default function NewEmployee() {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");


    const SaveNewEmployee = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        const formData = new FormData(event.target);

        try {
            const response = await fetch('http://localhost:8080/api/v1/employee/saveEmployee', {
                method: 'POST',
                body: JSON.stringify({
                    empName: formData.get('fullName'),
                    empDepartment: formData.get('department'),
                    empSalary: formData.get('salary'),
                    empTele: formData.get('floating_phone')
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to create account');
            }

            if (responseData.code == '00') {
                
                // Assuming toast is properly imported and set up
                setErrorMessage.success('Signed up successfully!');
                setTimeout(function () {
                    router.push('/employeeList');
                }, 2400);
    
            } else {
                throw new Error(responseData.error || 'Unknown error occurred');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            // Assuming toast is properly imported and set up
            // toast.error(error.message || 'An unexpected error occurred');
            setErrorMessage(error.message || 'An unexpected error occurred');
        }
    }


  return (
    <div>
        <div>
        <h4 className="text-2xl text-center text-rose-700 my-1.5">Register New Employee</h4>
    </div>
    <hr className="border-t-2 border-yellow-200 mx-32 " />

    <div className="mt-20">


        <form className="max-w-md mx-auto" onSubmit={SaveNewEmployee}>
            {/* <!--  Name --> */}
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="fullName" id="fullName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="fullName"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full
                    Name
                </label>
            </div>
            {/* <!-- department --> */}
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="department" id="department"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="department"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department</label>
            </div>
            {/* <!-- salary --> */}
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="salary" id="salary"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="salary"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Salary</label>
            </div>

            {/* <!-- telephone --> */}
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" name="floating_phone" id="floating_phone"
                        className="block py-2.5 p>x-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " required />
                    <label for="floating_phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone
                        number (123-456-7890)</label>
                </div>

            </div>
            <button type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

        <div className="flex justify-center mt-10">
            {errorMessage && <p className='text-red-600 text-sm'>{errorMessage}</p>}
        </div>
        

    </div>
    </div>
  )
}
