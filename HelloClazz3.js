import React, { Component } from 'react';
import { register } from 'concent';

let timer = 0;

//默认cc是采用反向继承的方式包裹你的类
//这里设置isPropsProxy为true，cc会采用属性代理的方式包裹你的类
@register({ connect: { 'foo': '*' }, isPropsProxy: true })
export default class Hello3 extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.$$attach(this);
  }
  render() {
    //const { name, age, hobby } = this.props.ctx.connectedState.foo;
    // or
    const { name, age, hobby } = this.ctx.connectedState.foo;
    return (
      <div className="HelloClazz" style={{ border: '1px solid blue' }}>
        <div>数组注入到props.ctx.connectedState</div>
        <span>name {name}</span>
        <span>age {age}</span>
        <span>hobby {hobby}</span>
      </div>
    );
  }
}
