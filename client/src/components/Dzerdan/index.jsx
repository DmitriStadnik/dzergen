import React, { Component } from 'react';
import styled from 'styled-components';
import equal from 'fast-deep-equal';
import Functions from "../../utils/Functions";
import colors from "../Reusable/colors";

const Wrapper = styled.div`
  border: 3px solid ${({color}) => color ? color : '#2e3131'};
  width: 340px;
  height: 410px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  margin: auto;
  position: relative;
  z-index: 9000;
  @media screen and (max-width: 600px) {
    width: 300px;
  }
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
  @media screen and (max-width: 600px) {
    height: 270px;
  }
`;

const Name = styled.div`
  text-align: center;
  font-size: 18px;
  text-transform: uppercase;  
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  color: ${({text}) => text ? '#db0a5b' : 'auto'};
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  background-color: white;
`;

const Rarity = styled.div`
  width: 100%;
  text-align: center;
  font-size: 10px;
  text-transform: uppercase; 
  position: absolute;
  bottom: 10px;
  left: 0;
`;

const Text = styled.div`
  background-color: white;
  margin-bottom: 2px;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  text-align: center;
  line-height: 1;
`;

const Stat = styled.div`
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  height: 35px;
  width: 35px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute; 
  top: 5px;
  left: 5px;
  line-height: 15px;
`;

const DataItem = styled.div`
  width: 100%;
  font-size: 10px;
`;

const Main = styled.div`
  
`;

const Secondary = styled.div`
  display: ${({active}) => active ? 'flex' : 'none'};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: RGBA(255, 255, 255, 0.8);
  z-index: 9001;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
`;

const Data = styled.div`
  width: 100%;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
`;


export default class Dzerdan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      secondaryActive: false
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

  toggleSecondary() {
    const { secondaryActive } = this.state;
    this.setState({ secondaryActive: !secondaryActive });
  }

  render () {
    const {
      item: {
        nameStr,
        alignment,
        image,
        traits,
        rarity,
        kawaii,
        dateCreated,
        createdBy,
        owner,
        price
      },
      newItem,
      secondaryActive
    } = this.state;
    const {
      imagePath,
      getColor,
      getBgColor,
      parseRarity
    } = Functions;

    let color = getColor(rarity);
    let bgColor = getBgColor(rarity);

    let rarityMod = alignment > 0 ? 'Порядочный' : alignment < 0 ? 'Хитровыебанный' : '';

    return (
      <Wrapper color={color} bgColor={bgColor} onClick={() => this.toggleSecondary()}> 
        <Main>
          <Image src={imagePath(image)} color={color} />
          <Name color={color} text={kawaii}>
            { nameStr || ''}{kawaii && '-тян'}
          </Name>
          {
            alignment > 0 ? (
              <Stat color={colors.border_green} bgColor={colors.card_green} title={`Порядочный: +${alignment}`}>
                {`+${alignment}`}
              </Stat>
            ) : alignment < 0 ? (
              <Stat color={colors.border_red} bgColor={colors.card_red} title={`Хитровыебанный: ${alignment}`}>
                {alignment}
              </Stat>
            ) : (
              <Stat color={colors.border_grey} bgColor={colors.card_grey} title={`Нейтральный: ${alignment}`}>
                {alignment}
              </Stat>
            )
          }
        </Main>
        <Secondary active={secondaryActive}>
          { traits && traits.map(item =>(
            <Text color={color} key={`${item.which.word} ${item.what.word} ${item.who.word}`}>
              {
                `${item.which.word} ${item.what.word} ${item.who.word}`
              }
            </Text>
          ))}
          <Data>
            { !newItem && (
              <>
                <DataItem>
                  Создатель: {createdBy && createdBy.length > 0 ? createdBy[0].name : 'Генератор'}
                </DataItem>
                <DataItem>
                  Владелец: {createdBy && owner.length > 0 ? owner[0].name : 'Генератор'}
                </DataItem>
              </>
            )}
            <DataItem>
              Дата создания: { Functions.parseDate(dateCreated) }
            </DataItem>
            <DataItem>
              Цена: {price} дк
            </DataItem>
          </Data>
        </Secondary>
        <Rarity>
          {`${rarityMod} ${parseRarity(rarity)} ${kawaii ? 'ня-' : ''}дзердан`}
        </Rarity>
      </Wrapper>
    )
  }
}