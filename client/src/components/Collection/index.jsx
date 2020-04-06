import React, { Component } from 'react'
import equal from 'fast-deep-equal';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { PaddingWrapper, Header } from '../Reusable/styled.js';
import Dzerdan from '../Dzerdan'
import Filters from './Filters'
import Pagination from './Pagination'
import {connect} from "react-redux";
import {fetchCollection} from "../../actions/collection-actions";
import {
  Wrapper,
  CardWrapper,
  Overlay
} from "../Reusable/collection";

class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dzerdan: null,
      dzerdanVisible: false
    }
  }

  componentDidMount() {
    this.getCollection()
  }

  componentDidUpdate(prevProps) {
    if(!equal(this.props, prevProps)) {
      window.scrollTo(0, 0);
      this.getCollection();
    }
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

    this.props.onFetchCollection(page, itemsPerPage, filters, userId === 'all' ? null : userId);
  }

  showCard(item) {
    this.setState({
      dzerdan: item,
      dzerdanVisible: true
    });
  }

  hideCard() {
    this.setState({
      dzerdan: null,
      dzerdanVisible: false
    });
  }

  render () {
    const {
      collection: {
        items
      }
    } = this.props;
    const { dzerdan, dzerdanVisible } = this.state;

    return (
      <>
        <PaddingWrapper>
          <Grid fluid>
            <Header>Коллекция</Header>
            <Filters />
            <Pagination />         
            <Row>
              { items && items.map(item =>(
                <Col xs={12} sm={6} lg={4} key={item.nameStr + item._id}>
                  <Wrapper>
                    <Dzerdan item={item} />
                  </Wrapper>
                </Col>
              ))}
            </Row>
            <Pagination />
          </Grid>
        </PaddingWrapper>
        <CardWrapper active={dzerdanVisible}>
          {
            dzerdan ?
              <Dzerdan item={dzerdan} />
              : null
          }
          <Overlay onClick={() => this.hideCard()} />
        </CardWrapper>
      </>
    )
  }
}

const mapStateToProps = state => ({
  collection: state.collection,
  user: state.user,
});

const mapActionsToProps = {
  onFetchCollection: fetchCollection
};

export default connect(mapStateToProps, mapActionsToProps)(Collection);
