import {productsCollection} from "./db";

const __products = [{id: 1, title: "tomato"}, {id: 2, title: "orange"}]

export const productRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        const filter: any = {}
        if(title) {
            filter.title = {$regex: title}
        }
        return productsCollection.find(filter).toArray()
    },
    async findProductById(id: number): Promise<ProductType | null> {
        let product: ProductType | null = await productsCollection
            .findOne({id})
        if(product) {
            return product
        } else {
            return null
        }
    },
    async createProduct(title: string): Promise<ProductType | null> {
        const newProduct: ProductType = {
            id: +(new Date()),
            title: title,
        }
        const result = await productsCollection
            .insertOne(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        const result = await productsCollection
            .updateOne({id},{$set: {title}})
        return result.matchedCount === 1
    },
    async deleteProduct (id: number): Promise<boolean> {
        const result = await productsCollection
            .deleteOne({id})
        return result.deletedCount === 1
    }
}

export type ProductType = {
    id: number
    title: string
}