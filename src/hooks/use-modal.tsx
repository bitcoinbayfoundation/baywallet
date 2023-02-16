import React from "react"
import { ModalService } from "@ui-kitten/components"
import { CreateNewChannel } from "../components/lightning/modals/channel-details"

export enum Modals {
  ChannelDetailed = "channel-detailed"
}

export const useModal = () => {
  let modalId = ""

  const showModal = (id:string) => {
    const contentElement = renderModal(id)
    modalId = ModalService.show(contentElement, {onBackdropPress: hideModal})
  }

  const hideModal = () => {
    ModalService.hide(modalId)
  }

  const renderModal = (id:string) => { 
    switch (id) {
      case Modals.ChannelDetailed:
        return <CreateNewChannel />
      default:
        return <CreateNewChannel />
    }
  }

  return { showModal, hideModal }
}