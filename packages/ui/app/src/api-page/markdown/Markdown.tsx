import classNames from "classnames";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export declare namespace Markdown {
    export interface Props {
        children: string;
        className?: string;
    }
}

const REMARK_PLUGINS = [remarkGfm];
const REHYPE_PLUGINS = [rehypeRaw];

export const Markdown: React.FC<Markdown.Props> = ({ children, className }) => {
    return (
        <ReactMarkdown
            className={classNames(
                className,
                "prose prose-sm dark:prose-invert prose-code:before:content-none prose-code:after:content-none prose-code:bg-slate-700 prose-code:py-px prose-code:px-1 prose-code:rounded max-w-none"
            )}
            remarkPlugins={REMARK_PLUGINS}
            rehypePlugins={REHYPE_PLUGINS}
            components={{
                h2: () => {
                    return <div>hi</div>;
                },
            }}
        >
            {children}
        </ReactMarkdown>
    );
};
