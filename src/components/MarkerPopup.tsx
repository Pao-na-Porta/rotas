import React, {useState} from 'react'

interface MarkerPopupInterface {
  marcador: any
}

export const MarkerPopup = ({marcador}:MarkerPopupInterface) => {
  const [pedidoSelecionado, setPedidoSelecionado] = useState(marcador.pedidos[0].id);
  let ativo = ''

  return <div className="popup">
    <ul className="popup-tab-header">
      {marcador.pedidos.map((pedido:any) => {
        ativo = (pedidoSelecionado == pedido.id ? 'ativo' : '')
        return <li key={`popup-${marcador.id}-${pedido.id}`}><a href="#" className={ativo} onClick={() => {setPedidoSelecionado(pedido.id)}}>{pedido.id}</a></li>
      })}
    </ul>
    {marcador.pedidos.map((pedido:any) => {
      ativo = (pedidoSelecionado == pedido.id ? 'popup-content-ativo' : '')
      return <div key={`content-${marcador.id}-${pedido.id}`} className={"popup-content " + ativo}>
        <p>
          {pedido.cliente.nome}<br/>
          {pedido.endereco}, {pedido.numero}, {pedido.complemento}<br/>
          {pedido.bairro}, {pedido.cidade}, {pedido.estado}<br/>

        </p>
      </div>
    })}
  </div>

}