/**
 *  Find the index of the todo with the specified id and status
 * 
 * @param { object } todos - all todos
 * @param { Number } todo_id - todo id 
 * @param { String } status - todo status
 * 
 * @return { Number } - index 
 */
export const get_todo_index=(todos, todo_id, status)=>{
    return todos[status].findIndex(todo => todo.todo_id == todo_id)
}
/**
 * Find index of task with specific id.
 * @param { object } tasks 
 * @param { Number } id 
 */
export const get_task_index=(tasks, id,)=>{
    return tasks.findIndex(task => task.todochecklist_id == id)
}