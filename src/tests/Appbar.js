import "tailwindcss/tailwind.css";

function AppBar() {
  return (
    <nav className="bg-blue-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <p className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppBar;
