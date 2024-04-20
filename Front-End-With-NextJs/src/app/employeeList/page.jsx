'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [empId, setEmpId] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        fetch('http://localhost:8080/api/v1/employee/findAllEmployees')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.content) {
                    setEmployees(data.content);
                } else {
                    setError("Failed to load employees: " + (data.message || "Unknown error"));
                }
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleChange = (event) => {
        setEmpId(event.target.value);
        fetchEmployees();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getEmployeeById();
    };

    const getEmployeeById = () => {
        fetch(`http://localhost:8080/api/v1/employee/searchById/${empId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.content) {
                    setEmployees([data.content]); // Wrap single employee in an array
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

    return (
        <div>
            <div>
                <h4 className="text-2xl text-center text-rose-700 my-1.5">Employee List</h4>
            </div>
            <hr className="border-t-2 border-yellow-200 mx-32" />

            <div className="mt-10 flex justify-center">
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            min="1"
                            id="empId"
                            value={empId}
                            onChange={handleChange}
                            className="rounded-full text-2xl py-2.5 px-7 text-blue-500 border border-pink-900 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#000315] via-[#001515] to-black text-center"
                        />
                        <button
                            type="submit"
                            className="text-yellow-200 text-xl bg-gradient-to-r from-purple-500 to-pink-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full px-8 py-2.5 text-center me-2"
                        >
                            Search By Id
                        </button>
                    </div>
                </form>
            </div>

            <div className="my-14">
                <div className="grid grid-cols-3 gap-y-6 gap-x-6 mx-8">
                    {employees.map(employee => (
                        <div key={employee.empId} className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#000315] via-[#001515] to-black p-6 ps-16 ">
                            <div className="grid gap-y-2.5">
                                <div>
                                    <label htmlFor="name" className="text-cyan-400">Name: {employee.empName}</label>
                                </div>
                                <div>
                                    <label htmlFor="department" className="text-cyan-400">Department: {employee.empDepartment}</label>
                                </div>
                                <div>
                                    <label htmlFor="salary" className="text-cyan-400">Salary: {employee.empSalary}</label>
                                </div>
                                <div>
                                    <label htmlFor="telephone" className="text-cyan-400">Telephone: {employee.empTele}</label>
                                </div>
                            </div>
                            <div className="grid justify-end">
                                <Link href={`/updateEmployee/${employee.empId}`} className="text-yellow-200 text-m font-thin bg-gradient-to-r from-purple-500 to-pink-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-full px-8 py-2.5 text-center justify-end">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
