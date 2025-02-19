import { RawSchemas, visitRawEnvironmentDeclaration } from "@fern-api/yaml-schema";
import {
    Environments,
    EnvironmentsConfig,
    MultipleBaseUrlsEnvironment,
    MultipleBaseUrlsEnvironments,
    SingleBaseUrlEnvironment,
    SingleBaseUrlEnvironments,
} from "@fern-fern/ir-model/environment";
import { CasingsGenerator } from "../casings/CasingsGenerator";

export function convertEnvironments({
    rawApiFileSchema: { "default-environment": defaultEnvironment, environments },
    casingsGenerator,
}: {
    rawApiFileSchema: RawSchemas.RootApiFileSchema;
    casingsGenerator: CasingsGenerator;
}): EnvironmentsConfig | undefined {
    if (environments == null) {
        return undefined;
    }
    const firstEnvironment = Object.values(environments)[0];
    if (firstEnvironment == null) {
        return undefined;
    }

    return {
        defaultEnvironment,
        environments: visitRawEnvironmentDeclaration<Environments>(firstEnvironment, {
            singleBaseUrl: () =>
                Environments.singleBaseUrl(convertSingleBaseUrlEnvironments({ environments, casingsGenerator })),
            multipleBaseUrls: (firstMultipleBaseUrlsEnvironment) =>
                Environments.multipleBaseUrls(
                    convertMultipleBaseUrlEnvironments({
                        baseUrls: Object.keys(firstMultipleBaseUrlsEnvironment.urls),
                        environments,
                        casingsGenerator,
                    })
                ),
        }),
    };
}

function convertSingleBaseUrlEnvironments({
    environments,
    casingsGenerator,
}: {
    environments: Record<string, RawSchemas.EnvironmentSchema>;
    casingsGenerator: CasingsGenerator;
}): SingleBaseUrlEnvironments {
    return {
        environments: Object.entries(environments).map(
            ([environmentName, rawEnvironment]): SingleBaseUrlEnvironment =>
                visitRawEnvironmentDeclaration(rawEnvironment, {
                    singleBaseUrl: (singleBaseUrlEnvironment) => ({
                        docs: typeof singleBaseUrlEnvironment === "string" ? undefined : singleBaseUrlEnvironment.docs,
                        id: environmentName,
                        name: casingsGenerator.generateName(environmentName),
                        url:
                            typeof singleBaseUrlEnvironment === "string"
                                ? singleBaseUrlEnvironment
                                : singleBaseUrlEnvironment.url,
                    }),
                    multipleBaseUrls: () => {
                        throw new Error(`Environment ${environmentName} has multiple base URLs`);
                    },
                })
        ),
    };
}

function convertMultipleBaseUrlEnvironments({
    baseUrls,
    environments,
    casingsGenerator,
}: {
    baseUrls: string[];
    environments: Record<string, RawSchemas.EnvironmentSchema>;
    casingsGenerator: CasingsGenerator;
}): MultipleBaseUrlsEnvironments {
    return {
        baseUrls: baseUrls.map((baseUrl) => ({
            id: baseUrl,
            name: casingsGenerator.generateName(baseUrl),
        })),
        environments: Object.entries(environments).map(
            ([environmentName, rawEnvironment]): MultipleBaseUrlsEnvironment =>
                visitRawEnvironmentDeclaration<MultipleBaseUrlsEnvironment>(rawEnvironment, {
                    multipleBaseUrls: (multipleBaseUrlsEnvironment): MultipleBaseUrlsEnvironment => ({
                        docs: multipleBaseUrlsEnvironment.docs,
                        id: environmentName,
                        name: casingsGenerator.generateName(environmentName),
                        urls: multipleBaseUrlsEnvironment.urls,
                    }),
                    singleBaseUrl: () => {
                        throw new Error(`Environment ${environmentName} does not have multiple base URLs`);
                    },
                })
        ),
    };
}
