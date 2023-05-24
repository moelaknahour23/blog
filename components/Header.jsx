import React, { useState, useEffect, Fragment, useRef } from 'react';

import Link from 'next/link';
import { getCategories } from '../services';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { AiOutlineHome } from 'react-icons/ai';
import { FaBlog } from 'react-icons/fa';
import { BsNewspaper, BsArrowUpRight } from 'react-icons/bs';
import SocialMediaIcons from './SocialMediaIcons';
import DarkMode from './DarkMode';
import { useRouter } from 'next/router';
import Logo from './Logo';

const Header = () => {
	const [categories, setCategories] = useState([]);
	const buttonRef = useRef();
	const [darkMode, setDarkMode] = useState();
	const [activeNavItem, setActiveNavItem] = useState('Home');
	const router = useRouter();
	const [dropDown, setDropDown] = useState(false);

	const handleDataChange = (data) => {
		setDarkMode(!data);
	};
	const dropdownRef = useRef(null);
	const parentDropDownRef = useRef(null);

	useEffect(() => {
		getCategories().then((newCategories) => {
			setCategories(newCategories);
		});
	}, []);

	// Navigation menu items
	const navItems = [
		{ item: 'Home', url: '/', id: 1, icon: AiOutlineHome },
		{ item: 'Blog', url: '/blog', id: 2, icon: FaBlog },
		{ item: 'News', url: '/news', id: 3, icon: BsNewspaper },
	];

	// Function to handle click on a navigation item
	const handleNavItemClick = (navItem) => {
		if (navItem !== activeNavItem) {
			setActiveNavItem(navItem);
		}
	};
	// Set active navigation item when page loads
	useEffect(() => {
		const pathname = router.pathname;
		const activeNavItem = navItems.find(
			(navItem) => pathname === navItem.url
		);
		setActiveNavItem(activeNavItem?.item);
	}, [router.pathname]);

	useEffect(() => {
		const handleArrowKeys = (event) => {
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				setDropDown(true);
				const firstOption = dropdownRef.current?.querySelector('a');
				if (firstOption) {
					firstOption.focus();
				}
			}
			if (event.key === 'ArrowUp') {
				event.preventDefault();
				setDropDown(false);
				const parentElement = parentDropDownRef.current;
				if (parentElement) {
					parentElement.focus();
				}
			}
		};

		parentDropDownRef.current.addEventListener('keydown', handleArrowKeys);
		return () => {
			parentDropDownRef.current.removeEventListener(
				'keydown',
				handleArrowKeys
			);
		};
	}, []);

	return (
		<Popover>
			<div className='navigation-mode nav w-full flex items-center px-8 py-2 mb-8 border-b  navigation dark:bg-gray-900/70 dark:border-gray-700 fixed w-full top-0 left-0 z-30 '>
				<div className='w-full flex justify-between items-center'>
					<Logo />
					<div className='grow'>
						<ul className='navItems hidden md:flex items-center justify-end gap-2 md:gap-8 '>
							{navItems.map(
								({ item, url, id, icon: Icon, label }) => (
									<li key={item}>
										<Link href={url}>
											<a
												className={`${
													activeNavItem === item
														? 'active'
														: ''
												} flex items-center navItems px-2`}
												onClick={() =>
													handleNavItemClick(item)
												}
											>
												{item}
											</a>
										</Link>
										{/* <span className='pl-2 text-2xl'><Icon /></span> */}
									</li>
								)
							)}
							<li
								className='relative parentDropDown'
								ref={parentDropDownRef}
							>
								<span
									aria-label='category Dropdown'
									tabIndex={0}
									className='cursor-pointer flex justify-between md:inline-flex p-4 items-center space-x-2'
									onClick={() => setDropDown(!dropDown)}
								>
									<span className='navItems focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2'>
										Categories
									</span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-4 h-4 fill-current pt-1'
										viewBox='0 0 24 24'
									>
										<path d='M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z' />
									</svg>
								</span>
								{dropDown && (
									<ul
										className={` childDropDown transition duration-300 md:absolute top-full right-0 w-72 max-h-96 md:shadow-lg md:rounded-b`}
									>
										{categories.map((category, index) => (
											<li
												className='px-4 flex items-center justify-between category-item'
												onClick={() =>
													setDropDown(false)
												}
											>
												<Link
													key={index}
													href={`/category/${category.slug}`}
												>
													<a className='w-full flex px-1 items-center justify-around py-3 '>
														<span>
															{category.name}
														</span>

														<span>
															<BsArrowUpRight />
														</span>
													</a>
												</Link>
											</li>
										))}
									</ul>
								)}
							</li>

							<DarkMode onDataChange={handleDataChange} />
						</ul>
						<div className='flex grow items-center justify-between md:hidden'>
							<Popover.Button
								className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400
                					hover:bg-gray-100 hover:text-gray-500'
							>
								<span className='sr-only'>Open Menu</span>
								<Bars3Icon
									className='h-6 w-6'
									aria-hidden='true'
								/>
							</Popover.Button>
						</div>
						<Transition
							as={Fragment}
							enter='duration-200 ease-out'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='duration-100 ease-in'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Popover.Panel
								focus
								className='absolute inset-x-0 top-0 origin-top-right transform transition lg:hidden z-20'
							>
								<div className='rounded-lg nav-card shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divde-gray-50'>
									<div className='px-5 pt-5 pb-6 '>
										<div className='flex items-center justify-between border-b pb-4 dark:border-gray-700'>
											<Logo />
											<DarkMode
												onDataChange={handleDataChange}
											/>
											<div className='mr-2'>
												<Popover.Button
													ref={buttonRef}
													className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400
                          hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
												>
													<span className='sr-only'>
														Close Menu
													</span>
													<XMarkIcon
														className='h-6 w-6'
														aria-hidden='true'
													/>
												</Popover.Button>
											</div>
										</div>
										<div className='mt-6'>
											<nav className='grid gap-y-2'>
												<ul>
													{navItems.map(
														({ item, url }) => (
															<li
																key={item}
																className='pb-4'
															>
																<Link
																	href={url}
																>
																	<a
																		className={`${
																			activeNavItem ===
																			item
																				? 'active'
																				: ''
																		} navItems focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2 py-1 ml-4`}
																		onClick={() =>
																			handleNavItemClick(
																				item
																			)
																		}
																	>
																		{item}
																	</a>
																</Link>
																{/* <span className='pl-2 text-2xl'><Icon /></span> */}
															</li>
														)
													)}
													<li
														className='relative parentDropDown pt-1 pb-4'
														ref={parentDropDownRef}
													>
														<span
															aria-label='category Dropdown'
															tabIndex={0}
															className='cursor-pointer flex  md:inline-flex items-center space-x-2'
															onClick={() =>
																setDropDown(
																	!dropDown
																)
															}
														>
															<span className='navItems focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-6'>
																Categories
															</span>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																className='w-4 h-4 fill-current'
																viewBox='0 0 24 24'
															>
																<path d='M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z' />
															</svg>
														</span>
														{dropDown && (
															<ul
																className={`absolute  inline-block w-auto childDropDown transition duration-300 top-full w-72 max-h-96 md:shadow-lg md:rounded-b`}
															>
																{categories.map(
																	(
																		category,
																		index
																	) => (
																		<li className='px-4 flex items-center justify-between category-item '>
																			<Link
																				key={
																					index
																				}
																				href={`/category/${category.slug}`}
																			>
																				<a
																					className='flex px-4 py-3 '
																					onClick={() =>
																						setDropDown(
																							false
																						)
																					}
																				>
																					{
																						category.name
																					}
																				</a>
																			</Link>
																			<span>
																				<BsArrowUpRight />
																			</span>
																		</li>
																	)
																)}
															</ul>
														)}
													</li>
												</ul>
												{/* <h3 className='text-xl font-bold text-gray-400 font-semibold pb-4'>
													Social Media
												</h3> */}
												<div className='flex flex-row h-5 my-2'>
													<div className='md:flex flex-row h-5 pl-4'>
														<SocialMediaIcons />
													</div>
												</div>
											</nav>
										</div>
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</div>
					<div className='hidden md:flex flex-row h-5'>
						<SocialMediaIcons />
					</div>
				</div>
			</div>
		</Popover>
	);
};

export default Header;
