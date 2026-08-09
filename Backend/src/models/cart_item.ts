import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { Cart } from "./cart.ts";
import { Product } from "./product.ts";

@Entity()
@Unique(["cart", "product"]) 
export class CartItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int', default: 1 })
    quantity!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number; 

    @Column({ type: 'varchar', nullable: true })
    selectedSize?: string; 

    @Column({ type: 'varchar', nullable: true })
    selectedColor?: string; 

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: "CASCADE" })
    cart!: Cart;

    @ManyToOne(() => Product, (product)=>product.items)
    product!: Product;
}