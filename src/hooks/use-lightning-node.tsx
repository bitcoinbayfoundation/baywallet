import React from "react"
import { useEffect, useState, useContext, createContext } from "react"
import { startBayWalletNode } from "../ldk/node"
import { useDataStore } from "../store/DataProvider"
import { log } from "../util/logger"

const LightningNodeContext = createContext(null)

export const LightningNodeProvider = ({ children }) => {
	const [nodeStarted, setNodeStarted] = useState<boolean>(false)
	const { lightningStore } = useDataStore()

	useEffect(() => {
		log.ldk("Starting Bay Wallet node...")
		const startNode = async () => {
			// Setup LDK
			const setupResponse = await startBayWalletNode();
			if (setupResponse.isErr()) {
				log.ldk("Start error", setupResponse.error.message)
				return;
			}
			setNodeStarted(true)
		}
		startNode()
	}, [])

	useEffect(() => {
		if (!nodeStarted) return

		lightningStore.getLightningInfo()
	}, [nodeStarted])

	return (
		<LightningNodeContext.Provider value={{ nodeStarted }}>
			{children}
		</LightningNodeContext.Provider>
	)
}

export const useLightningNode = () => useContext(LightningNodeContext)