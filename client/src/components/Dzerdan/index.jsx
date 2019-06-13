import React, { Component } from 'react';
import styled from 'styled-components';
import equal from 'fast-deep-equal';

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
  height: 340px;
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

  imagePath(img) {
    return `/images/${img}`
  }

  getColor(rarity = 0) {
    switch (rarity) {
      case 0:
        return '#2e3131';
      case 1:
        return '#26a65b';
      case 2:
        return '#2c82c9';
      case 3:
        return '#663399';
      case 4:
        return '#f9690e';
      default:
        return '#2e3131';
    }
  }

  getBgColor(rarity = 0) {
    switch (rarity) {
      case 0:
        return '#ececec';
      case 1:
        return '#66cc99';
      case 2:
        return '#6bb9f0';
      case 3:
        return '#9b59b6';
      case 4:
        return '#fabe58';
      default:
        return '#ececec';
    }
  }

  parseRarity(rarity) {
    switch (rarity) {
      case 0:
        return 'рядовой';
      case 1:
        return 'бывалый';
      case 2:
        return 'закаленный в бою';
      case 3:
        return 'легендарный';
      case 4:
        return 'эпический';
      default:
        return 'что это за';
    }
  }

  render () {
    const {
      item: {
        name,
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
    } = this;

    let color = getColor(rarity);
    let bgColor = getBgColor(rarity);

    return (
      <Wrapper color={color} bgColor={bgColor}> 
        <Image src={imagePath(image)} color={color} />
        <Name color={color}>
          {name ? name.join('') : ''}
        </Name>
        <Text>
          {words ? words.join(' ') : ''}
        </Text>
        <Rarity>
          {`${parseRarity(rarity)} дзердан`}
        </Rarity>
        <Stats>
          <Stat color={'#1e824c'} bgColor={'#2ecc71'} title='Выносливость'>
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