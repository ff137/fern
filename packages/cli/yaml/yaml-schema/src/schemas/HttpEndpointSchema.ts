import { z } from "zod";
import { DeclarationSchema } from "./DeclarationSchema";
import { ExampleEndpointCallSchema } from "./ExampleEndpointCallSchema";
import { HttpPathParameterSchema } from "./HttpPathParameterSchema";
import { HttpRequestSchema } from "./HttpRequestSchema";
import { HttpResponseSchema } from "./HttpResponseSchema";
import { HttpResponseStreamSchema } from "./HttpResponseStreamSchema";
import { ResponseErrorsSchema } from "./ResponseErrorsSchema";

export const HttpEndpointSchema = DeclarationSchema.extend({
    method: z.optional(z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"])),
    "display-name": z.optional(z.string()),
    path: z.string(),
    url: z.optional(z.string()),
    ["path-parameters"]: z.optional(z.record(HttpPathParameterSchema)),
    auth: z.optional(z.boolean()),
    request: z.optional(z.union([z.string(), HttpRequestSchema])),
    response: z.optional(HttpResponseSchema),
    "stream-condition": z.optional(z.string()),
    "response-stream": z.optional(z.union([z.string(), HttpResponseStreamSchema])),
    errors: z.optional(ResponseErrorsSchema),
    examples: z.optional(z.array(ExampleEndpointCallSchema)),
});

export type HttpEndpointSchema = z.infer<typeof HttpEndpointSchema>;

export const HttpMethodSchema = z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]);

export type HttpMethodSchema = z.infer<typeof HttpMethodSchema>;
