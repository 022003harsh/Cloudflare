import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

async function authMiddleware(c: any, next:any){
  if(c.req.header("Authorization")){
    //Do validation
    console.log("Validated");
    await next(); //if the validation is successful call next function where we have used that middleware
  } else {
    return c.text("You dont have access");//if we dont have the auth dont call next fn
  }
}


// app.use(authMiddleware) //this works but pass it directly inside function

// in express we use (Req, Res) but here only c(context) is there
// c here holds both req and res data
app.post('/', authMiddleware,async (c) => {
  const body= await c.req.json(); //json is large file so it needed to be awaited
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.render(<h1>Hello!</h1>)
})

export default app
