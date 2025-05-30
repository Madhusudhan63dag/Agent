import React from 'react';

const Privacy = ({ translations, currentLang }) => {
    ;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center text-blue-900 mb-12">{translations[currentLang].privacy.title}</h1>

            <div className="space-y-8">
                {translations[currentLang].sections.map((section, index) => (
                    <section key={index} className="space-y-4">
                        <h2 className="text-xl font-bold text-blue-900">
                            {section.title}
                        </h2>

                        {section.content.map((item, itemIndex) => (
                            <div key={itemIndex} className="space-y-2">
                                {item.subtitle && (
                                    <h3 className="font-semibold text-gray-800">
                                        {item.subtitle}
                                    </h3>
                                )}
                                <p className="text-gray-700 leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Privacy;