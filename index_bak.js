
import React, { Component } from 'react';
import { render } from 'react-dom';
import './startup-cc';
import Hello from './HelloClazz';
import Hello2 from './HelloClazz2';
import Hello3 from './HelloClazz3';
import './style.css';
import cc,{register, CcFragment} from 'concent';

const Hello4 = ()=>{
  return <CcFragment connect={{'foo':'*'}} render={({connectedState})=>{
    const {name, age} = connectedState.foo;
    return (
      <div>
      数据由CcFragment的connectedState提供
      <div style={{border:'1px solid red'}}>{name} {age}</div>
      </div>
    );
  }}/>
}

@register('foo')
class App extends Component {
  constructor() {
    super();
    this.state = {name: '', message:''};
  }
  componentDidMount(){
    this.ctx.on('change', (newv, oldv)=>{
      console.log('**************');
      this.setState({message:`new value:${newv}, old value:${oldv}`});
    });
  }

  render() {
    return (
      <div>
        <div>该示例用于演示数据注入的方式</div>
        <fieldset>
        <legend>我是消息提示板</legend>
        <span>{this.state.message}</span>
        </fieldset>
        <hr />
        <Hello />
        <Hello2 />
        <Hello3 />
        <Hello4 />
        {/** 顶层api呼叫，修改foo的状态*/}
        修改名称
        <input value={this.state.name} onChange={e=> cc.setState('foo', {name:e.currentTarget.value})}/>
        <br />
        {/** 通过$$sync做双向绑定*/}
        修改名称，延迟广播6秒
        <input data-ccsync="name" data-ccdelay="3000" value={this.state.name} onChange={this.ctx.sync}/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
