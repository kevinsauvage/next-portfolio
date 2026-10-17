export type CSPDirectives = Record<string, string[]> & { other?: string[] };

export declare const cspDirectives: CSPDirectives;

export declare function buildCsp(): string;

export declare function cspToString(directives: CSPDirectives): string;
