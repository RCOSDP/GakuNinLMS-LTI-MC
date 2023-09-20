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
 * @interface InlineResponse2005RelatedBooks
 */
export interface InlineResponse2005RelatedBooks {
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2005RelatedBooks
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005RelatedBooks
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005RelatedBooks
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005RelatedBooks
     */
    language?: string;
    /**
     * 
     * @type {boolean}
     * @memberof InlineResponse2005RelatedBooks
     */
    shared?: boolean;
}

export function InlineResponse2005RelatedBooksFromJSON(json: any): InlineResponse2005RelatedBooks {
    return InlineResponse2005RelatedBooksFromJSONTyped(json, false);
}

export function InlineResponse2005RelatedBooksFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2005RelatedBooks {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'shared': !exists(json, 'shared') ? undefined : json['shared'],
    };
}

export function InlineResponse2005RelatedBooksToJSON(value?: InlineResponse2005RelatedBooks | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'description': value.description,
        'language': value.language,
        'shared': value.shared,
    };
}


