import {Request, Response, Router} from "express";
import {productRepository} from "../repositories/products-db-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const productsRouter = Router({})

const titleValidation =  body('title').trim().isLength({min: 3, max: 100}).withMessage("Title length should be from 3 to 10 symbols")

productsRouter.get("/", async (req: Request, res: Response) => {
    const foundProducts = await productRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})  //query there
productsRouter.post("/",
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        if (!req.body.title.trim()) {
            res.status(401).send({message: "title is required  "})
        }
        const newProducts = await productRepository.createProduct(req.body.title)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        res.status(201).send(newProducts)
    })
productsRouter.get("/:id", async (req: Request, res: Response) => {
    let product = await productRepository.findProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete("/:id", async (req: Request, res: Response) => {
    const isDeleted = await productRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
productsRouter.put("/:id",
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated = await productRepository.updateProduct(+req.params.id, req.body.title)

        if (isUpdated) {
            const product = await productRepository.findProductById(+req.params.id)
            res.send(product)
        } else {
            res.send(404)
        }
    }
)
