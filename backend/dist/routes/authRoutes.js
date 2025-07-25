"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authController = __importStar(require("../controllers/authController"));
const router = express_1.default.Router();
// Register route with validation
router.post('/register', [
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('Last name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Must be a valid email'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('phoneNumber').notEmpty().withMessage('Phone number is required'),
    (0, express_validator_1.body)('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
    (0, express_validator_1.body)('address.street').notEmpty().withMessage('Street address is required'),
    (0, express_validator_1.body)('address.city').notEmpty().withMessage('City is required'),
    (0, express_validator_1.body)('address.state').notEmpty().withMessage('State is required'),
    (0, express_validator_1.body)('address.postalCode').notEmpty().withMessage('Postal code is required'),
    (0, express_validator_1.body)('address.country').notEmpty().withMessage('Country is required')
], authController.register);
// Login route with validation
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Must be a valid email'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required')
], authController.login);
exports.default = router;
