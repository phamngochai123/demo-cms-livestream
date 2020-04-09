import React, { Component } from 'react';
import { Circle } from 'rc-progress';
import { Rnd } from 'react-rnd';

export default class CountdownLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      height: 100,
      x: 0,
      y: 0,
      time: this.props.time - (Math.round((new Date().valueOf() - this.props.start)/1000)),
      start: this.props.start
    };
  }
  componentDidMount() {
    this.countdownInterval = setInterval(() => {
      this.setState({
        time: Math.max(this.state.time - 1, 0)
      })
    }, 1000)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.time !== this.props.time || nextProps.start !== this.props.start) {
      this.setState({
        time: nextProps.time - (Math.round((new Date().valueOf() - nextProps.start)/1000))
      })
    }
  }
  componentWillUnmount() {
    clearInterval(this.countdownInterval);
  }


convertSeconds = sec => {
  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec - hrs * 3600) / 60);
  let seconds = sec - hrs * 3600 - min * 60;
  seconds = Math.round(seconds * 100) / 100;
  if (hrs < 1) {
    let result = min < 10 ? '0' + min : min;
    result += ':' + (seconds < 10 ? '0' + seconds : seconds);
    return result;
  }
  let result = hrs < 10 ? '0' + hrs : hrs;
  // let result = (min < 10 ? "0" + min : min);
  result +=
    ':' +
    (min < 10 ? '0' + min : min) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds);
  return result;
};
  render() {
    // console.log('---state---', this.state);
    const { time } = this.state;
    const {id, deleteLayer, position, setPosition, prefixId} = this.props;
    const {x, y, width, height} = position;
    return (
      <div id={prefixId + id}>
      <Rnd
        className="test"
        style={{ border: 'solid 1px #ddd', backgroundColor: '#ccc', textAlign: 'center' }}
        size={{
          width: width,
          height: height,
        }}
        position={{
          x: x,
          y: y,
        }}
        onDragStop={(e, d) => {
          // this.setState({ x: d.x, y: d.y });
          setPosition && setPosition(id, {x: d.x, y: d.y})
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setPosition && setPosition(id, {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            ...position
          })
          // this.setState({
          //   width: ref.offsetWidth,
          //   height: ref.offsetHeight,
          //   ...position
          // });
        }}
      >
      <div style={{fontSize: 30}}>
        {this.convertSeconds(time)}
      </div>
      <button onClick={() => {deleteLayer && deleteLayer(id)}}>Xóa</button>
      <div>{id}</div>
      </Rnd>
      </div>
    );
  }
}