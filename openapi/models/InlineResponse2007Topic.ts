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
 * @interface InlineResponse2007Topic
 */
export interface InlineResponse2007Topic {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2007Topic
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2007Topic
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2007Topic
     */
    timeRequired: number;
}

export function InlineResponse2007TopicFromJSON(json: any): InlineResponse2007Topic {
    return InlineResponse2007TopicFromJSONTyped(json, false);
}

export function InlineResponse2007TopicFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2007Topic {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'timeRequired': json['timeRequired'],
    };
}

export function InlineResponse2007TopicToJSON(value?: InlineResponse2007Topic | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'timeRequired': value.timeRequired,
    };
}


