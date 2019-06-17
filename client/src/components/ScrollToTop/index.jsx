import React, {Component} from 'react';
import styled from 'styled-components';
import up from './up-arrow.svg'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  height: 40px;
  width: 40px;
  display: ${({visible}) => visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: white;
  background-color: #26a65b;
  transition: 0.2s;
  &:hover {
    background-color: #87d37c; 
    cursor: pointer;
  }
`;

const Icon = styled.img`
  height: 15px;
`;

class ScrollToTop extends Component {
  constructor() {
    super();

    this.state = {
      visible: false
    };

    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount() {
    this.onScroll()
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll() {
    if (window.scrollY > 100) {
      this.changeVisible(true)
    } else {
      this.changeVisible(false)
    }
  }

  changeVisible(newVal) {
    this.setState({
      visible: newVal
    })
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  render() {
    const {visible} = this.state;
    return (
      <Wrapper visible={visible} onClick={() => this.scrollToTop()}>
        <Icon src={up} />
      </Wrapper>
    )
  }

}

export default ScrollToTop;