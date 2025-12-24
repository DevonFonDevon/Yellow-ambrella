import React, { useState } from 'react';
import './App.css';
import ParticipantCard from './components/ParticipantCard';
import AddParticipantForm from './components/AddParticipantForm';
import ParticipantTable from './components/ParticipantTable';

function App() {
  // список участников
  var [participants, setParticipants] = useState([]);
  // следующий ID для нового чувака
  var [nextId, setNextId] = useState(1);

  function addParticipant(newParticipant) {
    var participantWithId = { ...newParticipant, id: nextId };
    setParticipants([...participants, participantWithId]);
    setNextId(nextId + 1);
  }

  // апдейтим данные участника (вызывается из ParticipantCard)
  function updateParticipant(id, updatedData) {
    setParticipants(participants.map(function(p) {
      if (p.id === id) {
        return { ...p, ...updatedData };
      }
      return p;
    }));
  }

  function deleteParticipant(id) {
    setParticipants(participants.filter(function(p) {
      return p.id !== id;
    }));
  }

  return (
    <div className="App">
      <h1>Участники фестиваля</h1>
      <AddParticipantForm onAddParticipant={addParticipant} />
      <div className="participants-list">
        {participants.map(function(participant) {
          return (
            <ParticipantCard
              key={participant.id}
              participant={participant}
              onEdit={updateParticipant}
              onDelete={deleteParticipant}
            />
          );
        })}
      </div>
      <ParticipantTable participants={participants} />
    </div>
  );
}

export default App;
