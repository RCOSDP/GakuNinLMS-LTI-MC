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
 * @interface InlineObject12
 */
export interface InlineObject12 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject12
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject12
     */
    content?: string;
}

export function InlineObject12FromJSON(json: any): InlineObject12 {
    return InlineObject12FromJSONTyped(json, false);
}

export function InlineObject12FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject12 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'language': !exists(json, 'language') ? undefined : json['language'],
        'content': !exists(json, 'content') ? undefined : json['content'],
    };
}

export function InlineObject12ToJSON(value?: InlineObject12 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'language': value.language,
        'content': value.content,
    };
}


