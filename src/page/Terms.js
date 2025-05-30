const TermsAndConditions = ({ currentLang, translations }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">{translations[currentLang].termsData.title}</h1>
            <div className="space-y-6">
                {translations[currentLang].termsData.sections.map((section, index) => (
                    <div key={index} className="border-b pb-4 mb-4">
                        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                        {Array.isArray(section.content) ? (
                            <ul className="list-disc ml-6 space-y-1">
                                {section.content.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-700">{section.content}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TermsAndConditions;