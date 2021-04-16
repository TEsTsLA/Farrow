import { sleep } from '../../../util/sleep'
import { api } from '../client/book'

describe("test", () => {
  it("is Ok", async () => {
    const data = await api.AddBook({body:{
      name: 'name',
      description: 'desc'
    }})
    console.log(data)
    const result = await sleep(1000)
    expect(result).toBe(1000)
  })
})