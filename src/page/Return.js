import React from 'react';

const Return = ({ translations, currentLang }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Main Title */}
            <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">

                {translations[currentLang].returnpage.title}
            </h1>

            {/* Policy Content Container */}
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Section Title */}
                <h2 className="text-2xl font-bold text-blue-900">
                    {translations[currentLang].returnpage.sectitle}
                </h2>

                {/* Main Policy Description */}
                <p className="text-gray-800 leading-relaxed">
                {translations[currentLang].returnpage.content1}
                </p>

                {/* Eligibility Section */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                    {translations[currentLang].returnpage.content2}
                    </h3>

                    {/* Eligibility List */}
                    <ul className="space-y-3 text-gray-800">
                        <li className="flex items-start">
                            <div className="h-2 w-2 mt-2 mr-2 rounded-full bg-blue-900 flex-shrink-0"></div>
                            <span>{translations[currentLang].returnpage.content3}</span></li>
                        <li className="flex items-start">
                            <div className="h-2 w-2 mt-2 mr-2 rounded-full bg-blue-900 flex-shrink-0"></div>
                            <span>{translations[currentLang].returnpage.content4}</span>
                        </li>
                        <li className="flex items-start">
                            <div className="h-2 w-2 mt-2 mr-2 rounded-full bg-blue-900 flex-shrink-0"></div>
                            <span>{translations[currentLang].returnpage.content5}</span></li>
                        <li className="flex items-start">
                            <div className="h-2 w-2 mt-2 mr-2 rounded-full bg-blue-900 flex-shrink-0"></div>
                            <span>{translations[currentLang].returnpage.content6}</span></li>
                        <li className="flex items-start">
                            <div className="h-2 w-2 mt-2 mr-2 rounded-full bg-blue-900 flex-shrink-0"></div>
                            <span>{translations[currentLang].returnpage.content7}</span>
                        </li>
                        <li className="flex items-start">
                            <div className="h-2 w-2 mt-2 mr-2 rounded-full bg-blue-900 flex-shrink-0"></div>
                            <span>{translations[currentLang].returnpage.content8}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Return;