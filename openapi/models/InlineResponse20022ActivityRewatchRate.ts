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
 * @interface InlineResponse20022ActivityRewatchRate
 */
export interface InlineResponse20022ActivityRewatchRate {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse20022ActivityRewatchRate
     */
    topicId: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse20022ActivityRewatchRate
     */
    learnerId: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse20022ActivityRewatchRate
     */
    rewatchRate: number;
}

export function InlineResponse20022ActivityRewatchRateFromJSON(json: any): InlineResponse20022ActivityRewatchRate {
    return InlineResponse20022ActivityRewatchRateFromJSONTyped(json, false);
}

export function InlineResponse20022ActivityRewatchRateFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20022ActivityRewatchRate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'topicId': json['topicId'],
        'learnerId': json['learnerId'],
        'rewatchRate': json['rewatchRate'],
    };
}

export function InlineResponse20022ActivityRewatchRateToJSON(value?: InlineResponse20022ActivityRewatchRate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'topicId': value.topicId,
        'learnerId': value.learnerId,
        'rewatchRate': value.rewatchRate,
    };
}


