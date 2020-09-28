import React from 'react';
import styled from 'styled-components';
import Functions from "../../utils/Functions";

const Card = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
  max-width: 700px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  flex: ${({flex}) => flex};
  @media screen and (max-width: 600px) {
    display: ${({mobileHide}) => mobileHide ? 'none' : 'flex'};
  }
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  flex-shrink: 0;
  object-fit: cover;
  border: 1px solid ${({color}) => color ? color : '#2e3131'};
  border-radius: 3px;
  margin-right: 10px;
`;

const Name = styled.div`
  background-color: white;
  border: 1px solid ${({color}) => color ? color : '#2e3131'};
  color: ${({text}) => text ? '#db0a5b' : 'auto'};
  text-align: center;
  text-transform: uppercase;
  padding: 5px;
  font-size: 14px;
  width: 250px;
  margin-bottom: 5px;
  @media screen and (max-width: 991px) {
    width: 200px;
  }
  @media screen and (max-width: 500px) {
    margin-bottom: 7px;
    width: 170px;
  }
`;


const Stat = styled.div`
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  height: 25px;
  width: 25px;
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
`;

const DataItem = styled.div`
  width: 100%;
  font-size: 10px;
  padding-left: 10px;
`;

const Rarity = styled.div`
  width: 250px;
  font-size: 10px;
  padding: 5px;
  text-transform: uppercase;
  text-align: center;
  @media screen and (max-width: 991px) {
    width: 200px;
  }
  @media screen and (max-width: 500px) {
    width: 170px;
  }
`;

export default ({item}) => (
  <Card color={Functions.getColor(item.rarity)} bgColor={Functions.getBgColor(item.rarity)} key={item.name.join('')}>
    <Column flex={0}>
      <Image src={Functions.imagePath(item.image)} color={Functions.getColor(item.rarity)} />
      {
        item.alignment > 0 ? (
          <Stat color={'#26a65b'} bgColor={'#2ecc71'} title={`Порядочный: +${item.alignment}`}>
            {`+${item.alignment}`}
          </Stat>
        ) : item.alignment < 0 ? (
          <Stat color={'#cf000f'} bgColor={'#e74c3c'} title={`Хитровыебанный: ${item.alignment}`}>
            {item.alignment}
          </Stat>
        ) : (
          <Stat color={'#2e3131'} bgColor={'#ececec'} title={`Нейтральный: ${item.alignment}`}>
            {item.alignment}
          </Stat>
        )
      }
    </Column>
    <Column flex={0}>
      <Name color={Functions.getColor(item.rarity)} text={item.kawaii}>
        {item.nameStr}{item.kawaii && '-тян'}
      </Name>
      <Rarity>
        {`${item.alignment > 0 ? 'Порядочный' : item.alignment < 0 ? 'Хитровыебанный' : ''} ${Functions.parseRarity(item.rarity)} ${item.kawaii ? 'ня-' : ''}окропит`}
      </Rarity>
    </Column>
    <Column flex={1} mobileHide>
      <DataItem>
        Дата создания: { Functions.parseDate(item.dateCreated) }
      </DataItem>
      <DataItem>
        Создатель: {item.createdBy && item.createdBy.length > 0 ? item.createdBy[0].name : 'Генератор'}
      </DataItem>
      <DataItem>
        Владелец: {item.createdBy && item.owner.length > 0 ? item.owner[0].name : 'Генератор'}
      </DataItem>
      <DataItem>
        Цена: {item.price} ок
      </DataItem>
    </Column>
  </Card>
);