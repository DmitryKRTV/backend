import {NextFunction, Request, Response, Router} from "express";

const addresses = [{id: 1, value: "Pushkina st."}, {id: 2, value: "Kolotushkina house"}]

let requestsCounter = 0;

export const addressesRouter = Router({})

const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.token === "123") {
        next()
    } else {
        res.send(404)
    }
    ;
};
const requestsCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    requestsCounter++;
    next();
};

addressesRouter.use(requestsCounterMiddleware)
addressesRouter.use(exampleMiddleware)

addressesRouter.get("/", (req: Request, res: Response) => {
    res.send(addresses)
})

addressesRouter.get("/requests", (req: Request, res: Response) => {
    res.send({requestsCounter})
})

addressesRouter.get("/:id", (req: Request, res: Response) => {
    let address = addresses.find(p => p.id === +req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
    res.send(addresses)
})


