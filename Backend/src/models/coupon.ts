import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.ts";
import { User } from "./user.ts";

@Entity()
export class Coupon{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'text', unique:true})
    couponCode!:string;

    @Column({type:'int'})
    discount!:number;

    @Column({type:'int'})
    minOrderValue!:number;

    @Column({type:'timestamp'})
    expiryDate!:Date;

    @Column({type:'bool',default:true})
    isActive!:boolean;

    @OneToMany(()=>Order, (order)=>order.coupon)
    order!:Order[]

    @ManyToOne(()=>User, (user)=>user.coupon, { nullable: true })
    user!:User
} 