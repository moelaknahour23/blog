import React from 'react';


const PostWidgetPlaceholder = () => {
  const relatedPosts= ['','','']
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Recent Posts</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none shimmerBG from-gray-400 via-gray-700 rounded-full" >
            <div
             style={{width:'60px', height:'60px'}}
              className="align-middle"
            >
            </div>
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">MMM DD, YYYY</p>
            Title
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidgetPlaceholder;
