import React, { Component } from 'react'
import styled from 'styled-components';
import equal from 'fast-deep-equal';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dzerdan from '../Dzerdan'
import Filters from './Filters'
import SmallCard from '../SmallCard'
import Pagination from './Pagination'
import {connect} from "react-redux";
import {fetchCollection} from "../../actions/collection-actions";

const Header = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  margin: 0;
  margin-top: 30px;
`;

const Wrapper = styled(Col)`
  margin-bottom: 10px;
  cursor: pointer;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: ${({active}) => active ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
`;

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

    this.props.onFetchCollection(page, itemsPerPage, filters, true, userId === 'all' ? null : userId);
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
        <Grid>
          <Header>Коллекция</Header>
          <Filters />
          <Pagination />
          <Row>
            { items && items.map(item =>(
              <Wrapper md={6} sm={12} key={item.name.join('') + item._id} onClick={() => this.showCard(item)}>
                <SmallCard item={item} />
              </Wrapper>
            ))}
          </Row>
          <Pagination />
        </Grid>
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
