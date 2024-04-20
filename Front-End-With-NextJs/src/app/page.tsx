import Link from 'next/link';
import { useEffect } from 'react';


export default function Home() {

  return (

    <main className=''>
      <div className="mt-20">
        <div className="grid grid-cols-3 gap-y-4 mb-10">
          <div className="flex justify-center">
            <Link href="/newEmployee" type="button"
              className="text-yellow-200 text-xl bg-gradient-to-r from-purple-500 to-pink-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full px-8 py-5 text-center me-2 mb-2 ">Add
              New Employee</Link>
          </div>
          <div className="flex justify-center">
            <Link href="/employeeList" type="button" replace
              className="text-yellow-200 text-xl bg-gradient-to-r from-purple-500 to-pink-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full px-8 py-5 text-center me-2 mb-2 ">View
              All Employees</Link>
          </div>
          <div className="flex justify-center">
            <Link href="updateEmployee/" type="button"
              className="text-yellow-200 text-xl bg-gradient-to-r from-purple-500 to-pink-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full px-8 py-5 text-center me-2 mb-2 ">Update
              Employee</Link>
          </div>
        </div>
      </div>
    </main>
  );
}