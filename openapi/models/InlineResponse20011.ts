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
import {
    InlineResponse2005Topics,
    InlineResponse2005TopicsFromJSON,
    InlineResponse2005TopicsFromJSONTyped,
    InlineResponse2005TopicsToJSON,
} from './';

/**
 * 成功時
 * @export
 * @interface InlineResponse20011
 */
export interface InlineResponse20011 {
    /**
     * 
     * @type {Array<InlineResponse2005Topics>}
     * @memberof InlineResponse20011
     */
    topics?: Array<InlineResponse2005Topics>;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse20011
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse20011
     */
    perPage?: number;
}

export function InlineResponse20011FromJSON(json: any): InlineResponse20011 {
    return InlineResponse20011FromJSONTyped(json, false);
}

export function InlineResponse20011FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20011 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'topics': !exists(json, 'topics') ? undefined : ((json['topics'] as Array<any>).map(InlineResponse2005TopicsFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'perPage': !exists(json, 'perPage') ? undefined : json['perPage'],
    };
}

export function InlineResponse20011ToJSON(value?: InlineResponse20011 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'topics': value.topics === undefined ? undefined : ((value.topics as Array<any>).map(InlineResponse2005TopicsToJSON)),
        'page': value.page,
        'perPage': value.perPage,
    };
}


