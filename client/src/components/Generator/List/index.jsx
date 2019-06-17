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
  height: 130px;
  width: 130px;
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

const Stats = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const Stat = styled.div`
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  height: 25px;
  width: 25px;
  color: white;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0 5px;
  padding-top: 1px;
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

              <Stats>
                <Stat color={'#26a65b'} bgColor={'#2ecc71'} title='Выносливость'>
                  {item.stats.vitality}
                </Stat>
                <Stat color={'#cf000f'} bgColor={'#e74c3c'} title='Сила'>
                  {item.stats.strength}
                </Stat>
                <Stat color={'#663399'} bgColor={'#a537fd'} title='ЖЕПА'>
                  {item.stats.arse}
                </Stat>
                <Stat color={'#19b5fe'} bgColor={'#6bb9f0'} title='Интеллект'>
                  {item.stats.intellect}
                </Stat>
              </Stats>
            </Content>
          </Card>
        ))}
      </Wrapper>
    )
  }
}