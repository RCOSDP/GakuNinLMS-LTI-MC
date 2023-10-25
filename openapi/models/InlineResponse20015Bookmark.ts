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
    InlineResponse20015Tag,
    InlineResponse20015TagFromJSON,
    InlineResponse20015TagFromJSONTyped,
    InlineResponse20015TagToJSON,
    InlineResponse2005Topics,
    InlineResponse2005TopicsFromJSON,
    InlineResponse2005TopicsFromJSONTyped,
    InlineResponse2005TopicsToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse20015Bookmark
 */
export interface InlineResponse20015Bookmark {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse20015Bookmark
     */
    id?: number;
    /**
     * 
     * @type {InlineResponse2005Topics}
     * @memberof InlineResponse20015Bookmark
     */
    topic?: InlineResponse2005Topics;
    /**
     * 
     * @type {InlineResponse20015Tag}
     * @memberof InlineResponse20015Bookmark
     */
    tag?: InlineResponse20015Tag;
}

export function InlineResponse20015BookmarkFromJSON(json: any): InlineResponse20015Bookmark {
    return InlineResponse20015BookmarkFromJSONTyped(json, false);
}

export function InlineResponse20015BookmarkFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20015Bookmark {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'topic': !exists(json, 'topic') ? undefined : InlineResponse2005TopicsFromJSON(json['topic']),
        'tag': !exists(json, 'tag') ? undefined : InlineResponse20015TagFromJSON(json['tag']),
    };
}

export function InlineResponse20015BookmarkToJSON(value?: InlineResponse20015Bookmark | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'topic': InlineResponse2005TopicsToJSON(value.topic),
        'tag': InlineResponse20015TagToJSON(value.tag),
    };
}


