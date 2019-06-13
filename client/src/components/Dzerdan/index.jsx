import React, { Component } from 'react';
import styled from 'styled-components';
import equal from 'fast-deep-equal';

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

const Stat = styled.div`
  
`;

export default class Dzerdan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props
    }
  }

  // componentDidUpdate(prevProps) {
  //   console.log('e')
  //   if(!equal(this.props.item, prevProps.item))
  //   {
  //     this.update();
  //   }
  // } 

  // update() {
  //   this.setState({
  //     item: this.props.item
  //   })
  // }

  render () {
    console.log(this.state)
    const {
      item: {
        name,
        rarityStr,
        stats,
        image,
        words
      } 
    } = this.state;

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
          <Stat>
            {stats.vitality}
          </Stat>
          <Stat>
            {stats.strength}
          </Stat>
          <Stat>
            {stats.arse}
          </Stat>
          <Stat>
            {stats.intellect}
          </Stat>
        </Stats>
      </Wrapper>
    )
  }
}