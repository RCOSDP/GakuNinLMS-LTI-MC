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
 * @interface InlineResponse2004Keywords
 */
export interface InlineResponse2004Keywords {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2004Keywords
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2004Keywords
     */
    name: string;
}

export function InlineResponse2004KeywordsFromJSON(json: any): InlineResponse2004Keywords {
    return InlineResponse2004KeywordsFromJSONTyped(json, false);
}

export function InlineResponse2004KeywordsFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2004Keywords {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
    };
}

export function InlineResponse2004KeywordsToJSON(value?: InlineResponse2004Keywords | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
    };
}


