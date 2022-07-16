import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BookmarkRepository } from "./bookmark.repository";
import { BookmarkService } from "./bookmark.service";

@Module({
    imports: [ TypeOrmModule.forFeature([ BookmarkRepository ]) ],
    providers: [ BookmarkService ],
    exports: [ BookmarkService ],
})

export class BookmarkModule {}