import React from "react";
import ReactDOM from "react-dom";
import DropMenu from "./components/drop-menu"

class Header extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <header className="flex-center">
        <div id="title">Grupos</div>
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
        <a href="#" className="group flex-center" id="g-1">Quarto</a>
        <div className="group flex-center blank"></div>  
    </div>

    <div id="new-group-btn" class="flex-center">
        <div className="dash d-1"></div>
        <div className="dash d-2"></div>
    </div>

    <div id="gradient"></div>
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