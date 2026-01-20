// File: src/api/ApiClient.ts

    // Imports Playwright’s APIRequestContext type.
    // APIRequestContext represents an isolated HTTP client managed by Playwright.
    // It handles:
    // Base URL resolution
    // Headers
    // Cookies
    // TLS behavior

    // Request lifecycle
    // This is the object Playwright injects into tests via { request }.
import { APIRequestContext } from '@playwright/test';

    // Defines a reusable class named ApiClient.
    // Purpose:
    // Abstract raw HTTP calls
    // Prevent duplication of request logic
    // Provide a single choke point for logging, headers, auth, or instrumentation
export class ApiClient {
    // This is dependency injection.
    // request is provided from Playwright’s test runner
    // private → accessible only inside this class
    // readonly → cannot be reassigned after construction
    // Type enforced as APIRequestContext
    // Effect:
    // Guarantees every API call uses the same Playwright-managed HTTP context
    // Ensures consistency across all tests
    // No body is needed because TypeScript automatically assigns the parameter to a class property.
  constructor(private readonly request: APIRequestContext) {}
    // Defines a GET request method.
    // Parameters:
    // path: relative endpoint path (e.g. /posts)
    // params: optional key/value query parameters
    // Record<string, string> enforces:
    // Keys are strings
    // Values are strings
    // Prevents accidental non-serializable types
  get(path: string, params?: Record<string, string>) {
    // Executes the HTTP GET.

    // What happens internally:
    // Playwright prepends baseURL
    // Encodes query parameters safely
    // Sends the request
    // Returns an APIResponse promise
    // No manual URL construction.
    // No string concatenation bugs.
    return this.request.get(path, { params });
  }

    // Defines a POST request method.
    // Parameters:
    // path: endpoint
    // body: request payload   
  post(path: string, body: object) {
    // Sends a POST request
    // data becomes the JSON request body
    // Content-Type: application/json is inferred automatically
    // Playwright serializes the object safely.
    return this.request.post(path, { data: body });
  }

    // Defines a PUT request method.
    // Used for:
    // Full resource updates
    // Idempotent modifications
  put(path: string, body: object) {
    // Same behavior as POST:
    // JSON body
    // Base URL applied
    // Response returned for assertions
    return this.request.put(path, { data: body });
  }

    // Defines a DELETE request method.
    // Only needs:
    // Endpoint path
    // No body is required for JSONPlaceholder-style APIs.
  delete(path: string) {
    // Executes the DELETE request and returns the response.
    return this.request.delete(path);
  }
}

// Why this design is correct

// No absolute URLs → avoids protocol duplication bugs
// Centralized HTTP logic → easy to add:
// Auth headers
// Request logging
// Security instrumentation
// Thin abstraction → tests remain readable
// Playwright-native → no custom HTTP clients
// Mental model
// Think of ApiClient as:
// A controlled gateway between your tests and the API, enforcing consistency and safety.