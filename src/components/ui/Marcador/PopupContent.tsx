import React, {useEffect} from 'react'
import {useRecoilValue} from "recoil";
import {pedidosFamily} from "../../../atoms/Pedidos";
import {Expandable} from "../Expandable";
import {red,blue,green,orange} from "material-ui/colors";

interface MarkerPopupContentInterface {
  pedidoId: any,
  marcadorId: any,
  ativo: boolean
}

export const PopupContent = ({pedidoId, marcadorId, ativo}: MarkerPopupContentInterface) => {

  const pedido = useRecoilValue(pedidosFamily(pedidoId)) as any

  return <div
    key={`content-${marcadorId}-${pedidoId}`}
    className={"popup-content " + (ativo ? 'popup-content-ativo' : '')}>
    <div>
      <div className={'mb-3'}> <strong>{pedido.cliente.nome}</strong></div>
      <div className={'row mb-3'}>
        <div className={'col-3'}> Pedido <strong style={{color: blue.A400}}>#{pedidoId}</strong><strong style={{color: red.A400}}>{pedido.excecao ? ' * EXCEÇÃO' : ''}</strong></div>
        <div className={'col-3'}>Rota <strong>{pedido.rota.numero}</strong></div>
        <div className={'col-3'}>Entrega <strong>#{pedido.rota_sequencia}</strong></div>
      </div>
      <div className={"row"}>
        <div className={"col-3"}>
          Vendedor: <strong>{pedido.vendedor.name}</strong>
        </div>
        <div className={"col-3"}>
          Envio: <strong>{pedido.transportadora.nome} / {pedido.envio.nome}</strong>
        </div>
        <div className={"col-3"}>{pedido.observacao_entrega ? <div style={{color: orange.A400}}>{pedido.observacao_entrega}</div> : ''}</div>
      </div>
      <div style={{color: red.A400}}>
      {pedido.entrega_de == null && pedido.entrega_ate == null ? '' : 'Restrição '}
      {pedido.entrega_de == null ? '' : ' de '} <strong>{pedido.entrega_de}</strong>
      {pedido.entrega_ate == null ? '' : ' até '} <strong>{pedido.entrega_ate}</strong>
      </div>
      <hr/>
      <strong>Endereço de Entrega</strong><br/>
      {pedido.endereco}, {pedido.numero} - {pedido.complemento}<br/>
      {pedido.bairro} / {pedido.cidade} / {pedido.estado}<br/>
      <br/>
      <strong>Endereço Google</strong><br/>
      {pedido.enderecoGoogle.endereco}, {pedido.enderecoGoogle.numero} - {pedido.enderecoGoogle.complemento}<br/>
      {pedido.enderecoGoogle.bairro} / {pedido.enderecoGoogle.cidade} / {pedido.enderecoGoogle.estado}<br/>
      <hr/>
      <div className={'row'}>
        <div className={'col-3'}>
          <Expandable key={'ex' + pedidoId} k={'e' + pedidoId} label={'Embalagem'} produtos={pedido.produtosEmbalagem}/>
        </div>
        <div className={'col-3'}>
          <Expandable key={'ce' + pedidoId} k={'c' + pedidoId} label={'Cooler'} produtos={pedido.produtosCooler}/>
        </div>
        <div className={'col-3'}>
          <Expandable key={'he' + pedidoId} k={'h' + pedidoId} label={'Horta'} produtos={pedido.produtosHorta}/>
        </div>
      </div>
    </div>
  </div>

}