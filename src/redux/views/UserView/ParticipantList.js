// Импортируем React
import React from 'react';
// Импортируем библиотеку DnD
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
// Импортируем компонент карточки
import ParticipantCard from './ParticipantCard';
// Импортируем стили
import './styles.scss';

/**
 * Компонент списка участников с поддержкой drag-and-drop
 */
const ParticipantList = ({ participants, onEdit, onDelete, onReorder }) => {
  /**
   * Обработчик окончания перетаскивания
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    // Если элемент не был перемещен
    if (!over || active.id === over.id) {
      return;
    }
    
    // Находим индексы элементов
    const oldIndex = participants.findIndex(p => p.id === active.id);
    const newIndex = participants.findIndex(p => p.id === over.id);
    
    // Перемещаем элементы
    const newParticipants = arrayMove(participants, oldIndex, newIndex);
    
    // Обновляем порядок выступления
    const updatedParticipants = newParticipants.map((participant, index) => ({
      ...participant,
      performanceOrder: index + 1
    }));
    
    // Вызываем callback для обновления порядка
    onReorder(updatedParticipants);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={participants.map(p => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="participants-list">
          {participants.map((participant) => (
            <ParticipantCard
              key={participant.id}
              participant={participant}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ParticipantList;