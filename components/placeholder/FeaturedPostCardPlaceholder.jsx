import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedPostCardPlaceHolder = () => (
  <div className="relative h-72">
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72 shimmerBG" />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white mb-4 text-shadow font-semibold text-xs">MMM DD, YYYY</p>
      <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center"> Title</p>
      <div className="flex items-center absolute bottom-5 w-full justify-center">
        <Image
          unoptimized
          alt='placeholder'
          height="30px"
          width="30px"
          className="align-middle drop-shadow-lg rounded-full"
          src='https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'
        />
        <p className="inline align-middle text-white text-shadow ml-2 font-medium">Name</p>
      </div>
    </div>
  </div>
);

export default FeaturedPostCardPlaceHolder;
