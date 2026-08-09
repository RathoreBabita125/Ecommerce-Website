import {CreateDateColumn,Entity,OneToMany,ManyToOne,PrimaryGeneratedColumn,} from "typeorm";
import { User } from "./user.ts";
import { CartItem } from "./cart_item.ts";
import { Product } from "./product.ts";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
    items!: CartItem[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
}