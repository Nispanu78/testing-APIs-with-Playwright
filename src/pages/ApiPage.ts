// File: src/pages/ApiPage.ts

// Import the APIRequestContext type provided by Playwright.
// This represents the HTTP client used to send API requests during tests.
import { APIRequestContext } from '@playwright/test';

// Import the ApiClient abstraction.
// ApiClient centralizes low-level HTTP logic (GET, POST, PUT, DELETE).
import { ApiClient } from '../api/ApiClient';

// Import shared test data such as endpoints and sample IDs.
// This keeps endpoint definitions out of test logic.
import { testData } from '../config/testData';

// Define the ApiPage class.
// This acts as a "page object" for API endpoints, grouping related actions.
export class ApiPage {
  // Hold a single, immutable instance of ApiClient.
  // readonly prevents reassignment after construction.
  private readonly apiClient: ApiClient;

  // Constructor receives Playwright's APIRequestContext from the test runner.
  // This ensures all API calls share the same configuration (baseURL, headers, TLS behavior).
  constructor(request: APIRequestContext) {
    // Initialize the ApiClient with the provided request context.
    this.apiClient = new ApiClient(request);
  }

  // Retrieve a list of posts.
  // Optional query parameters can be provided (e.g., filtering by userId).
  getPosts(params?: Record<string, string>) {
    // Uses a relative path; Playwright resolves it using the configured baseURL.
    return this.apiClient.get(testData.endpoints.posts, params);
  }

  // Retrieve a single post by its numeric ID.
  getPostById(id: number) {
    // The endpoint is dynamically generated using a helper function.
    return this.apiClient.get(testData.endpoints.postById(id));
  }

  // Create a new post.
  // The payload object is serialized to JSON and sent in the request body.
  createPost(payload: object) {
    return this.apiClient.post(testData.endpoints.posts, payload);
  }

  // Delete a post by ID.
  // This sends an HTTP DELETE request to the corresponding endpoint.
  deletePost(id: number) {
    return this.apiClient.delete(testData.endpoints.postById(id));
  }
};

