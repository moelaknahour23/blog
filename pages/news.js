import React from 'react';
import Head from 'next/head';
import { getNews } from '../services';

export default function News({ newsies }) {
	return (
		<>
			<Head>
				<title>News</title>
				<meta
					name='description'
					content='Tech news refers to the latest updates, developments, and trends in the world of technology. It covers a wide range of topics, including software, hardware, gadgets, mobile devices, artificial intelligence, internet of things (IoT), and more.'
				/>
				<meta
					name='keywords'
					content='Tech news, Technology updates, Latest tech trends, Software news, Gadgets news, Mobile devices news, Artificial intelligence news,AI news, Cybersecurity news, Internet of things (IoT) news, Computer science news, IT news, Innovation news, Tech industry updates, Digital transformation news, Data analytics news, Social media news.'
				/>
			</Head>
			<div className='flex-1'>
				<div className='mt-24 container px-4 py-10 mx-auto'>
					<div className='mx-auto text-center'>
						<div className='flex '>
							<h1 className='font-bold ml-8 header-section text-3xl flex justify-center font-bold border-b-4 border-indigo-500'>
								News
							</h1>
						</div>

						<section className='w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 mt-10 mb-5'>
							{newsies
								.slice()
								.reverse()
								.map((newsItem) => {
									return (
										<div className='bg-white news-item shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl mx-8 relative'>
											<a
												href={newsItem.node.link}
												target='_blank'
											>
												<img
													src={
														newsItem.node
															.featuredImage.url
													}
													alt='Product'
													className='news-item object-contain rounded-t-xl'
												/>
												<div className='px-4 py-3 news-item'>
													<h1 className='text-lg news-title font-bold text-left'>
														<a
															className='no-underline hover:underline text-black'
															href={
																newsItem.node
																	.link
															}
															target='_blank'
														>
															{
																newsItem.node
																	.title
															}
														</a>
													</h1>
													<main>
														<p className='news-excerpt text-left text-black block pt-4'>
															{
																newsItem.node
																	.excerpt
															}
														</p>
													</main>
												</div>
											</a>
										</div>
									);
								})}
						</section>
					</div>
				</div>
			</div>
		</>
	);
}

// Fetch data at build time
export async function getStaticProps() {
	const newsies = (await getNews()) || [];
	return {
		props: { newsies },
	};
}
