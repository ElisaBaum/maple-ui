export const sizes = {
  xs: '480px',
  sm: '600px',
  md: '840px',
  lg: '960px',
  xl: '1280px',
};

export const lessThan = size => `(min-width: ${sizes[size]})`;
export const atLeast = size => `(max-width: ${sizes[size]})`;

