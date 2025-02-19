import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import classNames from "classnames";
import { PropsWithChildren, useMemo } from "react";
import { useCopyToClipboard } from "./useCopyToClipboard";

export declare namespace TitledExample {
    export type Props = PropsWithChildren<{
        title: string;
        titleRightContent?: JSX.Element;
        actions?: JSX.Element;
        className?: string;
        copyableExample: unknown;
    }>;
}

export const TitledExample: React.FC<TitledExample.Props> = ({
    title,
    titleRightContent,
    className,
    actions,
    copyableExample,
    children,
}) => {
    const exampleAsString = useMemo(
        () => (typeof copyableExample === "string" ? copyableExample : JSON.stringify(copyableExample, undefined, 2)),
        [copyableExample]
    );
    const { copyToClipboard, wasJustCopied } = useCopyToClipboard(exampleAsString);

    return (
        <div
            className={classNames(
                "flex flex-col basis-full min-h-0 rounded-xl border border-[#252529] overflow-hidden",
                className
            )}
        >
            <div className="flex items-center justify-between pl-3 pr-2 py-1 bg-[#969CEE]/30">
                <div className="flex items-center gap-2">
                    <div className="font-bold uppercase text-[#A7A7B0]">{title}</div>
                    {titleRightContent}
                </div>
                <div className="flex gap-2">
                    {actions}
                    <Button
                        minimal
                        icon={wasJustCopied ? IconNames.TICK : IconNames.CLIPBOARD}
                        text="Copy"
                        onClick={copyToClipboard}
                    />
                </div>
            </div>
            <div className="flex flex-1 min-h-0">{children}</div>
        </div>
    );
};
