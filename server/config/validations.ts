import type {
  FastifySchema,
  FastifyRouteSchemaDef,
  FastifyValidationResult,
} from "fastify/types/schema";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { isValidLicense } from "$server/validators/license";

export function buildValidatorCompiler() {
  const ajv = addFormats(
    new Ajv({
      removeAdditional: true,
      useDefaults: true,
      coerceTypes: true,
    }).addFormat("license", {
      type: "string",
      validate: isValidLicense,
    })
  );

  function validatorCompiler<T extends FastifySchema>({
    schema,
  }: FastifyRouteSchemaDef<T>): FastifyValidationResult {
    return ajv.compile(schema);
  }

  return validatorCompiler;
}
