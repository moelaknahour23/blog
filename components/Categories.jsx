import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

const Categories = ({ categoryType }) => {
  const [categories, setCategories] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
      setDataLoaded(true)
    });
  }, []);

  return (
    <>
      {categoryType === 'TopCategory' &&
        <div className="p-8 pb-6">
          <div className='categoryItem_container'>
          <div className='category_items'>
                <Link href={`/blog`}>
                  <span className={`cursor-pointer block category_name_items pb-3 mb-3 ellipsis `}>All categories</span>
                </Link>
          </div>
            {categories.map((category, index) => (
              <div className='category_items'>
                <Link key={index} href={`/category/${category.slug}`}>
                  <span className={`cursor-pointer block category_name_items pb-3 mb-3 ellipsis `}>{category.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      }

      {categoryType === 'SideCategory' &&
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
          <div>
            {categories.map((category, index) => (
              <div className='category_items'>
                <Link key={index} href={`/category/${category.slug}`}>
                  <span className={`cursor-pointer block sidebar_category_name_items pb-3 mb-3`}>{category.name}</span>
                </Link>
                <div />
              </div>
            ))}
          </div>
        </div>

      }

    </>
  );
};

export default Categories;
