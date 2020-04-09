import React, { Component } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import Cropper from 'cropperjs';
import { Rnd } from 'react-rnd';
import logo from './logo.svg';
import './App.css';
import TextLayer from './component/layer/Text';
import CountdownLayer from './component/layer/Countdown';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      height: 200,
      x: 0,
      y: 0,
      layers: []
    };
  }
  componentDidMount() {
    // const el = document.getElementById('')
    // html2canvas(document.querySelector("#test")).then(canvas => {
    //   document.getElementById('app').appendChild(canvas)
    //   const cropper = new Cropper(canvas, {
    //     aspectRatio: 16 / 9,
    //     dragMode: 'none',
    //     crop(event) {
    //       console.log(event.detail.x);
    //       console.log(event.detail.y);
    //       console.log(event.detail.width);
    //       console.log(event.detail.height);
    //       console.log(event.detail.rotate);
    //       console.log(event.detail.scaleX);
    //       console.log(event.detail.scaleY);
    //     },
    //   });
    // });
    setInterval(() => {
      this.getHtmlPageDemo();
    }, 1000)
  }
  getHtmlPageDemo = () => {
    const { layers } = this.state;
    let layerSend = {};
    layers.map((layer) => {
      const element = document.getElementById(layer.key + layer.id);
      const firstChild = element.firstElementChild;
      const styleElement = {
        top: firstChild.style.top,
        left: firstChild.style.left,
        width: firstChild.style.width,
        height: firstChild.style.height,
        transform: firstChild.style.transform,
        position: firstChild.style.position,
        backgroundColor: firstChild.style.backgroundColor,
        border: firstChild.style.border,
        text: layer.text || firstChild.textContent
      }
      layerSend[layer.id] = {
        type: layer.type,
        style: styleElement,
        config: {
          time: layer.time,
          start: layer.start
        }
      };
    })
    const el = document.getElementById('page-demo');
    // console.log(this.getTxtHtml(el));
    axios.post('http://192.168.3.130:6001/demo', { elString: this.getTxtHtml(el) });
    axios.post('http://192.168.3.130:6001/demo-obj', { elObj: layerSend });
  }
  getTxtHtml = (who, deep = true) => {
    if (!who || !who.tagName) return '';
    var txt, ax, el = document.createElement("div");
    el.appendChild(who.cloneNode(false));
    txt = el.innerHTML;
    if (deep) {
      ax = txt.indexOf('>') + 1;
      txt = txt.substring(0, ax) + who.innerHTML + txt.substring(ax);
    }
    el = null;
    return txt;
  }
  deleteLayer = (id) => {
    let { layers } = this.state;
    const indexDelete = layers.findIndex((a) => a.id === id);
    layers = layers.filter(a => a.id !== id);
    console.log(id, layers);
    this.setState({
      layers
    })
  }
  setPosition = (id, params) => {
    let {layers} = this.state;
    layers[layers.findIndex((a) => a.id === id)].position = {
      ...layers[layers.findIndex((a) => a.id === id)].position,
      ...params
    }
    this.setState(layers);
  }
  render() {
    const { layers } = this.state;
    return (
      <div id='app' className="App">
        {/* <div style={{width: 100, height: 100, backgroundColor: 'red'}} id={"test"}>1234</div> */}
        <button onClick={() => {
          let tmpLayer = [...layers];
          tmpLayer.push({
            key: 'text-layer-',
            type: 'text',
            text: 'Text Layers ' + tmpLayer.filter((r) => r.type === 'text').length,
            id: Math.random().toString(36).slice(-8),
            component: TextLayer,
            position: {
              width: 200,
              height: 100,
              x: 0,
              y: 0,
            }
          })
          this.setState({
            layers: tmpLayer
          })
        }}>Add TextLayer</button>
        <button onClick={() => {
          let tmpLayer = [...layers];
          tmpLayer.push({
            key: 'countdown-layer-',
            type: 'countdown',
            id: Math.random().toString(36).slice(-8),
            component: CountdownLayer,
            time: 300,
            start: new Date().valueOf(),
            position: {
              width: 200,
              height: 100,
              x: 0,
              y: 0,
            }
          })
          this.setState({
            layers: tmpLayer
          })
        }}>Add CountdownLayer</button>
        <div id='page-demo' className='screen-demo'>
          {
            layers.map((layer, index) => {
              return <layer.component text={layer.text} position={layer.position} setPosition={(id, params) => this.setPosition(id, params)} index={index} deleteLayer={(id) => this.deleteLayer(id)} time={layer.time} start={layer.start} id={layer.id} key={index} />
            })
          }
        </div>
      </div>
    );
  }
}