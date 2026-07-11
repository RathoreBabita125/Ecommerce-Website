import { ILike } from "typeorm";
import { AppDataSource } from "../config/db.ts";
import { Category } from "../models/category.ts";
import { validateCategory } from "../validators/validateCategory.ts"

export const categoryResolver = {
    Query: {
        getCategories: async (_:any, categoryData:any) => {
            const { categoryName, slug, description, isActive } = categoryData;
            const categoryRepo = AppDataSource.getRepository(Category);
            
            const where: any = {};
            if (categoryName) {
                where.categoryName = ILike(`%${categoryName}%`);
            }
            if (slug) {
                where.slug = ILike(`%${slug}%`);
            }
            if (description) {
                where.description = ILike(`%${description}%`);
            }
            if (isActive !== undefined && isActive !== null) {
                where.isActive = isActive;
            }
            return await categoryRepo.find({ where, relations:{product:true}});
        }
    },
    Mutation: {
        addCategory: async (_: any, categoryData: any) => {
            validateCategory(categoryData);
            const categoryRepo = AppDataSource.getRepository(Category);
            const newCategory = categoryRepo.create(
                {
                    categoryName: categoryData.categoryName,
                    description: categoryData.description,
                    slug: categoryData.slug,
                    categoryImage: categoryData.categoryImage,
                    isActive: true
                }
            )
            await categoryRepo.save(newCategory);
            return {
                message: "Category is cretated successfully.",
                category: newCategory
            }
        },

        editCategory: async (_: any, categoryData: any) => {
            const categoryRepo = AppDataSource.getRepository(Category);
            const category = await categoryRepo.findOne({
                where: {
                    id: Number(categoryData.id)
                },
            });
            if (!category) {
                throw new Error("Category not found");
            }
            category.categoryName = categoryData.categoryName
            category.categoryImage = categoryData.categoryImage
            category.slug = categoryData.slug
            category.description = categoryData.description
            category.isActive = true
            await categoryRepo.save(category);
            return {
                message: "Category is updated successfully",
                category
            }
        },

        updateCategoryStatus: async (_: any, categoryData: any) => {
            const categoryRepo = AppDataSource.getRepository(Category);
            const category = await categoryRepo.findOne({
                where: {
                    id: Number(categoryData.id)
                },
            });
            if (!category) {
                throw new Error("This category not found")
            }
            category.isActive = !category.isActive;
            await categoryRepo.save(category);
            return {
                message: "Category status has beed updated successfully.",
            }
        },
    }
}