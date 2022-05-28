import React, {useEffect, useState} from 'react'
import {ListaRotaPedidoItem} from "./ListaRotaPedidoItem";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

interface Interface {
  pedidos: any[]
}

export const ListaRotaPedidos = ({pedidos}: Interface) => {

  const [itemList, setItemList] = useState(pedidos);
  const [isDraggin, setIsDraggin] = useState(false);


  useEffect(() => { setItemList(pedidos)}, [pedidos] )

  const handleDrop = (droppedItem: any) => {

    // Ignore drop outside droppable container
    if (!droppedItem.destination) {
      return;
    }

    let updatedList = [...itemList];

    // Remove dragged item
    let [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);

    // update sequencia
    let updatedItem = {...reorderedItem}
    updatedItem.rota_sequencia = droppedItem.destination.index + 1

    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, updatedItem);

    updatedList = updatedList.map((item, index) => {
      let newItem = {...item}
      newItem.rota_sequencia = index + 1
      return newItem
    })

    // Update State
    setItemList(updatedList);

    setIsDraggin(false)

  };

  const handleDragStart = (e:any) => {
    setIsDraggin(true)
  }

  return <div>
    <DragDropContext onDragEnd={handleDrop} onBeforeDragStart={handleDragStart}>
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
                      <ListaRotaPedidoItem pedido={pedido} isDragging={isDraggin} />
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
