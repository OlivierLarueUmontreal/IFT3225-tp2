import {Router} from "express";

const router = Router();

import {getDocumentation} from "../controllers/docController.js";

router.route('/').get(getDocumentation)

export {router as docRoute}