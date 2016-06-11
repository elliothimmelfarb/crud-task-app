$(document).ready(init);

function init() {
   console.log("ready")
}

function writeTasks(tasks) {
   var tasksStr = JSON.stringify(tasks);
   localStorage.tasks = tasksStr;
}

function getTasks() {
   var str = localStorage.tasks;
   try {
      var tasks = JSON.parse(str);
   } catch(err) {
      var tasks = [];
   }
   return tasks;
}

function newTask(desc, date) {
   task = {
      desc: desc,
      due: date,
      complete: false
   }
   return task;
}

function renderTasks(tasks) {
   var $tasks = tasks.map(task => {
      var $task = $('.taskRow').clone(true);
      console.log($task);
      $task.removeClass('hidden');
      $task.find('.check').removeClass('hidden');
      $task.find('.desc').text(task.desc);
      $task.find('.dueDate').text(task.due);
      debugger;
      return $task
   }); 
   $('.taskTable').append($tasks);
}

