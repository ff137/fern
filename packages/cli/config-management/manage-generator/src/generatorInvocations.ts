import { GeneratorInvocationSchema, GeneratorName } from "@fern-api/generators-configuration";

export const GENERATOR_INVOCATIONS: Record<GeneratorName, Omit<GeneratorInvocationSchema, "name">> = {
    [GeneratorName.JAVA]: {
        version: "0.0.122",
    },
    [GeneratorName.TYPESCRIPT_EXPRESS]: {
        version: "0.2.2",
        output: {
            location: "local-file-system",
            path: "../../src/fern",
        },
    },
    [GeneratorName.JAVA_MODEL]: {
        version: "0.0.132",
    },
    [GeneratorName.JAVA_SDK]: {
        version: "0.0.132",
    },
    [GeneratorName.JAVA_SPRING]: {
        version: "0.0.133",
    },
    [GeneratorName.TYPESCRIPT]: {
        version: "0.0.247",
    },
    [GeneratorName.TYPESCRIPT_SDK]: {
        version: "0.2.2",
    },
    [GeneratorName.TYPESCRIPT_NODE_SDK]: {
        version: "0.6.0",
    },
    [GeneratorName.TYPESCRIPT_BROWSER_SDK]: {
        version: "0.6.0",
    },
    [GeneratorName.PYTHON_PYDANTIC]: {
        version: "0.1.0",
    },
    [GeneratorName.PYTHON_FASTAPI]: {
        version: "0.1.0",
    },
    [GeneratorName.PYTHON_SDK]: {
        version: "0.1.0",
    },
    [GeneratorName.GO_MODEL]: {
        version: "0.0.1",
    },
    [GeneratorName.OPENAPI]: {
        version: "0.0.11",
        config: {
            format: "yaml",
        },
    },
    [GeneratorName.STOPLIGHT]: {
        version: "0.0.24",
        config: {
            format: "yaml",
        },
    },
    [GeneratorName.POSTMAN]: {
        version: "0.0.25",
    },
    [GeneratorName.OPENAPI_PYTHON_CLIENT]: {
        version: "0.0.11",
        output: {
            location: "local-file-system",
            path: "../../generated/python",
        },
        config: {
            format: "yaml",
        },
    },
};
