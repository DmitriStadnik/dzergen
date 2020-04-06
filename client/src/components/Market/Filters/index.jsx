import React, { Component } from 'react'
import {connect} from "react-redux";
import {changeFilters, changePage} from "../../../actions/market-actions";
import colors from "../../Reusable/colors";
import {
  Wrapper, 
  Container, 
  Filter,
  Title,
  Buttons,
  Input,
  Select,
  Button,
  SideButton,
  MenuIcon
} from "../../Reusable/filters";
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

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
          <MenuIcon icon={active ? faTimes : faFilter} />
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
  market: state.market,
});

const mapActionsToProps = {
  onChangeFilters: changeFilters,
  onChangePage: changePage
};

export default connect(mapStateToProps, mapActionsToProps)(Filters);
