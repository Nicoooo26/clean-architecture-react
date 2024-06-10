// Discover Payload
export interface DiscoverPayloadInterface {
    entityName: String;
    prefix: String;
    scheme: String;
    port: String;
    extra: String;
}
export abstract class AbstractDiscoverPayload implements DiscoverPayloadInterface {
    entityName: String;
    prefix: String;
    scheme: String;
    port: String;
    extra: String;
    constructor(options : {applicationName? : String, prefix? : String, scheme? : String, port? : String, extra? : String}){
        this.entityName = options.applicationName ?? '';
        this.prefix = options.prefix ?? '';
        this.scheme = options.scheme ?? '';
        this.port = options.port ?? '';
        this.extra = options.extra ?? '';
    }
}
export class DiscoverPayload extends AbstractDiscoverPayload {
    static createFromObject(object : any) {
        new DiscoverPayload({
            applicationName : object?.application_name,
            prefix : object?.prefix,
            scheme : object?.scheme,
            port : object?.port,
            extra : object?.extra,
        });
    }
}

// Hide Payload
export interface HidePayloadInterface {
    tagSearch : String
}
export abstract class AbstractHidePayload implements HidePayloadInterface{
    tagSearch : String;
    constructor(options : {tagSearch? : String}){
        this.tagSearch = options.tagSearch ?? '';
    }
}

export class HidePayload extends AbstractHidePayload {
    static createFromObject(object : any) {
        new HidePayload({
            tagSearch : object?.application_name,
        });
    }
}