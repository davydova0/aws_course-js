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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("./auth");
let AppController = class AppController {
    constructor(authService) {
        this.authService = authService;
    }
    healthCheck() {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
        };
    }
    async login(req) {
        const token = this.authService.login(req.user, 'basic');
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
            data: {
                ...token,
            },
        };
    }
    async getProfile(req) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
            data: {
                user: req.user,
            },
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(['', 'ping'])
], AppController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.UseGuards)(auth_1.LocalAuthGuard),
    (0, common_1.Post)('api/auth/login'),
    __param(0, (0, common_1.Request)())
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_1.BasicAuthGuard),
    (0, common_1.Get)('api/profile'),
    __param(0, (0, common_1.Request)())
], AppController.prototype, "getProfile", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBdUY7QUFDdkYsaUNBQW1GO0FBRzVFLElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7SUFFeEIsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBRyxDQUFDO0lBR2hELFdBQVc7UUFDVCxPQUFPO1lBQ0wsVUFBVSxFQUFFLG1CQUFVLENBQUMsRUFBRTtZQUN6QixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUM7SUFDSixDQUFDO0lBSUssQUFBTixLQUFLLENBQUMsS0FBSyxDQUFZLEdBQU87UUFDNUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV4RCxPQUFRO1lBQ04sVUFBVSxFQUFFLG1CQUFVLENBQUMsRUFBRTtZQUN6QixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRTtnQkFDSixHQUFHLEtBQUs7YUFDVDtTQUNGLENBQUM7SUFDSixDQUFDO0lBSUssQUFBTixLQUFLLENBQUMsVUFBVSxDQUFZLEdBQU87UUFDakMsT0FBTztZQUNMLFVBQVUsRUFBRSxtQkFBVSxDQUFDLEVBQUU7WUFDekIsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2FBQ2Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFyQ1ksc0NBQWE7QUFLeEI7SUFEQyxJQUFBLFlBQUcsRUFBQyxDQUFFLEVBQUUsRUFBRSxNQUFNLENBQUUsQ0FBQztnREFNbkI7QUFJSztJQUZMLElBQUEsa0JBQVMsRUFBQyxxQkFBYyxDQUFDO0lBQ3pCLElBQUEsYUFBSSxFQUFDLGdCQUFnQixDQUFDO0lBQ1YsV0FBQSxJQUFBLGdCQUFPLEdBQUUsQ0FBQTswQ0FVckI7QUFJSztJQUZMLElBQUEsa0JBQVMsRUFBQyxxQkFBYyxDQUFDO0lBQ3pCLElBQUEsWUFBRyxFQUFDLGFBQWEsQ0FBQztJQUNELFdBQUEsSUFBQSxnQkFBTyxHQUFFLENBQUE7K0NBUTFCO3dCQXBDVSxhQUFhO0lBRHpCLElBQUEsbUJBQVUsR0FBRTtHQUNBLGFBQWEsQ0FxQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbGxlciwgR2V0LCBSZXF1ZXN0LCBQb3N0LCBVc2VHdWFyZHMsIEh0dHBTdGF0dXMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XHJcbmltcG9ydCB7IExvY2FsQXV0aEd1YXJkLCBBdXRoU2VydmljZSwgSnd0QXV0aEd1YXJkLCBCYXNpY0F1dGhHdWFyZCB9IGZyb20gJy4vYXV0aCc7XHJcblxyXG5AQ29udHJvbGxlcigpXHJcbmV4cG9ydCBjbGFzcyBBcHBDb250cm9sbGVyIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHt9XHJcblxyXG4gIEBHZXQoWyAnJywgJ3BpbmcnIF0pXHJcbiAgaGVhbHRoQ2hlY2soKTogYW55IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1c0NvZGU6IEh0dHBTdGF0dXMuT0ssXHJcbiAgICAgIG1lc3NhZ2U6ICdPSycsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgQFVzZUd1YXJkcyhMb2NhbEF1dGhHdWFyZClcclxuICBAUG9zdCgnYXBpL2F1dGgvbG9naW4nKVxyXG4gIGFzeW5jIGxvZ2luKEBSZXF1ZXN0KCkgcmVxOmFueSkge1xyXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luKHJlcS51c2VyLCAnYmFzaWMnKTtcclxuXHJcbiAgICByZXR1cm4gIHtcclxuICAgICAgc3RhdHVzQ29kZTogSHR0cFN0YXR1cy5PSyxcclxuICAgICAgbWVzc2FnZTogJ09LJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIC4uLnRva2VuLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIEBVc2VHdWFyZHMoQmFzaWNBdXRoR3VhcmQpXHJcbiAgQEdldCgnYXBpL3Byb2ZpbGUnKVxyXG4gIGFzeW5jIGdldFByb2ZpbGUoQFJlcXVlc3QoKSByZXE6YW55KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdGF0dXNDb2RlOiBIdHRwU3RhdHVzLk9LLFxyXG4gICAgICBtZXNzYWdlOiAnT0snLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=