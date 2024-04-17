import React from 'react'
import './BattleScreen.css'

const BattleScreen = ({myPokeSelection, computerRandomSelection, myHealth, enemyHealth}) => {
  console.log("battle screen myPoke", myPokeSelection);
  console.log("bs crs", computerRandomSelection);
  return (
    <div className='battle-container'>
        <div className='enemy-container'>
            <span>{enemyHealth}</span>
            {computerRandomSelection && computerRandomSelection[0] && <img src={computerRandomSelection[0].sprites.front_shiny} alt='enemy-pokemon' />}
        </div>
        <div className='my-container'>
            <span>{myHealth}</span>
            {myPokeSelection && myPokeSelection[0] && <img src={myPokeSelection[0].sprites.back_shiny} alt='my-pokemon' />}
        </div>
    </div>
  )
}

export default BattleScreen