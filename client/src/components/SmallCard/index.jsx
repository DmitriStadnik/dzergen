import React from 'react';
import styled from 'styled-components';
import Functions from "../../utils/Functions";

const Card = styled.div`
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  flex: ${({left}) => left ? '1 0 30%' : '1 0 50%'};
  @media screen and (max-width: 500px) {
    width: ${({left}) => left ? 'auto' : '100%'};
  }
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
  flex-shrink: 0;
  object-fit: cover;
  border: 1px solid ${({color}) => color ? color : '#2e3131'};
  border-radius: 3px;
  margin-right: 10px;
  @media screen and (max-width: 991px) {
    height: 150px;
    width: 150px;
  }
  @media screen and (max-width: 500px) {
    height: 115px;
    width: 115px;
  }
`;

const Name = styled.div`
  background-color: white;
  border: 1px solid ${({color}) => color ? color : '#2e3131'};
  text-align: center;
  text-transform: uppercase;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 12px;
  @media screen and (max-width: 500px) {
    margin-bottom: 7px;
  }
`;

const Text = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  font-size: 12px;
  width: 100%;
  height: 145px;
  text-align: center;
  @media screen and (max-width: 991px) {
    height: 130px;
  }
  @media screen and (max-width: 500px) {
    height: 100px;
    font-size: 11px;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
  margin-top: 10px;
  @media screen and (max-width: 991px) {
    width: 150px;
  }
  @media screen and (max-width: 500px) {
    width: 115px;
  }
`;

const Stat = styled.div`
  border: 2px solid ${({color}) => color ? color : '#2e3131'};
  background-color: ${({bgColor}) => bgColor ? bgColor : ''};
  height: 40px;
  width: 40px;
  color: white;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0 5px;
  padding-top: 1px;
  @media screen and (max-width: 991px) {
    height: 25px;
    width: 25px;
    font-size: 12px;
    margin: 0 1px;
  }
`;

const Data = styled.div`
  display: ${({mobile}) => mobile ? 'none' : 'flex'};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 5px;
  @media screen and (max-width: 991px) {
    display: ${({mobile}) => mobile ? 'flex' : 'none'};
  }
`;

const DataItem = styled.div`
  width: 100%;
  font-size: 12px;
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

export default ({item}) => (
  <Card color={Functions.getColor(item.rarity)} bgColor={Functions.getBgColor(item.rarity)} key={item.name.join('')}>
    <Column left>
      <Image src={Functions.imagePath(item.image)} color={Functions.getColor(item.rarity)} />
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
    </Column>
    <Column>
      <Name color={Functions.getColor(item.rarity)}>
        {item.nameStr}
      </Name>
      <Text>
        {item.words.join(' ')}
      </Text>
      <Data>
        <DataItem>
          Создатель: {item.createdBy && item.createdBy.length > 0 ? item.createdBy[0].name : 'Генератор'}
        </DataItem>
        <DataItem>
          Владелец: {item.createdBy && item.owner.length > 0 ? item.owner[0].name : 'Генератор'}
        </DataItem>
        <DataItem>
          Дата создания: { Functions.parseDate(item.dateCreated) }
        </DataItem>
      </Data>
    </Column>
    <Data mobile>
      <DataItem>
        Создатель: {item.createdBy && item.createdBy.length > 0 ? item.createdBy[0].name : 'Генератор'}
      </DataItem>
      <DataItem>
        Владелец: {item.createdBy && item.owner.length > 0 ? item.owner[0].name : 'Генератор'}
      </DataItem>
      <DataItem>
        Дата создания: { Functions.parseDate(item.dateCreated) }
      </DataItem>
    </Data>
  </Card>
);