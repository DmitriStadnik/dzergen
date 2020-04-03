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
import {fetchCollection} from "../../actions/collection-actions";
import colors from "../Reusable/colors";

const ColMod = styled(Col)`
  justify-content: center;
  display: flex;
`;

const Wrapper = styled.div`
  margin-bottom: 5px;
  justify-content: center;
  display: inline-flex;
  position: relative;
  width: 100%;
  max-width: 700px;
  cursor: pointer;
`;

const ClickWrapper = styled.div`
  width: 100%;
  height: 100%;
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

const Buttons = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  z-index: 8998;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
  color: white;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
  width: 80px;
  display: block;
  border: none;
  outline: none;
  transition: 0.2s;
  &:hover {
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
        <GridOverflow>
          <Header>Коллекция</Header>
          <Filters />
          <Pagination />         
          <Row>
            { items && items.map(item =>(
              <ColMod sm={12} key={item.nameStr + item._id}>
                <Wrapper>
                  <ClickWrapper onClick={() => this.showCard(item)}>
                    <SmallCard item={item} /> 
                  </ClickWrapper>
                  {/* <Buttons>
                    <Button
                      onClick={() => this.showCard(item)}
                      bgColor={colors.green_main}
                      hlColor={colors.green_hl}
                      dsColor={colors.green_ds}
                    >
                      Показать
                    </Button>
                  </Buttons> */}
                </Wrapper>
              </ColMod>
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
  collection: state.collection,
  user: state.user,
});

const mapActionsToProps = {
  onFetchCollection: fetchCollection
};

export default connect(mapStateToProps, mapActionsToProps)(Collection);
