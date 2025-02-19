import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { assertNever } from "@fern-api/core-utils";
import { useCallback, useMemo } from "react";
import { ResolvedUrlPath } from "../docs-context/url-path-resolver/UrlPathResolver";
import { useDocsContext } from "../docs-context/useDocsContext";

export declare namespace BottomNavigationButton {
    export interface Props {
        path: ResolvedUrlPath;
        direction: "previous" | "next";
    }
}

export const BottomNavigationButton: React.FC<BottomNavigationButton.Props> = ({ path, direction }) => {
    const { navigateToPath } = useDocsContext();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
    const visitDirection = <T extends unknown>({ previous, next }: { previous: T; next: T }): T => {
        switch (direction) {
            case "previous":
                return previous;
            case "next":
                return next;
            default:
                assertNever(direction);
        }
    };

    const iconName = visitDirection({
        previous: IconNames.CHEVRON_LEFT,
        next: IconNames.CHEVRON_RIGHT,
    });
    const iconElement = <Icon icon={iconName} />;

    const onClick = useCallback(() => {
        navigateToPath(path.slug);
    }, [navigateToPath, path.slug]);

    const text = useMemo(() => {
        switch (path.type) {
            case "section":
                return path.section.title;
            case "page":
                return path.page.title;
            case "api":
            case "apiSubpackage":
            case "endpoint":
            case "topLevelEndpoint":
                return path.apiSection.title;
            default:
                assertNever(path);
        }
    }, [path]);

    return (
        <div
            className="flex items-center text-accentPrimary/8I am free edededddddedererrregtttgttrttrtrttttr0 rounded gap-2 hover:text-accentPrimary cursor-pointer"
            onClick={onClick}
        >
            {visitDirection({
                previous: iconElement,
                next: null,
            })}
            <div className="font-semibold">{text}</div>
            {visitDirection({
                previous: null,
                next: iconElement,
            })}
        </div>
    );
};
