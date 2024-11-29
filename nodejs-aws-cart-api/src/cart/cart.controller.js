"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const shared_1 = require("../shared");
const models_rules_1 = require("./models-rules");
let CartController = class CartController {
    constructor(cartService, orderService) {
        this.cartService = cartService;
        this.orderService = orderService;
    }
    // @UseGuards(JwtAuthGuard)
    // @UseGuards(BasicAuthGuard)
    findUserCart(req) {
        //@ts-ignore
        const cart = this.cartService.findOrCreateByUserId((0, shared_1.getUserIdFromRequest)(req));
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
            data: { cart, total: (0, models_rules_1.calculateCartTotal)(cart) },
        };
    }
    // @UseGuards(JwtAuthGuard)
    // @UseGuards(BasicAuthGuard)
    updateUserCart(req, body) {
        //@ts-ignore
        const cart = this.cartService.updateByUserId((0, shared_1.getUserIdFromRequest)(req), body);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
            data: {
                cart,
                total: (0, models_rules_1.calculateCartTotal)(cart),
            }
        };
    }
    // @UseGuards(JwtAuthGuard)
    // @UseGuards(BasicAuthGuard)
    clearUserCart(req) {
        this.cartService.removeByUserId((0, shared_1.getUserIdFromRequest)(req));
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
        };
    }
    // @UseGuards(JwtAuthGuard)
    // @UseGuards(BasicAuthGuard)
    checkout(req, body) {
        const userId = (0, shared_1.getUserIdFromRequest)(req);
        //@ts-ignore
        const cart = this.cartService.findByUserId(userId);
        if (!(cart && cart.items.length)) {
            const statusCode = common_1.HttpStatus.BAD_REQUEST;
            req.statusCode = statusCode;
            return {
                statusCode,
                message: 'Cart is empty',
            };
        }
        const { id: cartId, items } = cart;
        const total = (0, models_rules_1.calculateCartTotal)(cart);
        const order = this.orderService.create({
            ...body, // TODO: validate and pick only necessary data
            userId,
            cartId,
            items,
            total,
        });
        this.cartService.removeByUserId(userId);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
            data: { order }
        };
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)())
], CartController.prototype, "findUserCart", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)())
], CartController.prototype, "updateUserCart", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Req)())
], CartController.prototype, "clearUserCart", null);
__decorate([
    (0, common_1.Post)('checkout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)())
], CartController.prototype, "checkout", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('api/profile/cart')
], CartController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FydC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzRztBQUl0RyxzQ0FBNkQ7QUFFN0QsaURBQW9EO0FBSTdDLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFDekIsWUFDVSxXQUF3QixFQUN4QixZQUEwQjtRQUQxQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUNoQyxDQUFDO0lBRUwsMkJBQTJCO0lBQzNCLDZCQUE2QjtJQUU3QixZQUFZLENBQVEsR0FBZTtRQUNqQyxZQUFZO1FBQ1osTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFBLDZCQUFvQixFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFOUUsT0FBTztZQUNMLFVBQVUsRUFBRSxtQkFBVSxDQUFDLEVBQUU7WUFDekIsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUEsaUNBQWtCLEVBQUMsSUFBSSxDQUFDLEVBQUU7U0FDaEQsQ0FBQTtJQUNILENBQUM7SUFFRCwyQkFBMkI7SUFDM0IsNkJBQTZCO0lBRTdCLGNBQWMsQ0FBUSxHQUFlLEVBQVUsSUFBSTtRQUNqRCxZQUFZO1FBQ1osTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBQSw2QkFBb0IsRUFBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUU3RSxPQUFPO1lBQ0wsVUFBVSxFQUFFLG1CQUFVLENBQUMsRUFBRTtZQUN6QixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRTtnQkFDSixJQUFJO2dCQUNKLEtBQUssRUFBRSxJQUFBLGlDQUFrQixFQUFDLElBQUksQ0FBQzthQUNoQztTQUNGLENBQUE7SUFDSCxDQUFDO0lBRUQsMkJBQTJCO0lBQzNCLDZCQUE2QjtJQUU3QixhQUFhLENBQVEsR0FBZTtRQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFBLDZCQUFvQixFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFM0QsT0FBTztZQUNMLFVBQVUsRUFBRSxtQkFBVSxDQUFDLEVBQUU7WUFDekIsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFBO0lBQ0gsQ0FBQztJQUVELDJCQUEyQjtJQUMzQiw2QkFBNkI7SUFFN0IsUUFBUSxDQUFRLEdBQWUsRUFBVSxJQUFJO1FBRTNDLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQW9CLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDekMsWUFBWTtRQUNaLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDakMsTUFBTSxVQUFVLEdBQUcsbUJBQVUsQ0FBQyxXQUFXLENBQUM7WUFDMUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7WUFFM0IsT0FBTztnQkFDTCxVQUFVO2dCQUNWLE9BQU8sRUFBRSxlQUFlO2FBQ3pCLENBQUE7UUFDSCxDQUFDO1FBRUQsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUEsaUNBQWtCLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDckMsR0FBRyxJQUFJLEVBQUUsOENBQThDO1lBQ3ZELE1BQU07WUFDTixNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7U0FDTixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QyxPQUFPO1lBQ0wsVUFBVSxFQUFFLG1CQUFVLENBQUMsRUFBRTtZQUN6QixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRTtTQUNoQixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFyRlksd0NBQWM7QUFTekI7SUFEQyxJQUFBLFlBQUcsR0FBRTtJQUNRLFdBQUEsSUFBQSxZQUFHLEdBQUUsQ0FBQTtrREFTbEI7QUFLRDtJQURDLElBQUEsWUFBRyxHQUFFO0lBQ1UsV0FBQSxJQUFBLFlBQUcsR0FBRSxDQUFBO0lBQW1CLFdBQUEsSUFBQSxhQUFJLEdBQUUsQ0FBQTtvREFZN0M7QUFLRDtJQURDLElBQUEsZUFBTSxHQUFFO0lBQ00sV0FBQSxJQUFBLFlBQUcsR0FBRSxDQUFBO21EQU9uQjtBQUtEO0lBREMsSUFBQSxhQUFJLEVBQUMsVUFBVSxDQUFDO0lBQ1AsV0FBQSxJQUFBLFlBQUcsR0FBRSxDQUFBO0lBQW1CLFdBQUEsSUFBQSxhQUFJLEdBQUUsQ0FBQTs4Q0FnQ3ZDO3lCQXBGVSxjQUFjO0lBRDFCLElBQUEsbUJBQVUsRUFBQyxrQkFBa0IsQ0FBQztHQUNsQixjQUFjLENBcUYxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgRGVsZXRlLCBQdXQsIEJvZHksIFJlcSwgUG9zdCwgVXNlR3VhcmRzLCBIdHRwU3RhdHVzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5cclxuLy8gaW1wb3J0IHsgQmFzaWNBdXRoR3VhcmQsIEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2F1dGgnO1xyXG5pbXBvcnQgeyBPcmRlclNlcnZpY2UgfSBmcm9tICcuLi9vcmRlcic7XHJcbmltcG9ydCB7IEFwcFJlcXVlc3QsIGdldFVzZXJJZEZyb21SZXF1ZXN0IH0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbmltcG9ydCB7IGNhbGN1bGF0ZUNhcnRUb3RhbCB9IGZyb20gJy4vbW9kZWxzLXJ1bGVzJztcclxuaW1wb3J0IHsgQ2FydFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzJztcclxuXHJcbkBDb250cm9sbGVyKCdhcGkvcHJvZmlsZS9jYXJ0JylcclxuZXhwb3J0IGNsYXNzIENhcnRDb250cm9sbGVyIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IENhcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBvcmRlclNlcnZpY2U6IE9yZGVyU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIC8vIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxyXG4gIC8vIEBVc2VHdWFyZHMoQmFzaWNBdXRoR3VhcmQpXHJcbiAgQEdldCgpXHJcbiAgZmluZFVzZXJDYXJ0KEBSZXEoKSByZXE6IEFwcFJlcXVlc3QpIHtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgY2FydCA9IHRoaXMuY2FydFNlcnZpY2UuZmluZE9yQ3JlYXRlQnlVc2VySWQoZ2V0VXNlcklkRnJvbVJlcXVlc3QocmVxKSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogSHR0cFN0YXR1cy5PSyxcclxuICAgICAgbWVzc2FnZTogJ09LJyxcclxuICAgICAgZGF0YTogeyBjYXJ0LCB0b3RhbDogY2FsY3VsYXRlQ2FydFRvdGFsKGNhcnQpIH0sXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcclxuICAvLyBAVXNlR3VhcmRzKEJhc2ljQXV0aEd1YXJkKVxyXG4gIEBQdXQoKVxyXG4gIHVwZGF0ZVVzZXJDYXJ0KEBSZXEoKSByZXE6IEFwcFJlcXVlc3QsIEBCb2R5KCkgYm9keSkgeyAvLyBUT0RPOiB2YWxpZGF0ZSBib2R5IHBheWxvYWQuLi5cclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgY2FydCA9IHRoaXMuY2FydFNlcnZpY2UudXBkYXRlQnlVc2VySWQoZ2V0VXNlcklkRnJvbVJlcXVlc3QocmVxKSwgYm9keSlcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdGF0dXNDb2RlOiBIdHRwU3RhdHVzLk9LLFxyXG4gICAgICBtZXNzYWdlOiAnT0snLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgY2FydCxcclxuICAgICAgICB0b3RhbDogY2FsY3VsYXRlQ2FydFRvdGFsKGNhcnQpLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBAVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcclxuICAvLyBAVXNlR3VhcmRzKEJhc2ljQXV0aEd1YXJkKVxyXG4gIEBEZWxldGUoKVxyXG4gIGNsZWFyVXNlckNhcnQoQFJlcSgpIHJlcTogQXBwUmVxdWVzdCkge1xyXG4gICAgdGhpcy5jYXJ0U2VydmljZS5yZW1vdmVCeVVzZXJJZChnZXRVc2VySWRGcm9tUmVxdWVzdChyZXEpKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdGF0dXNDb2RlOiBIdHRwU3RhdHVzLk9LLFxyXG4gICAgICBtZXNzYWdlOiAnT0snLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXHJcbiAgLy8gQFVzZUd1YXJkcyhCYXNpY0F1dGhHdWFyZClcclxuICBAUG9zdCgnY2hlY2tvdXQnKVxyXG4gIGNoZWNrb3V0KEBSZXEoKSByZXE6IEFwcFJlcXVlc3QsIEBCb2R5KCkgYm9keSkge1xyXG5cclxuICAgIGNvbnN0IHVzZXJJZCA9IGdldFVzZXJJZEZyb21SZXF1ZXN0KHJlcSk7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGNvbnN0IGNhcnQgPSB0aGlzLmNhcnRTZXJ2aWNlLmZpbmRCeVVzZXJJZCh1c2VySWQpO1xyXG5cclxuICAgIGlmICghKGNhcnQgJiYgY2FydC5pdGVtcy5sZW5ndGgpKSB7XHJcbiAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUO1xyXG4gICAgICByZXEuc3RhdHVzQ29kZSA9IHN0YXR1c0NvZGVcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RhdHVzQ29kZSxcclxuICAgICAgICBtZXNzYWdlOiAnQ2FydCBpcyBlbXB0eScsXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGlkOiBjYXJ0SWQsIGl0ZW1zIH0gPSBjYXJ0O1xyXG4gICAgY29uc3QgdG90YWwgPSBjYWxjdWxhdGVDYXJ0VG90YWwoY2FydCk7XHJcbiAgICBjb25zdCBvcmRlciA9IHRoaXMub3JkZXJTZXJ2aWNlLmNyZWF0ZSh7XHJcbiAgICAgIC4uLmJvZHksIC8vIFRPRE86IHZhbGlkYXRlIGFuZCBwaWNrIG9ubHkgbmVjZXNzYXJ5IGRhdGFcclxuICAgICAgdXNlcklkLFxyXG4gICAgICBjYXJ0SWQsXHJcbiAgICAgIGl0ZW1zLFxyXG4gICAgICB0b3RhbCxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jYXJ0U2VydmljZS5yZW1vdmVCeVVzZXJJZCh1c2VySWQpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IEh0dHBTdGF0dXMuT0ssXHJcbiAgICAgIG1lc3NhZ2U6ICdPSycsXHJcbiAgICAgIGRhdGE6IHsgb3JkZXIgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=