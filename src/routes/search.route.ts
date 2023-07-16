import { Router, Request, Response, NextFunction } from "express";
import ResponsesUtil from "../utils/responses.util";
import service from "../services/search.service";

const router: Router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let options = {
		from: req.body.from,
		to: req.body.to,
		search: req.body.search
	};

	if(!options.search) return ResponsesUtil.invalidParameters(res);

    try {
        const result = await service.search(options);
        if(!result) ResponsesUtil.notFound(res);
        else res.status(200).json({data: result});
    } catch(err) { return ResponsesUtil.somethingWentWrong(res) }
});

/***************************************************************
* NOT ALLOWED METHODS HANDLING
***************************************************************/

router.all('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => ResponsesUtil.methodNotAllowed(res));

/**************************************************************/

export default router;