// Simple test script for profile API endpoints
// Run with: node test-profile-api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const TEST_TOKEN = 'your_test_jwt_token_here'; // Replace with actual token

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${TEST_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

async function testProfileEndpoints() {
  console.log('🧪 Testing Profile API Endpoints...\n');

  try {
    // Test 1: Get profile
    console.log('1. Testing GET /profile/:id');
    try {
      const profileResponse = await api.get('/profile/test-user-id');
      console.log('✅ Profile retrieved successfully:', profileResponse.data);
    } catch (error) {
      console.log('❌ Profile retrieval failed:', error.response?.data || error.message);
    }

    // Test 2: Update profile
    console.log('\n2. Testing PATCH /profile/update');
    try {
      const updateData = {
        fullName: 'John Doe',
        address: '123 Main St, City, Country',
        bio: 'Software Developer with 5 years of experience',
        experience: 'Senior Developer at Tech Corp',
        contact: {
          phone: '+1-555-0123',
          linkedin: 'linkedin.com/in/johndoe',
          github: 'github.com/johndoe',
          website: 'johndoe.dev'
        },
        qualification: 'Bachelor of Computer Science',
        professionalField: 'Software Development'
      };
      
      const updateResponse = await api.patch('/profile/update', updateData);
      console.log('✅ Profile updated successfully:', updateResponse.data);
    } catch (error) {
      console.log('❌ Profile update failed:', error.response?.data || error.message);
    }

    // Test 3: Add skill
    console.log('\n3. Testing POST /profile/skills/add');
    try {
      const skillResponse = await api.post('/profile/skills/add', { skill: 'React' });
      console.log('✅ Skill added successfully:', skillResponse.data);
    } catch (error) {
      console.log('❌ Skill addition failed:', error.response?.data || error.message);
    }

    // Test 4: Remove skill
    console.log('\n4. Testing DELETE /profile/skills/remove');
    try {
      const removeSkillResponse = await api.delete('/profile/skills/remove', { 
        data: { skill: 'React' } 
      });
      console.log('✅ Skill removed successfully:', removeSkillResponse.data);
    } catch (error) {
      console.log('❌ Skill removal failed:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testProfileEndpoints();
}

export { testProfileEndpoints };
