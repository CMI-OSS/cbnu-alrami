import { Exclude, Expose } from "class-transformer";

export class Error {
    
    @Exclude()
    private readonly message: string

    public constructor(message: string) {
        this.message = message;
    }

    @Expose()
    get Message(): string {
        return this.message;
    }
    
}