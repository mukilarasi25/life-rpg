/** Resolve files stored in /public correctly when Vite uses a non-root base path. */
export const assetPath = (path: string): string => {
  if (!path) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
};
