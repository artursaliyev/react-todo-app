/**
 * @param {shallowWrapper} wrapper
 * @param {string} className prop for selected DOM Element
 * @returns {shallowWrapper}
 */

export const findByClassName = (wrapper, className) => {
  return wrapper.find(`.${className}`);
};
