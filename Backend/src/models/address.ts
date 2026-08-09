import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.ts";
import { Order } from "./order.ts";


@Entity()
export class Address{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'varchar', length:15})
    phone!:string;

    @Column({type:'text'})
    address_line1!:string;

    @Column({type:'text',nullable:true})
    address_line2?:string;

    @Column({type:'text',nullable:true})
    landmark?:string;

    @Column({type:'text', nullable:true})
    type!:string;

    @Column({type:'varchar', length:100})
    city!:string;

    @Column({type:'varchar', length:100})
    state!:string;

    @Column({type:'varchar', length:10})
    pincode!:string;

    @Column({type:'varchar', length:100})
    country!:string;

    @CreateDateColumn()
    createdAt!:Date;

    @UpdateDateColumn()
    updatedAt!:Date;

    @DeleteDateColumn()
    deletedAt!:Date;

    @ManyToOne(()=>User, user=>user.address)
    user!:User;

    @ManyToOne(()=>Order, order=>order.address)
    order!:Order
}