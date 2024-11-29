import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Cart} from "./cart.entity";

@Entity('cart_items')
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', nullable: false})
    product_id: string

    @Column({ type: 'int' })
    count: number

    @ManyToOne(() => Cart, cart => cart.cart_items, { onDelete: 'CASCADE' })
    cart: Cart
}


