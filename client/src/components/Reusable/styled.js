import styled from 'styled-components';
import { Grid } from 'react-flexbox-grid';

export const GridOverflow = styled(Grid)`
  overflow-y: scroll;
  flex: 1;
`;

export const Header = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  margin: 0;
  padding-top: 20px;
  padding-bottom: 20px;
`;
