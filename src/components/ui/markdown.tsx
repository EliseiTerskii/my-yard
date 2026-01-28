import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const Markdown = ({content}: { content: string }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
        >
            {content}
        </ReactMarkdown>
    );
};