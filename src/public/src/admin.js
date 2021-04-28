
class Nav extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>Hello World</div>
    )
  }
}



function App(){

  return( <Nav></Nav>)
}


ReactDOM.render(<App/>, document.getElementById('root'));