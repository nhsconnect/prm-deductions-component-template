// When you are unit testing API's, you do not want to keep repeating tests for middleware
// this is such an example, and by mocking the middleware such that it just passes through
// then it makes it much easier to test.
export const authenticateRequest = (req, res, next) => next();
