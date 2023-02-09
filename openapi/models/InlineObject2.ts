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
    ApiV2BookBookIdKeywords,
    ApiV2BookBookIdKeywordsFromJSON,
    ApiV2BookBookIdKeywordsFromJSONTyped,
    ApiV2BookBookIdKeywordsToJSON,
    ApiV2BookBookIdSections,
    ApiV2BookBookIdSectionsFromJSON,
    ApiV2BookBookIdSectionsFromJSONTyped,
    ApiV2BookBookIdSectionsToJSON,
    InlineResponse2004PublicBooks,
    InlineResponse2004PublicBooksFromJSON,
    InlineResponse2004PublicBooksFromJSONTyped,
    InlineResponse2004PublicBooksToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineObject2
 */
export interface InlineObject2 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject2
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject2
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject2
     */
    language?: string;
    /**
     * 
     * @type {boolean}
     * @memberof InlineObject2
     */
    shared?: boolean;
    /**
     * 
     * @type {Array<ApiV2BookBookIdSections>}
     * @memberof InlineObject2
     */
    sections?: Array<ApiV2BookBookIdSections>;
    /**
     * 
     * @type {Array<ApiV2BookBookIdKeywords>}
     * @memberof InlineObject2
     */
    keywords?: Array<ApiV2BookBookIdKeywords>;
    /**
     * 
     * @type {Array<InlineResponse2004PublicBooks>}
     * @memberof InlineObject2
     */
    publicBooks?: Array<InlineResponse2004PublicBooks>;
}

export function InlineObject2FromJSON(json: any): InlineObject2 {
    return InlineObject2FromJSONTyped(json, false);
}

export function InlineObject2FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject2 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'shared': !exists(json, 'shared') ? undefined : json['shared'],
        'sections': !exists(json, 'sections') ? undefined : ((json['sections'] as Array<any>).map(ApiV2BookBookIdSectionsFromJSON)),
        'keywords': !exists(json, 'keywords') ? undefined : ((json['keywords'] as Array<any>).map(ApiV2BookBookIdKeywordsFromJSON)),
        'publicBooks': !exists(json, 'publicBooks') ? undefined : ((json['publicBooks'] as Array<any>).map(InlineResponse2004PublicBooksFromJSON)),
    };
}

export function InlineObject2ToJSON(value?: InlineObject2 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'language': value.language,
        'shared': value.shared,
        'sections': value.sections === undefined ? undefined : ((value.sections as Array<any>).map(ApiV2BookBookIdSectionsToJSON)),
        'keywords': value.keywords === undefined ? undefined : ((value.keywords as Array<any>).map(ApiV2BookBookIdKeywordsToJSON)),
        'publicBooks': value.publicBooks === undefined ? undefined : ((value.publicBooks as Array<any>).map(InlineResponse2004PublicBooksToJSON)),
    };
}


