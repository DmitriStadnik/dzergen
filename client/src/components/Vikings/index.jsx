import React, {useState} from 'react'
import styled from 'styled-components';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PaddingWrapper, Header} from '../Reusable/styled.js';
import colors from "../Reusable/colors";

const Section = styled.div`
  width: 500px;
  margin: auto auto 20px;
`;

const ButtonHeader = styled.h5`
  width: 100%;
  display: flex;
  justify-content: space-between;
  line-height: inherit;
`;

const TextLine = styled.p`
  margin-bottom: 5px;
`;

const FlexLine = styled(TextLine)`
  display: flex;
  justify-content: space-between;
`;

const Select = styled.select`
  font-size: 14px;
  padding: 5px 10px;
  min-width: 120px;
  margin-left: 10px;
`;

const HexContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const HexIndex = styled.span`
  font-weight: bold;
`;

const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  padding: 5px 10px;
  color: white;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  border: none;
  outline: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  &:hover {
    background-color: ${({hlColor}) => hlColor ? hlColor : 'auto'}; 
    box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.22);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: ${({dsColor}) => dsColor ? dsColor : 'auto'}; 
    &:hover {
      background-color: ${({dsColor}) => dsColor ? dsColor : 'auto'}; 
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
  }
`;

const terrainTypes = [
  {
    name: 'Луг',
    mod: 1
  },
  {
    name: 'Дорога',
    mod: 1
  },
  {
    name: 'Лес',
    mod: 2
  },
  {
    name: 'Болото',
    mod: 3
  },
  {
    name: 'Горы',
    mod: 5
  },
  {
    name: 'Ледник',
    mod: 5
  },
  {
    name: 'Ледяная пустошь',
    mod: 4
  },
  {
    name: 'Тундра',
    mod: 1.5
  },
]

const movementTypes = [
  {
    name: 'Пешком',
    kilos: 30
  },
  {
    name: 'На коне',
    kilos: 60
  },
  {
    name: 'По течению реки',
    kilos: 30
  },
  {
    name: 'Против течения реки',
    kilos: 10
  },
]

const SelectTerrain = ({itemIndex, selectedId, onChange}) => {
  const handleChange = (e) => {
    onChange(itemIndex, e.target.value)
  }

  return <Select value={selectedId} onChange={handleChange}>
    {terrainTypes.map((item, index) => (
      <option value={index} key={item.name}>{item.name}</option>
    ))}
  </Select>
}

const SelectMovementType = ({itemIndex, selectedId, onChange}) => {
  const handleChange = (e) => {
    onChange(itemIndex, e.target.value)
  }

  return <Select value={selectedId} onChange={handleChange}>
    {movementTypes.map((item, index) => (
      <option value={index} key={item.name}>{item.name}</option>
    ))}
  </Select>
}

const defaultHex = {
  terrain: 0,
  movementType: 0,
};

const Vikings = () => {
  const [hexList, setHexList] = useState([defaultHex]);
  const [kilometersLeft, setKilometersLeft] = useState(0);
  const [kilometersMax, setKilometersMax] = useState(0);

  const handleAddHex = () => {
    setHexList([...hexList, defaultHex])
  }

  const handleChangeTerrain = (itemIndex, newValue) => {
    setHexList(hexList.map((item, index) => {
      if (index === itemIndex) return {
        ...item,
        terrain: newValue
      }

      return item;
    }))
  }

  const handleChangeMovementType = (itemIndex, newValue) => {
    setHexList(hexList.map((item, index) => {
      if (index === itemIndex) return {
        ...item,
        movementType: newValue
      }

      return item;
    }))
  }

  const handleRemoveHex = (index) => {
    const newItems = [...hexList];
    newItems.splice(index, 1);

    setHexList(newItems)
  }

  const calculateInitialDays = () => {
    setKilometersLeft(hexList.length * 100)
    setKilometersMax(hexList.length * 100)
  }

  const calculateCurrentHex = () => {
    const delta = kilometersMax - kilometersLeft;

    return Math.floor(delta / 100) + 1
  }

  const calculateSpeedByHex = (index) => {
    const hex = hexList[index];
    const movementType = movementTypes[hex.movementType];
    const terrain = terrainTypes[hex.terrain];

    return movementType.kilos / terrain.mod;
  }

  return (
    <PaddingWrapper>
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <Header>Путешествие</Header>
            <Section>
              <ButtonHeader>
                Гексы
                <Button
                  bgColor={colors.green_main}
                  hlColor={colors.green_hl}
                  dsColor={colors.green_ds}
                  onClick={handleAddHex}
                >
                  Добавить
                </Button>
              </ButtonHeader>
              {hexList.map((item, index) => (
                <HexContainer key={`${item.terrain}${Math.random()}`}>
                  <div>
                    <HexIndex>{index + 1}</HexIndex>
                    <SelectTerrain selectedId={item.terrain} itemIndex={index} onChange={handleChangeTerrain}/>
                    <SelectMovementType selectedId={item.movementType} itemIndex={index} onChange={handleChangeMovementType}/>
                  </div>
                  { hexList.length > 1 && (
                    <Button
                      bgColor={colors.green_main}
                      hlColor={colors.green_hl}
                      dsColor={colors.green_ds}
                      onClick={() => handleRemoveHex(index)}
                    >
                      Удалить
                    </Button>
                  )}
                </HexContainer>
              ))}
              <Button
                bgColor={colors.green_main}
                hlColor={colors.green_hl}
                dsColor={colors.green_ds}
                onClick={calculateInitialDays}
              >
                Рассчитать
              </Button>
            </Section>
            <Section>
              <ButtonHeader>
                Скорость передвижения (км/сутки)
              </ButtonHeader>
              {hexList.map((item, index) => (
                <FlexLine>
                  <span>
                    Гекс <strong>{index + 1}</strong>
                  </span>
                  <span>
                    {calculateSpeedByHex(index)}
                  </span>
                </FlexLine>
              ))}
              <TextLine>Осталось километров: <strong>{kilometersLeft} / {kilometersMax}</strong></TextLine>
              <TextLine>Гекс: <strong>{calculateCurrentHex()} / {hexList.length}</strong></TextLine>
            </Section>
          </Col>
        </Row>
      </Grid>
    </PaddingWrapper>
  );
};

export default Vikings;