import React, { Component } from 'react';
import styled from 'styled-components';
import equal from 'fast-deep-equal';
import Functions from "../../utils/Functions";

const Wrapper = styled.div`
  border: 3px solid ${({color}) => color ? color : '#2e3131'};
  width: 340px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  margin: auto;
  position: relative;
`;

const Image = styled.img`
  display: block;
  height: 310px;
  width: 100%;
  object-fit: cover;
  margin: auto; 
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
`;

const Name = styled.div`
  text-align: center;
  font-size: 18px;
  text-transform: uppercase;  
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 5px;
  background-color: white;
`;

const Rarity = styled.div`
  width: 100%;
  text-align: center;
  font-size: 12px;
  text-transform: uppercase; 
  margin-top: 10px;
`;

const Text = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
  margin-top: 10px;
  padding: 20px;
  height: 120px;
  border-radius: 5px;
`;

const Stats = styled.div`
  position: absolute; 
  top: 5px;
  right: 5px;
  display: flex;
  flex-direction: column;
`;

const Stat = styled.div`
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  height: 30px;
  width: 30px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 5px;
  padding-top: 1px;
`;

export default class Dzerdan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props
    }
  }

  componentDidUpdate(prevProps) {
    if(!equal(this.props.item, prevProps.item)) {
      this.update();
    }
  } 

  update() {
    this.setState({
      item: this.props.item
    })
  }

  render () {
    const {
      item: {
        nameStr,
        stats,
        image,
        words,
        rarity
      } 
    } = this.state;
    const {
      imagePath,
      getColor,
      getBgColor,
      parseRarity
    } = Functions;

    let color = getColor(rarity);
    let bgColor = getBgColor(rarity);

    return (
      <Wrapper color={color} bgColor={bgColor}> 
        <Image src={imagePath(image)} color={color} />
        <Name color={color}>
          {nameStr ? nameStr : ''}
        </Name>
        <Text>
          {words ? words.join(' ') : ''}
        </Text>
        <Rarity>
          {`${parseRarity(rarity)} дзердан`}
        </Rarity>
        <Stats>
          <Stat color={'#26a65b'} bgColor={'#2ecc71'} title='Выносливость'>
            {stats.vitality}
          </Stat>
          <Stat color={'#cf000f'} bgColor={'#e74c3c'} title='Сила'>
            {stats.strength}
          </Stat>
          <Stat color={'#663399'} bgColor={'#a537fd'} title='ЖЕПА'>
            {stats.arse}
          </Stat>
          <Stat color={'#19b5fe'} bgColor={'#6bb9f0'} title='Интеллект'>
            {stats.intellect}
          </Stat>
        </Stats>
      </Wrapper>
    )
  }
}