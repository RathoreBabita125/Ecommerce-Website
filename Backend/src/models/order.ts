import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coupon } from "./coupon.ts";
import { User } from "./user.ts";
import { Address } from "./address.ts";
import { OrderItems } from "./orderItem.ts";

enum OrderStatus{
    PENDING="PENDING",
    CONFIRMED="CONFIRMED",
    PACKED="PACKED",
    SHIPPED="SHIPPED",
    DELIVERED="DELIVERED",
    CANCELLED="CANCELLED"
};
enum PaymentMethod{
    COD="COD",
    UPI="UPI",
    CARD="CARD"
};
enum PaymentStatus{
    PENDING="PENDING",
    PAID="PAID",
    FAILED="FAILED",
};

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'enum', enum:OrderStatus, default:OrderStatus.PENDING})
    orderStatus!:OrderStatus;

    @Column({type:'decimal', precision:10, scale:2, default:0})
    subTotal!:number;

    @Column({type:'decimal', precision:10, scale:2, default:0})
    discountAmount!:number;

    @Column({type:'decimal', precision:10, scale:2, default:0})
    taxAmount!:number;

    @Column({type:'decimal', precision:10, scale:2, default:0})
    shippingCharge!:number;

    @Column({type:'decimal', precision:10, scale:2, default:0})
    totalAmount!:number;

    @Column({type:'enum', enum:PaymentMethod, default:PaymentMethod.UPI})
    paymentMethod!:PaymentMethod;

    @Column({type:'enum', enum:PaymentStatus, default:PaymentStatus.PENDING})
    paymentStatus!:PaymentStatus;

    @Column({ type: "timestamp", nullable: true })
    placedAt?:Date;

    @Column({ type: "timestamp", nullable: true })
    deliveredAt?:Date;

    @Column({ type: "timestamp", nullable: true })
    cancelledAt?:Date;

    @CreateDateColumn({type:'date'})
    createdAt!:Date;

    @DeleteDateColumn({type:'date'})
    deletedAt!:Date;

    @ManyToOne(()=>Coupon, (coupon)=> coupon.order,{nullable:true})
    coupon?:Coupon;

    @ManyToOne(()=>User, (user)=>user.order)
    user!:User;

    @ManyToOne(()=>Address, (address)=>address.order)
    address!:Address;

    @OneToMany(()=>OrderItems, (item)=>item.order, {cascade:true})
    items!:OrderItems[];
}