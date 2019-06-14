import React, { Component } from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 340px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Page = styled.div`
  font-size: 16px;
  transition: 0.2s;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
  &:hover {
    background-color: #87d37c; 
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

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ...this.props
    }
  }
    
  componentDidUpdate(prevProps) {
    if(this.props.page !== prevProps.page || this.props.maxPage !== prevProps.maxPage) {
      this.update();
    }
  } 
    
  update() {
    this.setState({
      page: this.props.page,
      maxPage: this.props.maxPage
    })
  }

  getPagesArr() {
    const {page, maxPage} = this.state;

    let start = page - 5 < 0 ? 0 : page - 5;
    let end = page + 5 > maxPage ? maxPage : page + 5;

    let pagesArr = [];

    for (let i = start; i <= end; i++) {
      pagesArr.push(i);
    }

    console.log(pagesArr)
    return pagesArr;
  }


  render () {
    const {page, maxPage} = this.state;

    let pagesArr = this.getPagesArr();
    return (
      <Wrapper>
        <Button>{'<'}</Button>
        {
          pagesArr.map(item => (
            <Page>{item}</Page>
          ))
        }
        <Button>{'>'}</Button>
      </Wrapper>
    )
  }
}