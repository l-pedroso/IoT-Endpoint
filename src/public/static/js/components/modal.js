import Modal from 'react-bootstrap/Modal'
import * as style from './modal.module.css'
import React from "react";

export default class Popup extends React.Component{

    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    render(){
        return (   
            <Modal className={style.modal} show={this.props.show} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                <Modal.Title className={style.title}>
                  Novo {this.props.mode}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <input className={style.name} type="text" value={this.state.value} placeholder={`Nome do ${this.props.mode}`} onChange={this.handleChange}/>
              </Modal.Body>
              <Modal.Footer>
                <button>Confirmar</button>
                <button>Cancelar</button>
              </Modal.Footer>
            </Modal>
          );
    }
}