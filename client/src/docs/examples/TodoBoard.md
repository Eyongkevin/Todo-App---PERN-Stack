A simple Todo Board

```js
import TodoBoard from '../../components/TodoBoard';

let todos = {
    'Task': [
                {
                    description: "Try to include marked syntax and use [marked](https://github.com/markedjs/marked) to render.",
                    done_timestamp: "2012-04-30T09:14:23.000Z",
                    status: "Stuck",
                    todo_id: 7
                }
            ],
    'Do Today': [],
    'Done': [],
    'In Progress': [],
    'Stuck': []
};
let taskCallbacks = {
                        "deleteTodo" : (e, id, status)=> null,
                        "StatusUpdate" : (todo_id, status)=> null
                    };

<TodoBoard todos={todos} taskCallbacks={taskCallbacks} />
```