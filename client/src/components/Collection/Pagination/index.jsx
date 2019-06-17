import React, { Component } from 'react'
import styled from 'styled-components';

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
  margin: 0px 5px;
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
    return pagesArr;
  }


  render () {
    const {page, handler} = this.state;
    let pagesArr = this.getPagesArr();
    return (
      <Wrapper>
        <Button onClick={() => handler(null, -1)}>{'<'}</Button>
        {
          pagesArr.map(item => (
            <Page key={item} active={item === page} onClick={() => handler(item, 0)}>{item + 1}</Page>
          ))
        }
        <Button onClick={() => handler(null, 1)}>{'>'}</Button>
      </Wrapper>
    )
  }
}