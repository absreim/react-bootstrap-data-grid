/**
 * Computes a mathematical modulo.
 *
 * @param num - to number to which to apply the modulo operator
 * @param divisor - the divisor of the module operator
 */
const trueModulo = (num: number, divisor: number) =>
  ((num % divisor) + divisor) % divisor;

export default trueModulo;
