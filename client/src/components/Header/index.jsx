import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import User from "./User";

const Wrapper = styled.div`
  width: 100%;
  background-color: #26a65b;
  display: flex;
  padding: 10px 20px;
`;

const Logo = styled.div`
  font-size: 20px;
  color: white;
  width: 100px;
`;

const LeftList = styled.ul`
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 767px) {
    height: 300px;
    flex-direction: column;
  }
`;

const RightList = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  @media screen and (max-width: 767px) {
    height: 300px;
    margin-right: 20px;
    align-items: flex-start;
  }
`;

const ListItem = styled.li`
  list-style: none;
  margin-right: 20px;

  a {
    color: white;
    transition: 0.2s;
    &:hover {
      text-decoration: none;
      color: #87d37c;
    }
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-right: 0px;
  }
`;

const MobileWrapper = styled.div`
  width: 100%;
  display: flex;
  @media screen and (max-width: 767px) {
    display: ${({visible}) => visible ? 'flex' : 'none'};
    background: #26a65b;
    padding-top: 50px;
    position: absolute;
    left: 0;
    top: 0;
    height: 3000px;
    z-index: 3000;
  }
`;

const MobileMenuIcon = styled(FontAwesomeIcon)`
  color: white;
  transition: 0.2s;
  font-size: 23px;
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 20px;
  display: none;
  z-index: 3002;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '2.1',
      mobileMenuVisible: false,
    }

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
  }

  componentDidMount () {
    this.unlisten = this.props.history.listen(() => this.closeMobileMenu());
  }

  componentWillUnmount() {
    this.unlisten();
  }

  toggleMobileMenu () {
    const { mobileMenuVisible } = this.state;
    if (window.innerWidth < 768) {
      this.setState({
        mobileMenuVisible: !mobileMenuVisible
      })
    }
  }

  closeMobileMenu () {
    if (window.innerWidth < 768) {
      this.setState({
        mobileMenuVisible: false
      })
    }
  }

  render () {
    const {
      version,
      mobileMenuVisible
    } = this.state;

    const {
      toggleMobileMenu,
    } = this;

    return (
      <Wrapper> 
        <Logo>{`DG v${version}`}</Logo>
        <MobileWrapper visible={mobileMenuVisible}>
          <LeftList>
            <ListItem>
              <Link to="/">
                Генератор
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/collection">
                Коллекция
              </Link>
            </ListItem>
          </LeftList>
          <RightList>
            <User />
          </RightList>         
        </MobileWrapper>
        <MobileMenuIcon icon={faBars} onClick={() => toggleMobileMenu()} />
      </Wrapper>
    )
  }
}

export default withRouter(Header);