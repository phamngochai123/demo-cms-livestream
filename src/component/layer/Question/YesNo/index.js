import React, { Component } from 'react';
import { Rnd } from 'react-rnd';

export default class YesNoQuestionLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      height: 100,
      x: 0,
      y: 0,
    };
  }
  componentDidMount() {
  }
  render() {
    // const { width, height, x, y } = this.state;
    const { id, position, setPosition, deleteLayer, text, prefixId, question } = this.props;
    const { width, height, x, y } = position;
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
            setPosition && setPosition(id, { x: d.x, y: d.y })
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setPosition && setPosition(id, {
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              ...position
            })
          }}
        >
          <div>
            <div>{question}</div>
            <div>
              <button>Có</button>
              <button>Không</button>
            </div>
            <button onClick={() => {
              deleteLayer && deleteLayer(id)
            }}>Xóa</button>
          </div>
        </Rnd>
      </div>
    );
  }
}