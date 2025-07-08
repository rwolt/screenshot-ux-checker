import React from "react";
import ReactMarkdown from 'react-markdown';

type FeedbackPanelProps = {
  heading: string;
  bodyText: string;
};

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ heading, bodyText }) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4">
      <h2 className="text-3xl mb-8 text-center">{heading}</h2>
      <div className="prose prose-lg max-w-none w-full bg-white rounded-lg p-8 shadow-lg">
        <ReactMarkdown 
          components={{
            h1: ({children}) => <h1 className="text-2xl font-bold mb-4 text-gray-900">{children}</h1>,
            h2: ({children}) => <h2 className="text-xl font-semibold mb-3 text-gray-800 mt-6">{children}</h2>,
            h3: ({children}) => <h3 className="text-lg font-medium mb-2 text-gray-700 mt-4">{children}</h3>,
            p: ({children}) => <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>,
            ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">{children}</ul>,
            ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700">{children}</ol>,
            li: ({children}) => <li className="text-gray-700">{children}</li>,
            strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
            em: ({children}) => <em className="italic text-gray-800">{children}</em>,
            code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{children}</code>,
            blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">{children}</blockquote>,
          }}
        >
          {bodyText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default FeedbackPanel;
