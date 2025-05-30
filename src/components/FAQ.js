import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border rounded-lg mb-4 overflow-hidden">
            <button
                className="w-full p-4 text-left flex justify-between items-center bg-white hover:bg-gray-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-gray-900">{question}</span>
            </button>
            {isOpen && (
                <div className="p-4 bg-gray-50">
                    <p className="text-gray-700">{answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQ = ({ translations }) => {
    const faqData = translations.en.faq.faqData;

    return (
        <div className='w-screen bg-[#F0E7E5]'>
            <div className="max-w-3xl mx-auto p-6 bg-[#F0E7E5]">
                <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">FAQ's</h1>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;