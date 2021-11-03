export class SetToken {
    static readonly type = '[Token] set token';
    constructor(public payload: string) {}
    
}