declare module '*.css' {
  const value: any;
  export = value;
}

declare module '*.scss' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}

interface FlexibleComponentProps
  extends Omit<React.AllHTMLAttributes<HTMLElement>, 'as'> {
  /**
   * Which HTML tag or custom Component should be rendered
   */
  as?: React.ElementType;
}

// type Tag = string | React.ComponentType<any>;

type Portfolio = {
  id: string;
  title: string;
  description: string;
};
