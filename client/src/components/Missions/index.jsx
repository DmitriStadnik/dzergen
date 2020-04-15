import React, { Component } from 'react'
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { PaddingWrapper, Header } from '../Reusable/styled.js';
import {connect} from "react-redux";
import {fetchCollection} from "../../actions/collection-actions";

const SectionHeader = styled.div`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
  width: 100%;
`;

const Section = styled(Row)`
  display: ${({active}) => active ? 'flex' : 'none'};
  margin-bottom: 50px;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 400px;
  border: 2px solid grey;
  border-radius: 5px;
  padding: 10px;
`;

const Title = styled.div`
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Money = styled.div`
`;

class Missions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      missions: null,
      sectionsActive: [
        true,
        true
      ]
    }
  }

  componentDidMount() {
    // this.getCollection()
  }

  getCollection() {
    const {
      collection: {
        page,
        itemsPerPage,
        filters
      },
    } = this.props;

    let userId = this.props.match.params.id;

    this.props.onFetchCollection(page, itemsPerPage, filters, userId === 'all' ? null : userId);
  }

  // TODO
  // 1. Редкость заданий
  // 2. Название, количество дк в час
  render () {
    const {
      sectionsActive
    } = this.state;

    return (
      <>
        <PaddingWrapper>
          <Grid fluid>
            <Header>Задания</Header> 
            <Row>
              <SectionHeader>Активные</SectionHeader>
            </Row>   
            <Section active={sectionsActive[0]}> 
              <Col sm={12}>
                <Card>
                  <Title>Название задания</Title>
                  <Info>
                    <Money>+10 дк</Money>
                    <Money>2 дзердана</Money>
                  </Info>
                </Card>
              </Col>
              <Col sm={12}>Задание</Col>
            </Section>
            <Row>
              <SectionHeader>Новые</SectionHeader>
            </Row>   
            <Section active={sectionsActive[1]}>
              <Col sm={12}>Задание</Col>
              <Col sm={12}>Задание</Col>
            </Section>
          </Grid>
        </PaddingWrapper>
      </>
    )
  }
}

const mapStateToProps = state => ({
  collection: state.collection,
  user: state.user,
});

const mapActionsToProps = {
  onFetchCollection: fetchCollection
};

export default connect(mapStateToProps, mapActionsToProps)(Missions);
