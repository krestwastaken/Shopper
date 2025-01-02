import React from 'react'
import { v4 } from 'uuid'

import Title from '../company-name/Title'
import BackToTopButton from '../Scroll-to-top/BackToTopButton'

export default function Footer() {
    const section = [
        {
            title: "ABOUT US",
            items: ["About us", "Store location", "Contact", "Orders tracking"],
        },
        {
            title: "USEFUL LINKS",
            items: ["Returns", "Support Policy", "Size guide", "FAQs"],
        },
        {
            title: "FOLLOW US",
            items: ["Facebook", "Twitter", "Instagram", "YouTube"],
        },
    ];

    return (
        <footer className='w-full bg-light-gray py-8 px-8 md:py-8 md:px-4'>
            <div className='max-w-4xl mx-auto grid grid-cols-5 md:grid-cols-3 md:gap-y-6 sm:grid-colos-1 sm:gap-y-6'>

                {/*Company Info*/}
                <div className='flex flex-col justify-center md:justify-start'>
                    <Title/>
                    <p className='text-gray-500 text-xs sm:mt-1'>© 2024 WeSell.</p>
                    <p className='text-gray-500 text-xs' >All Rights Reserved</p>
                </div>

                {/* Footer Links */}
                {section.map((sect) => (
                    <div key={v4()} className='space-y-3 '>
                        <h4 className='font-medium text-xs'>{ sect.title }</h4>
                        <ul>
                            {sect.items.map((item) => (
                                <li key={v4()}
                                 className='mt-4 text-gray-500 hover:text-lilac cursor-pointer transition-all duration-300 ease-in-out text-xs'
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Subscribe Section */}
                <div className='md:col-span-2 '>
                    <h4 className='font-medium text-xs'>SUBSCRIBE</h4>
                    <p className='mt-3 text-xs'>
                        Get E-mail updates about our latest shop and special offers.
                    </p>
                    <input type='email'
                     placeholder='Enter your email here...'
                     className='w-full block bg-inherit focus:outline-none py-2 border-b-2 md:text-sm sm:text-sm' 
                    />
                    <input type='submit'
                     value={"SUBSCRIBE"}
                     className='mt-2 border-b-2 border-gray-400 hover:text-lilac cursor-pointer hover:border-lilac transition-all duration-300 ease-in-out text-xs' 
                    />
                </div>
            </div>
            <BackToTopButton/>
        </footer>
    );
}
