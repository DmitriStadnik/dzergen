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
  margin: 30px 0;
`;

const Wrapper = styled(Col)`
  margin-bottom: 30px;
`;


export default class Generator extends Component {
  constructor() {
    super();
  
    this.state = {
      page: 0,
      count: 9
    };

    this.items = null;
    this.itemsCount = 0; //USE REDUX OR UNSTATED
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
        that.items = response.data.data;
        that.itemsCount = response.data.count;
      })
      .catch(error => console.log(error))
  }

  changePage(exactPage, dif) {
    if (exactPage !== null) {
      this.setState({
        page: exactPage
      });
    } else {
      const {page} = this.state;
      let newPage = page + dif;
      if (newPage <= this.maxPages() && newPage >= 0) {
        this.setState({
          page: newPage
        });
      }
    }
    this.getItems();
  }

  maxPages() {
    const {count} = this.state;
    const {itemsCount} = this;
    return Math.floor(itemsCount / count);
  }

  render () {
    const {page} = this.state;
    const {items} = this;
    return (
      <Grid> 
        <Header>Коллекция</Header>
        <Pagination page={page} maxPage={this.maxPages()} handler={this.changePage.bind(this)} />
        <Row>   
          { items && items.map(item =>(
            <Wrapper xl={4} md={6} sm={12} key={item.name.join('')}>
              <Dzerdan item={item} />  
            </Wrapper>
          ))}
        </Row>
        <Pagination page={page} maxPage={this.maxPages()} handler={this.changePage.bind(this)} />
      </Grid>
    )
  }
}