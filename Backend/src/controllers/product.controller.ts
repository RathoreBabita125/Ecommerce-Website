import { ILike } from "typeorm";
import { AppDataSource } from "../config/db.ts"
import { Category } from "../models/category.ts";
import { Product } from "../models/product.ts"
import { validateProducts } from "../validators/productValidate.ts";

export const productResolver = {
   Query: {
        getProducts: async (_: any, productData: any) => {
            const productRepo = AppDataSource.getRepository(Product);
            const { productName, brand, color, status, category } = productData;

            const where: any = {};

            if (productName) where.productName = ILike(`%${productName}%`);
            if (brand) where.brand = ILike(`%${brand}%`);
            if (color) where.color = ILike(`%${color}%`);
            if (status) where.status = ILike(`%${status}%`);
            if (category) where.category = { categoryName: ILike(`%${category}%`) };

            return await productRepo.find({
                where,
                relations: { category: true },
                order: { createdAt: "DESC" },
            });
        },
    },

    Mutation: {
        addProduct: async (_: any, productData: any) => {
            const productRepo = AppDataSource.getRepository(Product);
            const category = await AppDataSource.getRepository(Category).findOne({
                where: { id: productData.category }
            });

            if (!category) {
                throw new Error("Category not found");
            }
            validateProducts(productData);
            const newProduct = productRepo.create(
                {
                    productName: productData.productName,
                    productImage: productData.productImage,
                    slug: productData.slug,
                    description: productData.description,
                    price: productData.price,
                    discountPrice: productData.discountPrice,
                    size: productData.size,
                    color: productData.color,
                    brand:productData.brand,
                    status: productData.status,
                    stockQty: productData.stockQty,
                    category: category
                }
            );
            await productRepo.save(newProduct);
            return {
                message: "You have created product successfully.",
                product: newProduct
            }
        },

        editProduct: async (_: any, productData: any) => {
            const productRepo = AppDataSource.getRepository(Product);
            const product = await productRepo.findOne({
                where: {
                    id: productData.id
                },
                relations: {
                    category: true
                }
            });
            const category = await AppDataSource.getRepository(Category).findOne({ where: { id: productData.category } });

            if (!product) {
                throw new Error("Product does not exist.")
            }
            if (!category) {
                throw new Error("Category not found");
            }

            product.productName = productData?.productName
            product.productImage = productData?.productImage
            product.slug = productData?.slug
            product.description = productData?.description
            product.price=productData.price
            product.discountPrice = productData?.discountPrice
            product.stockQty = productData?.stockQty
            product.brand=productData?.brand
            product.color=productData?.color
            product.size=productData?.size
            product.status=productData.status
            product.category = category

            await productRepo.save(product);

            return {
                message: "Product has been updated succesfully",
                product: product
            }
        },

        deleteProduct: async (_: any, productData: any) => {
            const productRepo = AppDataSource.getRepository(Product);
            const product = await productRepo.findOne({ where: { id: productData.id } });
            if (!product) {
                throw new Error("Product does not exist.");
            }
            await productRepo.remove(product);
            return {
                message: "Product has been deleted successfully."
            }
        },
    }
}