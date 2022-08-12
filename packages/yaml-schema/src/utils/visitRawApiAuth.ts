import { assertNever } from "@fern-api/core-utils";
import { AllAuthSchemesSchema, AnyAuthSchemesSchema, ApiAuthSchema } from "../schemas";
import { AuthSchemeReferenceSchema } from "../schemas/AuthSchemeReferenceSchema";

export interface RawApiAuthVisitor<R> {
    single: (authScheme: AuthSchemeReferenceSchema | string) => R;
    any: (authSchemes: AnyAuthSchemesSchema) => R;
    all: (authSchemes: AllAuthSchemesSchema) => R;
}

export function visitRawApiAuth<R>(apiAuth: ApiAuthSchema, visitor: RawApiAuthVisitor<R>): R {
    if (isSingleAuthScheme(apiAuth)) {
        return visitor.single(apiAuth);
    }
    if (isAnyAuthSchemes(apiAuth)) {
        return visitor.any(apiAuth);
    }
    if (isAllAuthSchemes(apiAuth)) {
        return visitor.all(apiAuth);
    }
    assertNever(apiAuth);
}

export function isSingleAuthScheme(apiAuth: ApiAuthSchema): apiAuth is AuthSchemeReferenceSchema | string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return typeof apiAuth === "string" || (apiAuth as AuthSchemeReferenceSchema).scheme != null;
}

export function isAnyAuthSchemes(apiAuth: ApiAuthSchema): apiAuth is AnyAuthSchemesSchema {
    const [firstKey, ...rest] = Object.keys(apiAuth);
    return firstKey === "any" && rest.length === 0;
}

export function isAllAuthSchemes(apiAuth: ApiAuthSchema): apiAuth is AllAuthSchemesSchema {
    const [firstKey, ...rest] = Object.keys(apiAuth);
    return firstKey === "all" && rest.length === 0;
}
