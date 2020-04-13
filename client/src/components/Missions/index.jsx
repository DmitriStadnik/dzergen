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
  display: ${({visible}) => visible ? 'flex' : 'none'};
  margin-bottom: 50px;
`;

class Missions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      missions: null
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
    return (
      <>
        <PaddingWrapper>
          <Grid fluid>
            <Header>Задания</Header> 
            <Row>
              <SectionHeader>Активные</SectionHeader>
            </Row>   
            <Section visible={true}> 
              <Col sm={12}></Col>
              <Col sm={12}>Задание</Col>
            </Section>
            <Row>
              <SectionHeader>Новые</SectionHeader>
            </Row>   
            <Section visible={true}> 
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
