"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let CartService = class CartService {
    constructor() {
        this.userCarts = {};
    }
    findByUserId(userId) {
        return this.userCarts[userId];
    }
    createByUserId(userId) {
        const id = (0, uuid_1.v4)();
        const userCart = {
            id,
            items: [],
        };
        // @ts-ignore
        this.userCarts[userId] = userCart;
        return userCart;
    }
    findOrCreateByUserId(userId) {
        const userCart = this.findByUserId(userId);
        if (userCart) {
            return userCart;
        }
        // @ts-ignore
        return this.createByUserId(userId);
    }
    updateByUserId(userId, { items }) {
        const { id, ...rest } = this.findOrCreateByUserId(userId);
        const updatedCart = {
            id,
            ...rest,
            items: [...items],
        };
        this.userCarts[userId] = { ...updatedCart };
        return { ...updatedCart };
    }
    removeByUserId(userId) {
        // @ts-ignore
        this.userCarts[userId] = null;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)()
], CartService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUE0QztBQUU1QywrQkFBMEI7QUFLbkIsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBVztJQUFqQjtRQUNHLGNBQVMsR0FBeUIsRUFBRSxDQUFDO0lBaUQvQyxDQUFDO0lBL0NDLFlBQVksQ0FBQyxNQUFjO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBRSxNQUFNLENBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQWM7UUFDM0IsTUFBTSxFQUFFLEdBQUcsSUFBQSxTQUFFLEdBQUUsQ0FBQztRQUNoQixNQUFNLFFBQVEsR0FBRztZQUNmLEVBQUU7WUFDRixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFFRixhQUFhO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBRSxNQUFNLENBQUUsR0FBRyxRQUFRLENBQUM7UUFFcEMsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELG9CQUFvQixDQUFDLE1BQWM7UUFDakMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUzQyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ2IsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQztRQUVELGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFjLEVBQUUsRUFBRSxLQUFLLEVBQVE7UUFDNUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxRCxNQUFNLFdBQVcsR0FBRztZQUNsQixFQUFFO1lBQ0YsR0FBRyxJQUFJO1lBQ1AsS0FBSyxFQUFFLENBQUUsR0FBRyxLQUFLLENBQUU7U0FDcEIsQ0FBQTtRQUVELElBQUksQ0FBQyxTQUFTLENBQUUsTUFBTSxDQUFFLEdBQUcsRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDO1FBRTlDLE9BQU8sRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBTTtRQUNuQixhQUFhO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBRSxNQUFNLENBQUUsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztDQUVGLENBQUE7QUFsRFksa0NBQVc7c0JBQVgsV0FBVztJQUR2QixJQUFBLG1CQUFVLEdBQUU7R0FDQSxXQUFXLENBa0R2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyB2NCB9IGZyb20gJ3V1aWQnO1xyXG5cclxuaW1wb3J0IHsgQ2FydCB9IGZyb20gJy4uL21vZGVscyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYXJ0U2VydmljZSB7XHJcbiAgcHJpdmF0ZSB1c2VyQ2FydHM6IFJlY29yZDxzdHJpbmcsIENhcnQ+ID0ge307XHJcblxyXG4gIGZpbmRCeVVzZXJJZCh1c2VySWQ6IHN0cmluZyk6IENhcnQge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlckNhcnRzWyB1c2VySWQgXTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUJ5VXNlcklkKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBpZCA9IHY0KCk7XHJcbiAgICBjb25zdCB1c2VyQ2FydCA9IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGl0ZW1zOiBbXSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgdGhpcy51c2VyQ2FydHNbIHVzZXJJZCBdID0gdXNlckNhcnQ7XHJcblxyXG4gICAgcmV0dXJuIHVzZXJDYXJ0O1xyXG4gIH1cclxuXHJcbiAgZmluZE9yQ3JlYXRlQnlVc2VySWQodXNlcklkOiBzdHJpbmcpOiBDYXJ0IHtcclxuICAgIGNvbnN0IHVzZXJDYXJ0ID0gdGhpcy5maW5kQnlVc2VySWQodXNlcklkKTtcclxuXHJcbiAgICBpZiAodXNlckNhcnQpIHtcclxuICAgICAgcmV0dXJuIHVzZXJDYXJ0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUJ5VXNlcklkKHVzZXJJZCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVCeVVzZXJJZCh1c2VySWQ6IHN0cmluZywgeyBpdGVtcyB9OiBDYXJ0KTogQ2FydCB7XHJcbiAgICBjb25zdCB7IGlkLCAuLi5yZXN0IH0gPSB0aGlzLmZpbmRPckNyZWF0ZUJ5VXNlcklkKHVzZXJJZCk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlZENhcnQgPSB7XHJcbiAgICAgIGlkLFxyXG4gICAgICAuLi5yZXN0LFxyXG4gICAgICBpdGVtczogWyAuLi5pdGVtcyBdLFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXNlckNhcnRzWyB1c2VySWQgXSA9IHsgLi4udXBkYXRlZENhcnQgfTtcclxuXHJcbiAgICByZXR1cm4geyAuLi51cGRhdGVkQ2FydCB9O1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQnlVc2VySWQodXNlcklkKTogdm9pZCB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICB0aGlzLnVzZXJDYXJ0c1sgdXNlcklkIF0gPSBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuIl19