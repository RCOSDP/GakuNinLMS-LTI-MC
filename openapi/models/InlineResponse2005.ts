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
 * @interface InlineResponse2005
 */
export interface InlineResponse2005 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005
     */
    consumerId: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005
     */
    id: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005
     */
    creatorId: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005
     */
    contextId: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005
     */
    contextTitle: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005
     */
    contextLabel: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005
     */
    title: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005
     */
    bookId: number;
}

export function InlineResponse2005FromJSON(json: any): InlineResponse2005 {
    return InlineResponse2005FromJSONTyped(json, false);
}

export function InlineResponse2005FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2005 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'consumerId': json['consumerId'],
        'id': json['id'],
        'creatorId': json['creatorId'],
        'contextId': json['contextId'],
        'contextTitle': json['contextTitle'],
        'contextLabel': json['contextLabel'],
        'title': json['title'],
        'bookId': json['bookId'],
    };
}

export function InlineResponse2005ToJSON(value?: InlineResponse2005 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'consumerId': value.consumerId,
        'id': value.id,
        'creatorId': value.creatorId,
        'contextId': value.contextId,
        'contextTitle': value.contextTitle,
        'contextLabel': value.contextLabel,
        'title': value.title,
        'bookId': value.bookId,
    };
}


