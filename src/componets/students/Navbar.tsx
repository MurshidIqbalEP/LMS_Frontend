function Navbar() {
    return (
      <div className="mt-2 mb-1 w-screen h-[45px] border-t-2 border-b-2 border-gray-300 flex items-center justify-between px-4">
        {/* Logo Section */}
        <div> 
          <img src="/logo.png" alt="LOGO" className="h-full w-[137px] cursor-pointer" />
        </div>
  
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-12">
          <a href="#" className="text-gray-500 hover:text-black">Home</a>
          <a href="#" className="text-gray-500 hover:text-black">Cources</a>
          <a href="#" className="text-gray-500 hover:text-black">MyCources</a>
        </nav>
  
        {/* Actions Section */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-500 hover:text-black">LogOut</a>
          <a href="#" className="text-gray-500 hover:text-black">Logo</a>
        </div>
      </div>
    );
  }
  
  export default Navbar;
  