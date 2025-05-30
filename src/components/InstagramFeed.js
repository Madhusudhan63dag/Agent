import React from 'react';
import product1 from '../assets/card1.jpeg';
import product2 from '../assets/card2.png';
import product3 from '../assets/card3.jpeg';
import product4 from '../assets/card4.jpeg';

const InstagramFeed = () => {
    const posts = [
        {
            id: 1,
            image: product1,
            link: 'https://www.instagram.com/p/CtJ2ZQ2Mv2_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
            caption: 'Experience natural pain relief with Dr. Joints Oil #DrJoints #NaturalHealing'
        },
        {
            id: 2,
            image: product2,
            link: 'https://www.instagram.com/p/DEZwNxBS4m9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
            caption: 'Pure Ayurvedic ingredients for your wellness #Ayurveda'
        },
        {
            id: 3,
            image: product3,
            link: 'https://www.instagram.com/p/CteRsdQvPRi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
            caption: 'Fast-acting formula for muscle & joint pain #PainRelief'
        },
        {
            id: 4,
            image: product4,
            link: 'https://www.instagram.com/p/CtN6EuALgbF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
            caption: 'Your daily companion for pain-free life #Wellness'
        }
    ];

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Follow Us on Instagram
                    </h2>
                    <p className="text-gray-600 text-lg">@drjointsofficial</p>
                </div>

                {/* Instagram Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {posts.map((post) => (
                        <a 
                            key={post.id}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="group relative overflow-hidden rounded-xl aspect-square hover:shadow-xl transition-all duration-300"
                        >
                            <img 
                                src={post.image}
                                alt={post.caption}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <p className="text-sm line-clamp-2">{post.caption}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Instagram Widget */}
                <div className="flex justify-center mb-12">
                    <iframe
                        src="https://www.instagram.com/drjointsofficial/embed"
                        className="w-full max-w-xl h-[600px] border-none rounded-xl shadow-lg"
                        title="Instagram Feed"
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Follow Button */}
                <div className="text-center">
                    <a
                        href="https://www.instagram.com/drjointsofficial/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 
                                 text-white px-8 py-4 rounded-full hover:shadow-lg hover:scale-105 
                                 transition-all duration-300 font-medium text-lg"
                    >
                        <span className="text-2xl">📸</span>
                        Follow @drjointsofficial
                        <span className="animate-bounce">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InstagramFeed;
