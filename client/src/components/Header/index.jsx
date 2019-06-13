import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  background-color: #26a65b;
  display: flex;
`;

const Header = styled.div`
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
      color: #87d37c;
    }
  }
`;

const version = '2.0';

export default () => (
  <Wrapper> 
    <Header>{`DG v${version}`}</Header>
    <List>
      <ListItem>
        <Link to="/">
          Генератор
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/collection">
          Коллекция
        </Link>
      </ListItem>
    </List>
  </Wrapper>
)