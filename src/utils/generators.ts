/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random array of numbers
 */
export function generateRandomArray(length: number, min: number = 0, max: number = 100): number[] {
  return Array.from({ length }, () => randomInt(min, max));
}

/**
 * Generate a random string of specified length
 */
export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomInt(0, characters.length - 1));
  }
  return result;
}

/**
 * Generate an array of random strings
 */
export function generateRandomStringArray(count: number, minLength: number = 3, maxLength: number = 10): string[] {
  return Array.from({ length: count }, () => generateRandomString(randomInt(minLength, maxLength)));
}
