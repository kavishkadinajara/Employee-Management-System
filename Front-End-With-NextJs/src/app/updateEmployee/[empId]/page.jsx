'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

export default function UpdateEmployeePage({ params }) {

    const [employee, setEmployee] = useState(null); // Change to single employee
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = () => {
        fetch(`http://localhost:8080/api/v1/employee/searchById/${params.empId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.content) {
                    setEmployee(data.content); // Store single employee
                } else {
                    setError("Failed to load employee: " + (data.message || "Unknown error"));
                }
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }; 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch('http://localhost:8080/api/v1/employee/updateEmployees', {
                method: 'PUT',
                body: JSON.stringify({
                    empId : params.empId,
                    empName: employee.empName,
                    empDepartment: employee.empDepartment,
                    empSalary: employee.empSalary,
                    empTele: employee.empTele
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
                setError("Employee updated successfully!");
                // Assuming you have some way to handle success, such as redirecting
                setTimeout(function () {
                    router.push('/employeeList');
                }, 2400);
    
            } else {
                throw new Error(responseData.error || 'Unknown error occurred');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setError(error.message || 'An unexpected error occurred');
        }
    };

    return (
        <div>
            <h4 className="text-2xl text-center text-rose-700 my-1.5">Update Employee</h4>
            <hr className="border-t-2 border-yellow-200 mx-32 " />
            <div className="mt-20" key={employee.empId}>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="empName"
                            id='empName'
                            value={employee.empName} // Change to fullName
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="empName"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Full Name
                        </label>
                    </div>
                    {/* Department */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="empDepartment"
                            id='empDepartment'
                            value={employee.empDepartment}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="empDepartment"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Department
                        </label>
                    </div>
                    {/* Salary */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="empSalary"
                            id='empSalary'
                            value={employee.empSalary}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="empSalary"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Salary
                        </label>
                    </div>
                    {/* Telephone */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="tel"
                            name="empTele"
                            id='empTele'
                            value={employee.empTele}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="empTele"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Phone number (123-456-7890)
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
