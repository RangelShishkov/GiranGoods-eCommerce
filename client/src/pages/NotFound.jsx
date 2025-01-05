import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-14rem)] bg-gray-100">
      <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
      <p className="mt-4 text-2xl text-gray-600">Oops! Page not found.</p>
      <p className="mt-2 text-gray-500">The page you are looking for might have been removed or is temporarily unavailable.</p>
      <a
        href="/"
        className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFoundPage;