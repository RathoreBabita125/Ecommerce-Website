import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.ts";
import { Product } from "./product.ts";

@Entity()
export class Wishlist{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'bool', default:null})
    isWishlisted!:boolean;

    @CreateDateColumn({type:'date'})
    createdAt!:Date;

    @UpdateDateColumn({type:'date'})
    updatedAt!:Date;

    @ManyToOne(()=>User)
    user!:User;

    @ManyToOne(()=>Product, (product)=>product.wishlist)
    product!:Product;
}