import React, { Component } from 'react'
import styled from 'styled-components';
import {connect} from "react-redux";
import {changeFilters, changePage} from "../../../actions/collection-actions";
import colors from "../../Reusable/colors";

const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 200px;
  z-index: 9000;
  @media screen and (max-width: 767px) {
    top: auto;
    bottom: 0; 
  }
`;

const Container = styled.div`
  display: ${({active}) => active ? 'flex' : 'none'};
  justify-content: center;
  flex-direction: column;
  width: 250px;
  background: white;
  border: ${({brColor}) => brColor ? `2px solid ${brColor}` : 'white'};
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 10px;
`;

const Title = styled.div`
  font-size: 12px;
`;

const Buttons = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 12px;
  height: 30px;
  padding: 0 5px;
`;

const Select = styled.select`
  width: 100%;
  font-size: 12px;
  height: 30px;
  padding: 0 5px;
`;

const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
  color: white;
  width: 100%;
  display: block;
  border: none;
  outline: none;
  transition: 0.2s;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
  &:hover {
    background-color: ${({hlColor}) => hlColor ? hlColor : 'white'};
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: ${({dsColor}) => dsColor ? dsColor : 'white'};
    &:hover {
      background-color: ${({dsColor}) => dsColor ? dsColor : 'white'};
    }
  }
`;

const SideButton = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px 7px;
  color: white;
  transition: 0.2s;
  cursor: pointer;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
  &:hover {
    background-color: ${({hlColor}) => hlColor ? hlColor : 'white'};
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: ${({dsColor}) => dsColor ? dsColor : 'white'};
    &:hover {
      background-color: ${({dsColor}) => dsColor ? dsColor : 'white'};
    }
  }
`;

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      rarity: 5,
      active: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRaritySelect = this.handleRaritySelect.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }

  componentDidMount() {
    this.props.onChangeFilters({
      name: '',
      rarity: 5
    });
  }

  changeFilters(def) {
    if (def) {
      this.props.onChangeFilters({
        name: '',
        rarity: 5
      });
      this.setState({ 
        name: '',
        rarity: 5
      });
      this.props.onChangePage(0);
      return;
    }
    const {
      name,
      rarity
    } = this.state;
    this.props.onChangeFilters({
      name,
      rarity
    });
    this.props.onChangePage(0);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value});
  }

  handleRaritySelect(event) {
    this.setState({ rarity: parseInt(event.target.value)});
  }

  toggleActive() {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  render () {
    const {
      active,
      rarity
    } = this.state;
    const {
      toggleActive
    } = this;

    const rarityArr = [
      'Рядовой',
      'Бывалый',
      'Закаленный в бою',
      'Достопочтенный',
      'Легендарный',
      'Все'
    ];

    return (
      <Wrapper>
        <SideButton 
          onClick={() => toggleActive()}
          bgColor={colors.green_main}
          hlColor={colors.green_hl}
          dsColor={colors.green_ds}
        >
          {active ? 'Закрыть' : 'Фильтры'}
        </SideButton>
        <Container active={active} brColor={colors.green_main}>
          <Filter>
            <Title>
              Имя
            </Title>
            <Input type='text' onChange={this.handleNameChange} />
          </Filter>
          <Filter>
            <Title>
              Редкость
            </Title>
            <Select value={rarity} onChange={this.handleRaritySelect}>
              {
                rarityArr.map((item, index) => (
                  <option value={index} key={item}>{item}</option>
                ))
              }
            </Select>
          </Filter>
          <Buttons>
          <Button 
              onClick={() => this.changeFilters()}
              bgColor={colors.green_main}
              hlColor={colors.green_hl}
              dsColor={colors.green_ds}
            >
              Применить
            </Button>
            <Button 
              onClick={() => this.changeFilters(true)}
              bgColor={colors.green_main}
              hlColor={colors.green_hl}
              dsColor={colors.green_ds}
            >
              Сбросить
            </Button>
          </Buttons>
        </Container>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  collection: state.collection,
});

const mapActionsToProps = {
  onChangeFilters: changeFilters,
  onChangePage: changePage
};

export default connect(mapStateToProps, mapActionsToProps)(Filters);
