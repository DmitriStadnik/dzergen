import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'
import Dzerdan from '../Dzerdan'

const Header = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  margin: 30px 0px;
`;

export default class Generator extends Component {
  constructor() {
    super();
  
    this.state = {
      dzerdan: {}
    }
  }

  componentDidMount() {
    this.getDzerdan();
  }

  getDzerdan() {
    let that = this;
    axios.get('/api/generator/generate')
      .then(response => {
        let item = response.data;
        item.rarityStr = that.parseRarity(item.rarity)
        that.setState({
          dzerdan: item
        });
        console.log(that.state)
      })
      .catch(error => console.log(error))
  }

  parseRarity(rarity) {
    switch (rarity) {
      case 0:
        return 'рядовой';
      case 1:
        return 'бывалый';
      case 2:
        return 'закаленный в бою';
      case 3:
        return 'легендарный';
      case 4:
        return 'эпический';
      default:
        return 'что это за';
    }
  }

  render () {
    const {dzerdan} = this.state;
    return (
      <Container fluid> 
        <Row>
          <Col xs={6}>
            <Header>Генератор</Header>
            <Dzerdan item={dzerdan} />
          </Col>
          <Col xs={6}>
            <Header>Коллекция</Header>
          </Col>
        </Row>
      </Container>
    )
  }
}