// Импортируем константы
import {
  ADD_PARTICIPANT,
  UPDATE_PARTICIPANT,
  DELETE_PARTICIPANT,
  SET_PARTICIPANTS
} from './ActionTypes';

/**
 * Action creator для добавления участника
 * @param {Object} participant - Данные участника
 * @returns {Object} Action объект
 */
export const addParticipant = (participant) => {
  return {
    type: ADD_PARTICIPANT,
    payload: participant
  };
};

/**
 * Action creator для обновления участника
 * @param {number} id - ID участника
 * @param {Object} updatedData - Обновленные данные
 * @returns {Object} Action объект
 */
export const updateParticipant = (id, updatedData) => {
  return {
    type: UPDATE_PARTICIPANT,
    payload: {
      id,
      updatedData
    }
  };
};

/**
 * Action creator для удаления участника
 * @param {number} id - ID участника для удаления
 * @returns {Object} Action объект
 */
export const deleteParticipant = (id) => {
  return {
    type: DELETE_PARTICIPANT,
    payload: id
  };
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