import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.ts";
import { Product } from "./product.ts";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type:'int'})
    quantity!:number

    @CreateDateColumn({type:'date'})
    createdAt!:Date

    @DeleteDateColumn({type:'date'})
    deletedAt!:Date

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Product, (product) => product.cart)
    product!: Product;
}