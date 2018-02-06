import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import styled from 'styled-components';

// class Square extends React.Component {
//   // constructor(){
//   //   super();
//   //   this.state = {
//   //     value: null,
//   //   };
//   // }
//   render() {
//     return (
//       <button className="square" onClick = {() => this.props.onClick({value:'X'})} >
//         {/* {this.state.value} */}
//         { this.props.value }
//       </button>
//     );
//   }
// }

function Square(props) {
  return(
    <button className = "square" onClick = {props.onClick}>
      {props.value}
    </button>
  );
}

//判断获胜方的算法
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {
  constructor(){
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // handleClick(i){
  //   const squares = this.state.squares.slice();
  //   if(calculateWinner(squares) || squares[i]){
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? "X" : "O";
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }




  renderSquare(i) {
    return(
      <Square
      value = {this.props.squares[i]}
      onClick = {() => this.props.onClick(i)}
    />
  );
}

  render() {
    {/* const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');*/}
    const winner = calculateWinner(this.state.squares);
//     const Title = styled.h1`
//   font-size: 1.5em;
//   text-align: center;
//   color: palevioletred;
// `;
// const Wrapper = styled.section`
//   padding: 4em;
//   background: papayawhip;
// `;

    let status;
    if(winner) {
      status = "Winner: " + winner;
    } else {
      status = 'Next platner: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        {/* <Wrapper>
    <Title>
      Hello World, this is my first styled component!
    </Title>
  </Wrapper> */}
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares:Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext:true,
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false :true,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber +1 );
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState ({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history.slice(0,this.state.stepNumber +1 );
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const move = history.map((step,move) => {
      const desc = move ?
      'Move #' + move :
      'Game start';
      return (
        <li key = {move}>
          <a href = "#" onClick = {() => this.jumpTo(move)}>{desc}</a>
        </li>
      )
    })

    let status;
    if(winner){
      status = "winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
          squares = {current.squares}
          onClick = {(i) => this.handleClick(i)}
         />

        </div>
        <div className="game-info">
          <div>{ status} </div>
          <ol>{ move}</ol>
        </div>
        <Test/>
      </div>
    );
  }
}

 class Test extends React.Component {
   constructor() {
    super();
   }
   render(){
     const Div = styled.div`
       height:auto;
       width:auto;
       font-size: 1.5em;
       background-color: #ffcf2d;
       color: #fff;
       text-align: center;
     `;
     const Bg = styled.div`
       background-color: #333;
       margin: 10px;
       color: #fff;
       display: flex;
       flex-direction: column;
       border-radius: 5px;
     `;
     const User = styled.img`
       width: 50px;
       height: 50px;
       border-radius: 25px;
       align-self: flex-start;
       margin: 10px;
     `;
     const Price = styled.span`
       color: #ffcf2d;
       font-size: 40px;
       display: flex;
       justify-content: center;
       font-weight: 520;
     `;
     const Des = styled.span`
       color: #fff;
       font-size: 16px;
       display: flex;
       justify-content: center;
       margin: 20px 0;
       font-weight: 550;
     `;
     const Ratio = styled.span`
       color: #aaa;
       font-size: 14px;
       margin-top: 20px;
       margin-bottom: 15px;
       display: flex;
       justify-content: center;
     `;

     const Item = styled.div`
       margin: 10px;
       padding: 10px;
       background-color: #fff;
       border: 1px solid #eee;
       border-radius: 5px;
       display: flex;
       flex-direction: column;
     `;
     const Income = styled.div`
       display: flex;
       flex-direction: row;
       align-content: center;
     `;
     const Svg = styled.img`
       width: 26px;
       height: 26px;
       margin-right: 10px;
     `
     const Title = styled.span`
       color: #333;
       font-size: 16px;
       padding-top: 3px;
     `;
     const Table = styled.div`
       border: 1px solid #ffcf2d;
       display: flex;
       flex-direction: column;
       border-radius: 5px;
       margin-top: 10px;
       font-size: 16px;
     `;
     const Time = styled.div`
       background-color: #ffcf2d;
       color: #fff;
       display: flex;
       flex-direction: row;
       justify-content: space-around;
       line-height: 3em;
     `;
     const Number = styled.div`
     background-color: #fff;
     color: #666;
     display: flex;
     flex-direction: row;
     justify-content: space-around;
     line-height: 3em;
     `

     return(
      //  <Div>
      //    这是一个测试，styled,背景会随着游戏而变化
        <div>
         <Bg>
           <User/>

           <Des>
             "已在万人车汇APP累计获得佣金"
           </Des>
           <Price>￥3888</Price>
           <Ratio>厉害了，你已经超过99%的用户</Ratio>
         </Bg>
         <Item>
           <Income>
             <Svg/>
             <Title>收益</Title>
           </Income>
           <Table>
             <Time>
               <span>今日</span>
               <span>一周</span>
               <span>30天</span>
             </Time>
             <Number>
               <span>38.88</span>
               <span>128.88</span>
               <span>150.02</span>
             </Number>
           </Table>
         </Item>
        </div>
      //  </Div>
     )
   }
 }
// ========================================

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
