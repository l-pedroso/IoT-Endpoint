import React from "react";
import ReactDOM from "react-dom";
import Menu from "./components/menu"
import Entity from "./components/entity"
import Modal from "./components/modal"


class Header extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <header className="flex-center">
        <div className="title">Grupos</div>
        <Menu></Menu>
      </header>
    )
  }
}



class Main extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      popup: false,
    }
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalOpen(){
    this.setState({popup:true});
  }

  handleModalClose(){
    this.setState({popup: false});
  }
  
  render(){
    return (  
    <main className="flex-center">
        <div className="group-container">
            <Entity></Entity>
            <div className="group flex-center blank"></div>  
        </div>
        <div className="new-group-btn flex-center" onClick={this.handleModalOpen}>
            <ion-icon name="add-circle"></ion-icon>
        </div>
        <Modal mode={'grupo'} show={this.state.popup} onModalClose={this.handleModalClose}></Modal>
    </main>)
  }
}


class Footer extends React.Component{
  render(){
    return (<footer></footer>)
  }



}

function App(){

  return( 
    <div>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
    </div>

    )
}


ReactDOM.render(
  <App />, document.getElementById('root'));