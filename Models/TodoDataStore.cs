using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace TodoAPI.Models{

    public class TodoDataStore{
        
        private TodoDataStore(){
            // items = new List<TodoItem>();
            // items.Add(new TodoItem{id = 1, name = "Walk the dog", isComplete = false});
            // items.Add(new TodoItem{id = 2, name = "Clean Room", isComplete = false});
            // items.Add(new TodoItem{id = 3, name = "Run errands", isComplete = false});
            // items.Add(new TodoItem{id = 4, name = "Fix yard", isComplete = false});
            // items.Add(new TodoItem{id = 5, name = "Change oil", isComplete = false});
            // items.Add(new TodoItem{id = 6, name = "Finish Project", isComplete = false});
        }

        public static TodoDataStore getInstance(){
        }

        public List<TodoItem> getItems(){
        }

        public void addItem(TodoItem item){
        }




    }
}