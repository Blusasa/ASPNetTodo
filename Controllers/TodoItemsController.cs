using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{

    public class TodoItemsController : ControllerBase
    {
        public TodoItemsController(){
        }

        public IList<TodoItem> getTodoList(){
            return new List<TodoItem>();
        }

        public ActionResult PutTodoItem([FromRouteAttribute]long id, [FromBody]TodoItem todoItem){
            return null;
        }

        public ActionResult PostTodoItem([FromBody] TodoItem todoItem){
            return null;
        }

        public ActionResult DeleteTodoItem(long id){   
            return null;
        }

        private int getNextID()
        {
           return 0;
        }
    }
}
