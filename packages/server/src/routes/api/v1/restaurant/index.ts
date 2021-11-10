import {Router} from 'express';
import { createRestaurant } from './controller';

const router = Router();


router.post('/restaurant', createRestaurant);

module.exports = router;