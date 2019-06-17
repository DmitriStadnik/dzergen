import React, { Component } from 'react';
import styled from 'styled-components';
import equal from 'fast-deep-equal';
import Functions from "../../../utils/Functions";

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
    const {
      imagePath,
      getColor,
      getBgColor
    } = Functions;

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