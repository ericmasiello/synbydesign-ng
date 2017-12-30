import * as React from 'react';
import PortfolioItemSVG from './PortfolioItemSVG';
import PortfolioItemImage from './PortfolioItemImage';
import { getImagePath, showSVG } from '../../utils/portfolioImage';

interface Props {
  className?: string;
  title: string;
  description?: string;
  meta?: PortfolioMeta;
  category: string[];
  tags: string[];
  svgSource?: string;
  imagePaths: ImagePaths;
}

const Item: React.SFC<Props> = (props) => {
  if (showSVG(props)) {
    return (
      <PortfolioItemSVG
        className={props.className}
        svgSource={props.svgSource!}
      />
    );
  }

  const preferredImagePath = getImagePath(props.imagePaths);

  if (preferredImagePath) {
    return (
      <PortfolioItemImage
        className={props.className}
        imagePath={preferredImagePath.url}
        width={preferredImagePath.width}
        height={preferredImagePath.height}
      />
    );
  }

  return null;
};

export default Item;
