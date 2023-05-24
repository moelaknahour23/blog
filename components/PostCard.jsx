import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { grpahCMSImageLoader } from '../util';
import { RxDividerVertical } from 'react-icons/rx';

const PostCard = ({ post }) => {
	return (
		<div className='card postCard flex shadow-lg rounded-lg p-8 mb-4 items-center justify-center'>
			<div className='flex-none overflow-hidden pa-5 '>
				<img
					src={post.featuredImage.url}
					alt=''
					className='postCard-image object-contain w-full rounded-t-lg lg:rounded-lg'
				/>
			</div>
			<div className='pl-10'>
				<h1 className='transition duration-700 text-left mb-4 cursor-pointer postTitle font-semibold lg:pr-18'>
					<Link href={`/post/${post.slug}`}>{post.title}</Link>
				</h1>
				<div className='flex flex-row items-center pb-4'>
					<div className='flex items-center'>
						<Image
							unoptimized
							loader={grpahCMSImageLoader}
							alt={post.author.name}
							height='30px'
							width='30px'
							className='align-middle rounded-full'
							src={post.author.photo.url}
						/>
						<span className='inline align-middle ml-2'>
							{post.author.name}
						</span>
					</div>
					<div className='flex items-center'>
						<RxDividerVertical size={24} />
					</div>
					<div className='flex lg:mb-0 lg:w-auto mr-8 items-center'>
						<div className=''>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 inline mr-2'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
								/>
							</svg>
							<span className='align-middle'>
								{moment(post.createdAt).format('MMM DD, YYYY')}
							</span>
						</div>
					</div>
				</div>
				<p className='post-text  font-normal pt-2 lg:pr-20 mb-8 text-left'>
					{post.excerpt}
				</p>
			</div>

			{/* <div className="text-center">
                <Link href={`/post/${post.slug}`}>
                  <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block blueColor text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Continue Reading</span>
                </Link>
              </div> */}
		</div>
	);
};

export default PostCard;
