var totalWaitingCalls = 0;

function initSocket() {
    console.log("init socket")
    socket = io.connect();
}

function setTotalWaitingCalls(total) {
    if(parseInt(total) >= 0){
        totalWaitingCalls = parseInt(total);
        socket.emit("totalWaitingCalls", totalWaitingCalls);
    }
}

//caculate age acording birth date
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

//user press in view sysA "answer call" we call this function
function startConv() {
    if (totalWaitingCalls > 0) {
        totalWaitingCalls--;
        socket.emit("totalWaitingCalls", totalWaitingCalls);
        var tr = document.getElementById('openConversations').insertRow();
        var cStart = tr.insertCell(0);
        var cCity = tr.insertCell(1);
        var cGender = tr.insertCell(2);
        var cAge = tr.insertCell(3);
        var cPrevCalls = tr.insertCell(4);
        var cProduct = tr.insertCell(5);
        var cTopic = tr.insertCell(6);
        var cEnd = tr.insertCell(7);

        const date = Date.now();
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' })
        const [{ value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(date)
        
        
        var client = rrendClientFromList();
        cStart.innerHTML = "<div id='" + date + "''>" + `${day}-${month}-${year} ,${hour}:${minute}` + "</div>";
        cCity.innerHTML =  "<div id='" + client[3] + "''>" +`${client[3] }` +"</option>";
        cGender.innerHTML = "<div id='" + client[5] + "''>" +`${client[5] }` +"</option>"; //`<option value='gender'>${client[5] }</option>`;
        cAge.innerHTML = "<div id='" + getAge(client[4]) + "''>" +`${ getAge(client[4])  }` +"</option>";//`<option value='age'>${ getAge(client[4]) }</option>` ;
        cPrevCalls.innerHTML = "<div id='" + client[6] + "''>" +`${client[6] }` +"</option>";//`<option value='prevCalls'>${client[6] }</option>`;
        cProduct.innerHTML = "<select><option value='internet'>Internet</option><option value='cableTV'>Cable TV</option><option value='cellular'>Cellular</option><option value='all'>All</option></select>";
        cTopic.innerHTML = "<select><option value='joining'>Joining</option><option value='service'>Service</option><option value='complaint'>Complaint</option><option value='disconnection'>Disconnection</option></select>";
        
        cEnd.innerHTML = "<button onclick= 'reportEndCall(this.parentNode.parentNode)'>End</button>";
          
    }
    else alert("Set number of total waiting calls")
}

//when finish the call end press "END" button we came here 
function reportEndCall(row) {
    var totalCalls = parseInt(document.getElementById("total").value) || 0;
    if (parseInt(totalCalls) > 0) {
        document.getElementById("total").value = (--totalCalls) + "";
    }


    //msg to send kafka
    var message = {};
    message.id = row.cells[0].getElementsByTagName('div')[0].id;
    message.city = row.cells[1].getElementsByTagName('div')[0].id;
    message.gender = row.cells[2].getElementsByTagName('div')[0].id;
    message.age = row.cells[3].getElementsByTagName('div')[0].id;
    message.prevCalls = (row.cells[4].getElementsByTagName('div')[0].id );    
    message.product = row.cells[5].getElementsByTagName('select')[0].value;
    message.topic = row.cells[6].getElementsByTagName('select')[0].value;
    message.totalTime = (parseInt(Date.now()) - parseInt(message.id)) / 1000; // seconds
    message.mood =  document.getElementById("mood").value;


    socket.emit("callDetails", message);
    deleteRow(row);    
}
//delete row
function deleteRow(row) {
    var i = row.rowIndex;
    document.getElementById('openConversations').deleteRow(i);
}
