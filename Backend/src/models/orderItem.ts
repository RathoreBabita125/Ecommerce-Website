import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.ts";
import { Product } from "./product.ts";

@Entity()
export class OrderItems{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'int'})
    quantity!:number;

    @Column({type:'decimal'})
    price!:number;

    @Column({type:'decimal'})
    discount!:number;

    @CreateDateColumn({type:'date'})
    createdAt!:Date;

    @UpdateDateColumn({type:'date'})
    updatedAt!:Date;

    @ManyToOne(()=>Order)
    order!:Order;

    @ManyToOne(()=>Product)
    product!:Product;
}