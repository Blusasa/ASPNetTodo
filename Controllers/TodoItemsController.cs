using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [Route("api/TodoItems")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private ICollection<TodoItem> items;

        public TodoItemsController(TodoContext context)
        {
            items = new List<TodoItem>();
            items.Add(new TodoItem{ Id = 1, Name = "Walk the dog", IsComplete = false });
            items.Add(new TodoItem{Id = 2, Name = "Clean Room", IsComplete = false});
            items.Add(new TodoItem{Id = 3, Name = "Run errands", IsComplete = false});
            items.Add(new TodoItem{Id = 4, Name = "Fix yard", IsComplete = false});
            items.Add(new TodoItem{Id = 5, Name = "Change oil", IsComplete = false});
            items.Add(new TodoItem{Id = 6, Name = "Finish Project", IsComplete = false});
        }

        //GET: api/TodoItems/GetList
        [HttpGet]
        [Route("GetList")]
        public ICollection<TodoItem> getTodoList(){
            Console.WriteLine(items.Count);
            return items;
        }

        // GET: api/TodoItems/GetItem/5
        [HttpGet]
        [Route("GetItem/{id}")]
        public ActionResult<TodoItem> GetTodoItem(long id)
        {
            foreach(TodoItem item in items){
                if(item.Id == id){
                    return item;
                }
            }

            return NotFound();
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        [Route("CreateItem/{id}")]
        public ActionResult PutTodoItem(long id, TodoItem todoItem)
        {
            if (id != todoItem.Id){
                return BadRequest();
            }
            
            items.Remove(todoItem);
            items.Add(todoItem);

            return new OkResult();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("UpdateItem")]
        public ActionResult PostTodoItem(TodoItem todoItem)
        {
            items.Add(todoItem);
            return new OkResult();
        }

        // DELETE: api/TodoItems/5
        [HttpDelete]
        [Route("DeleteItem/{id}")]
        public ActionResult DeleteTodoItem(long id)
        {   
            bool itemRemoved = false;
            foreach(TodoItem item in items){
                if(itemRemoved){
                    item.Id--;
                    continue;
                }

                if(item.Id == id){
                    Console.WriteLine("Match Found");
                    Console.WriteLine(items.Count);
                    items.Remove(item);
                    Console.WriteLine(items.Count);
                    return new OkResult();
                }

            }
            

            return NotFound();
        }

        private bool TodoItemExists(long id)
        {
            return items.Where(i => i.Id == id).Any();
        }
    }
}
