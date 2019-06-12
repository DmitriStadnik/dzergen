import React, { Component } from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid black;
`;

const Image = styled.img`
   
`;

const Name = styled.div`
   
`;

const Rarity = styled.div`
   
`;

const Text = styled.div`
   
`;

const Stats = styled.div`
  
`;

export default class Dzerdan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {}
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.item.name !== nextProps.item.name;
  }

  render () {
    console.log(this.props)
    const {
      name,
      rarityStr,
      stats,
      image,
      words
    } = this.props;

    return (
      <Wrapper> 
        <Image src={image} />
        <Name>
          {name ? name.join() : ''}
        </Name>
        <Rarity>
          {`${rarityStr} дзердан`}
        </Rarity>
        <Text>
          {words ? words.join(' ') : ''}
        </Text>
        <Stats>
          {stats}
        </Stats>
      </Wrapper>
    )
  }
}