import axios from "../__mock__/axios"
// import { getTransactionData } from "../src/blocks/electrs"

describe("Electrum", () => {
  it("", () => {
    axios.get.mockResolvedValueOnce({data: {}, status: 300})
    expect(true).toBe(true)
  })
})