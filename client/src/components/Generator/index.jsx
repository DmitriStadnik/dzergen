import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import {connect} from "react-redux";
import { Grid, Row, Col } from 'react-flexbox-grid';
import { PaddingWrapper, Header } from '../Reusable/styled.js';
import Dzerdan from '../Dzerdan'
import colors from "../Reusable/colors";

const Buttons = styled.div`
  text-align: center;
  width: 340px;
  margin: 10px auto 50px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  padding: 10px;
  color: white;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  width: 100%;
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

class Generator extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      dzerdan: null,
      savePossible: true,
    }

    this.getDzerdan = this.getDzerdan.bind(this);
  }

  componentDidMount() { 
    this.getDzerdan();
  }

  getDzerdan() {
    let that = this;
    const {
      user: {
        data
      }
    } = this.props;

    let id = null;

    if (data !== null) {
      id = data._id;
    }

    axios.get('/api/generator/generate', {
      params: { userId: id }
    })
      .then(response => {
        that.setState({
          dzerdan: response.data,
          savePossible: true
        });
      })
      .catch(error => console.log(error))
  }

  saveDzerdan() {
    this.setState({savePossible: false});
    axios.post('/api/generator/save', {
      ...this.state.dzerdan 
    })
      .catch(error => console.log(error))
  }

  render () {
    const {
      dzerdan, 
      savePossible, 
    } = this.state;
    return (
      <PaddingWrapper>
        <Grid fluid>
          <Row>
            <Col sm={12}>
              <Header>Генератор</Header>
              {
                dzerdan && (<Dzerdan item={dzerdan} newItem />) 
              }
              <Buttons>
                <Button
                  onClick={() => this.getDzerdan()}
                  bgColor={colors.green_main}
                  hlColor={colors.green_hl}
                  dsColor={colors.green_ds}
                >
                  Генерировать
                </Button>
                {/*<Button*/}
                {/*  onClick={() => this.saveDzerdan()}*/}
                {/*  disabled={!savePossible}*/}
                {/*  bgColor={colors.green_main}*/}
                {/*  hlColor={colors.green_hl}*/}
                {/*  dsColor={colors.green_ds}*/}
                {/*>*/}
                {/*  {savePossible ? 'Сохранить' : 'Сохранено' }*/}
                {/*</Button>*/}
              </Buttons>
            </Col>
          </Row>
        </Grid>
      </PaddingWrapper>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Generator);