import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dzerdan from '../Dzerdan'
import Pagination from './Pagination'

const Header = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  margin: 30px 0px;
`;

const Wrapper = styled(Col)`
  margin-bottom: 30px;
`;


export default class Generator extends Component {
  constructor() {
    super();
  
    this.state = {
      items: null,
      page: 0,
      count: 20
    }
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    const {page, count} = this.state;
    let that = this;
    axios.get('/api/collection', {
      params: {
        count: count,
        page: page,
      }
    })
      .then(response => {
        that.setState({
          items: response.data.data,
          itemsCount: response.data.count
        });
      })
      .catch(error => console.log(error))
  }

  render () {
    const {items, page, count, itemsCount} = this.state;
    let maxPages = Math.floor(itemsCount / count);
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
        <Pagination page={page} maxPage={maxPages} />
      </Grid>
    )
  }
}