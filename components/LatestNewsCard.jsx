import React from 'react';

const LatestNewsCard = ({ newsItem }) => {
	return (
		<div className='rounded overflow-hidden shadow-lg post-card'>
			<img
				className='w-full'
				src={newsItem.featuredImage.url}
				alt={newsItem.title}
			/>
			<div className='px-6 py-4'>
				<h1 className='text_dark_mode font-bold text-lg mb-2 text-left'>
					<a
						className='no-underline hover:underline'
						href={newsItem.link}
						target="_blank"

					>
						{newsItem.title}
					</a>
				</h1>
			</div>
		</div>
	);
};

export default LatestNewsCard;
