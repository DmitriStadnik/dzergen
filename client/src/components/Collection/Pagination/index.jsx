import React, { Component } from 'react'
import styled from 'styled-components';
import {changePage} from "../../../actions/collection-actions";
import {connect} from "react-redux";
import colors from "../../Reusable/colors";

const Wrapper = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Page = styled.div`
  font-size: 14px;
  transition: 0.2s;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({active, bgColor}) => active ? bgColor : 'white'};
  color: ${({active}) => active ? 'white' : 'inherit'};
  &:hover {
    background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
    color: white;
  }
`;

const Button = styled.button`
  text-transform: uppercase;
  font-size: 14px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
  border: none;
  outline: none;
  transition: 0.2s;
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

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props
    }

    this.getPagesArr = this.getPagesArr.bind(this);
  }

  componentDidMount() {
    this.changePage(0, 0);
    window.addEventListener('resize', this.getPagesArr);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getPagesArr);
  }

  getPagesArr() {
    const maxPage = this.maxPages();
    const {
      collection: {
        page
      }
    } = this.props;

    let pagesAmount = 5;
    if (window.innerWidth < 600) {
      pagesAmount = 2;
    }

    let start = page - pagesAmount < 0 ? 0 : page - pagesAmount;
    let end = page + pagesAmount > maxPage ? maxPage : page + pagesAmount;

    if (maxPage > pagesAmount * 2) {
      if (maxPage - page < page) {
        while (end - start < pagesAmount * 2) {
          start--;
        }
      } else {
        while (end - start < pagesAmount * 2) {
          end++;
        }
      }
    }
    
    let pagesArr = [];

    for (let i = start; i <= end; i++) {
      pagesArr.push(i);
    }
    return pagesArr;
  }

  maxPages() {
    const {
      collection: {
        itemsCount,
        itemsPerPage
      }
    } = this.props;
    return Math.floor(itemsCount / itemsPerPage);
  }

  changePage(exactPage, dif) {
    let newPage = 0;
    if (exactPage !== null) {
      newPage = exactPage;
    } else {
      const {
        collection: {
          page
        }
      } = this.props;
      let temp = page + dif;
      if (temp <= this.maxPages() && temp >= 0) {
        newPage = temp
      }
    }
    this.props.onChangePage(newPage);
  }

  render () {
    let pagesArr = this.getPagesArr();
    const {
      collection: {
        page
      }
    } = this.props;
    return (
      <Wrapper>
        <Button
          onClick={() => this.changePage(0, 0)}
          disabled={page === 0}
          bgColor={colors.green_main}
          hlColor={colors.green_hl}
          dsColor={colors.green_ds}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => this.changePage(null, -1)}
          disabled={page === 0}
          bgColor={colors.green_main}
          hlColor={colors.green_hl}
          dsColor={colors.green_ds}
        >
          {'<'}
        </Button>
        {
          pagesArr.map(item => (
            <Page 
              key={item} 
              active={item === page} 
              onClick={() => this.changePage(item, 0)} 
              bgColor={colors.green_hl}
            >
              {item + 1}
            </Page>
          ))
        }
        <Button
          onClick={() => this.changePage(null, 1)}
          disabled={page === this.maxPages()}
          bgColor={colors.green_main}
          hlColor={colors.green_hl}
          dsColor={colors.green_ds}
        >
          {'>'}
        </Button>
        <Button
          onClick={() => this.changePage(this.maxPages(), 0)}
          disabled={page === this.maxPages()}
          bgColor={colors.green_main}
          hlColor={colors.green_hl}
          dsColor={colors.green_ds}
        >
          {'>>'}
        </Button>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  collection: state.collection,
});

const mapActionsToProps = {
  onChangePage: changePage
};

export default connect(mapStateToProps, mapActionsToProps)(Pagination);