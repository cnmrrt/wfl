#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Header validation function
const validationFunction = `
// Header validation function to prevent invalid header values
function isValidHeaderValue(value) {
  if (typeof value !== 'string') return false;
  // Check for invalid characters that can cause Cloudflare Workers errors
  // According to RFC 7230, header values should not contain control characters
  // and certain special characters that can cause issues
  if (/[\\x00-\\x1F\\x7F]/.test(value)) return false;
  // Check for patterns that might indicate invalid data (like asterisks)
  if (/^\\*+$/.test(value)) return false;
  // Check for other problematic patterns
  if (/^[\\s\\*\\-_]+$/.test(value)) return false;
  return true;
}`;

// Function to fix headers in a file
function fixHeadersInFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the validation function is already present
  if (content.includes('isValidHeaderValue')) {
    console.log(`Headers already fixed in: ${filePath}`);
    return;
  }

  // Add validation function after the initial setup
  const insertPoint = content.indexOf('globalThis.openNextDebug = false;globalThis.openNextVersion = "3.7.7";');
  if (insertPoint !== -1) {
    const endOfLine = content.indexOf('\n', insertPoint);
    content = content.slice(0, endOfLine + 1) + validationFunction + '\n' + content.slice(endOfLine + 1);
  }

  // Fix the header setting logic
  const headerSetPattern = /headers\.set\(key, value\);/g;
  const headerAppendPattern = /headers\.append\(key, v\);/g;
  
  content = content.replace(headerSetPattern, 
    'if (value && typeof value === \'string\' && isValidHeaderValue(value)) {\n              headers.set(key, value);\n            }');
  
  content = content.replace(headerAppendPattern, 
    'if (v && typeof v === \'string\' && isValidHeaderValue(v)) {\n                headers.append(key, v);\n              }');

  fs.writeFileSync(filePath, content);
  console.log(`Fixed headers in: ${filePath}`);
}

// Main execution
function main() {
  const openNextDir = path.join(__dirname, '..', '.open-next');
  
  // Fix server function
  const serverFunctionPath = path.join(openNextDir, 'server-functions', 'default', 'index.mjs');
  fixHeadersInFile(serverFunctionPath);
  
  // Fix middleware handler
  const middlewarePath = path.join(openNextDir, 'middleware', 'handler.mjs');
  fixHeadersInFile(middlewarePath);
  
  console.log('Header validation fixes applied successfully!');
}

if (require.main === module) {
  main();
}

module.exports = { fixHeadersInFile };
