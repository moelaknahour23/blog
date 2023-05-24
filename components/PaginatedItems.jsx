import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import BlogPosts from './BlogPosts';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useEffect } from 'react';

const PaginatedItems = ({ itemsPerPage, postedItems, catName }) => {
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);
	// Simulate fetching items from another resources.
	// (This could be items from props; or items loaded in a local state
	// from an API endpoint with useEffect and useState)
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = postedItems.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(postedItems.length / itemsPerPage);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % postedItems.length;
		window.scrollTo({ top: 0, behavior: 'smooth' });
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

	useEffect(() => {
		setItemOffset(0);
	}, [catName]);

	return (
		<>
			<BlogPosts currentItems={currentItems} />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					boxSizing: 'border-box',
					width: '100%',
				}}
			>
				{itemsPerPage < postedItems.length && (
					<ReactPaginate
						activeClassName={'item active '}
						breakClassName={'item break-me '}
						breakLabel={'...'}
						containerClassName={'pagination'}
						disabledClassName={'disabled-page'}
						marginPagesDisplayed={2}
						nextClassName={'item next '}
						nextLabel={
							<ArrowForwardIosIcon
								style={{
									color: '#3EBFC8',
									fontSize: 18,
									width: 150,
								}}
							/>
						}
						onPageChange={handlePageClick}
						pageCount={pageCount}
						pageClassName={'item pagination-page '}
						pageRangeDisplayed={2}
						previousClassName={'item previous'}
						previousLabel={
							<ArrowBackIosIcon
								style={{
									color: '#3EBFC8',
									fontSize: 18,
									width: 150,
								}}
							/>
						}
						renderOnZeroPageCount={null}
						pageLinkClassName={'pagination-link'} // Add this line to style the pagination link
					/>
				)}
			</div>
		</>
	);
};

export default PaginatedItems;
