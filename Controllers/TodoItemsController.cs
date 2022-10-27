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
        private TodoDataStore dataStore;

        public TodoItemsController()
        {
            dataStore = TodoDataStore.getInstance();
        }

        //GET: api/TodoItems/GetList
        [HttpGet]
        [Route("GetList")]
        public IList<TodoItem> getTodoList(){
            Console.WriteLine(dataStore.getItems().Count);
            return dataStore.getItems();
        }

        // GET: api/TodoItems/GetItem/5
        [HttpGet]
        [Route("GetItem/{id}")]
        public ActionResult<TodoItem> GetTodoItem(long id)
        {
            foreach(TodoItem item in dataStore.getItems()){
                if(item.id == id){
                    return item;
                }
            }

            return NotFound();
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        [Route("UpdateItem/{id}")]
        public ActionResult PutTodoItem([FromRouteAttribute]long id, [FromBody]TodoItem todoItem)
        {
            Console.WriteLine("update");
            TodoItem item = dataStore.getItems().Where(i => i.id == id).First();
            dataStore.getItems().Remove(item);
            dataStore.getItems().Add(todoItem);

            return new OkResult();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("CreateItem")]
        public ActionResult PostTodoItem([FromBody] TodoItem todoItem)
        {
            int id = getNextID();
            todoItem.id = id;
            Console.WriteLine(todoItem.name + " " + todoItem.id);
            dataStore.getItems().Add(todoItem);
            return new OkResult();
        }

        // DELETE: api/TodoItems/5
        [HttpDelete]
        [Route("DeleteItem/{id}")]
        public ActionResult DeleteTodoItem(long id)
        {   
            Boolean itemRemoved = false;
            for(int i = 0; i < dataStore.getItems().Count(); i++){
                TodoItem item = dataStore.getItems()[i];
                if(itemRemoved){
                    item.id--;
                    continue;
                }
                if(item.id == id){
                    dataStore.getItems().Remove(item);
                    itemRemoved = true;
                }
            }

            return itemRemoved ? new OkResult() : NotFound();
        }

        private int getNextID()
        {
            return dataStore.getItems().Count() + 1;
        }
    }
}
