import React, { KeyboardEvent, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CardItem from '../components/CardItem'
import bdData from '../data/board-data.json'
import {
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

export interface IModalInfo {
  capitalSocial: number
  telefone: number
  email: string
  endereço: string
}

export interface IBoardItem {
  id?: number
  priority?: number
  title?: string
  chat?: number
  attachment?: number
  cnpj?: string
  porte?: number
  infos?: IModalInfo[]
}

export interface IBoardData {
  name: string
  items: IBoardItem[]
}

function createId() {
  return Math.random()
}

let BoardData = bdData

function Home() {
  const [selectedBoard, setSelectedBoard] = useState(0)
  const [newBoard, setNewBoard] = useState(BoardData)

  const [ready, setReady] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const [editBoard, setEditBoard] = useState(false)

  useEffect(() => {
    if (typeof window) {
      setReady(true)
    }
  }, [])

  const onDragEnd = (re: any) => {
    if (!re.destination) return
    let newBoardData = newBoard
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index]
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    )
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    )
    setNewBoard(newBoardData)
  }

  const editFunc = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    funcValue: Function,
    itemArray?: any
  ) => {
    if (e.key == 'Enter') {
      const val = e.currentTarget.value
      if (val.length === 0) {
        funcValue(false)
      } else {
        let dataId = (e.target as Element).attributes.getNamedItem('data-id')
        const boardId = dataId && Number(dataId.value)

        if (boardId !== null) {
          const item = itemArray
          let newBoardData = newBoard
          if (item) {
            item.title = val
            newBoardData[boardId].items.push(item)
          } else {
            newBoardData[boardId].name = val
          }
          setNewBoard(newBoardData)
          funcValue(false)
          e.currentTarget.value = ''
        }
      }
    }
  }

  const editBoardAction = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    editFunc(e, setEditBoard)
  }

  function CreateBoardAction() {
    let count = newBoard.length + Math.floor(Math.random() * 100000)
    let countBoard = newBoard.length
    const board = {
      name: 'Board ' + count,
      items: [],
    }
    setNewBoard([...newBoard, board])
    setSelectedBoard(countBoard)
    setEditBoard(true)
  }

  function deleteBoard(value: number) {
    let index = value
    if (confirm('Excluir Board?')) {
      const finalBoard: IBoardData[] = []
      newBoard.map((item, key) => {
        if (key !== index) {
          finalBoard.push(item)
        }
        return setNewBoard(finalBoard)
      })
    }
  }

  const createCard = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const item = {
      id: createId(),
      priority: 0,
      chat: 0,
      attachment: 0,
      info: [],
    }
    editFunc(e, setShowForm, item)
  }

  function deleteCard(value: number) {
    let id = value
    let cardsFinal = [...newBoard]

    if (confirm('Excluir Card?')) {
      cardsFinal.forEach((board) =>
        board.items.forEach((items, index) => {
          if (items.id === id) {
            board.items.splice(index, 1)
          }
        })
      )
      setNewBoard(cardsFinal)
    }
  }

  function setPriority(id: number, priority: number) {
    let prior = priority
    let ind = id

    let priorityFinal = [...newBoard]
    priorityFinal.forEach((card) =>
      card.items.forEach((items) => {
        if (items.id === ind) {
          items.priority = prior
        }
      })
    )
    setNewBoard(priorityFinal)
  }

  return (
    <Layout>
      <div className="GeneralAreaKanbanContent">
        <div className="GeneralKanbanHeader">
          <div className="HeaderTextArea">
            <h4 className="">Kanbão</h4>
            <ChevronDownIcon className="SetaBaixoIconHeaderTitle" />
          </div>
          <ul className="CreateNewColumnList">
            <li>
              <button onClick={() => CreateBoardAction()} className="">
                <PlusIcon className="IconeMaisCreateNewBoard" />
              </button>
            </li>
          </ul>
        </div>
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="BoardCollumGeneral">
              {newBoard.map((board, bIndex) => {
                return (
                  <div key={board.name}>
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className={`CollumGeneralArea
                            ${snapshot.isDraggingOver && 'GreenColor'}`}
                          >
                            <span className="RedLineCollum"></span>
                            <h4 className="TitleBoardArea">
                              <span className="BoardName">
                                {editBoard && selectedBoard === bIndex ? (
                                  <div className="p-3">
                                    <textarea
                                      className="textEdit"
                                      rows={1}
                                      placeholder={board.name}
                                      data-id={bIndex}
                                      onKeyDown={(e) => editBoardAction(e)}
                                    />
                                  </div>
                                ) : (
                                  <span>{board.name}</span>
                                )}
                              </span>
                              <Menu
                                menuButton={
                                  <MenuButton>
                                    <DotsVerticalIcon className="DotsVerticalIcon" />
                                  </MenuButton>
                                }
                                transition
                              >
                                <MenuItem
                                  onClick={() => {
                                    setSelectedBoard(bIndex), setEditBoard(true)
                                  }}
                                >
                                  Editar
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    deleteBoard(bIndex)
                                  }}
                                >
                                  Excluir
                                </MenuItem>
                              </Menu>
                            </h4>
                            <div
                              className="CardAreaInCollum"
                              style={{ maxHeight: 'calc(100vh - 290px)' }}
                            >
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <CardItem
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                      className="CardItemClass"
                                      priority={
                                        <Menu
                                          menuButton={
                                            <MenuButton>
                                              <ChevronDownIcon className="ml-2 h-4 w-4 rounded-full bg-white text-gray-500 shadow-xl" />
                                            </MenuButton>
                                          }
                                          direction={'left'}
                                          transition
                                        >
                                          <MenuItem
                                            onClick={() => {
                                              setPriority(item.id, 0)
                                            }}
                                          >
                                            Baixa Prioridade
                                          </MenuItem>
                                          <MenuItem
                                            onClick={() => {
                                              setPriority(item.id, 1)
                                            }}
                                          >
                                            Média Prioridade
                                          </MenuItem>
                                          <MenuItem
                                            onClick={() => {
                                              setPriority(item.id, 2)
                                            }}
                                          >
                                            Alta Prioridade
                                          </MenuItem>
                                        </Menu>
                                      }
                                      menu={
                                        <button
                                          onClick={() => {
                                            deleteCard(item.id)
                                          }}
                                        >
                                          <TrashIcon className="deleteIcon" />
                                        </button>
                                      }
                                    />
                                  )
                                })}
                              {provided.placeholder}
                            </div>

                            {showForm && selectedBoard === bIndex ? (
                              <div className="AroundTextAreaAddTask">
                                <textarea
                                  className=""
                                  rows={3}
                                  placeholder="Task info"
                                  data-id={bIndex}
                                  onKeyDown={(e) => createCard(e)}
                                />
                              </div>
                            ) : (
                              <button
                                className="ButtonAddTask"
                                onClick={() => {
                                  setSelectedBoard(bIndex), setShowForm(true)
                                }}
                              >
                                <span>Adicionar Card</span>
                                <PlusCircleIcon className="PlusCircleIcon" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                )
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  )
}

export default Home
