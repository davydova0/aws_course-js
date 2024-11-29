import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {CartStatus} from "./index";
import {CartItem} from "./cartItem.entity";

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:"varchar", nullable: false})
    userId: string;

    @Column({
        type: "enum",
        enum: CartStatus,
        default: CartStatus.OPEN
    })
    status: CartStatus;

    @OneToMany(() => CartItem, cart_item => cart_item.cart)
    cart_items: CartItem[]
}