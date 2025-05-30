import React from 'react';
import { Link } from 'react-router-dom';

const BlogSection = ({ translations, currentLang, blogPosts }) => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Health Insights</h2>
                    <p className="text-gray-600">Stay informed about joint health and natural remedies</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                            <img src={post.image} alt={post.title} className="w-full"/>
                            <div className="p-6">
                                <div className="text-sm text-gray-600 mb-2">{post.date}</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">{post.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                                <Link 
                                    to={`/blog/${post.id}`}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link
                        to="/blog"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View All Articles
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogSection;
