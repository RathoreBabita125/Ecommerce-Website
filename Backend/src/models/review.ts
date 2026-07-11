import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.ts";
import { Product } from "./product.ts";

@Entity()
export class Review{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'int'})
    rating!:number;

    @Column({type:'text'})
    comment!:string;

    @CreateDateColumn({type:'date'})
    createdAt!:Date;

    @ManyToOne(()=>User, (user)=>user.review)
    user!:User;

    @ManyToOne(()=>Product, (product)=>product.review)
    product!:Product;
}