import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <div className="flex items-center">
        <FiAlertCircle className="text-red-500 mr-2" />
        <span className="text-red-700">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;