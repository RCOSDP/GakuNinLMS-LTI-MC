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
    InlineResponse2003BookAuthors,
    InlineResponse2003BookAuthorsFromJSON,
    InlineResponse2003BookAuthorsFromJSONTyped,
    InlineResponse2003BookAuthorsToJSON,
    InlineResponse2004,
    InlineResponse2004FromJSON,
    InlineResponse2004FromJSONTyped,
    InlineResponse2004ToJSON,
    InlineResponse2005Keywords,
    InlineResponse2005KeywordsFromJSON,
    InlineResponse2005KeywordsFromJSONTyped,
    InlineResponse2005KeywordsToJSON,
    InlineResponse2005PublicBooks,
    InlineResponse2005PublicBooksFromJSON,
    InlineResponse2005PublicBooksFromJSONTyped,
    InlineResponse2005PublicBooksToJSON,
    InlineResponse2005RelatedBooks,
    InlineResponse2005RelatedBooksFromJSON,
    InlineResponse2005RelatedBooksFromJSONTyped,
    InlineResponse2005RelatedBooksToJSON,
    InlineResponse2005Resource,
    InlineResponse2005ResourceFromJSON,
    InlineResponse2005ResourceFromJSONTyped,
    InlineResponse2005ResourceToJSON,
    InlineResponse2005Sections,
    InlineResponse2005SectionsFromJSON,
    InlineResponse2005SectionsFromJSONTyped,
    InlineResponse2005SectionsToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2005Contents
 */
export interface InlineResponse2005Contents {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005Contents
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005Contents
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005Contents
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005Contents
     */
    language?: string;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005Contents
     */
    timeRequired?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005Contents
     */
    startTime?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005Contents
     */
    stopTime?: number;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2005Contents
     */
    shared?: boolean;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005Contents
     */
    license?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005Contents
     */
    description?: string;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2005Contents
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2005Contents
     */
    updatedAt?: Date;
    /**
     * 
     * @type {object}
     * @memberof InlineResponse2005Contents
     */
    details?: object;
    /**
     * 
     * @type {Array<InlineResponse2003BookAuthors>}
     * @memberof InlineResponse2005Contents
     */
    authors?: Array<InlineResponse2003BookAuthors>;
    /**
     * 
     * @type {Array<InlineResponse2005Keywords>}
     * @memberof InlineResponse2005Contents
     */
    keywords?: Array<InlineResponse2005Keywords>;
    /**
     * 
     * @type {Array<InlineResponse2005RelatedBooks>}
     * @memberof InlineResponse2005Contents
     */
    relatedBooks?: Array<InlineResponse2005RelatedBooks>;
    /**
     * 
     * @type {InlineResponse2005Resource}
     * @memberof InlineResponse2005Contents
     */
    resource?: InlineResponse2005Resource;
    /**
     * 
     * @type {Date}
     * @memberof InlineResponse2005Contents
     */
    publishedAt?: Date;
    /**
     * 
     * @type {Array<InlineResponse2005Sections>}
     * @memberof InlineResponse2005Contents
     */
    sections?: Array<InlineResponse2005Sections>;
    /**
     * 
     * @type {Array<InlineResponse2004>}
     * @memberof InlineResponse2005Contents
     */
    ltiResourceLinks?: Array<InlineResponse2004>;
    /**
     * 
     * @type {Array<InlineResponse2005PublicBooks>}
     * @memberof InlineResponse2005Contents
     */
    publicBooks?: Array<InlineResponse2005PublicBooks>;
}

export function InlineResponse2005ContentsFromJSON(json: any): InlineResponse2005Contents {
    return InlineResponse2005ContentsFromJSONTyped(json, false);
}

export function InlineResponse2005ContentsFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2005Contents {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'timeRequired': !exists(json, 'timeRequired') ? undefined : json['timeRequired'],
        'startTime': !exists(json, 'startTime') ? undefined : json['startTime'],
        'stopTime': !exists(json, 'stopTime') ? undefined : json['stopTime'],
        'shared': !exists(json, 'shared') ? undefined : json['shared'],
        'license': !exists(json, 'license') ? undefined : json['license'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'details': !exists(json, 'details') ? undefined : json['details'],
        'authors': !exists(json, 'authors') ? undefined : ((json['authors'] as Array<any>).map(InlineResponse2003BookAuthorsFromJSON)),
        'keywords': !exists(json, 'keywords') ? undefined : ((json['keywords'] as Array<any>).map(InlineResponse2005KeywordsFromJSON)),
        'relatedBooks': !exists(json, 'relatedBooks') ? undefined : ((json['relatedBooks'] as Array<any>).map(InlineResponse2005RelatedBooksFromJSON)),
        'resource': !exists(json, 'resource') ? undefined : InlineResponse2005ResourceFromJSON(json['resource']),
        'publishedAt': !exists(json, 'publishedAt') ? undefined : (new Date(json['publishedAt'])),
        'sections': !exists(json, 'sections') ? undefined : ((json['sections'] as Array<any>).map(InlineResponse2005SectionsFromJSON)),
        'ltiResourceLinks': !exists(json, 'ltiResourceLinks') ? undefined : ((json['ltiResourceLinks'] as Array<any>).map(InlineResponse2004FromJSON)),
        'publicBooks': !exists(json, 'publicBooks') ? undefined : ((json['publicBooks'] as Array<any>).map(InlineResponse2005PublicBooksFromJSON)),
    };
}

export function InlineResponse2005ContentsToJSON(value?: InlineResponse2005Contents | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
        'name': value.name,
        'language': value.language,
        'timeRequired': value.timeRequired,
        'startTime': value.startTime,
        'stopTime': value.stopTime,
        'shared': value.shared,
        'license': value.license,
        'description': value.description,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'details': value.details,
        'authors': value.authors === undefined ? undefined : ((value.authors as Array<any>).map(InlineResponse2003BookAuthorsToJSON)),
        'keywords': value.keywords === undefined ? undefined : ((value.keywords as Array<any>).map(InlineResponse2005KeywordsToJSON)),
        'relatedBooks': value.relatedBooks === undefined ? undefined : ((value.relatedBooks as Array<any>).map(InlineResponse2005RelatedBooksToJSON)),
        'resource': InlineResponse2005ResourceToJSON(value.resource),
        'publishedAt': value.publishedAt === undefined ? undefined : (value.publishedAt.toISOString()),
        'sections': value.sections === undefined ? undefined : ((value.sections as Array<any>).map(InlineResponse2005SectionsToJSON)),
        'ltiResourceLinks': value.ltiResourceLinks === undefined ? undefined : ((value.ltiResourceLinks as Array<any>).map(InlineResponse2004ToJSON)),
        'publicBooks': value.publicBooks === undefined ? undefined : ((value.publicBooks as Array<any>).map(InlineResponse2005PublicBooksToJSON)),
    };
}


