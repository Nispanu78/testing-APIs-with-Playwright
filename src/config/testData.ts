// File: src/config/testData.ts

// Centralized test data and configuration for JSONPlaceholder API tests.
// This ensures endpoints, query parameters, payloads, and expected values are all reusable.

export const testData = {
  // Define all API endpoints used in the tests.
  endpoints: {
    // Endpoint to retrieve all posts.
    posts: '/posts',

    // Function to generate endpoint for a single post by its numeric ID.
    // Usage: testData.endpoints.postById(1) → "/posts/1"
    postById: (id: number) => `/posts/${id}`,

    // Endpoint to retrieve all comments.
    comments: '/comments',

    // Endpoint to retrieve all users.
    users: '/users',
  },

  // Predefined query parameters for filtering requests.
  queryParams: {
    // Function to generate query parameter object for filtering posts by userId.
    // Usage: testData.queryParams.postsByUser(1) → { userId: "1" }
    postsByUser: (userId: number) => ({
      userId: userId.toString(), // Convert numeric ID to string, required by Playwright.
    }),
  },

  // Example payloads used for POST/PUT requests.
  payloads: {
    // Payload to create a new post.
    newPost: {
      title: 'Playwright API Test',      // Title of the new post
      body: 'Refactored API test payload', // Body content of the post
      userId: 1,                          // ID of the user creating the post
    },
  },

  // Expected HTTP status codes for common API responses.
  expectedStatus: {
    ok: 200,       // Successful GET/DELETE requests
    created: 201,  // Successful POST requests
  },

  // Sample IDs for use in GET/DELETE/PUT requests.
  sampleIds: {
    postId: 1, // ID of a post used for single-resource tests
    userId: 1, // ID of a user used for filtering or association
  },
};