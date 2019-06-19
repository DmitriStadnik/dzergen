import React, { Component } from 'react'
import styled from 'styled-components';
import {changePage} from "../../../actions/collection-actions";
import {connect} from "react-redux";

const Wrapper = styled.div`
  width: 340px;
  margin: 50px auto;
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
  componentDidMount() {
    this.changePage(0, 0);
  }

  getPagesArr() {
    const maxPage = this.maxPages();
    const {
      collection: {
        page
      }
    } = this.props;

    let start = page - 5 < 0 ? 0 : page - 5;
    let end = page + 5 > maxPage ? maxPage : page + 5;

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
        <Button onClick={() => this.changePage(0, 0)}>{'<<'}</Button>
        <Button onClick={() => this.changePage(null, -1)}>{'<'}</Button>
        {
          pagesArr.map(item => (
            <Page key={item} active={item === page} onClick={() => this.changePage(item, 0)}>{item + 1}</Page>
          ))
        }
        <Button onClick={() => this.changePage(null, 1)}>{'>'}</Button>
        <Button onClick={() => this.changePage(this.maxPages(), 0)}>{'>>'}</Button>
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