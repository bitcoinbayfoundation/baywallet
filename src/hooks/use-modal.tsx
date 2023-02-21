import React from "react"
import { ModalService } from "@ui-kitten/components"
import { CreateNewChannel } from "../components/lightning/modals/channel-details"
import { NodeId } from "../components/lightning/modals/node-id"

export enum Modals {
  ChannelDetailed = "channel-detailed",
  NodeId = "node-id"
}

export const useModal = () => {
  let modalId = ""

  const showModal = (id:string, data?:any) => {
    const contentElement = renderModal(id, data)
    modalId = ModalService.show(contentElement, {onBackdropPress: hideModal})
  }

  const hideModal = () => {
    ModalService.hide(modalId)
  }

  const renderModal = (id:string, data?:any) => { 
    switch (id) {
      case Modals.ChannelDetailed:
        return <CreateNewChannel />
      case Modals.NodeId:
        return <NodeId data={data}/>
      default:
        return <CreateNewChannel />
    }
  }

  return { showModal, hideModal }
}