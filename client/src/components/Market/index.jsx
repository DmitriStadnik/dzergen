import React, { Component } from 'react'
import styled from 'styled-components';
import equal from 'fast-deep-equal';
import { Redirect } from "react-router-dom";
import { Grid, Row, Col } from 'react-flexbox-grid';
import { PaddingWrapper, Header } from '../Reusable/styled.js';
import Dzerdan from '../Dzerdan'
import Filters from './Filters'
import Pagination from './Pagination'
import {connect} from "react-redux";
import {fetchMarket} from "../../actions/market-actions";
import marketRequests from "../../requests/market-requests";
import colors from "../Reusable/colors";
import {
  Wrapper,
  CardWrapper,
  Overlay
} from "../Reusable/collection";

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
  color: white;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
  width: 200px;
  display: block;
  border: none;
  outline: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.22);
    background-color: ${({hlColor}) => hlColor ? hlColor : 'white'};
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: ${({dsColor}) => dsColor ? dsColor : 'white'};
    &:hover {
      background-color: ${({dsColor}) => dsColor ? dsColor : 'white'};
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
    this.isLoggedIn = this.isLoggedIn.bind(this);
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

  isLoggedIn() {
    const {
      user: {
        data
      },
    } = this.props;

    return data !== null;
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

    return !this.isLoggedIn() ? (
        <Redirect to={"/collection/all"} />
      ) : (
      <>
        <PaddingWrapper>
          <Grid fluid>
            <Header>Рынок</Header>
            <Filters />
            <Pagination />
            <Row>
              { items && items.map(item =>(
                <Col xs={12} sm={6} lg={4} key={item.nameStr + item._id}>
                <Wrapper>
                  <Dzerdan item={item} />
                </Wrapper>
                <Buttons>
                  <Button
                    onClick={() => this.buyCard(item._id)} 
                    disabled={this.canBuy(item.price)}
                    bgColor={colors.green_main}
                    hlColor={colors.green_hl}
                    dsColor={colors.green_ds}
                  >
                    Нанять ({item.price} ок)
                  </Button>
                </Buttons>
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
  market: state.market,
  user: state.user,
});

const mapActionsToProps = {
  onFetchMarket: fetchMarket
};

export default connect(mapStateToProps, mapActionsToProps)(Market);
