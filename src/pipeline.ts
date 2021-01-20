import { createPipeline } from "farrow-pipeline"

const pipeline = createPipeline<number, number[]>()

pipeline.use((input, next) => {
  console.log('user 1 => ' + input)
  return [input, ...next(1), 3]
})

pipeline.use((input) => {
  console.log('user 2 => ' + input)
  return [input, 2]
})

let result = pipeline.run(0) // [0, 1, 2, 3]
console.log(result)