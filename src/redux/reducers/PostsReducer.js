// Импортируем константы
import {
  ADD_PARTICIPANT,
  UPDATE_PARTICIPANT,
  DELETE_PARTICIPANT,
  SET_PARTICIPANTS,
  SET_PARTICIPANTS_LOADING,
  SET_PARTICIPANTS_ERROR
} from '../Actions/ActionTypes';

// Начальное состояние для участников
const initialState = {
  participants: [],
  nextId: 1,
  loading: false,
  error: null
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
      // Устанавливаем дефолтные значения для новых полей
      const newParticipant = {
        ...action.payload,
        id: state.nextId,
        performanceOrder: action.payload.performanceOrder || null,
        directorNotes: action.payload.directorNotes || ''
      };
      
      return {
        ...state,
        participants: [...state.participants, newParticipant],
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
        participants: action.payload,
        nextId: action.payload.reduce((maxId, participant) => Math.max(maxId, participant.id || 0), 0) + 1,
        error: null
      };

    case SET_PARTICIPANTS_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SET_PARTICIPANTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default postsReducer;
