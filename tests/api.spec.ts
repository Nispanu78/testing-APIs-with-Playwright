// File: tests/api.spec.ts

// Import Playwright's test runner and assertion library.
// `test` defines test cases and hooks, `expect` performs assertions.
import { test, expect } from '@playwright/test';

// Import the ApiPage abstraction.
// This encapsulates API interactions and keeps tests readable and focused on behavior.
import { ApiPage } from '../src/pages/ApiPage';

// Import shared test data such as endpoints, payloads, expected statuses, and sample IDs.
import { testData } from '../src/config/testData';

// Group related API tests under a descriptive test suite name.
test.describe('JSONPlaceholder API Tests', () => {
  // Declare a variable to hold the ApiPage instance for each test.
  let apiPage: ApiPage;

  // beforeEach hook runs before every test case.
  // Playwright injects an APIRequestContext (`request`) configured via playwright.config.ts.
  test.beforeEach(async ({ request }) => {
    // Create a new ApiPage using the shared request context.
    // This ensures isolation and consistency between tests.
    apiPage = new ApiPage(request);
  });

  // Test case: verify that fetching all posts returns a non-empty list.
  test('GET /posts returns list of posts', async () => {
    // Perform a GET request to the /posts endpoint.
    const response = await apiPage.getPosts();

    // Assert that the HTTP status code matches the expected success value.
    expect(response.status()).toBe(testData.expectedStatus.ok);

    // Parse the response body as JSON.
    const body = await response.json();

    // Verify the response is an array.
    expect(Array.isArray(body)).toBe(true);

    // Ensure the array contains at least one post.
    expect(body.length).toBeGreaterThan(0);
  });

  // Test case: verify filtering posts by userId works correctly.
  test('GET /posts filtered by userId', async () => {
    // Send a GET request with query parameters to filter posts by userId.
    const response = await apiPage.getPosts(
      testData.queryParams.postsByUser(testData.sampleIds.userId)
    );

    // Assert successful HTTP response.
    expect(response.status()).toBe(testData.expectedStatus.ok);

    // Parse the JSON response body.
    const body = await response.json();

    // Validate that each returned post belongs to the requested userId.
    body.forEach((post: any) => {
      expect(post.userId).toBe(testData.sampleIds.userId);
    });
  });

  // Test case: verify retrieving a single post by ID returns the correct resource.
  test('GET /posts/{id} returns a single post', async () => {
    // Perform a GET request for a specific post ID.
    const response = await apiPage.getPostById(testData.sampleIds.postId);

    // Assert the response status indicates success.
    expect(response.status()).toBe(testData.expectedStatus.ok);

    // Parse the JSON response body.
    const body = await response.json();

    // Validate essential properties of the returned post.
    expect(body).toHaveProperty('id', testData.sampleIds.postId);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
  });

  // Test case: verify creating a new post works as expected.
  test('POST /posts creates a new post', async () => {
    // Send a POST request with a predefined payload.
    const response = await apiPage.createPost(testData.payloads.newPost);

    // Assert that the API returns a "created" status code.
    expect(response.status()).toBe(testData.expectedStatus.created);

    // Parse the JSON response body.
    const body = await response.json();

    // Validate that the response body matches the sent payload.
    expect(body).toMatchObject(testData.payloads.newPost);
  });

  // Test case: verify deleting a post returns a successful response.
  test('DELETE /posts/{id} returns success', async () => {
    // Perform a DELETE request for a specific post ID.
    const response = await apiPage.deletePost(testData.sampleIds.postId);

    // Assert that the API indicates successful deletion.
    expect(response.status()).toBe(testData.expectedStatus.ok);
  });
});