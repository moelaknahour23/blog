import React from 'react';

const Footer = () => {
	return (
		<footer className='flex items-center p-4 py-6 justify-center footer flex-col space-y-6'>
				{/* <div className='pl-4'>Logo</div> */}
				<div>
					© 2023 Copyright:{' '}
					<a href='https://ITekClub.com/'>ITekClub</a>
				</div>
			{/* <div className='pr-4'>
				<SocialMediaIcons />
			</div> */}
		</footer>
	);
};

export default Footer;
