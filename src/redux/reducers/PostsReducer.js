// Импортируем константы
import {
  ADD_PARTICIPANT,
  UPDATE_PARTICIPANT,
  DELETE_PARTICIPANT,
  SET_PARTICIPANTS
} from '../Actions/ActionTypes';

// Начальное состояние для участников
const initialState = {
  participants: [],
  nextId: 1
};

/**
 * Редюсер для управления состоянием участников
 * @param {Object} state - Текущее состояние
 * @param {Object} action - Action объект
 * @returns {Object} Новое состояние
 */
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PARTICIPANT:
      // Добавляем нового участника с уникальным ID
      return {
        ...state,
        participants: [...state.participants, { ...action.payload, id: state.nextId }],
        nextId: state.nextId + 1
      };

    case UPDATE_PARTICIPANT:
      // Обновляем данные участника по ID
      return {
        ...state,
        participants: state.participants.map(participant =>
          participant.id === action.payload.id
            ? { ...participant, ...action.payload.updatedData }
            : participant
        )
      };

    case DELETE_PARTICIPANT:
      // Удаляем участника по ID
      return {
        ...state,
        participants: state.participants.filter(participant =>
          participant.id !== action.payload
        )
      };

    case SET_PARTICIPANTS:
      // Устанавливаем список участников
      return {
        ...state,
        participants: action.payload
      };

    default:
      return state;
  }
};

export default postsReducer;