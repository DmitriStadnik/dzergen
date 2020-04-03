import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Row, Col } from 'react-flexbox-grid';
import { GridOverflow, Header } from '../Reusable/styled.js';
import Dzerdan from '../Dzerdan'
import List from './List'
import collectionRequests from "../../requests/collection-requests";
import {Link} from "react-router-dom";
import userRequests from "../../requests/user-requests";
import colors from "../Reusable/colors";

const Buttons = styled.div`
  text-align: center;
  width: 340px;
  margin: 10px auto 50px;
`;

const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  padding: 10px;
  color: white;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  width: 50%;
  border: none;
  outline: none;
  transition: 0.2s;
  &:hover {
    background-color: ${({hlColor}) => hlColor ? hlColor : 'auto'}; 
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: ${({dsColor}) => dsColor ? dsColor : 'auto'}; 
    &:hover {
      background-color: ${({dsColor}) => dsColor ? dsColor : 'auto'}; 
    }
  }
`;

const StyledLink = styled(Link)`
  text-align: center;
  margin: auto auto 20px;
  display: block;
  width: 200px;
  text-transform: uppercase;
  font-size: 16px;
  padding: 10px;
  color: white;
  background-color: #26a65b;
  transition: 0.2s;
  &:hover {
    background-color: #87d37c; 
    color: white;
    text-decoration: none;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #a2ded0; 
    &:hover {
      background-color: #a2ded0;
    }
  }
`;

export default class Generator extends Component {
  constructor() {
    super();
  
    this.state = {
      dzerdan: null,
      savePossible: true,
      recent: null,
    }

    this.checkAuth = this.checkAuth.bind(this);
    this.getDzerdan = this.getDzerdan.bind(this);
  }

  componentDidMount() {
    this.checkAuth();
    this.getRecent();
  }

  getDzerdan(userId) {
    let that = this;
    axios.get('/api/generator/generate', {
      params: { userId }
    })
      .then(response => {
        that.setState({
          dzerdan: response.data,
          savePossible: true
        });
      })
      .catch(error => console.log(error))
  }

  getRecent() {
    let that = this;
    collectionRequests.getItems({page: 0, count: 4, showAll: true})
      .then(response => {
        that.setState({
          recent: response.data.data,
        });
      })
      .catch(error => console.log(error))
  }

  getCollection() {
    const {
      collection: {
        page,
        itemsPerPage,
        filters
      },
    } = this.props;

    let userId = this.props.match.params.id;

    this.props.onFetchCollection(page, itemsPerPage, filters, false, userId === 'all' ? null : userId);
  }

  checkAuth () {
    const { getDzerdan } = this;
    const token = localStorage.getItem('authToken');
    if (!token) {
      getDzerdan(null);
      return;
    }
    userRequests.checkAuth(`JWT ${token}`)
      .then(response => {
        if (response.data.auth) {
          getDzerdan(response.data.userId);
        } else {
          getDzerdan(null);
          localStorage.removeItem('authToken');
        }
      })
      .catch(error => console.log(error));
  }

  saveDzerdan() {
    this.setState({savePossible: false});
    axios.post('/api/generator/save', {
      ...this.state.dzerdan 
    })
      .catch(error => console.log(error))
  }

  render () {
    const {
      dzerdan, 
      savePossible, 
      recent, 
    } = this.state;
    return (
      <>
        <GridOverflow fluid> 
          <Row>
            <Col sm={12}>
              <Header>Генератор</Header>
              {
                dzerdan ? 
                  <Dzerdan item={dzerdan} newItem />
                : null
              }
              <Buttons>
                <Button
                  onClick={() => this.checkAuth()}
                  bgColor={colors.green_main}
                  hlColor={colors.green_hl}
                  dsColor={colors.green_ds}
                >
                  Генерировать
                </Button>
                <Button
                  onClick={() => this.saveDzerdan()}
                  disabled={!savePossible}
                  bgColor={colors.green_main}
                  hlColor={colors.green_hl}
                  dsColor={colors.green_ds}
                >
                  {savePossible ? 'Сохранить' : 'Сохранено' }
                </Button>
              </Buttons>
            </Col>
            {/* <Col md={6} sm={12}>
              <Header>Последние дзерданы</Header>
              {
                recent ? 
                  <List items={recent} />
                : null
              }
              <StyledLink to="/collection">
                Коллекция
              </StyledLink>
            </Col> */}
          </Row>
        </GridOverflow>
      </>
    )
  }
}