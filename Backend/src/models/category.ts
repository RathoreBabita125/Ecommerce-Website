import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.ts";
import type { User } from "./user.ts";

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

    @ManyToOne(()=>User, (user)=>user.category)
    user!:User
}