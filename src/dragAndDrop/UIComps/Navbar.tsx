import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-3 bg-white w-full pb-10 border-beige">
    <div className="text-xl font-bold text-primary">
      Drag and drop
    </div>
    <div className="hidden md:flex items-center gap-6">
      <a href="#" className="text-gray hover:text-primary transition">Home</a>
      <a href="#" className="text-gray hover:text-primary transition">About</a>
      <a href="#" className="text-gray hover:text-primary transition">Services</a>
      <a href="#" className="text-gray hover:text-primary transition">Contact</a>
    </div>
    <button className="btn btn-primary hover:opacity-80 border-0">
      Sign Up
    </button>
  </nav>
    </div>
  )
}

export default Navbar