import React, { Component } from "react";
import ReactDom from "react-dom";
import { run, register, useConcent, registerDumb } from "concent";
import "bulma/css/bulma.css";

/**
 * welcome to experience this demo, and fork to modify it. ^_^
 * concent build a ctx for every instance, it supplies state, sync, dispatch and etc ...
 * you can use them in any of components bellow
 * more details see doc: https://concentjs.github.io/concent-doc/api/explain
 *
 * and your can copy left side bar other file's content to experience
 * like register-hook-comp.js ...
 *
 * visit more demos:
 * https://stackblitz.com/edit/cc-multi-ways-to-wirte-code
 * https://stackblitz.com/edit/cc-4-render-mode
 * https://stackblitz.com/@fantasticsoul
 */

run({
  foo: {
    state: { greeting: "hello concent" },
    reducer: {
      changeGreeting(greeting) {
        return { greeting };
      }
    }
  }
});

function changeGreeting(greeting) {
  return { greeting };
}

const evValue = e => e.currentTarget.value;

function HookFnComp() {
  const ctx = useConcent("foo");
  //or use ctx.setState, ctx.dispatch, ctx.invoke instead
  const {
    state: { greeting },
    sync
  } = ctx;
  return (
    <div className="box">
      I am <span className="tag is-info">Function </span> Comp
      <br />
      <br />
      <div className="field">
        <div className="control is-small">
          <input value={greeting}  onChange={sync("greeting")} className="input is-info is-small"/>
        </div>
      </div>
    </div>
  );
}

const RenderPropsComp = registerDumb("foo")(ctx => {
  const {
    state: { greeting },
    setState
  } = ctx;
  const onChange = e => setState({ greeting: e.currentTarget.value });
  
  //or use sync, ctx.dispatch, ctx.invoke instead
  return (
    <div className="box">
      I am <span className="tag is-link">RenderProps</span> Comp
      <br />
      <br />
      <div className="field">
        <div className="control is-small">
          <input className="input is-link is-small" value={greeting} onChange={onChange} />
        </div>
      </div>
    </div>
  );
});

@register("foo")
class HocClassComp extends Component {
  render() {
    const { greeting } = this.state; // or this.ctx.state
    const { invoke, sync, set, dispatch } = this.ctx;

    // dispatch will find reducer method to change state
    const changeByDispatch = e => dispatch("changeGreeting", evValue(e));
    // invoke cutomized method to change state
    const changeByInvoke = e => invoke(changeGreeting, evValue(e));
    // classical way to change state, this.setState equals this.ctx.setState
    const changeBySetState = e => this.setState({ greeting: evValue(e) });
    // make a method to extract event value automatically
    const changeBySync = sync("greeting");
    // similar to setState by give path and value
    const changeBySet = e => set("greeting", evValue(e));

    return (
      <div className="box">
        I am <span className="tag is-success">Class</span> Comp &nbsp;
        <h1 className="title">{greeting}</h1>
        <div className="field">
          <div className="control is-small">
            <input value={greeting} onChange={changeByDispatch} className="input is-primary is-small" />
          </div>
        </div>
        <div className="field">
          <div className="control is-small">
            <input value={greeting} onChange={changeByInvoke} className="input is-primary is-small" />
          </div>
        </div>
        <div className="field">
          <div className="control is-small">
            <input value={greeting} onChange={changeBySetState} className="input is-primary is-small" />
          </div>
        </div>
        <div className="field">
          <div className="control is-small">
            <input value={greeting} onChange={changeBySync} className="input is-primary is-small" />
          </div>
        </div>
        <div className="field">
          <div className="control is-small">
            <input value={greeting} onChange={changeBySet} className="input is-primary is-small" />
          </div>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <>
      <div className="notification">try input greeting.....</div>
      <HookFnComp />
      <RenderPropsComp />
      <HocClassComp />
    </>
  );
}
ReactDom.render(<App />, document.getElementById("root"));
