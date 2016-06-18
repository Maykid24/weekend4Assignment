console.log('Javascript is here');

$(document).ready(function () {
  //Adding new tasks to the DB
  $('#addToDo').on('click', function () {
    var addingToDo = $('#toDo').val();
    console.log('adding to do: ' + addingToDo);
    var newToDo = {
      "listToDo": addingToDo,
      "complete": false
    };//End of Object
    $.ajax({
      type: 'POST',
      url: '/createList',
      data: newToDo,
      success: function (data) {
        displayTasks(data);
      }//End of success function
    });//End of ajax call
  });//End of on click button

  //Refreshes the page with updated database
  $('#rButton').on('click', function () {
    displayTasks();
  });//End of rButton onclick

  $('#delButton').on('click', function () {
    
  });

  //displays the database for the user to see
  function displayTasks() {
    document.getElementById('displayDiv').innerHTML = "";
    $.ajax({
      type: 'GET',
      url: '/getTasks',
      success: function (data) {
        for(var i =0; i < data.length; i++){
          var display = document.createElement('h4');
          var task = "List of Tasks: " + data[i].tasks;
          display.textContent = task;
          $('#displayDiv').append(display);
          var deleteButton = "<button id='delButton' data-id='" + data[i].id + "'>Delete" + "</button>";
          $('#displayDiv').append(deleteButton);
        }//End of for loop
      }//End of success function
    });//End of ajax call
  }//End of displayTasks
});//End of document ready function
