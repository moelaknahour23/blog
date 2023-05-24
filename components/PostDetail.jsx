import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import moment from 'moment';
import { RxDividerVertical } from 'react-icons/rx';

const PostDetail = ({ post }) => {
	const bulletedList = [];
	const numberedList = [];
	const codeString = '(num) => num + 1';

	const getContentFragment = (index, text, obj, type) => {
		let modifiedText = text;
		if (obj) {
			if (obj.bold) {
				modifiedText = <b key={index}>{text}</b>;
			}

			if (obj.italic) {
				modifiedText = <em key={index}>{text}</em>;
			}

			if (obj.underline) {
				modifiedText = <u key={index}>{text}</u>;
			}
		}
		switch (type) {
			case 'heading-three':
				return (
					<h3 key={index} className='text-xl font-semibold mb-4'>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h3>
				);
			case 'paragraph':
				return (
					<p key={index} className='mb-8 post-text'>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</p>
				);
			case 'heading-four':
				return (
					<h4 key={index} className='text-md font-semibold mb-4'>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h4>
				);
			case 'code-block':
				return (
					<div className='ml-8 bg-gray-800 rounded-lg'>
						<div className='grid'>
							{modifiedText.map((item, i) => (
								<SyntaxHighlighter
									language='javascript'
									key={i}
								>
									{item}
								</SyntaxHighlighter>
							))}
						</div>
					</div>
				);
			case 'image':
				return (
					<img
						key={index}
						alt={obj.title}
						height={obj.height}
						width={obj.width}
						src={obj.src}
					/>
				);

			case 'bulleted-list':
			case 'numbered-list':
				bulletedList.splice(0, bulletedList.length);
				numberedList.splice(0, numberedList.length);

				obj.children.map((item) => {
					if (item.type === 'list-item') {
						item.children.forEach((child) => {
							if (child.type === 'list-item-child') {
								child.children.forEach((child) => {
									type === 'bulleted-list' &&
										bulletedList.push(child.text);
									type === 'numbered-list' &&
										numberedList.push(child.text);
								});
							}
						});
					}
				});

				if (type === 'bulleted-list') {
					return (
						<ul
							key={index}
							className='mb-8 ml-8 post-text list-disc'
						>
							{bulletedList.map((item, i) => (
								<li className='mb-4' key={i}>
									{item}
								</li>
							))}
						</ul>
					);
				}
				if (type === 'numbered-list') {
					return (
						<ol
							key={index}
							className='mb-8 ml-8 post-text list-decimal'
						>
							{numberedList.map((item, i) => (
								<li className='mb-4' key={i}>
									{item}
								</li>
							))}
						</ol>
					);
				}

			default:
				return modifiedText;
		}
	};

	return (
		<>
			<div className='post-card shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
				<div className='relative overflow-hidden shadow-md mb-6'>
					<img
						src={post.featuredImage.url}
						alt=''
						className='object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg'
					/>
				</div>
				<div className='px-4 lg:px-0'>
					<div className='flex flex-row items-center pb-4'>
						<div className='flex items-center'>
							<img
								alt={post.author.name}
								height='30px'
								width='30px'
								className='align-middle rounded-full'
								src={post.author.photo.url}
							/>
							<p className='inline align-middle ml-2'>
								{post.author.name}
							</p>
						</div>
						<div className='flex items-center'>
							<RxDividerVertical size={24} />
						</div>
						<div className='flex lg:mb-0 lg:w-auto mr-8 items-center'>
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
					<h1 className='mb-8 font-semibold postTitle-Card'>
						{post.title}
					</h1>
					{post.content.raw.children.map((typeObj, index) => {
						const children = typeObj.children.map(
							(item, itemindex) =>
								getContentFragment(itemindex, item.text, item)
						);

						return getContentFragment(
							index,
							children,
							typeObj,
							typeObj.type
						);
					})}
				</div>
			</div>
		</>
	);
};

export default PostDetail;
