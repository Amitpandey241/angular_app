import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { ToDo } from 'src/app/interface/to-do'; 
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit{
  
  new_todo: ToDo[]=[];
  todoTitles: string='';
  idFortodo:number=0;
  beforeEditCache:string='';
  filter:string='';


  constructor(){}
  ngOnInit() {
    this.filter='all';
    this.beforeEditCache='';
    this.idFortodo=4
    this.todoTitles='';
    this.new_todo=[
      {
        'id': 1,
        'title':'Finish Angular Screencast',
        'completed':false,
        'editing':false
      },
      {
        'id': 2,
        'title':'Take over world',
        'completed':false,
        'editing':false
      },
      {
        'id': 3,
        'title':'One more thing',
        'completed':false,
        'editing':false
      },
    ]
  }
  addTodo():void{
    if(this.todoTitles.trim().length===0){
      return;
    }
    this.new_todo.push({
      'id':this.idFortodo,
      'title': this.todoTitles,
      'completed':false,
      'editing':false
    })
    this.todoTitles='';
    this.idFortodo++;
  }

  editTodo(todo:ToDo): void{
    this.beforeEditCache=todo.title;
    todo.editing=true;
  }
  
  doneEditing(todo:ToDo):void{
    if(todo.title.trim().length === 0){
      todo.title = this.beforeEditCache;
    }
    todo.editing=false;
  }

  cancelEdit(todo:ToDo):void{
    todo.title= this.beforeEditCache;
    todo.editing=false;
  }

  deleteTodo(id:number):void{
    this.new_todo= this.new_todo.filter(todo => todo.id !== id );
  }

  remaining():number{
    return this.new_todo.filter(new_todo=>!new_todo.completed).length;
  }
  atLeastOneCompleted():boolean{
    return this.new_todo.filter(new_todo=> new_todo.completed).length > 0;
  }

  clearCompleted():void{
    this.new_todo=this.new_todo.filter(new_todo=> !new_todo.completed);
  }

  checkAllTodos(event:Event): void{
    this.new_todo.forEach(new_todo => new_todo.completed = (<HTMLInputElement>event.target).checked);
  }

  todosFiltered(): ToDo[] {
    if (this.filter === 'all') {
      return this.new_todo;
    } else if (this.filter === 'active') {
      return this.new_todo.filter(new_todo => !new_todo.completed);
    } else if (this.filter === 'completed') {
      return this.new_todo.filter(new_todo => new_todo.completed);
    }

    return this.new_todo;
  }

}
