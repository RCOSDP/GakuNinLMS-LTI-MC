/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ApiV2BookBookIdAuthorsAuthors
 */
export interface ApiV2BookBookIdAuthorsAuthors {
    /**
     * 
     * @type {number}
     * @memberof ApiV2BookBookIdAuthorsAuthors
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof ApiV2BookBookIdAuthorsAuthors
     */
    roleName: string;
}

export function ApiV2BookBookIdAuthorsAuthorsFromJSON(json: any): ApiV2BookBookIdAuthorsAuthors {
    return ApiV2BookBookIdAuthorsAuthorsFromJSONTyped(json, false);
}

export function ApiV2BookBookIdAuthorsAuthorsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiV2BookBookIdAuthorsAuthors {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'roleName': json['roleName'],
    };
}

export function ApiV2BookBookIdAuthorsAuthorsToJSON(value?: ApiV2BookBookIdAuthorsAuthors | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'roleName': value.roleName,
    };
}


