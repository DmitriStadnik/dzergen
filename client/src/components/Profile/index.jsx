import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { Grid, Row, Col } from 'react-flexbox-grid';
import { PaddingWrapper, Header } from '../Reusable/styled.js';
import userRequests from "../../requests/user-requests";
import Functions from "../../utils/Functions";
import noimg from "./noimage.png";
import collectionRequests from '../../requests/collection-requests';
import colors from "../Reusable/colors";

const UserImg = styled.img`
  display: block;
  height: 200px;
  width: 200px;
  object-fit: cover;
  margin: auto; 
  border: ${({color}) => color ? `2px solid ${color}` : 'none'};
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
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
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
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  width: 200px;
  display: block;
  margin: auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  &:hover {
    background-color: ${({hlColor}) => hlColor ? hlColor : 'auto'}; 
    box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.22);
    color: white;
    text-decoration: none;
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
      <PaddingWrapper>
      <Grid fluid> 
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
                      <UserImg src={Functions.imagePath(user.image)} color={colors.green_main} />
                    ) : (
                      <UserImg src={noimg} color={colors.green_main} />
                    )
                  }
                  <Name bgColor={colors.green_main}>
                    {user.name}
                  </Name>
                  <Button 
                    to={`/collection/${user._id}`}
                    bgColor={colors.green_main}
                    hlColor={colors.green_hl}
                    dsColor={colors.green_ds}
                  >
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
      </PaddingWrapper>
    )
  }
}