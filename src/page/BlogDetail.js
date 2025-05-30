import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = ({ translations, currentLang, blogPosts }) => {
    const { id } = useParams();
    const post = blogPosts.find(post => post.id === parseInt(id));

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
                    <Link to="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <Link to="/blog" className="text-blue-600 hover:underline mb-8 block">
                    ← Back to Blog
                </Link>
                
                <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full"
                    />
                    
                    <div className="p-8">
                        <div className="flex items-center text-gray-600 text-sm mb-4">
                            <span>{post.date}</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime}</span>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 mb-6">
                            {post.title}
                        </h1>

                        <div className="prose max-w-none">
                            {post.content.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t">
                            <div className="flex items-center">
                                <div>
                                    <p className="font-semibold text-gray-900">{post.author}</p>
                                    <p className="text-gray-600">{post.authorRole}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogDetail;
