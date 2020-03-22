import React, { Component } from 'react'
import styled from 'styled-components';
import equal from 'fast-deep-equal';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Dzerdan from '../Dzerdan'
import Filters from './Filters'
import SmallCard from '../SmallCard'
import Pagination from './Pagination'
import {connect} from "react-redux";
import {fetchMarket} from "../../actions/market-actions";

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

class Market extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dzerdan: null,
      dzerdanVisible: false
    }
  }

  componentDidMount() {
    this.getMarket()
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

  render () {
    const {
      market: {
        items
      }
    } = this.props;
    const { dzerdan, dzerdanVisible } = this.state;

    return (
      <>
        <Grid>
          <Header>Рынок</Header>
          <Filters />
          <Pagination />
          <Row>
            { items && items.map(item =>(
              <Wrapper lg={4} md={6} sm={12} key={item.nameStr + item._id} onClick={() => this.showCard(item)}>
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
  market: state.market,
  user: state.user,
});

const mapActionsToProps = {
  onFetchMarket: fetchMarket
};

export default connect(mapStateToProps, mapActionsToProps)(Market);
