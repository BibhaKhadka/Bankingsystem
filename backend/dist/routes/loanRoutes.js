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
const auth_1 = __importDefault(require("../middleware/auth"));
const loanController = __importStar(require("../controllers/loanController"));
const router = express_1.default.Router();
// Define your loan routes here
router.get('/', auth_1.default, (req, res) => {
    // Forward to getUserLoans to actually get the user's loans instead of just a message
    console.log('Root loan route accessed, forwarding to getUserLoans');
    loanController.getUserLoans(req, res);
});
// Route for loan application
router.post('/apply', auth_1.default, (req, res) => {
    console.log('Loan application received:', req.body);
    console.log('User from token:', req.user);
    loanController.applyForLoan(req, res);
});
// Route to get all loans for the current user
router.get('/my-loans', auth_1.default, (req, res) => {
    console.log('Getting loans for user:', req.user);
    loanController.getUserLoans(req, res);
});
// Route to get a specific loan by ID
router.get('/:loanId', auth_1.default, loanController.getLoanById);
exports.default = router;
