expect.extend({
  toBeTypeOrNull(received, argument) {
    const pass = typeof received === argument || received === null;
    if (pass) {
      return {
        message: () => `expected ${received} not to be a ${argument} or null`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a ${argument} or null`,
        pass: false,
      };
    }
  },
});
