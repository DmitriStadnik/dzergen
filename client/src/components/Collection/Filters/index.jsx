import React, { Component } from 'react'
import styled from 'styled-components';
import {connect} from "react-redux";
import {changeFilters, changePage} from "../../../actions/collection-actions";

const Wrapper = styled.div`
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: ${({active}) => active ? 'flex' : 'none'};
  justify-content: center;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 200px;
  margin: 0 10px;
`;

const Title = styled.div`
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  height: 40px;
  padding: 0 10px;
`;

const Select = styled.select`
  width: 100%;
  font-size: 14px;
  height: 40px;
  padding: 0 10px;
`;

const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  padding: 10px;
  color: white;
  background-color: #26a65b;
  width: 200px;
  margin: 20px auto;
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

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      rarity: 5
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRaritySelect = this.handleRaritySelect.bind(this);
  }

  componentDidMount() {
    this.props.onChangeFilters({
      name: '',
      rarity: 5
    });
  }

  changeFilters() {
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

  render () {
    const {
      collection: {
        filters: {
          rarity
        }
      }
    } = this.props;

    const rarityArr = [
      'Рядовой',
      'Бывалый',
      'Закаленный в бою',
      'Легендарный',
      'Эпический',
      'Все'
    ];

    return (
      <Wrapper>
        <Container active>
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
            <Select defaultValue={rarity} onChange={this.handleRaritySelect}>
              {
                rarityArr.map((item, index) => (
                  <option value={index} key={item}>{item}</option>
                ))
              }
            </Select>
          </Filter>
        </Container>
        <Button onClick={() => this.changeFilters()}>Применить</Button>
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
