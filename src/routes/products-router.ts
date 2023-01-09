import {Request, Response, Router} from "express";
import {productRepository} from "../repositories/products-repository";

export const productsRouter = Router({})

productsRouter.get("/", (req: Request, res: Response) => {
    const foundProducts = productRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})  //query there
productsRouter.post("/", (req: Request, res: Response) => {
    const newProducts = productRepository.createProduct(req.body.title)
    res.status(201).send(newProducts)
})
productsRouter.get("/:id", (req: Request, res: Response) => {
    let product = productRepository.findProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete("/:id", (req: Request, res: Response) => {
   const isDeleted = productRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
productsRouter.put("/:id", (req: Request, res: Response) => {
    const isUpdated = productRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        const product = productRepository.findProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})