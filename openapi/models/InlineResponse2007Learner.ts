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
 * @interface InlineResponse2007Learner
 */
export interface InlineResponse2007Learner {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2007Learner
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2007Learner
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2007Learner
     */
    email: string;
}

export function InlineResponse2007LearnerFromJSON(json: any): InlineResponse2007Learner {
    return InlineResponse2007LearnerFromJSONTyped(json, false);
}

export function InlineResponse2007LearnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2007Learner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'email': json['email'],
    };
}

export function InlineResponse2007LearnerToJSON(value?: InlineResponse2007Learner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'email': value.email,
    };
}


