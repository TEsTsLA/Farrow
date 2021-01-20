import { Http, Response } from 'farrow-http'

const http = Http()

http.use((req, next) => {
  console.log(req.pathname)
  return next()
})
// add http middleware
http.get("/").use(() => {
  // returning response in middleware
  return Response.text(`Hello Farrow`)
})
http.get('/greet/<name:number>').use(requset => {
  console.log(typeof requset.params.name)
  console.log(requset.params.name)
  return Response.json(requset.params.name)
})

http.listen(3000)