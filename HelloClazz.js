import React, { Component } from 'react';
import { register, emit } from 'concent';

let timer = 0;

@register('bar')
class HH extends Component {
  constructor() {
    this.state = { sec: 6, timer: 0 };
  }
  render() {
    console.log('%c HH', 'color:purple;border:1px solid purple;');
    const { name } = this.state;
    return (
      <div style={{ border: '1px solid purple' }} className="HelloClazz">
        <span> bar.name {name}</span>
      </div>
    );
  }
}

@register('foo')
export default class Hello1 extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { sec: 6, timer: 0 };
  }
  $$setup(ctx) {
    ctx.watch({
      name(newv, oldv) {
        emit('change', newv, oldv);
      }
    })
  }
  componentDidMount() {
    timer = setInterval(() => {
      const sec = this.state.sec - 1;
      if (sec <= -1) {
        clearInterval(this.state.timer);
        this.setState({ timer: 0 });
      } else {
        this.setState({ sec })
      }
    }, 1000);
    this.setState({ timer });
  }
  render() {
    const { name, age, hobby, sec } = this.state;
    const text = sec <= 0 ? '等待结束' : `等待${sec}秒`;
    return (
      <div style={{ border: '1px solid purple' }} className="HelloClazz">
        <HH />
        <HH />
        <div>倒计时{sec}而已</div>
        <div>数组注入到state</div>
        <span>name {name}</span>
        <span>age {age}</span>
        <span>hobby {hobby}</span>
      </div>
    );
  }
}
