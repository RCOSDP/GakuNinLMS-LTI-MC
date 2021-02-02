/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0.0
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
 * @interface InlineResponse200
 */
export interface InlineResponse200 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse200
     */
    consumerId: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse200
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse200
     */
    contextId: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse200
     */
    contextTitle: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse200
     */
    title: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse200
     */
    bookId: number;
}

export function InlineResponse200FromJSON(json: any): InlineResponse200 {
    return InlineResponse200FromJSONTyped(json, false);
}

export function InlineResponse200FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'consumerId': json['consumerId'],
        'id': json['id'],
        'contextId': json['contextId'],
        'contextTitle': json['contextTitle'],
        'title': json['title'],
        'bookId': json['bookId'],
    };
}

export function InlineResponse200ToJSON(value?: InlineResponse200 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'consumerId': value.consumerId,
        'id': value.id,
        'contextId': value.contextId,
        'contextTitle': value.contextTitle,
        'title': value.title,
        'bookId': value.bookId,
    };
}


