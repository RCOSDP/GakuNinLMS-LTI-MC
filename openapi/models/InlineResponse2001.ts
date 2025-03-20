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
import {
    LTIContext,
    LTIContextFromJSON,
    LTIContextFromJSONTyped,
    LTIContextToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2001
 */
export interface InlineResponse2001 {
    /**
     * 
     * @type {Array<LTIContext>}
     * @memberof InlineResponse2001
     */
    ltiContexts?: Array<LTIContext>;
}

export function InlineResponse2001FromJSON(json: any): InlineResponse2001 {
    return InlineResponse2001FromJSONTyped(json, false);
}

export function InlineResponse2001FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2001 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ltiContexts': !exists(json, 'ltiContexts') ? undefined : ((json['ltiContexts'] as Array<any>).map(LTIContextFromJSON)),
    };
}

export function InlineResponse2001ToJSON(value?: InlineResponse2001 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ltiContexts': value.ltiContexts === undefined ? undefined : ((value.ltiContexts as Array<any>).map(LTIContextToJSON)),
    };
}


