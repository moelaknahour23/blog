import React from 'react';
import Head from 'next/head';
import { FeaturedPosts, LatestNews } from '../sections/index';
import { getRecentPosts, getRecentNews, getTopApplication } from '../services';
import { PostCard, TopFiveAIAppWidget } from '../components';

export default function Home({ posts, newsies, topApplication }) {
	return (
		<>
			<Head>
				<title>Home Page</title>
				<meta
					name='description'
					content='Stay up-to-date with the latest trends in AI, tech business ideas, web development, and tech news. Our blog covers everything from the latest programming languages to the top AI applications. Learn something new and stay ahead of the curve with our informative and engaging articles.'
				/>
				<meta
					name='keywords'
					content={`AI, Artificial Intelligence, tech business ideas, web development, React, CSS, JS, Javascript,  programming languages, AI applications, tech news, latest trends, informative articles, engaging content, stay up-to-date, learn something new, 
					${topApplication.map((obj) => `${obj.node.title}`).join(', ')}.`}
				/>
			</Head>

			<div className='container mx-auto px-10 mb-8 mt-24 xl:mt-28 blog-container xl:mb-8'>
				<FeaturedPosts />
				<div className='grid grid-cols-1 xl:grid-cols-12 gap-12'>
					<div className='lg:col-span-8 col-span-1'>
						<div className='flex'>
							<h1 className='font-bold text-4xl mb-4 font-bold border-b-4 border-indigo-500 header-section'>
								Latest Posts
							</h1>
						</div>
						{posts
							.slice()
							.reverse()
							.map((post, index) => (
								<PostCard key={index} post={post} />
							))}
					</div>
					<div className='lg:col-span-4 col-span-1'>
						<div className='relative xl:mt-16'>
							<TopFiveAIAppWidget />
						</div>
					</div>
				</div>
				<div>
					<div className='flex'>
						<h1 className='font-bold text-4xl mb-4 font-bold border-b-4 border-indigo-500 header-section'>
							Latest News
						</h1>
					</div>
					<LatestNews />
				</div>
			</div>
		</>
	);
}

// Fetch data at build time
export async function getStaticProps() {
	const posts = (await getRecentPosts()) || [];
	const newsies = (await getRecentNews()) || [];
	const topApplication = (await getTopApplication()) || [];

	return {
		props: { posts, newsies, topApplication },
	};
}
