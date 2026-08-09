import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "./review.ts";
import { Cart } from "./cart.ts";
import { Address } from "./address.ts";
import { Order } from "./order.ts";
import { Coupon } from "./coupon.ts";
import { Product } from "./product.ts";
import type { Category } from "./category.ts";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    firstName!: string;

    @Column({ type: 'text' })
    lastName!: string;

    @Column({ type: 'text' })
    email!: string;

    @Column({ type: 'text' })
    password!: string;
    
    @Column({ type: 'text' })
    role!: string;
    
    @Column({ type: 'text', nullable:true })
    status!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;

    @OneToMany(() => Address, (address)=>address.user)
    address!: Address[];

    @OneToMany(() => Review, (review) => review.user)
    review!: Review;

    @OneToMany(() => Cart, (cart) => cart.user)
    cart!: Cart[];

    @ManyToOne(()=>Order, (order)=>order.user)
    order!:Order[];

    @OneToMany(()=>Coupon, (coupon)=>coupon.user)
    coupon!:Coupon[];

    @OneToMany(()=>Product, (product)=>product.user)
    product!:Product;

    @OneToMany(()=>Category, (category)=>category.user)
    category!:Category;

}