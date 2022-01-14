// JavaScript source code
let months=['January','February','March','April','May','June','July','August','September','October','November','December'];
      
$(function () {
    let email=document.cookie;
    document.cookie='';
    email=email.slice(email.indexOf('email')).split('=')[1];
    email=email.slice(0,email.indexOf(';'))
    let admins =getAdminsData();
    let admin;
    console.log(email)
    for(a in admins)
    {
        if(admins[a].Email.toUpperCase()==email.toUpperCase()){
            admin=admins[a];
            console.log(admins[a]);
        }
    }
    $('#name').html(`<p style='margin: 10px;'>name : </br>${admin.Fname} ${admin.Sname}</p>`).css('text-align','center');
    $('#email').html(`<p style='margin: 10px;'>email : </br>${admin.Email}</p>`).css('text-align','center');
    
    let pendingAccounts = JSON.parse(localStorage.getItem('pendingAccount'));
    $('li:eq(0)').click(function(){
        $('#data').css({
            'width':'90%',
            'height':'90%',
            'background-color':'white',
            'border-radius':'10px',
            'display':'flex',
            'flex-direction':'column',
            'justify-content':'space-around',
            'align-items':'space-around',
        }).html('');
        $('#data').css('display','block').html('');
        for(p in pendingAccounts){
            $('#data').append(`<div style="margin: 10px;" class='account'>
            <p>${pendingAccounts[p].Email}</p>
            <button  id='activate' name="${pendingAccounts[p].Email}">Activate account</button>
            <button  id='security' name="${pendingAccounts[p].Email}">Make him Security</button>
        </div>`);
        }
    });

    $('#data').click(function (e) {
        let emp;
        let email = e.target.name;
        if(e.target.id=='activate'){
            console.log('activate clicked')
            for (e in pendingAccounts) {
                if (pendingAccounts[e].Email == email) {
                    emp = pendingAccounts[e];
                    console.log(emp);
                }
            }
            Email.send({
                Host: "smtp.gmail.com",
                Username: "mohamedyounies96@gmail.com",
                Password: "ctqytxrmfnoadmfq",
                To: email,
                From: "mohamedyounies96@gmail.com",
                Subject: "Don't Reply",
                Body: `hello ${emp.Fname} ${emp.Sname}
                        here are your login code : ${emp.Logincode} 
                        and your username : ${emp.Username}`,
            }).then((e) => {
                emp.Activated = true;
                let newPendding = [];
                for (e in pendingAccounts) {
                    if (pendingAccounts[e].Email != email) {
                        newPendding.push(pendingAccounts[e]);
                    }
                    else {
                        let emps = JSON.parse(localStorage.getItem('employees'));
                        if(emps==''||emps==null)
                            emps=[]
                        emps.push(pendingAccounts[e]);
                        localStorage.setItem('employees', JSON.stringify(emps));
                    }
    
                }
                localStorage.setItem('pendingAccount', JSON.stringify(newPendding));
                
            });
        }
        else if(e.target.id=='security'){
            let employees = JSON.parse(localStorage.getItem('pendingAccount'));
            console.log('security clicked')
            if(employees==null)
                emps=[];
            for (e in employees) {
                console.log(employees[e].Email);
                console.log(email);
                if (employees[e].Email == email) {
                    employees[e].EmpType='s';
                }
            }
            localStorage.setItem('pendingAccount', JSON.stringify(employees));
        }
        
    });


    $('li:eq("1")').click(function(){
        $('#data').css({
            'width':'90%',
            'height':'90%',
            'background-color':'white',
            'border-radius':'10px',
            'display':'flex',
            'flex-direction':'column',
            'justify-content':'space-around',
            'align-items':'space-around',
        }).html('');
        let employees = JSON.parse(localStorage.getItem('employees'));
        $('#data').html(`<table cellspacing:"5" cellpadding="5">
        <thead>
            <th>Emp No</th>
            <th>Email</th>
            <th>username</th>
            <th>employee type</th>
        </thead>
        <tbody>
        </tbody>
    </table>`);
        for(e in employees){
            $('tbody').append(`
            <tr>
                <td>${Number(e)+1}</td>
                <td>${employees[e].Email}</td>
                <td>${employees[e].Username}</td>
                <td>${employees[e].EmpType}</td>
            </tr>`);
        }
    });
    
    $('li:eq("2")').click(function(){
        $('#data').css('display','block').html('');

    });
    $('li:eq("3")').click(function(){
        $('#data').css('display','block').css('background-color','wheat').html('').append(`<div id='day'></div>`);
        let empsData=JSON.parse(localStorage.getItem('allEmployeesData'));
        for(let i=0;i<12;i++){
            $('#data').append('<div id="container"></div>');
            $('#container').append(`<div class='month' id=${i}>${months[i]}</div>`);
        }
        $('.month').click(function(e){
            console.log(e.target.id)
            $('#data').html('').css({
                'display':'flex',
                'flex-direction':'column',
                'justify-content':'start',
                'align-items':'center',
            });
            $('#data').append(`<p id='monthname'>${months[e.target.id]}</p><div id='day'></div>`);
            $('#day').append(`<div class='info' id=''>Date</div><div class='info'id=''>Employee Username</div><div class='info'id=''>Reason of excuse</div>`);
            for(i in empsData){
                console.log()
                for(let j =0;j<31;j++){
                    if(empsData[i].MonthReport[j].Excuse)
                        $('#day').append(`<div class='info'>${j+1} / ${Number(e.target.id)+1}</div><div class='info'>${empsData[i].Username}</div><div class='info'></div>`);
                }
            }
        });
    });
    
    $('li:eq("4")').click(function(){
        $('#data').css('display','block').html('');
        $('#data').css('display','block').css('background-color','wheat').html('').append(`<div id='day'></div>`);
        let empsData=JSON.parse(localStorage.getItem('allEmployeesData'));
        for(let i=0;i<12;i++){
            $('#data').append('<div id="container"></div>');
            $('#container').append(`<div class='month' id=${i}>${months[i]}</div>`);
        }
        $('.month').click(function(e){
            console.log(e.target.id)
            $('#data').html('').css({
                'display':'flex',
                'flex-direction':'column',
                'justify-content':'start',
                'align-items':'center',
            });
            $('#data').append(`<p id='monthname'>${months[e.target.id]}</p><div id='day'></div>`);
            $('#day').append(`<div class='info' id=''>Date</div><div class='info'id=''>Employee Username</div><div class='info'id=''>Reason of late</div>`);
            for(i in empsData){
                console.log()
                for(let j =0;j<31;j++){
                    if(empsData[i].MonthReport[j].Late)
                        $('#day').append(`<div class='info'>${j+1} / ${Number(e.target.id)+1}</div><div class='info'>${empsData[i].Username}</div><div class='info'></div>`);
                }
            }
        });

    });
    let emps = JSON.parse(localStorage.getItem('employees'));
    
});

function getAdminsData() {
    let arr = [];
    let emp = JSON.parse(localStorage.getItem('employees'));
    for (e in emp) {
        if (emp[e].EmpType == 'a')
            arr.push(emp[e]);
    }
    return arr;
}