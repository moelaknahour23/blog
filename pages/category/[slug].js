import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getCategories, getCategoryPost } from '../../services';
import { Loader } from '../../components';
import PaginatedItems from '../../components/PaginatedItems';

const CategoryPost = ({ posts, params }) => {
	const router = useRouter();
	if (router.isFallback) {
		return <Loader />;
	}
	function formatString(str) {
		return str
			.replace(/-/g, ' ')
			.replace(/(^|\s)([a-z])/g, function (match, group1, group2) {
				return group1 + group2.toUpperCase();
			});
	}

	return (
		<>
			<Head>
				<title>{formatString(params.slug)}</title>
				<meta name='description' content={formatString(params.slug)} />
				<meta
					name='keywords'
					content={`${formatString(params.slug)}, ${posts
						.map((obj) => `${obj.node.title}`)
						.join(', ')}`}
				/>
			</Head>

			<div className='flex-1 mx-auto py-10 px-10 mt-24 xl:mt-28 blog-container xl:mb-8'>
				{/* <div className='lg:col-span-12 col-span-1 hidden md:block'>
				<div className='lg:sticky relative top-120 z-10'>
					<Categories categoryType='TopCategory' />
				</div>
			</div> */}
				<div className='flex'>
					<h1 className='font-bold text-3xl mb-4 font-bold border-indigo-500'>
						<span className='border-b-4 cat-name'>Category:</span>
						<span className='pl-2 text-2xl'>
							{formatString(params.slug)}
						</span>
					</h1>
				</div>
				<div className='grid grid-cols-[repeat(auto-fit,_16.666666%)] m-auto px-0 max-w-6xl justify-center bg-slate-500"'>
					<div className='w-full col-span-2 justify-center justify-self-center mx-auto bg-slate-900 text-center text-lg'>
						<PaginatedItems
							itemsPerPage={3}
							postedItems={posts}
							catName={params.slug}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
	const posts = await getCategoryPost(params.slug);

	return {
		props: { posts, params },
	};
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
	const categories = await getCategories();

	return {
		paths: categories.map(({ slug }) => ({ params: { slug } })),
		fallback: true,
	};
}
