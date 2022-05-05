import React, { useState } from 'react'
import { ChatAlt2Icon, PaperClipIcon } from '@heroicons/react/outline'
import { Draggable } from 'react-beautiful-dnd'
import Modal from './Modal'
import TransitionsModal from './Modal'

function CardItem({ data, index, menu, priority }: any) {
  let newID = data.id.toString()
  let newTitle = data.title
  let newCnpj = data.cnpj
  let newPorte = data.porte

  let newPriorityColor =
    data.priority === 0
      ? 'LabelPriorityCardBlue'
      : data.priority === 1
      ? 'LabelPriorityCardGreen'
      : 'LabelPriorityCardRed'

  let newPriorityTitle =
    data.priority === 0
      ? 'Baixa Prioridade'
      : data.priority === 1
      ? 'Média Prioridade'
      : 'Alta Prioridade'

  let newChat = data.chat
  let newAttachment = data.attachment
  let newInfo = data.infos

  const dataT = {
    id: newID,
    title: newTitle,
    cnpj: newCnpj,
    porte: newPorte,
    priorityColor: newPriorityColor,
    priorityTitle: newPriorityTitle,
    chat: newChat,
    attachment: newAttachment,
    infos: newInfo,
  }

  return (
    <Draggable index={index} draggableId={dataT.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="AroundCardGeral"
        >
          <label className={`LabelPriorityCard ${dataT.priorityColor}`}>
            {dataT.priorityTitle}
          </label>
          {priority}

          <h5 className="TitleCardItemText">{dataT.title}</h5>
          <h5 className="TitleCardItemText">CNPJ: {dataT.cnpj}</h5>
          <h5 className="TitleCardItemText">
            Porte da Empresa:
            {dataT.porte === 0
              ? ' Pequeno'
              : dataT.porte === 1
              ? ' Médio'
              : ' Grande'}
          </h5>

          <div className="InsideAreaCard">
            <div className="AroundItensBottomCard">
              <span className="spanChatCard">
                <ChatAlt2Icon className="imgChatIcon" />
                <span>{dataT.chat}</span>
              </span>
              <span className="SpanAttachmentCard">
                <PaperClipIcon className="ImgAttachmentICon" />
                <span>{dataT.attachment}</span>
              </span>
            </div>
            <ul className="ListCardBottom">
              <TransitionsModal data={dataT} />
              <li>{menu}</li>
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default CardItem
