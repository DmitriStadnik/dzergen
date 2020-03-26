import React, { Component } from 'react'
import styled from 'styled-components';
import equal from 'fast-deep-equal';
import { Row, Col } from 'react-flexbox-grid';
import { GridOverflow, Header } from '../Reusable/styled.js';
import Dzerdan from '../Dzerdan'
import Filters from './Filters'
import SmallCard from '../SmallCard'
import Pagination from './Pagination'
import {connect} from "react-redux";
import {fetchMarket} from "../../actions/market-actions";
import marketRequests from "../../requests/market-requests";

const Wrapper = styled(Col)`
  margin-bottom: 10px;
`;

const SmallCardWrapper = styled.div`
  width: 100%;
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
  z-index: 9000;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
  z-index: 8999;
`;

const Buy = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
  color: white;
  background-color: #26a65b;
  width: 100%;
  display: block;
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

class Market extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dzerdan: null,
      dzerdanVisible: false
    }

    this.getMarket = this.getMarket.bind(this);
  }

  componentDidMount() {
    this.getMarket();
  }

  componentDidUpdate(prevProps) {
    if(!equal(this.props, prevProps)) {
      window.scrollTo(0, 0);
      this.getMarket();
    }
  }

  getMarket() {
    const {
      market: {
        page,
        itemsPerPage,
        filters
      },
    } = this.props;

    this.props.onFetchMarket(page, itemsPerPage, filters, true);
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

  buyCard(id) {
    const {
      user: {
        data: {
          _id
        }
      }
    } = this.props;
    const {
      getMarket
    } = this;

    marketRequests.buyCard({
      card: id,
      user: _id
    })
      .then(response => {
        getMarket();
      })
      .catch(e => console.error(e))
  }

  canBuy(price) {
    const {
      user: {
        data: {
          currency: {
            coin
          }
        }
      }
    } = this.props;
    return coin - price < 0;
  }

  render () {
    const {
      market: {
        items
      }
    } = this.props;
    const { dzerdan, dzerdanVisible } = this.state;

    return (
      <>
        <GridOverflow fluid>
          <Header>Рынок</Header>
          <Filters />
          <Pagination />
          <Row>
            { items && items.map(item =>(
              <Wrapper lg={4} md={6} sm={12} key={item.nameStr + item._id}>
                <SmallCardWrapper onClick={() => this.showCard(item)}>
                  <SmallCard item={item} />
                </SmallCardWrapper>
                <Buy onClick={() => this.buyCard(item._id)} disabled={this.canBuy(item.price)}>
                  Нанять ({this.canBuy(item.price) ? "недостаточно" : item.price} дк)
                </Buy>
              </Wrapper>
            ))}
          </Row>
          <Pagination />
        </GridOverflow>
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
  market: state.market,
  user: state.user,
});

const mapActionsToProps = {
  onFetchMarket: fetchMarket
};

export default connect(mapStateToProps, mapActionsToProps)(Market);
