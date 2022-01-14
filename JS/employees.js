
let months=['January','February','March','April','May','June','July','August','September','October','November','December'];
        
$(function () {
    let email=document.cookie;
    document.cookie='';
    email=email.slice(email.indexOf('email')).split('=')[1];
    email=email.slice(0,email.indexOf(';'))
    
    let emps=JSON.parse(localStorage.getItem('employees'));
    let employee;
    for(e in emps){
        if(emps[e].Email==email)
        {
            employee=emps[e];
        }
    }
    $('#name').text(`name : ${employee.Fname} ${employee.Sname} `).css('text-align','left');
    $('#email').text(`email : ${employee.Email}`).css('text-align','left');
    let empsData=JSON.parse(localStorage.getItem('allEmployeesData'));
    
    if(empsData==null){
        empsData=[];
        $('#mainsection').text('There is no data to show').css({
            'color':'black',
            'text-align':'center',
            'display':'flex',
            'align-items':'center',
            'justify-content':'center',
            'font-size':'1.5rem'
        });
    }
    else{
        for(let i=0;i<12;i++){
            $('#mainsection').append(`<div class='month' id=${i}>${months[i]}</div>`);
        }
        
        $('.month').click(function(e){
            console.log(months[e.target.id])
            $('#mainsection').html('').css({
                'display':'flex',
                'flex-direction':'column',
                'justify-content':'start',
                'align-items':'center',
            });
            $('#mainsection').append(`<p id='monthname'>${months[e.target.id]}</p><div id='day'></div>`);
            $('#day').append(`<div class='info' id=''>Date</div><div class='info'id=''>Attend</div><div class='info'id=''>Excuse</div><div class='info'id=''>Late</div><div class='info'id=''>Absence</div>`)
            for(i in empsData){
                if(empsData[i].Username==employee.Username){
                    let date=new Date();
                    for(let j=0;j<31;j++){
                        
                        $('#day').append(`<div class='info' id=''>${j+1} / ${Number(e.target.id)+1}</div>`);
                        if(empsData[i].MonthReport[j].Attend)
                            $('#day').append(`<div class='info' id=''>&check;</div>`);
                        else
                            $('#day').append(`<div class='info' id=''></div>`);
                        if(empsData[i].MonthReport[j].Attend)
                            $('#day').append(`<div class='info' id=''>&check;</div>`);
                        else
                            $('#day').append(`<div class='info' id=''></div>`);
                        if(empsData[i].MonthReport[j].Attend)
                            $('#day').append(`<div class='info' id=''>&check;</div>`);
                        else
                            $('#day').append(`<div class='info' id=''></div>`);
                        if(empsData[i].MonthReport[j].Attend)
                            $('#day').append(`<div class='info' id=''>&check;</div>`);
                        else
                            $('#day').append(`<div class='info' id=''></div>`);
                        
                    }
                }
            }
        });
    }
        
    
});
