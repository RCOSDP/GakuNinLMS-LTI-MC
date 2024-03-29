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
    InlineResponse2002BookAuthors,
    InlineResponse2002BookAuthorsFromJSON,
    InlineResponse2002BookAuthorsFromJSONTyped,
    InlineResponse2002BookAuthorsToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse2002Book
 */
export interface InlineResponse2002Book {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2002Book
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2002Book
     */
    name: string;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2002Book
     */
    shared: boolean;
    /**
     * 
     * @type {Array<InlineResponse2002BookAuthors>}
     * @memberof InlineResponse2002Book
     */
    authors: Array<InlineResponse2002BookAuthors>;
}

export function InlineResponse2002BookFromJSON(json: any): InlineResponse2002Book {
    return InlineResponse2002BookFromJSONTyped(json, false);
}

export function InlineResponse2002BookFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2002Book {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'shared': json['shared'],
        'authors': ((json['authors'] as Array<any>).map(InlineResponse2002BookAuthorsFromJSON)),
    };
}

export function InlineResponse2002BookToJSON(value?: InlineResponse2002Book | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'shared': value.shared,
        'authors': ((value.authors as Array<any>).map(InlineResponse2002BookAuthorsToJSON)),
    };
}


