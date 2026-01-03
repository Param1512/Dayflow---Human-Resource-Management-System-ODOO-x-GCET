// Quick test to verify API is working
const http = require('http');

console.log('Testing Dayflow HRMS Backend API...\n');

// Test 1: Health Check
console.log('1️⃣  Testing /api/health endpoint...');
http.get('http://localhost:5000/api/health', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('   Status:', res.statusCode);
    try {
      console.log('   Response:', JSON.parse(data));
    } catch {
      console.log('   Response:', data);
    }
    console.log('   ✓ Server is reachable\n');
    
    // Test 2: Sign In
    console.log('2️⃣  Testing /api/auth/signin...');
    testSignIn();
  });
}).on('error', (err) => {
  console.log('   ✗ Cannot reach server:', err.message);
  console.log('   Make sure backend is running: npm run dev\n');
});

function testSignIn() {
  const postData = JSON.stringify({
    email: 'admin@dayflow.com',
    password: 'Admin@123456'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/signin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('   Status:', res.statusCode);
      try {
        const response = JSON.parse(data);
        console.log('   Message:', response.message);
        if (response.token) {
          console.log('   Token:', response.token.substring(0, 20) + '...');
          console.log('   User:', response.user);
          console.log('   ✓ Sign In works!\n');
        }
      } catch (e) {
        console.log('   Error parsing response:', e.message);
      }
      console.log('\n✓ All tests completed!');
      process.exit(0);
    });
  });

  req.on('error', (error) => {
    console.error('   ✗ Error:', error.message);
    process.exit(1);
  });

  req.write(postData);
  req.end();
}
