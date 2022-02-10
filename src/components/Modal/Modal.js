import React from "react";
import ReactDOM from 'react-dom';

import "./Modal.css";

const modalRoot = document.getElementById("modal-root");

class Modal extends React.Component {
    constructor(props) {
      super(props);
      this.el = document.createElement('div');
    }
  
    componentDidMount() {
      // Portal element 會在 Modal 的 children 被
      // mount 之後才插入 DOM tree 中，這代表 children
      // 會被 mount 在一個分離的 DOM 節點上。如果一個
      // child component 需要在 mount 結束時馬上連接到 DOM tree 中，
      // 例如測量一個 DOM node，或者在子節點中使用 'autoFocus' 等狀況，
      // 則應將 state 加入 Modal 中，並只在 Modal 插入 DOM tree 後
      // 才 render children。
      modalRoot.appendChild(this.el);
    }
  
    componentWillUnmount() {
      modalRoot.removeChild(this.el);
    }
  
    render() {
      return ReactDOM.createPortal(
        this.props.children,
        this.el
      );
    }
  }

export default Modal;