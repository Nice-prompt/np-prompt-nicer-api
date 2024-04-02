"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// PORT
const PORT = process.env.PORT || 8081;
// Listen on port 8081
app_1.default.listen(PORT, () => console.log(`Application is listening on port ${PORT}!`));
//# sourceMappingURL=index.js.map