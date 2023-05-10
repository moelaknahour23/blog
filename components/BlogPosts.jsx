import React from 'react';
import { PostCard } from '../components';


const  BlogPosts = ({ currentItems })=> {

    return (
      <>
        		{currentItems &&
                currentItems.map((post, index) => (
						<PostCard key={index} post={post.node} />
					))}
      </>
    );
  }

  export default BlogPosts;


