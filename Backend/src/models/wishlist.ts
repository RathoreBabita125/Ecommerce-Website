import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.ts";
import { Product } from "./product.ts";

@Entity()
export class Wishlist{
    @PrimaryGeneratedColumn()
    id!:number;

    @CreateDateColumn({type:'date'})
    createdAt!:'date';

    @UpdateDateColumn({type:'date'})
    updatedAt!:'date';

    @ManyToOne(()=>User)
    user!:User;

    @ManyToOne(()=>Product, (product)=>product.wishlist)
    product!:Product;
}