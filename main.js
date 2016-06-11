$(document).ready(init);

function init() {
   var tasks = getTasks();
   renderTasks(tasks);
   $('.addTask').click(addTask);
   $('table').on('click', '.delete', deleteTask);
   $('table').on('click', '.check', completeTask)
}

function completeTask() {
   var $thisRow = $(this).parent().parent();
   var index = $thisRow.index() - 1;
   $thisRow.toggleClass('complete');
   var tasks = getTasks();
   tasks[index].complete = !tasks[index].complete;
   writeTasks(tasks);
}

function deleteTask(e) {
   var tasks = getTasks();
   var index = $(this).parent().parent().index() - 1;
   tasks.splice(index, 1);
   writeTasks(tasks);
   renderTasks(tasks);
}

function addTask() {
   var $desc = $('.addDesc');
   var desc = $desc.val();
   $desc.val('');
   var $date = $('.addDate');
   var date = $date.val();
   $date.val('');
   var tasks = getTasks();
   var nTask = newTask(desc, date);
   tasks.push(nTask);
   writeTasks(tasks);
   renderTasks(tasks);

}

function writeTasks(tasks) {
   var tasksStr = JSON.stringify(tasks);
   localStorage.tasks = tasksStr;
}

function getTasks() {
   try {
      var str = localStorage.tasks;
      var tasks = JSON.parse(str);
   } catch(err) {
      var tasks = [];
   }
   return tasks;
}

function newTask(desc, date) {
   task = {
      desc: desc,
      dueDate: date,
      complete: false
   }
   return task;
}

function renderTasks(tasks) {
   var $tasks = tasks.map((task, index) => {
      var $task = $('.template').clone();
      if ((index) % 2 === 0) $task.addClass('darkerBG');
      $task.removeClass('hidden').removeClass('template');
      $task.find('.desc').text(task.desc);
      $task.find('.dueDate').text(task.dueDate);
      if (task.complete) $task.find('.check').prop('checked', 'true'); //check box if complete
      return $task;
   });
   var $tHead = $('.taskTableHead').clone(); 
   $('.taskTable').empty().append($tHead).append($tasks);
}

