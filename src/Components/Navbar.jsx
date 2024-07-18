import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex sticky top-0 justify-around bg-indigo-900 text-white py-6'>
        <div className="logo">
            <span className='font-bold text-2xl mx-8'>iTask</span>
        </div>
        <ul className='flex gap-8 mx-12'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
