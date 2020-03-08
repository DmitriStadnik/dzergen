import React, { Component } from 'react';
import styled from 'styled-components';
import equal from 'fast-deep-equal';
import SmallCard from '../../SmallCard'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props
    }
  }

  componentDidUpdate(prevProps) {
    if(!equal(this.props.items, prevProps.items)) {
      this.update();
    }
  } 

  update() {
    this.setState({
      items: this.props.items
    })
  }

  render () {
    const {
      items
    } = this.state;

    return (
      <Wrapper> 
        { items.map(item => (
          <SmallCard key={item.nameStr} item={item} />
        ))}
      </Wrapper>
    )
  }
}