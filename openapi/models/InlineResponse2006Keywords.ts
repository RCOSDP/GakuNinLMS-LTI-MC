/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.5.0
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
 * @interface InlineResponse2006Keywords
 */
export interface InlineResponse2006Keywords {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2006Keywords
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2006Keywords
     */
    name: string;
}

export function InlineResponse2006KeywordsFromJSON(json: any): InlineResponse2006Keywords {
    return InlineResponse2006KeywordsFromJSONTyped(json, false);
}

export function InlineResponse2006KeywordsFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2006Keywords {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
    };
}

export function InlineResponse2006KeywordsToJSON(value?: InlineResponse2006Keywords | null): any {
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


