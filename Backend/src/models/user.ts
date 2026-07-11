import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "./review.ts";
import { Cart } from "./cart.ts";
import { Address } from "./address.ts";
import { Order } from "./order.ts";
import { Coupon } from "./coupon.ts";

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
    coupon!:Coupon[]

}