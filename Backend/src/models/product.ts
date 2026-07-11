import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinTable } from "typeorm";
import { User } from "./user.ts";
import { Category } from "./category.ts";
import { Review } from "./review.ts";
import { Wishlist } from "./wishlist.ts";
import { Cart } from "./cart.ts";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    productName!: string;

    @Column({ type: 'text' })
    productImage!: string

    @Column({ type: 'text' })
    slug!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'text', nullable: true })
    brand!: string;

    @Column({ type: 'text', nullable: true })
    color?: string;

    @Column({ type: 'text', nullable: true })
    size?: string;

    @Column({type:'int'})
    price!:number

    @Column({ type: 'int' })
    discountPrice!: number;

    @Column({ type: 'int' })
    stockQty!: number;

    @Column({ type: 'text' , nullable:true})
    status!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;

    @OneToMany(() => Review, (review) => review.product)
    review!: Review[];

    @ManyToOne(() => Category, (category) => category.product)
    category!: Category;

    @ManyToOne(() => Wishlist, (wishlist) => wishlist.product)
    wishlist!: Wishlist;

    @OneToMany(() => Cart, (cart) => cart.product)
    cart!: Cart[];

    @ManyToMany(() => User)
    @JoinTable()
    user!: User[];
}