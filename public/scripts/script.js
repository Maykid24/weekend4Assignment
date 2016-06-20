console.log('Javascript is here');

$(document).ready(function () {
  displayTasks();
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

  //Refreshes value in the input field to original state
  $('#addToDo').on('click', function () {
    document.getElementById('toDo').value='';
  });//end of refresh input value

  //Refreshes the page with updated database
  $('#rButton').on('click', function () {
    displayTasks();
  });//End of rButton onclick

  //Delete function to delete tasks
  $('body').on('click', '.delButton', function () {
  $('#outputDiv').empty();
  var listID = {
    'id': $(this).data('id')
  };//End of object
  $.ajax({
    type: 'POST',
    url: '/deleteList',
    data: listID,
    success: function (data) {
      displayTasks(data);
    }
  });//End of ajax call
});//End of Delete button

//Button complete ajax function
$('body').on('click', '.compButton', function () {
  var listID = {
    'id': $(this).data('id')
  };//end of object
  changeColor();
  $.ajax({
    type: 'POST',
    url: '/completeTask',
    data: listID,
    success: function () {
      displayTasks();
    }
  });//end of Ajax call
});//End of complete button function

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
          var deleteButton = "<button class='delButton' data-id='" + data[i].id + "'>Delete" + "</button>";
          $('#displayDiv').append(deleteButton);
          var completeButton = "<button class='compButton' data-id='" + data[i].id + "'>Complete!" + "</button>";
          $('#displayDiv').append(completeButton);
        }//End of for loop

        $('.compButton').on('click', function changeColor() {
          $('h4').css('color', 'green');
        });//End of change color function

      }//End of success function
    });//End of ajax call
  }//End of displayTasks
});//End of document ready function
