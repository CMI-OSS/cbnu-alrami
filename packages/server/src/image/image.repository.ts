import { EntityRepository, Repository } from "typeorm";

import { Image } from "../commons/entities/image.entity";

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {}
