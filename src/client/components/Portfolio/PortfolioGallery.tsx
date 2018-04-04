import * as React from 'react';
import styled from 'styled-components';
import Item from './PortfolioItem';
import { pxToRem } from '../../styles/utils';
import { maxWidth, GALLERY } from '../../styles/vars';
import GalleryItem from './PortfolioGalleryItem';
import GalleryLink from './PortfolioGalleryLink';
import Button from '../Button';

interface Props {
  items: Portfolio[];
  tag?: Tag;
  displayMore: boolean;
  onClickLoadMore: () => void;
}

interface DefaultProps {
  items: Portfolio[];
  tag: Tag;
}

export const PortfolioGallery: React.SFC<Props> = props => {
  const {
    items,
    tag: Tag,
    displayMore,
    onClickLoadMore,
    ...rest
  } = props as Props & DefaultProps;
  return (
    <Tag {...rest}>
      {items.map(item => {
        const row = item.meta && item.meta.thumb && item.meta.thumb.row;
        const column = item.meta && item.meta.thumb && item.meta.thumb.column;

        return (
          <GalleryItem key={item.id} row={row} column={column}>
            <GalleryLink to={`/portfolio/${item.id}`}>
              <Item {...item} />
            </GalleryLink>
          </GalleryItem>
        );
      })}
      {displayMore && (
        <li className="portfolio-gallery__more">
          <Button
            className="portfolio-gallery__more-button"
            onClick={onClickLoadMore}
          >
            More
          </Button>
        </li>
      )}
    </Tag>
  );
};

PortfolioGallery.displayName = 'PortfolioGallery';

PortfolioGallery.defaultProps = {
  items: [] as Portfolio[],
  tag: 'ul',
} as DefaultProps;

export default styled(PortfolioGallery)`
  max-width: ${pxToRem(maxWidth)};
  padding: 0;
  margin: 0 auto;
  display: grid;
  list-style-type: none;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${pxToRem(GALLERY.minItemSize)}, 1fr)
  );
  grid-auto-flow: dense;
  grid-auto-rows: ${pxToRem(GALLERY.minItemSize)};
  grid-gap: ${pxToRem(GALLERY.itemPadding)};

  .portfolio-gallery__more {
    grid-column-start: 1;
    grid-column-end: -1;
    text-align: center;
  }

  .portfolio-gallery__more-button {
    padding: 1rem 2.5rem;
  }
`;
