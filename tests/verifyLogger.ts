import { Logger } from '../src/utils/logger';

console.log("=== Verifying Logger ===");

const logger = Logger.getInstance();

console.log("Test 1: Log Info");
logger.log("This is an info message.", "TestContext");

console.log("Test 2: Log Warning");
logger.warn("This is a warning message.", "TestContext");

console.log("Test 3: Log Error");
logger.error("This is an error message.", "TestContext");

console.log("PASS: Check console output for [INFO], [WARN], [ERROR] tags.");
