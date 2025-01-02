import { MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { useState, useEffect } from 'react';

export default function BackToTopButton() {
    const [backToTop, setBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setBackToTop(true);
            }else{
                setBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return(
        <>
            {backToTop && (
                <button className='fixed bottom-8 right-8 h-10 w-10 bg-lilac flex justify-center items-center rounded-full z-50 hover:bg-purple-700' 
                 onClick={scrollUp}
                >
                    <MdKeyboardDoubleArrowUp className='size-5 text-white hover:animate-bounce'/>
                </button>
            )}
        </>
    )
}