import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { grpahCMSImageLoader } from '../util';
import { getTopApplication } from '../services';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const TopFiveAIAppWidget = () => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
	
  useEffect(() => {
    getTopApplication().then((result) => {
        setRelatedPosts(result);
        setDataLoaded(true);
      }); 
  }, []);

  return (
<>
      <div className="card shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Top Applications</h3>
      {relatedPosts.map((post, index) =>

        (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
          <Link href={`${post.node.link}`} key={index}>
            <a target='_blank'>
            <Image
              loader={grpahCMSImageLoader}
              alt={post.node.title}
              height="60px"
              width="60px"
              unoptimized
              className="align-middle rounded-full"
              src={post.node.appImage.url}
            />
            </a>
            </Link>
          </div>
          <div className="flex-grow ml-4">
            <Link href={`${post.node.link}`} className="text-md" key={index}><a className='text-xl' target='_blank'>{post.node.title}</a></Link>
            <div><Link href={`post/${post.node.slug}`} className="text-md" key={index}><a>   
              <div className="rounded-lg py-2 readMore duration-300 font-bold">Read More <HiOutlineArrowNarrowRight  className='arrowBtn' /></div></a></Link></div>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default TopFiveAIAppWidget;
