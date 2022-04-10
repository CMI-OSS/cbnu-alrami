import { Exclude, Expose } from "class-transformer";

export class Error {
    
    @Exclude()
    private readonly _message: string

    public constructor(message: string) {
        this._message = message;
    }

    @Expose()
    get message(): string {
        return this._message;
    }
    
}