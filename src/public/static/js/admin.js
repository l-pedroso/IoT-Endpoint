import React from "react";
import ReactDOM from "react-dom";
import DropMenu from "./components/drop-menu"
import Entity from "./components/entity"
import Modal from "./components/popup"

function print(){
  console.log('clicou');
}

class Header extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <header className="flex-center">
        <div className="title">Grupos</div>
        <DropMenu></DropMenu>
      </header>
    )
  }
}



class Main extends React.Component{
  
  render(){
    return (  
    <main className="flex-center">
        <div id="group-container">
            <Entity></Entity>
            <div className="group flex-center blank"></div>  
        </div>
        <div className="new-group-btn flex-center">
            <ion-icon name="add-circle"></ion-icon>
        </div>
        <Modal></Modal>
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