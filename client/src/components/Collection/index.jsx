import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dzerdan from '../Dzerdan'

const Header = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  margin: 30px 0px;
`;

const Wrapper = styled(Col)`
  margin-bottom: 30px;
`;

const Buttons = styled.div`
  text-align: center;
  margin: auto;
  margin-top: 10px;
  width: 340px;
  margin-bottom: 50px;
`;

const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  padding: 10px;
  color: white;
  background-color: #26a65b;
  width: 50%;
  border: none;
  outline: none;
  transition: 0.2s;
  &:hover {
    background-color: #87d37c; 
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
      items: null,
    }
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    let that = this;
    axios.get('/api/collection', {
      params: {
        count: 20,
        page: 0,
      }
    })
      .then(response => {
        that.setState({
          items: response.data.data,
        });
      })
      .catch(error => console.log(error))
  }

  render () {
    const {items} = this.state;
    return (
      <Grid> 
        <Header>Коллекция</Header>
        <Row>   
          { items && items.map(item =>(
            <Wrapper xl={4} md={6} sm={12} key={item.name.join('')}>
              <Dzerdan item={item} />  
            </Wrapper>
          ))}
            {/* <Buttons>
              <Button onClick={() => this.getDzerdan()}>Генерировать</Button>
              <Button onClick={() => this.saveDzerdan()} disabled={!savePossible}> {savePossible ? 'Сохранить' : 'Сохранено' }</Button>
            </Buttons> */}
        </Row>
      </Grid>
    )
  }
}