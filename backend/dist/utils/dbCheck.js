"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Loan_1 = __importDefault(require("../models/Loan"));
// Load environment variables
dotenv_1.default.config();
// Script to check MongoDB connection and retrieve loan data
const checkDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-banking';
        console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);
        yield mongoose_1.default.connect(MONGODB_URI);
        console.log('Successfully connected to MongoDB');
        // Check if Loan collection exists and retrieve data
        console.log('Checking Loan collection...');
        const loanCount = yield Loan_1.default.countDocuments();
        console.log(`Total number of loans in the database: ${loanCount}`);
        if (loanCount > 0) {
            const loans = yield Loan_1.default.find().limit(5);
            console.log('Sample loans:', JSON.stringify(loans, null, 2));
        }
        else {
            console.log('No loans found in the database');
        }
        // Check database collections
        const collections = yield mongoose_1.default.connection.db.collections();
        console.log('Available collections:');
        collections.forEach(collection => {
            console.log(` - ${collection.collectionName}`);
        });
    }
    catch (error) {
        console.error('Database connection error:', error);
    }
    finally {
        // Close the connection
        yield mongoose_1.default.disconnect();
        console.log('MongoDB connection closed');
    }
});
// Run the check
checkDatabaseConnection();
