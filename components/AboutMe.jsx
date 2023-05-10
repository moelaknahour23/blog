import React, { useState } from 'react';

const AboutMe = () => {
	const [expanded, setExpanded] = useState(false);
	return (
		<div id= "about-me" className='card max-w-full py-4 px-8 bg-white shadow-lg rounded-lg'>
			<div className='flex justify-center md:justify-end -mt-16'>
			<a
					href='https://www.linkedin.com/in/mohammad-laknahour-24279b109/'
					className='text-xl font-medium text-indigo-500'
					target='_blank'
				>
				<img
					className='w-20 h-20 object-cover rounded-full border-2'
					src='https://media.licdn.com/dms/image/C5603AQHr0hFfYgTIRw/profile-displayphoto-shrink_200_200/0/1532195424475?e=1681948800&v=beta&t=9mS__zHs3vOPBQ9LmOskjIJJ2YBBpFmmIREj2dpY-l4'
				/>
			</a>
			</div>
			<div>
				<h2 className='text-gray-800 text-3xl font-semibold'>
					About Me
				</h2>
				<p className='mt-2 text-gray-600 text-left'>
					Hello! My name is <a
					href='https://www.linkedin.com/in/mohammad-laknahour-24279b109/'
					className='text-xl font-medium text-indigo-500'
					target='_blank'
				>  Mohammad Laknahour</a> and I am a software
					engineer at American Express. I have always been fascinated
					with the fast-paced and constantly evolving world of
					technology. I am constantly on the lookout for new and
					innovative developments in the field and I find immense joy
					in researching and learning about these advancements.
				</p>
				<p className='mt-2 text-gray-600 text-left'>
					In my free time, I enjoy sharing my insights and findings
					with others through writing and speaking engagements. I am
					passionate about spreading my knowledge and helping others
					to stay up-to-date with the latest technology trends.
					{!expanded && (<a
					className='read'
						href='#'
						onClick={(e) => {
							e.preventDefault();
							setExpanded(true);
						}}
					>
						...Read More
					</a>
					)}
				</p>
				{expanded && (
					<p className='mt-2 text-gray-600 text-left'>
						Overall, I am a driven and dedicated individual who is
						always eager to learn and grow in the field of software
						engineering. If you're interested in technology and
						software development, I would love to connect and hear
						your thoughts and ideas!
						<a
						className='read'
						href='#'
						onClick={(e) => {
							e.preventDefault();
							setExpanded(false);
						}}
					>
						Read Less...
					</a>
					</p>
				)}
			</div>
		</div>
	);
};

export default AboutMe;
