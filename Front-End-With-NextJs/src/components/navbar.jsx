import Link from 'next/link'
import React from 'react'

export default function navbar() {
  return (
    <div>
        <div className="flex justify-center">
        <Link href="/"
            className="text-5xl mt-5 mb-5 text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-purple-700 to-red-500 p-5 rounded-xl">
            Employee Management System</Link>
    </div>
    <hr className="border-t-2 border-yellow-200 mx-32 " />
    </div>
  )
}
