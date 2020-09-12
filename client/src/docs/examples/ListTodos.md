
A simple List Todo

```js
import ListTodos from '../../components/ListTodos';

let todo =[{
    description: "Research on available opportunities in Udacity and create Eyong's account.",
    done_timestamp: "2012-04-30T09:14:23.000Z",
    status: "Do Today",
    todo_id: 6
}]
let stage = "Do Today";

<ListTodos id={stage.replace(' ','-')} title={stage} todo={todo} />

```