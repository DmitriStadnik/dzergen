import React, { Component } from 'react'
import styled from 'styled-components';
import {changePage} from "../../../actions/collection-actions";
import {connect} from "react-redux";

const Wrapper = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Page = styled.div`
  font-size: 16px;
  transition: 0.2s;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({active}) => active ? '#87d37c' : 'white'};
  color: ${({active}) => active ? 'white' : 'inherit'};
  &:hover {
    background-color: #87d37c; 
    color: white;
  }
`;

const Button = styled.button`
  text-transform: uppercase;
  font-size: 16px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #26a65b;
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

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props
    }

    this.getPagesArr = this.getPagesArr.bind(this);
  }

  componentDidMount() {
    this.changePage(0, 0);
    window.addEventListener('resize', this.getPagesArr);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getPagesArr);
  }

  getPagesArr() {
    const maxPage = this.maxPages();
    const {
      collection: {
        page
      }
    } = this.props;

    let pagesAmount = 5;
    if (window.innerWidth < 600) {
      pagesAmount = 2;
    }

    let start = page - pagesAmount < 0 ? 0 : page - pagesAmount;
    let end = page + pagesAmount > maxPage ? maxPage : page + pagesAmount;

    if (maxPage > pagesAmount * 2) {
      if (maxPage - page < page) {
        while (end - start < pagesAmount * 2) {
          start--;
        }
      } else {
        while (end - start < pagesAmount * 2) {
          end++;
        }
      }
    }
    
    let pagesArr = [];

    for (let i = start; i <= end; i++) {
      pagesArr.push(i);
    }
    return pagesArr;
  }

  maxPages() {
    const {
      collection: {
        itemsCount,
        itemsPerPage
      }
    } = this.props;
    return Math.floor(itemsCount / itemsPerPage);
  }

  changePage(exactPage, dif) {
    let newPage = 0;
    if (exactPage !== null) {
      newPage = exactPage;
    } else {
      const {
        collection: {
          page
        }
      } = this.props;
      let temp = page + dif;
      if (temp <= this.maxPages() && temp >= 0) {
        newPage = temp
      }
    }
    this.props.onChangePage(newPage);
  }

  render () {
    let pagesArr = this.getPagesArr();
    const {
      collection: {
        page
      }
    } = this.props;
    return (
      <Wrapper>
        <Button
          onClick={() => this.changePage(0, 0)}
          disabled={page === 0}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => this.changePage(null, -1)}
          disabled={page === 0}
        >
          {'<'}
        </Button>
        {
          pagesArr.map(item => (
            <Page key={item} active={item === page} onClick={() => this.changePage(item, 0)}>{item + 1}</Page>
          ))
        }
        <Button
          onClick={() => this.changePage(null, 1)}
          disabled={page === this.maxPages()}
        >
          {'>'}
        </Button>
        <Button
          onClick={() => this.changePage(this.maxPages(), 0)}
          disabled={page === this.maxPages()}
        >
          {'>>'}
        </Button>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  collection: state.collection,
});

const mapActionsToProps = {
  onChangePage: changePage
};

export default connect(mapStateToProps, mapActionsToProps)(Pagination);