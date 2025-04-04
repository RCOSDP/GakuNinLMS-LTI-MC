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
    InlineResponse2009Learner,
    InlineResponse2009LearnerFromJSON,
    InlineResponse2009LearnerFromJSONTyped,
    InlineResponse2009LearnerToJSON,
    InlineResponse2009TimeRanges,
    InlineResponse2009TimeRangesFromJSON,
    InlineResponse2009TimeRangesFromJSONTyped,
    InlineResponse2009TimeRangesToJSON,
    InlineResponse2009Topic,
    InlineResponse2009TopicFromJSON,
    InlineResponse2009TopicFromJSONTyped,
    InlineResponse2009TopicToJSON,
    LTIContext,
    LTIContextFromJSON,
    LTIContextFromJSONTyped,
    LTIContextToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2009Activity
 */
export interface InlineResponse2009Activity {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2009Activity
     */
    id: number;
    /**
     * 
     * @type {InlineResponse2009Learner}
     * @memberof InlineResponse2009Activity
     */
    learner: InlineResponse2009Learner;
    /**
     * 
     * @type {LTIContext}
     * @memberof InlineResponse2009Activity
     */
    ltiContext?: LTIContext;
    /**
     * 
     * @type {InlineResponse2009Topic}
     * @memberof InlineResponse2009Activity
     */
    topic: InlineResponse2009Topic;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2009Activity
     */
    completed: boolean;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2009Activity
     */
    totalTimeMs: number;
    /**
     * 
     * @type {Array<InlineResponse2009TimeRanges>}
     * @memberof InlineResponse2009Activity
     */
    timeRanges: Array<InlineResponse2009TimeRanges>;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2009Activity
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2009Activity
     */
    updatedAt: Date;
}

export function InlineResponse2009ActivityFromJSON(json: any): InlineResponse2009Activity {
    return InlineResponse2009ActivityFromJSONTyped(json, false);
}

export function InlineResponse2009ActivityFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2009Activity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'learner': InlineResponse2009LearnerFromJSON(json['learner']),
        'ltiContext': !exists(json, 'ltiContext') ? undefined : LTIContextFromJSON(json['ltiContext']),
        'topic': InlineResponse2009TopicFromJSON(json['topic']),
        'completed': json['completed'],
        'totalTimeMs': json['totalTimeMs'],
        'timeRanges': ((json['timeRanges'] as Array<any>).map(InlineResponse2009TimeRangesFromJSON)),
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
    };
}

export function InlineResponse2009ActivityToJSON(value?: InlineResponse2009Activity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'learner': InlineResponse2009LearnerToJSON(value.learner),
        'ltiContext': LTIContextToJSON(value.ltiContext),
        'topic': InlineResponse2009TopicToJSON(value.topic),
        'completed': value.completed,
        'totalTimeMs': value.totalTimeMs,
        'timeRanges': ((value.timeRanges as Array<any>).map(InlineResponse2009TimeRangesToJSON)),
        'createdAt': (value.createdAt.toISOString()),
        'updatedAt': (value.updatedAt.toISOString()),
    };
}


