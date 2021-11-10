import {Router} from 'express';
import { createRestaurant } from './controller';

const router = Router();


router.post('/', createRestaurant);

module.exports = router;