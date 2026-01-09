// Импортируем константы
import {
  ADD_PARTICIPANT,
  UPDATE_PARTICIPANT,
  DELETE_PARTICIPANT,
  SET_PARTICIPANTS,
  SET_PARTICIPANTS_LOADING,
  SET_PARTICIPANTS_ERROR
} from './ActionTypes';

const PARTICIPANTS_STORAGE_KEY = 'participants';

const SAMPLE_PARTICIPANTS = [
  {
    id: 1,
    firstName: 'Алина',
    creativeNumber: 'Вокал',
    phone: '+375291234567',
    performanceOrder: 1,
    directorNotes: 'Открывающий номер',
    duration: 4
  },
  {
    id: 2,
    firstName: 'Максим',
    creativeNumber: 'Хореография',
    phone: '+375331112233',
    performanceOrder: 2,
    directorNotes: '',
    duration: 5
  },
  {
    id: 3,
    firstName: 'София',
    creativeNumber: 'СДМ',
    phone: '+375441234567',
    performanceOrder: 3,
    directorNotes: 'Поставить ближе к центру',
    duration: 6
  }
];

const readParticipants = () => {
  const saved = localStorage.getItem(PARTICIPANTS_STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};

const writeParticipants = (participants) => {
  localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(participants));
};

export const fetchParticipants = () => (dispatch) => {
  dispatch({
    type: SET_PARTICIPANTS_LOADING,
    payload: true
  });

  setTimeout(() => {
    try {
      const stored = readParticipants();
      const participants = stored?.length ? stored : SAMPLE_PARTICIPANTS;
      if (!stored?.length) {
        writeParticipants(participants);
      }
      dispatch(setParticipants(participants));
    } catch (error) {
      dispatch({
        type: SET_PARTICIPANTS_ERROR,
        payload: 'Не удалось загрузить участников'
      });
    } finally {
      dispatch({
        type: SET_PARTICIPANTS_LOADING,
        payload: false
      });
    }
  }, 800);
};

/**
 * Action creator для добавления участника
 * @param {Object} participant - Данные участника
 * @returns {Object} Action объект
 */
export const addParticipant = (participant) => (dispatch, getState) => {
  dispatch({
    type: ADD_PARTICIPANT,
    payload: participant
  });
  const { posts } = getState();
  writeParticipants(posts.participants);
};

/**
 * Action creator для обновления участника
 * @param {number} id - ID участника
 * @param {Object} updatedData - Обновленные данные
 * @returns {Object} Action объект
 */
export const updateParticipant = (id, updatedData) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_PARTICIPANT,
    payload: {
      id,
      updatedData
    }
  });
  const { posts } = getState();
  writeParticipants(posts.participants);
};

/**
 * Action creator для удаления участника
 * @param {number} id - ID участника для удаления
 * @returns {Object} Action объект
 */
export const deleteParticipant = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_PARTICIPANT,
    payload: id
  });
  const { posts } = getState();
  writeParticipants(posts.participants);
};

/**
 * Action creator для установки списка участников
 * @param {Array} participants - Массив участников
 * @returns {Object} Action объект
 */
export const setParticipants = (participants) => {
  return {
    type: SET_PARTICIPANTS,
    payload: participants
  };
};
