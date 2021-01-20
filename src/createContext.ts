import { createContext, createPipeline } from "farrow-pipeline"

const Context0 = createContext(0)

const pipeline = createPipeline<number, number>({
  contexts: {
    // inject Context0 equipped 10 into pipeline
    context0: Context0.create(10),
  },
})

pipeline.use((input, next) => {
  return next(input) + Context0.get()
})

pipeline.use((input) => {
  Context0.set(Context0.get() + 1)
  return input
})

let result0 = pipeline.run(10) // return 21
let result1 = pipeline.run(20) // return 31