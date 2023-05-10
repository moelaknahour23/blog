import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { PostDetail, Comments, CommentsForm, Loader } from '../../components';
import { getPosts, getPostDetails } from '../../services';
import { AdjacentPosts } from '../../sections';

const PostDetails = ({ post }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Loader />;
	}

	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name='description' content={post.excerpt} />
				<meta name='keywords' content={post.tags} />
			</Head>
			<div className='flex-1  mt-28 container mx-auto px-10 mb-8'>
				{/* <div className='lg:col-span-12 col-span-1 hidden lg:block'>
					<div className='lg:sticky relative top-120 z-10'>
						<Categories categoryType='TopCategory' />
					</div>
				</div> */}
				<div className='grid grid-cols-[repeat(auto-fit,_16.666666%)] m-auto px-0 lg:px-24 max-w-6xl justify-center bg-slate-500"'>
					<div className='col-span-1 lg:col-span-8'>
						<PostDetail post={post} />
						{/* <Author author={post.author} /> */}
						<AdjacentPosts
							slug={post.slug}
							createdAt={post.createdAt}
						/>
						<CommentsForm slug={post.slug} />
						<Comments slug={post.slug} />
					</div>
					{/* <div className='col-span-1 lg:col-span-4'>
						<div className='relative lg:sticky top-8'>
							<PostWidget
								slug={post.slug}
								categories={post.categories.map(
									(category) => category.slug
								)}
							/>
						</div>
					</div> */}
				</div>
			</div>
		</>
	);
};
export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
	const data = await getPostDetails(params.slug);
	return {
		props: {
			post: data,
		},
	};
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
	const posts = await getPosts();
	return {
		paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
		fallback: true,
	};
}
