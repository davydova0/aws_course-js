"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    constructor() {
        this.users = {};
    }
    findOne(userId) {
        return this.users[userId];
    }
    createOne({ name, password }) {
        const id = (0, uuid_1.v4)();
        const newUser = { id: name || id, name, password };
        this.users[id] = newUser;
        return newUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBRTVDLCtCQUEwQjtBQUtuQixJQUFNLFlBQVksR0FBbEIsTUFBTSxZQUFZO0lBR3ZCO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFjO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBRSxNQUFNLENBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBUTtRQUNoQyxNQUFNLEVBQUUsR0FBRyxJQUFBLFNBQUUsR0FBRSxDQUFDO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBRW5ELElBQUksQ0FBQyxLQUFLLENBQUUsRUFBRSxDQUFFLEdBQUcsT0FBTyxDQUFDO1FBRTNCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FFRixDQUFBO0FBcEJZLG9DQUFZO3VCQUFaLFlBQVk7SUFEeEIsSUFBQSxtQkFBVSxHQUFFO0dBQ0EsWUFBWSxDQW9CeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgdjQgfSBmcm9tICd1dWlkJztcclxuXHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9tb2RlbHMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXNlcnNTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IHVzZXJzOiBSZWNvcmQ8c3RyaW5nLCBVc2VyPjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnVzZXJzID0ge31cclxuICB9XHJcblxyXG4gIGZpbmRPbmUodXNlcklkOiBzdHJpbmcpOiBVc2VyIHtcclxuICAgIHJldHVybiB0aGlzLnVzZXJzWyB1c2VySWQgXTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU9uZSh7IG5hbWUsIHBhc3N3b3JkIH06IFVzZXIpOiBVc2VyIHtcclxuICAgIGNvbnN0IGlkID0gdjQoKTtcclxuICAgIGNvbnN0IG5ld1VzZXIgPSB7IGlkOiBuYW1lIHx8IGlkLCBuYW1lLCBwYXNzd29yZCB9O1xyXG5cclxuICAgIHRoaXMudXNlcnNbIGlkIF0gPSBuZXdVc2VyO1xyXG5cclxuICAgIHJldHVybiBuZXdVc2VyO1xyXG4gIH1cclxuXHJcbn1cclxuIl19