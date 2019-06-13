import React, { Component } from 'react';
import styled from 'styled-components';
import equal from 'fast-deep-equal';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 100%;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  flex-shrink: 0;
  object-fit: cover;
  border: 1px solid ${({color}) => color ? color : '#2e3131'};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  margin-right: 10px;
`;

const Name = styled.div`
  background-color: white;
  border: 1px solid ${({color}) => color ? color : '#2e3131'};
  text-align: center;
  text-transform: uppercase;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 10px;
`;

const Text = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  font-size: 12px;
  width: 100%;
  text-align: center;
`;

export default class Dzerdan extends Component {
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

  render () {
    const {
      items
    } = this.state;
    const {
      imagePath,
      getColor,
      getBgColor
    } = this;

    return (
      <Wrapper> 
        { items.map(item =>(
          <Card color={getColor(item.rarity)} bgColor={getBgColor(item.rarity)} key={item.name.join('')}>
            <Image src={imagePath(item.image)} color={getColor(item.rarity)} />
            <Content>
              <Name color={getColor(item.rarity)}>
                {item.name}
              </Name>
              <Text>
                {item.words.join(' ')}
              </Text>
            </Content>
            
          </Card>
        ))}
      </Wrapper>
    )
  }
}