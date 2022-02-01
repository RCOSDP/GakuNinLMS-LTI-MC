import type {
  FastifyRouteSchemaDef,
  FastifyValidationResult,
} from "fastify/types/schema";
import Ajv from "ajv";
import { isValidLicense } from "$server/validators/license";

export function buildValidatorCompiler() {
  const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
  }).addFormat("license", {
    type: "string",
    validate: isValidLicense,
  });

  function validatorCompiler<T>({
    schema,
  }: FastifyRouteSchemaDef<T>): FastifyValidationResult {
    // @ts-expect-error TODO: `errors` には `instancePath` が得られるが FastifySchemaValidationError では `dataPath` が必須
    return ajv.compile(schema);
  }

  return validatorCompiler;
}
