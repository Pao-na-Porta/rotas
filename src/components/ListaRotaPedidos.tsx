import React, {useEffect, useState} from 'react'
import {ListaRotaPedidoItem} from "./ListaRotaPedidoItem"
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import {pedidosAtualizaSequencia} from "../atoms/Pedidos"
import {useRecoilRefresher_UNSTABLE, useSetRecoilState} from "recoil";
import {marcadorVisibilitySelector} from "../atoms/Marcadores";

interface Interface {
  pedidos: any[]
}

export const ListaRotaPedidos = ({pedidos}: Interface) => {

  const [itemList, setItemList] = useState(pedidos);
  const atualizaSequencia = useSetRecoilState(pedidosAtualizaSequencia)

  useEffect(() => { setItemList(pedidos)}, [pedidos] )

  const handleDrop = (droppedItem: any) => {

    // Ignore drop outside droppable container
    if (!droppedItem.destination) {
      return;
    }

    let updatedList = [...itemList];

    // Remove dragged item
    let [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);

    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

    updatedList = updatedList.map((item, index) => {
      let newItem = {...item}
      newItem.rota_sequencia = index + 1
      return newItem
    })

    // Update State
    setItemList(updatedList);

    atualizaSequencia(updatedList)

  };


  return <div>
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId="list-container" key={"list-container-key"}>
        {(provided) => (
          <div
            className="list-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
              {itemList.map((pedido, i) => {
                return <Draggable key={'draggable-key-' + pedido.id}
                                  draggableId={'draggable-' + pedido.id.toString()}
                                  index={i}
                >
                  {(provided) => (
                    <div
                      className="item-container"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <ListaRotaPedidoItem pedido={pedido} />
                    </div>
                  )}
                </Draggable>
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </div>
}
