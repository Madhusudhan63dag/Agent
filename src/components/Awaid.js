import one from '../assets/awaid/t_one.svg';
import two from '../assets/awaid/t_two.svg'
import three from '../assets/awaid/t_three.svg'
import four from '../assets/awaid/t_four.png'
import five from '../assets/awaid/hala.png'
import six from '../assets/awaid/t_six.png'
import seven from '../assets/awaid/t_seven.avif'

export default function AwardsSection() {
    const awards = [
        {
            title: "GMP Certified",
            image: six,
            description: "Good Manufacturing Practice Certified"
        },
        {
            title: "ISO 9001:2015",
            image: three,
            description: "Quality Management System"
        },
        {
            title: "Made in India",
            image: one,
            description: "100% Natural Ingredients and Made in India"
        },
        {
            title: "No Side Effects",
            image: two,
            description: "You can trust us",
        },
        {
            title: "Ayush Certified",
            image: four,
            description: "Premium Quality Products",
            customSize: true // Add this flag for FSSAI certificate
        },
        {
            title: "Cruelty Free",
            image: seven,
            description: "Not tested on animals"
        }
    ];

    // Double the awards array for seamless infinite scroll
    const slideContent = [...awards, ...awards];

    return (
        <>
            <style>
                {`
                    @keyframes slide {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }

                    .animate-slide {
                        animation: slide 30s linear infinite;
                        display: flex;
                        width: fit-content;
                    }

                    .animate-slide:hover {
                        animation-play-state: paused;
                    }
                `}
            </style>
            <div className="py-16 overflow-hidden">
                <h2 className="text-3xl md:text-5xl text-center mb-16 font-bold text-[#2A6177]">
                    Awards & Certifications
                </h2>

                <div className="relative w-full">
                    <div className="flex animate-slide">
                        {slideContent.map((award, index) => (
                            <div
                                key={index}
                                className="flex-none w-[300px] mx-4 bg-white rounded-xl p-6 text-center"
                                style={{ animation: 'none' }}
                            >
                                <div className={`mx-auto mb-4 relative ${award.customSize ? 'w-20 h-20 mb-10' : 'w-24 h-24'}`}>
                                    <img
                                        src={award.image}
                                        alt={award.title}
                                        layout="responsive"
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-[#2A6177] mb-2">{award.title}</h3>
                                <p className="text-gray-600">{award.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
