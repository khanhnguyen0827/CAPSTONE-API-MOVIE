#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testCategories = [
  'health',
  'auth', 
  'legacy',
  'modern',
  'integration'
];

console.log('🧪 Movie Ticketing API Test Suite');
console.log('=====================================\n');

async function runTestCategory(category) {
  return new Promise((resolve, reject) => {
    console.log(`\n📋 Running ${category} tests...`);
    
    const testFile = join(__dirname, 'api', `${category}.test.js`);
    const jestProcess = spawn('npx', ['jest', testFile, '--verbose'], {
      stdio: 'pipe',
      shell: true
    });

    let output = '';
    let errorOutput = '';

    jestProcess.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      process.stdout.write(text);
    });

    jestProcess.stderr.on('data', (data) => {
      const text = data.toString();
      errorOutput += text;
      process.stderr.write(text);
    });

    jestProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${category} tests completed successfully\n`);
        resolve({ category, success: true, output, errorOutput });
      } else {
        console.log(`❌ ${category} tests failed with code ${code}\n`);
        resolve({ category, success: false, output, errorOutput, code });
      }
    });

    jestProcess.on('error', (error) => {
      console.log(`💥 Error running ${category} tests:`, error.message);
      reject({ category, error });
    });
  });
}

async function runAllTests() {
  const results = [];
  
  for (const category of testCategories) {
    try {
      const result = await runTestCategory(category);
      results.push(result);
    } catch (error) {
      results.push({ category, success: false, error: error.message });
    }
  }

  // Summary
  console.log('\n📊 Test Summary');
  console.log('================');
  
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.category}: ${result.success ? 'PASSED' : 'FAILED'}`);
  });

  console.log(`\n📈 Overall: ${passed}/${results.length} test categories passed`);
  
  if (failed > 0) {
    console.log(`\n⚠️  ${failed} test category(ies) failed. Check the output above for details.`);
    process.exit(1);
  } else {
    console.log('\n🎉 All test categories passed successfully!');
    process.exit(0);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node tests/run-tests.js [options]

Options:
  --help, -h     Show this help message
  --category     Run specific test category (health|auth|legacy|modern|integration)
  --all          Run all test categories (default)

Examples:
  node tests/run-tests.js --category health
  node tests/run-tests.js --category auth
  node tests/run-tests.js --all
`);
  process.exit(0);
}

if (args.includes('--category')) {
  const categoryIndex = args.indexOf('--category');
  const category = args[categoryIndex + 1];
  
  if (!category || !testCategories.includes(category)) {
    console.log(`❌ Invalid category. Available categories: ${testCategories.join(', ')}`);
    process.exit(1);
  }
  
  console.log(`🎯 Running only ${category} tests...`);
  runTestCategory(category).then(result => {
    if (result.success) {
      console.log('\n🎉 Test completed successfully!');
      process.exit(0);
    } else {
      console.log('\n❌ Test failed!');
      process.exit(1);
    }
  }).catch(error => {
    console.log('\n💥 Test error:', error);
    process.exit(1);
  });
} else {
  // Run all tests by default
  runAllTests();
}
