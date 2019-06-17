import React, { Component } from 'react'
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dzerdan from '../Dzerdan'
import Pagination from './Pagination'
import {connect} from "react-redux";
import {fetchCollection} from "../../actions/collection-actions";

const Header = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  margin: 30px 0;
`;

const Wrapper = styled(Col)`
  margin-bottom: 30px;
`;


class Collection extends Component {
  componentDidMount() {
    this.getCollection()
  }

  componentDidUpdate(prevProps) {
    if(this.props.collection.page !== prevProps.collection.page) {
      this.getCollection();
    }
  }

  getCollection() {
    const {
      collection: {
        page,
        itemsPerPage
      }
    } = this.props;
    this.props.onFetchCollection(page, itemsPerPage);
  }

  render () {
    const {
      collection: {
        items
      }
    } = this.props;

    return (
      <Grid>
        <Header>Коллекция</Header>
        <Pagination />
        <Row>
          { items && items.map(item =>(
            <Wrapper xl={4} md={6} sm={12} key={item.name.join('')}>
              <Dzerdan item={item} />  
            </Wrapper>
          ))}
        </Row>
        <Pagination />
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  collection: state.collection,
});

const mapActionsToProps = {
  onFetchCollection: fetchCollection
};

export default connect(mapStateToProps, mapActionsToProps)(Collection);
