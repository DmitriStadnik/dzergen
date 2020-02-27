import React, { Component } from 'react'
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-flexbox-grid';
import userRequests from "../../requests/user-requests";
import Functions from "../../utils/Functions";
import noimg from "./noimage.png";

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
  border-radius: 5px;
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
  text-align: center;
`;

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    this.getUser = this.getUser.bind(this);
    this.setUser = this.setUser.bind(this);
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

  render () {
    const {
      user
    } = this.state;

    return (
      <Grid> 
        <Header>
          Профиль пользователя
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
                  <List>
                    <ListItem>
                      {user.name}
                    </ListItem>
                  </List>
                </Col>
                <Col sm={8}>
                  {/* <List>
                    <ListItem>
                      {user.name}
                    </ListItem>
                  </List> */}
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