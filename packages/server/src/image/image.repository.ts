import { Image } from "src/commons/entities/image.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {}
