// TypeScript declaration so .mdx files can be imported as React components
declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const MDXComponent: ComponentType<any>;
  export default MDXComponent;
}
