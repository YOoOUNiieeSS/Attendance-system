$(function(){
    let email=document.cookie;
    document.cookie='';
    email=email.slice(email.indexOf('email')).split('=')[1];
    let employees=JSON.parse(localStorage.getItem('employees'));
    let employee;
    for(e in employees){
        if(employees[e].Email=email)
            employee=employees[e];
    }
    $('#name').text(`name : ${employee.Fname} ${employee.Sname} `).css('text-align','left');
    $('#email').text(`email : ${employee.Email}`).css('text-align','left');

    //departure for all employee who didn't departure yet at 3.30 pm 
    
    let date=new Date(Date.now());
    let h=15-date.getHours();
    let minutes=30-date.getMinutes();
    if(h>0){
        if(minutes<0)
        {
            h--;
            minutes+=60;
        }
    }
    else if(h==0){
        if(minutes>0)
        {
            let millisecond = (h*60+minutes)*60*1000;
            setInterval(`departureForAllEmployees(${date.getUTCDate()-1});`,millisecond);
            console.log('astn 2sec')
        }
    }
});

$('#confirm').click(function(){
    let date=new Date(Date.now());
    let username=$('#username').val();
    let employees=JSON.parse(localStorage.getItem('employees'));
    let securityEmployee=getEmployee(username);
    if(securityEmployee){
        $('#attendance input').css('margin-bottom','20px');
        $('#wrong').css('display','none');
        $('#username').css('border','none');

        let empsData=JSON.parse(localStorage.getItem('allEmployeesData'));
        //console.log(empsData)
        if(empsData==null)
            empsData=[];
        let monthReport=[];
        if(date.getUTCDate()== 1)
        {
            let monthReport=[];
            for(let i=0;i<31;i++)
            {
                monthReport.push(new EmpData());
            }
            for(e in employees){
                let em=new MonthReportForEmployee(employees[e].Username,monthReport)
                empsData.push(em);    
            }
            console.log(empsData)
            let x=0;
            if(date.getMonth())
                x=11;
            else 
                x=date.getMonth()-1;
            let newmonth=new AllMonths(x,empsData);
            let months=JSON.parse(localStorage.getItem('allEmployeesDataForMonth'));
            if(months==null)
                months=[];
            months.push(newmonth);
            localStorage.setItem('allEmployeesDataForMonth',JSON.stringify(months));
            localStorage.setItem('allEmployeesData',JSON.stringify(empsData));
        }
        
        for(i in empsData){
            console.log(empsData[i].Username)
            if(empsData[i].Username==username){
                let e =checkTimeOfAttendance();
                empsData[i].MonthReport[date.getUTCDate()-1]=e;
            }
            localStorage.setItem('allEmployeesData',empsData);
        }
        

    }
    else{
        console.log('ssss');
        $('#attendance input').css('margin-bottom','1px')
        $('#username').css('border','1px solid red');
        $('#wrong').css({
            'display':'inline-block',
            'text-align':'left',
            'color':'red',
            'padding':'0px',
            'margin':'1px',
            'font-size':'0.7rem',
            'position':'relative',
            'left':'130px'
        })
    }
});

function getEmployee(username){
    let employees=JSON.parse(localStorage.getItem('employees'));
    for(e in employees){
        if(username==employees[e].Username)
            return employees[e];
    }
}
function EmpData(){
    this.Attend=false;
    this.Late=false;
    this.Excuse=false;
    this.Departure=false;
    this.Absence=false;
}
function checkTimeOfAttendance(){
    date=new Date(Date.now());
    let empData=new EmpData();
    if(date.getHours()==8&&date.getMinutes()<=30){
            empData.Attend=true;
    }
    else{
        if(empData.Attend){
            empData.Excuse=true;
            empData.departure=true;
            alert('you departured this emp with excuse');
        }
        else
            empData.Late=true;
    }
    return empData;

}
function MonthReportForEmployee(username,monthReport){
    this.Username=username;
    this.MonthReport=monthReport;
}
function AllMonths(month,data){
    this.Month=month;
    this.Data=data;
}

function departureForAllEmployees(day){
    let empsData=JSON.parse(localStorage.getItem('allEmployeesData'));
    for(i in empsData){
        let empData=new EmpData(); 
        if(empsData[i].MonthReport[day].Attend)
            empsData[i].MonthReport[day].Departure=true;
        else
            empsData[i].MonthReport[day].Absence=true;
        console.log(empsData[i].MonthReport[day].Departure)
    }
}