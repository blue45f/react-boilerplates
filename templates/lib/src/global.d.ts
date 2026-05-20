declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css';

declare module '*.mdx' {
  // Storybook MDX support
  const MDXComponent: (props: unknown) => JSX.Element;
  export default MDXComponent;
}
