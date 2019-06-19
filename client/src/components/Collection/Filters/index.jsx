import React, { Component } from 'react'
import styled from 'styled-components';
import {connect} from "react-redux";
import {changeFilters, changePage} from "../../../actions/collection-actions";

const Wrapper = styled.div`
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: ${({active}) => active ? 'flex' : 'none'};
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.div`
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
`;

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      rarity: 5
    }
    this.handleNameChange = this.handleNameChange.bind(this);
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
    ]

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
            <Select defaultValue={rarity}>
              {
                rarityArr.map((item, index) => (
                  <option value={index}>{item}</option>
                ))
              }
            </Select>
          </Filter>
        </Container>
        <button onClick={() => this.changeFilters()}>Применить</button>
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
