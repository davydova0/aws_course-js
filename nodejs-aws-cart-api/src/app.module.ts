import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import {Cart} from "./cart/models/cart.entity";
import {CartItem} from "./cart/models/cartItem.entity";


@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      password: process.env.RDS_PASSWORD,
      host: process.env.RDS_HOSTNAME,
      port: +process.env.RDS_PORT,
      username: process.env.RDS_USERNAME,
      database: "ProductDatabase",
      entities: [Cart, CartItem],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      }
    }),
    TypeOrmModule.forFeature([Cart, CartItem]),
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
