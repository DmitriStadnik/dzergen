import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Grid, Row, Col } from 'react-flexbox-grid';
import userRequests from "../../requests/user-requests";
import Functions from "../../utils/Functions";
import noimg from "./noimage.png";
import collectionRequests from '../../requests/collection-requests';

const Header = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  margin: 30px 0;
`;

const UserImg = styled.img`
  display: block;
  height: 200px;
  width: 200px;
  object-fit: cover;
  margin: auto; 
  border: 2px solid #26a65b;
  @media screen and (max-width: 600px) {
    height: 150px;
    width: 150px;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const ListItem = styled.li`
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-around;
`;

const ListItemLeft = styled.div`
  width: 100%;
`;

const ListItemRight = styled.div`
  width: 100%;
`;

const Name = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
  color: white;
  background-color: #26a65b;
  width: 200px;
  display: block;
  margin: auto;
`;

const Button = styled(Link)`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
  color: white;
  background-color: #26a65b;
  width: 200px;
  display: block;
  margin: auto;
  transition: 0.2s;
  &:hover {
    background-color: #87d37c; 
    text-decoration: none;
    color: white;
  }
`;

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      dzerdanCount: 0
    }

    this.getUser = this.getUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.getDzerdanCount = this.getDzerdanCount.bind(this);
    this.setDzerdanCount = this.setDzerdanCount.bind(this);
  }

  componentDidMount () {
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;
    this.getUser(id);
    this.getDzerdanCount(id);
  }

  getUser (id) {
    const { setUser } = this;
    userRequests.getUser({id})
      .then(response => {
        setUser(response.data)
      })
      .catch(error => console.log(error));
  }

  setUser (data) {
    this.setState({
      user: data
    })
  }

  setDzerdanCount (data) {
    this.setState({
      dzerdanCount: data
    })
  }

  getDzerdanCount (id) {
    const { setDzerdanCount } = this;
    collectionRequests.countItems({owner: id, showAll: false})
      .then(response => {
        setDzerdanCount(response.data.count)
      })
      .catch(error => console.log(error));
  }

  render () {
    const {
      user,
      dzerdanCount
    } = this.state;

    return (
      <Grid> 
        <Header>
          Профиль
        </Header>
        <Row>
          {
            user ? (
              <>
                <Col sm={4}>
                  {
                    user.image ? (
                      <UserImg src={Functions.imagePath(user.image)} />
                    ) : (
                      <UserImg src={noimg} />
                    )
                  }
                  <Name>
                    {user.name}
                  </Name>
                  <Button to={`/collection/${user._id}`}>
                    Коллекция
                  </Button>
                </Col>
                <Col sm={8}>
                  <List>
                    <ListItem>
                      <ListItemLeft>Дзерданы:</ListItemLeft>
                      <ListItemRight>{dzerdanCount}</ListItemRight>
                    </ListItem>
                    <ListItem>
                      <ListItemLeft>Дзеркоины:</ListItemLeft>
                      <ListItemRight>{user.currency.coin}</ListItemRight>
                    </ListItem>
                    <ListItem>
                      <ListItemLeft>Жыжа:</ListItemLeft>
                      <ListItemRight>{user.currency.z}</ListItemRight>
                    </ListItem>
                  </List>
                </Col>
              </>
            ) : (
              null
            )
          }
        </Row>
      </Grid>
    )
  }
}