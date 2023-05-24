import Link from 'next/link';

const Logo = () => {
	return (
		<Link href='/'>
			<a className='logo flex items-center'>
				<img
					className='hidden md:block cursor-pointer'
					src='/images/ai-logo.png'
					height='100'
					width='100'
					alt='Logo'
				/>
				<span>ITekClub</span>
			</a>
		</Link>
	);
};

export default Logo;
