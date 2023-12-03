import { useState , useEffect} from 'react';

import './App.css';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App =()=>{

  const [searchField, setSearchField] = useState('') //[value, setValue]
  const [monsters, setMonsters] = useState([])
  const [filterMonsters, setFilterMonsters]= useState(monsters)
 
  useEffect(()=>{
    console.log('effect fired');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users)=>setMonsters(users))
  },[])
  // []: nothing will trigger you call back this function, nothing will change
  
  useEffect(()=>{
    const newFilterMonsters = monsters.filter(
      (monster) => { return monster.name.toLocaleLowerCase().includes(searchField)}
    )
    setFilterMonsters(newFilterMonsters)
 

  },[monsters, searchField])

  const onSearchChange =  (event)=>{
    const searchFieldString = event.target.value.toLocaleLowerCase()
    setSearchField(searchFieldString)
  }
 
  return(
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      < SearchBox 
        className = 'monsters-search-box'
        onChangeHandler={onSearchChange} 
        placeholder='search monsters'
      />
     
      <CardList monsters={filterMonsters} /> 
    </div>
  )
}

// class App extends Component {
//   constructor(){
//     super()

//     this.state = {
//       monsters:[],
//       searchFiled: ''
//     }
//     // console.log('constructor');
    
//   }
  // componentDidMount(){
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then((users)=>this.setState(()=>{
  //       return {monsters:users}
  //     }))
  // }

//   onSearchChange = (event)=>{
//     // console.log({startingArray: this.state.monsters});
//     const searchFiled = event.target.value.toLocaleLowerCase()
//     this.setState(
//       ()=> {return {searchFiled}}
//     )
//   }
  
//   render (){
//     // console.log('render');

//     const {monsters, searchFiled} = this.state
//     const {onSearchChange} = this
//     const filteredMonsters = monsters.filter(
//       (monster) => { return monster.name.toLocaleLowerCase().includes(searchFiled)}
//     )
//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         < SearchBox 
//           className = 'monsters-search-box'
//           onChangeHandler={onSearchChange} 
//           placeholder={'search monsters'}
//         />
//           {/* {
//             filteredMonsters.map((monster)=>{
//               return <div key={monster.id}><h1>{monster.name}</h1></div>
//             })
//           } */}
//          <CardList monsters={filteredMonsters} />
        
//       </div>
//     );
//   }
// }

export default App;
