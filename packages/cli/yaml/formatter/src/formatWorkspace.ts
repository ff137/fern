import { entries } from "@fern-api/core-utils";
import { TaskContext } from "@fern-api/task-context";
import { FernWorkspace } from "@fern-api/workspace-loader";
import chalk from "chalk";
import { writeFile } from "fs/promises";
import { formatDefinitionFile } from "./formatDefinitionFile";

export async function formatFernWorkspace({
    workspace,
    context,
    shouldFix,
}: {
    workspace: FernWorkspace;
    context: TaskContext;
    shouldFix: boolean;
}): Promise<void> {
    for (const [relativeFilepath, file] of entries(workspace.definition.namedDefinitionFiles)) {
        const formatted = formatDefinitionFile({
            fileContents: file.rawContents,
        });
        if (formatted !== file.rawContents) {
            if (shouldFix) {
                await writeFile(file.absoluteFilepath, formatted);
                context.logger.info(chalk.green(`Formatted ${chalk.bold(relativeFilepath)}`));
            } else {
                context.logger.info(chalk.red(`Invalid formatting: ${chalk.bold(relativeFilepath)}`));
                context.failWithoutThrowing();
            }
        }
    }
}
