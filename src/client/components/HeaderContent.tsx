import * as React from 'react';
import styled from 'styled-components';
import { pxToRem } from '../styles/utils';
import {
  maxWidth,
  horizontalPadding,
  MEDIA_QUERIES,
  headerSpacing,
} from '../styles/vars';
import Nav from './Nav';

interface Props extends React.HTMLProps<HTMLDivElement> {}

export const HeaderContent: React.SFC<Props> = props => (
  <div className={props.className}>{props.children}</div>
);

HeaderContent.displayName = 'Header.Content';

const StyledHeaderContent = styled(HeaderContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${pxToRem(maxWidth)};
  padding: calc(1rem + ${headerSpacing}) ${pxToRem(horizontalPadding)};
  margin: auto;

  ${Nav} {
    margin-top: 1rem;
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.large)}) {
    flex-direction: row;
    justify-content: space-between;

    ${Nav} {
      margin-top: 0;
    }
  }
`;

export default StyledHeaderContent;
