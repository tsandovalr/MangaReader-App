export class SetEmail{
    static readonly type = '[UserEmail] set email';
    constructor(public payload: string){}
}
