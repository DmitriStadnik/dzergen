import styled from 'styled-components';
import { Grid } from 'react-flexbox-grid';

export const GridOverflow = styled(Grid)`
  flex: 1;
`;

export const Header = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  margin: 0;
  padding-top: 20px;
  padding-bottom: 50px;
`;

export const PaddingWrapper = styled.div`
  padding-left: 200px;
  @media screen and (max-width: 768px) {
    padding-left: 0px;
  }
`;

export const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const ListItem = styled.li`
  list-style: none;
  width: 100%;
  font-size: 14px;
  display: ${({visible}) => visible ? 'block' : 'none'};

  a {
    padding: 5px;
    padding-left: 20px;
    color: white;
    transition: 0.2s;
    width: 100%;
    display: block;
    text-align: left;
    &:hover {
      text-decoration: none;
      background: ${({сolor}) => сolor ? сolor : 'auto'};
    }
    @media screen and (max-width: 768px) {
      text-align: center;
      padding-left: 5px;
    }
  }
`;
