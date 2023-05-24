import React from 'react';
import Head from 'next/head';
import { getPosts } from '../services';
import PaginatedItems from '../components/PaginatedItems';

export default function Blog({ posts }) {
	return (
		<>
			<Head>
				<title>Blog Posts</title>
				<meta
					name='description'
					content='Stay up-to-date with the latest trends in AI, tech business ideas, web development. Our blog covers everything from the latest programming languages to the top AI applications. Learn something new and stay ahead of the curve with our informative and engaging articles.'
				/>
				<meta name='keywords' content='Blog Posts, posts' />
			</Head>
			<div className='flex-1 mx-auto py-10 px-10 mt-24 xl:mt-28 blog-container xl:mb-8'>
				<div className='flex'>
					<h1 className='font-bold text-3xl mb-4 font-bold border-b-4 border-indigo-500 header-section'>
						Blog Posts
					</h1>
				</div>
				{/* <div className='lg:col-span-12 col-span-1 hidden md:block'>
				<div className='lg:sticky relative top-120 z-10'>
					<Categories categoryType='TopCategory' />
				</div>
			</div> */}
				<div className='grid grid-cols-[repeat(auto-fit,_16.666666%)] m-auto px-0  max-w-6xl justify-center bg-slate-500"'>
					<div className='w-full col-span-2 justify-center justify-self-center mx-auto bg-slate-900 text-center text-lg'>
						<PaginatedItems
							itemsPerPage={3}
							postedItems={posts.slice().reverse()}
						/>
					</div>
					{/* <div className='lg:col-span-4 col-span-1'>
					<div className='lg:sticky relative top-8'>
						<PostWidget />
					</div>
				</div> */}
				</div>
			</div>
		</>
	);
}

// Fetch data at build time
export async function getStaticProps() {
	const posts = (await getPosts()) || [];
	return {
		props: { posts },
	};
}
