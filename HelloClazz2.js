import React, { Component } from 'react';
import { connect } from 'concent';

let timer = 0;

@connect(['foo'])
export default class Hello2 extends Component {
  render() {
    const { name, age, hobby } = this.ctx.connectedState.foo;
    return (
      <div className="HelloClazz" style={{border:'1px solid pink'}}>
      <div>数组注入到$$connectedState</div>
        <span>name {name}</span>
        <span>age {age}</span>
        <span>hobby {hobby}</span>
      </div>
    );
  }
}
