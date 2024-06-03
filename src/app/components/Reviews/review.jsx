import React from 'react';

const ReviewCard = ({ workshopName, reviewText, author, platform }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8 max-w-4xl mx-auto">
      <p className="italic text-gray-500 mb-2">"{reviewText}"</p>
      <p className="text-sm text-gray-600 mb-2">{platform}</p>
      <p className="font-semibold">{author}</p>
      <p className="text-xs text-gray-600">{workshopName}</p>
    </div>
  );
};

export default ReviewCard;
