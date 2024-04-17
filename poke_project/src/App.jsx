
import { useEffect } from 'react';
import { useState } from 'react';
import ScreenPokemon from './components/ScreenPokemon';
import './App.css'
import BattleScreen from './components/BattleScreen';

function App() {

  const[pokemones, setPokemones] = useState('');
  const [position, setPosition] = useState(0);
  const PokeUrl = 'https://pokeapi.co/api/v2/pokemon';

  const [myPokeSelection, setMyPokeSelection] = useState([]);
  const [computerRandomSelection, setComputerRandomSelection] = useState([]);

  const [startGame, setStartGame] = useState(false);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [myHealth, setMyHealth] = useState(100);

  const attack = () => {
    if(myHealth > 0 && enemyHealth > 0){
    setEnemyHealth(enemyHealth - Math.floor(Math.random() * 40));
    setMyHealth(myHealth - Math.floor(Math.random() * 40));
    } else if(myHealth <= 0){
      alert("You lost");
    } else if(enemyHealth <= 0){
      alert("You won");
    } 

    
  }


  const fetchPokemon = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const pokemonData = async (PokeUrl) => {
    const response = await fetchPokemon(PokeUrl);

    const dataPromises = response.results.map((pokemon) => fetchPokemon(PokeUrl+'/'+pokemon.name));

    const pokemonWithImages = await Promise.all(dataPromises);
    setPokemones(pokemonWithImages);
  }
   
  const handleSelection = (direction) => {
    if(direction == 2 && position <= 0) return;
    if(direction == 1 && position >= 19) return;
    if(direction == 4 && position <= 1) return;
    if(direction == 3 && position >= 18) return;
    if(direction == 2){
      setPosition(position -1);
    }
    if(direction == 1){
      setPosition(position +1);
    }
    if(direction == 4){
      setPosition(position -2);
    }
    if(direction == 3){
      setPosition(position +2);
    }
  }

  /*const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 37: // Left arrow key
        handleSelection(2);
        break;
      case 38: // Up arrow key
        handleSelection(4);
        break;
      case 39: // Right arrow key
        handleSelection(1);
        break;
      case 40: // Down arrow key
        handleSelection(3);
        break;
      default:
        break;
    }
  };*/
  
  
  const filterSelection = () => {
    const mySelection = pokemones.filter((value, idx) => position === idx);
    setMyPokeSelection(mySelection);
    computerSelection();
    console.log(mySelection);

    computerSelection();
  }

  const computerSelection = () => {
    const computerPos = Math.floor(Math.random() * 20);
    const computerSelection = pokemones.filter((value, idx) => computerPos === idx);
    setComputerRandomSelection(computerSelection);
    console.log(computerSelection, "computer selection");
  }

  const handleStart = () => {
    setStartGame(true);
  
  }

  useEffect(() => {
    pokemonData(PokeUrl);
  }, []);

  return (
    <>
      <div className='main-container'>
        <div className='pokemon-logo'>
          <img src = '/public/Pokemon.png' alt='pokemon-logo' />
        </div>
        <div className='layout'>
          <div className='sidebar'>
            <div className='power'></div>
            <div className='battery'>BATTERY</div>
            <div className='screen'>
              {startGame ? (<BattleScreen myPokeSelection={myPokeSelection} computerRandomSelection={computerRandomSelection} myHealth={myHealth} enemyHealth={enemyHealth}/>) : (pokemones && <ScreenPokemon position={position} pokemones={pokemones}/>)}
            </div>
          </div>
          
          <div className='button-container'>
            <div className='d-pad'>
              <button className='up' onClick={() => handleSelection(4)}></button>
              <button className='down' onClick={() => handleSelection(3)}></button>
              <div className='middle'></div>
              <button className='left' onClick={() => handleSelection(2)}></button>
              <button className='right' onClick={() => handleSelection(1)}></button>
              <div className='nintendo'>Nintendo</div>
              <div className='gameboy'>GAMEBOY</div>
            </div>

            <div className='select-start-buttons'>
              <button className='select-button' onClick={() => filterSelection()}></button>
              <button className='start-button' onClick={() => handleStart()}></button>
              <div className='select'>SELECT</div>
              <div className='start'>START</div>
            </div>
            
            <div className='a-b-buttons'>
              <button className='a-button' onClick={() => attack()}></button>
              <button className='b-button'></button>
              <div className='a'>A</div>
              <div className='b'>B</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
