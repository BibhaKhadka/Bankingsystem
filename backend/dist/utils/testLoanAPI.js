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
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Test token - this should be a valid JWT token from your application
// You can get this by logging in and retrieving it from localStorage in the browser
const TEST_TOKEN = 'YOUR_TEST_TOKEN_HERE';
// API base URL
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5002/api';
const apiClient = axios_1.default.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TEST_TOKEN}`
    }
});
// Test functions
const testGetLoans = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Testing GET /loans endpoint...');
        const response = yield apiClient.get('/loans');
        console.log('GET /loans response status:', response.status);
        console.log('GET /loans response data:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error getting loans:', error);
        return null;
    }
});
const testApplyForLoan = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // This should match your LoanApplication type
        const loanData = {
            accountId: 'YOUR_TEST_ACCOUNT_ID', // Replace with a valid account ID
            loanType: 'personal',
            amount: 10000,
            term: 24,
            purpose: 'Test loan application',
            creditScore: 750
        };
        console.log('Testing POST /loans/apply endpoint...');
        console.log('Loan application data:', loanData);
        const response = yield apiClient.post('/loans/apply', loanData);
        console.log('POST /loans/apply response status:', response.status);
        console.log('POST /loans/apply response data:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error applying for loan:', error);
        return null;
    }
});
// Run the tests
const runTests = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('=== API TESTING TOOL ===');
    // Get current loans
    console.log('\n1. Getting current loans:');
    yield testGetLoans();
    // Apply for a new loan
    // Uncomment to test loan application
    // console.log('\n2. Applying for a new loan:');
    // await testApplyForLoan();
    // Get loans again to verify the new loan appears
    // console.log('\n3. Getting updated loans:');
    // await testGetLoans();
});
runTests().catch(error => console.error('Test runner error:', error));
