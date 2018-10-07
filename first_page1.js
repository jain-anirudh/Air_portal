
<?php
//$mobile= 8130243675;
//var a =10;
$message="OTP: 1235";
$json = json_decode(file_get_contents("https://smsapi.engineeringtgr.com/send/?Mobile=9958190901&Password=T7845M&Message=".urlencode($message)."&To=".$_GET['contacts']."&Key=sammaOSTjf02GnLc6s7gi9wlArPvhH") ,true);
if ($json["status"]==="success") {
    echo $json["msg"];
    //your code when send success
}else{
    echo $json["msg"];
    //your code when not send
}
?>
<html>
<head>
 <title>Firebase Realtime Database Web</title>
 <link href="styled.css" rel= "stylesheet">
 <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDW9LQ3XVa0GzEl4fAeHBp3grq5SQ0hqRk",
    authDomain: "luggagetrack-7cb6b.firebaseapp.com",
    databaseURL: "https://luggagetrack-7cb6b.firebaseio.com",
    projectId: "luggagetrack-7cb6b",
    storageBucket: "",
    messagingSenderId: "106176775598"
  };
  firebase.initializeApp(config);
</script>
</head>
<body>
  <form action="">
    <br>
  <h1> Welcome to Airport Luggage Tracking Portal</h1>

   <h3>PNR: </h3>
   <input type="text" name="id" id="user_id" >

   <h3>RFID: </h3>
   <input type="text" name="user_name" id="user_name" >

   <h3>Flight Details: </h3>
   <input type="text" name="flight" id="flight" >

  <h3>Contact Number: </h3>
   <input type="number" name="contacts" id="contact" >
   <br><br>


    <button type="submit" value="Save" onclick="save_user();" id="save"> Submit</button>

    <input type="button" value="Update" onclick="update_user();" id="update"/>

    <input type="button" value="Delete" onclick="delete_user();" id="delete"/>

  </form>






 <!--<h3>Users List</h3>

 <table id="tbl_users_list" border="1">
  <tr>
   <td>PNR</td>
   <td>RFID</td>
   <td>Flight</td>
   <td>Contact</td>
  </tr>
</table>-->


 <script>

  var tblUsers = document.getElementById('tbl_users_list');
 var databaseRef = firebase.database().ref('users/');
 var rowIndex = 1;

  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
   var childKey = childSnapshot.key;
  var childData = childSnapshot.val();
//  var childNo. = childSnapshot.val();

   //var row = tblUsers.insertRow(rowIndex);
  // var cellId = row.insertCell(0);
  // var cellName = row.insertCell(1);
  // cellId.appendChild(document.createTextNode(childKey));
   //cellName.appendChild(document.createTextNode(childData.user_name));

   rowIndex = rowIndex + 1;
    });
  });




  var serialport = require('serialport');
  var portName = process.argv[2];

  var myPort = new serialport('/dev/cu.usbmodem1421', {
      baudRate: 9600,
      parser: new serialport.parsers.Readline('\t\n')
  });

  myPort.on('open', onOpen);
  myPort.on('data', onData);

  function onOpen(){
      console.log('Open connections!');
  }
    var i=0;
    var string = "";

  function onData(data){



      string+=data;
      i++;

      if(i==3)
      {
      console.log('on Data ' + string);
      i=0;
      string = "";
    }

  }


  function save_user(){
   var user_name = document.getElementById('user_name').value;

   var uid = firebase.database().ref().child('users').push();
   //var uid =
   var pnr= document.getElementById('user_id').value;

  var Contact= document.getElementById('contact').value;

  var flight = document.getElementById('flight').value;
var min=1000;
var max=9999;
var otp=  Math.floor(Math.random() * (+max - +min)) + +min;
//otp= 1235;
//document.write("Random Number Generated : " + random );

   var data = {
    Pnr: pnr,
    Rfid : user_name,
    flight: flight,
    otp: otp,
contact: Contact


   }
   uid= pnr;

   var updates = {};
   updates['/users/'+ pnr] = data;
   firebase.database().ref().update(updates);

   alert('The user is created successfully!');
   reload_page();
  }

  function update_user(){
   var Rfid = document.getElementById('user_name').value;
   var Pnr = document.getElementById('user_id').value;
   //var contact= document.getElementById('contact').value;

   var data = {
    Pnr: Pnr,
    Rfid: Rfid,

   }

   var updates = {};
   updates['/users/' + Pnr] = data;
   firebase.database().ref().update(updates);

   alert('The user is updated successfully!');

   reload_page();
  }

  function delete_user(){
   var Pnr = document.getElementById('user_id').value;

   firebase.database().ref().child('/users/' + Pnr).remove();
   alert('The user is deleted successfully!');
   reload_page();
  }

  function reload_page(){
   window.location.reload();
  }

 </script>

</body>
</html>
