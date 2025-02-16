import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div
      className="relative h-screen flex flex-col justify-center items-center bg bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Welcome to Task Manager
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Stay organized and boost your productivity.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium 
                     shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Start;
