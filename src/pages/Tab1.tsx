import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonModal, IonButton, IonToast } from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPlayerName, setCurrentPlayerName] = useState('');
  const [players, setPlayers] = useState<{ name: string, numbers: number[] }[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  function handleAddPlayer() {
    setShowModal(true);
  }

  function handleSubmit() {
    const trimmedName = currentPlayerName.trim();
    if (trimmedName !== '') {
      if (!players.find(player => player.name === trimmedName)) {
        const newPlayer = { name: trimmedName, numbers: [], backgroundColor: getRandomColor() };
        setPlayers([...players, newPlayer]);
        setShowModal(false);
        setCurrentPlayerName('');
      } else {
        setToastMessage("This player name already exists.");
        setShowToast(true);
      }
    } else {
      setToastMessage("Please enter a valid player name.");
      setShowToast(true);
    }
  }

  function handleCancel() {
    setShowModal(false);
    setCurrentPlayerName('');
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentPlayerName(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  function handleDeletePlayer(index: number) {
    setPlayers(players.filter((_, i) => i !== index));
  }

  function generateRandomNumbers(): number[] {
    const numbers: number[] = [];
    for (let i = 0; i < 5; i++) {
      numbers.push(Math.floor(Math.random() * 15) + 1);
    }
    return numbers;
  }

  function handleRandomNumber() {
    const updatedPlayers = players.map(player => {
      return { ...player, numbers: generateRandomNumbers() };
    });
    setPlayers(updatedPlayers);
  }

  function handleAddRandomNumber(playerName: string) {
    const updatedPlayers = players.map(player => {
      if (player.name === playerName) {
        const updatedNumbers = [...player.numbers, Math.floor(Math.random() * 15) + 1];
        return { ...player, numbers: updatedNumbers };
      }
      return player;
    });
    setPlayers(updatedPlayers);
  }

  function handleClearAllNumbers() {
    const updatedPlayers = players.map(player => {
      return { ...player, numbers: [] };
    });
    setPlayers(updatedPlayers);
  }

  const backgroundColors = ['461220', '590d22'];

  function getRandomColor(): string {
    return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  }

  const [ballColor, setBallColor] = useState<Record<number, number>>({
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
    13: 13,
    14: 14,
    15: 15,
  });

  function ball(ball: number) {
    return ballColor[ball];

  }

  function shotBall(ball: number) {
    const updateBallColor = { ...ballColor };
    if (updateBallColor[ball] == ball + 15) {
      updateBallColor[ball] = ball;
      setBallColor(updateBallColor);
    } else {
      updateBallColor[ball] = ball + 15;
      setBallColor(updateBallColor);
    }

    // console.log(ballColor);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='header-style'>
            <h2 style={{margin: '0'}}>5 cards</h2>
            <img src="/cue.png" alt="" />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
        <div className='main-container'>
          {players.map((player, index) => (
            <div className='player-box' key={index} style={{ fontSize: 'xx-large', backgroundColor: player.backgroundColor }}>
              <div className='player'>
                <input className='input' type="text" style={{ fontSize: 'xx-large' }} value={player.name} readOnly />
                <div className='trash' onClick={() => handleDeletePlayer(index)}>
                  <img src="/trash.png" alt="" />
                </div>
              </div>
              <div className='balls-button'>
                <div className='balls-container'>
                  {player.numbers.map((number, idx) => (
                    <div className='balls' key={idx}>
                      <div className='ball'>
                        <img onClick={() => shotBall(number)} src={`/balls/${ball(number)}.png`} alt={`${number}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='add-button'>
                  <button className='add-balls-button' onClick={() => handleAddRandomNumber(player.name)}>+</button>
                </div>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', }}>
            <button className='add-player' onClick={handleAddPlayer}>Add player</button>
            <button className='random-number' onClick={handleRandomNumber}>Randomize numbers</button>
            <button className='clear-all-numbers' onClick={handleClearAllNumbers}>Clear numbers</button>
          </div>
          <IonModal isOpen={showModal} className='my-custom-modal'>
            <div className="modal-container">
              <input className='player-input'
                value={currentPlayerName}
                placeholder="Enter player name"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <button className='submit' onClick={handleSubmit}>Submit</button>
              <button className='cancel' onClick={handleCancel}>Cancel</button>
            </div>
          </IonModal>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={3000}
          />
        </div>
        
      <div className='all-balls'>
          <div className='one-seven'>
            <img onClick={() => shotBall(1)} src={`/balls/${ballColor[1]}.png`} alt="" />
            <img onClick={() => shotBall(2)} src={`/balls/${ballColor[2]}.png`} alt="" />
            <img onClick={() => shotBall(3)} src={`/balls/${ballColor[3]}.png`} alt="" />
            <img onClick={() => shotBall(4)} src={`/balls/${ballColor[4]}.png`} alt="" />
            <img onClick={() => shotBall(5)} src={`/balls/${ballColor[5]}.png`} alt="" />
            <img onClick={() => shotBall(6)} src={`/balls/${ballColor[6]}.png`} alt="" />
            <img onClick={() => shotBall(7)} src={`/balls/${ballColor[7]}.png`} alt="" />
          </div>
          <div className='eight-fifthen'>
            <img onClick={() => shotBall(8)} src={`/balls/${ballColor[8]}.png`} alt="" />
            <img onClick={() => shotBall(9)} src={`/balls/${ballColor[9]}.png`} alt="" />
            <img onClick={() => shotBall(10)} src={`/balls/${ballColor[10]}.png`} alt="" />
            <img onClick={() => shotBall(11)} src={`/balls/${ballColor[11]}.png`} alt="" />
            <img onClick={() => shotBall(12)} src={`/balls/${ballColor[12]}.png`} alt="" />
            <img onClick={() => shotBall(13)} src={`/balls/${ballColor[13]}.png`} alt="" />
            <img onClick={() => shotBall(14)} src={`/balls/${ballColor[14]}.png`} alt="" />
            <img onClick={() => shotBall(15)} src={`/balls/${ballColor[15]}.png`} alt="" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
