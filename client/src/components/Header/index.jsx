import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  background-color: #26a65b;
  display: flex;
`;

const Header = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  color: white;
  padding: 10px 20px;
`;

const List = styled.ul`
  margin: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ListItem = styled.li`
  list-style: none;
  margin-right: 20px;

  a {
    color: white;
    transition: 0.2s;
    &:hover {
      text-decoration: none;
      color: #00e640;
    }
  }
`;

export default () => (
  <Wrapper> 
    <Header>DG</Header>
    <List>
      <ListItem>
        <a href="/">
          Генератор
        </a>
      </ListItem>
      <ListItem>
        <a href="/">
          Коллекция
        </a>
      </ListItem>
    </List>
  </Wrapper>
)