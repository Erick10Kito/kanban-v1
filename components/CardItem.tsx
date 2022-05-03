import React, { useState } from 'react'
import { ChatAlt2Icon, PaperClipIcon } from '@heroicons/react/outline'
import { Draggable } from 'react-beautiful-dnd'
import Modal from './Modal'

function CardItem({ data, index, menu, priority }: any) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="AroundCardGeral"
        >
          <label
            className={`LabelPriorityCard
              ${
                data.priority === 0
                  ? 'LabelPriorityCardBlue'
                  : data.priority === 1
                  ? 'LabelPriorityCardGreen'
                  : 'LabelPriorityCardRed'
              }`}
          >
            {data.priority === 0
              ? 'Baixa Prioridade'
              : data.priority === 1
              ? 'Média Prioridade'
              : 'Alta Prioridade'}
          </label>
          {priority}
          <h5 className="TitleCardItemText">{data.title}</h5>
          <h5 className="TitleCardItemText">CNPJ: {data.cnpj}</h5>
          <h5 className="TitleCardItemText">
            Porte da Empresa:
            {data.porte === 0
              ? ' Pequeno'
              : data.porte === 1
              ? ' Médio'
              : ' Grande'}
          </h5>

          <div className="InsideAreaCard">
            <div className="AroundItensBottomCard">
              <span className="spanChatCard">
                <ChatAlt2Icon className="imgChatIcon" />
                <span>{data.chat}</span>
              </span>
              <span className="SpanAttachmentCard">
                <PaperClipIcon className="ImgAttachmentICon" />
                <span>{data.attachment}</span>
              </span>
            </div>
            <ul className="ListCardBottom">
              {data.info.map((index: React.Key | null | undefined) => {
                return <li key={index}></li>
              })}
              <li>{menu}</li>
              <Modal />
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default CardItem
