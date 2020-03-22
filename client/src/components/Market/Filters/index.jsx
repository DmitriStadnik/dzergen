import React, { Component } from 'react'
import styled from 'styled-components';
import {connect} from "react-redux";
import {changeFilters, changePage} from "../../../actions/market-actions";

const Wrapper = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
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
  border: 2px solid #26a65b;
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
  background-color: #26a65b;
  width: 100%;
  display: block;
  border: none;
  outline: none;
  transition: 0.2s;
  &:hover {
    background-color: #87d37c; 
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #a2ded0; 
    &:hover {
      background-color: #a2ded0;
    }
  }
`;

const SideButton = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px 7px;
  color: white;
  background-color: #26a65b;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #87d37c; 
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #a2ded0; 
    &:hover {
      background-color: #a2ded0;
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
        <SideButton onClick={() => toggleActive()}>{active ? 'Закрыть' : 'Фильтры'}</SideButton>
        <Container active={active}>
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
            <Button onClick={() => this.changeFilters()}>Применить</Button>
            <Button onClick={() => this.changeFilters(true)}>Сбросить</Button>
          </Buttons>
        </Container>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  market: state.market,
});

const mapActionsToProps = {
  onChangeFilters: changeFilters,
  onChangePage: changePage
};

export default connect(mapStateToProps, mapActionsToProps)(Filters);
