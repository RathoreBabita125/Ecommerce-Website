import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.ts";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'text'})
    categoryName!:string;

    @Column({type:'text'})
    slug!:string;

    @Column({type:'text'})
    categoryImage!:string;

    @Column({type:'text'})
    description!:string

    @Column({type:'boolean', default:true})
    isActive!:boolean

    @CreateDateColumn({type:"date"})
    createdAt!:Date

    @UpdateDateColumn({type:'date'})
    updatedAt!:Date

    @OneToMany(()=>Product,(product)=>product.category)
    product!:Product[];
}