// JavaScript source code
$('#login').click(function () {
    let email = $('#loginemail').val();
    let pass = $('#password').val();
    let employees = JSON.parse(localStorage.getItem('employees'));
    let admin = getAdminsData();
    let isExist = false;
    for (a in admin) {
        console.log()
        if (email == admin[a].Email && pass == admin[a].Logincode)
        {
            document.cookie = `email=${admin[a].Email}`;
            isExist=true;
            location.href='adminpage.html';
        }
    }
    for (e in employees) {
        if (employees[e].Email == email && employees[e].Logincode == pass && employees[e].EmpType == 'n') {
            if (employees[e].Activated) {
                document.cookie = `email=${employees[e].Email}`;
                isExist=true;
                location.href = 'employees.html';
            }
                
            else
                alert('not activated yet');
        }
            
        else if (employees[e].Email == email && employees[e].Logincode == pass && employees[e].Activated && employees[e].EmpType == 's')
        {
            document.cookie = `email=${employees[e].Email}`;
            isExist=true;
            location.href='security.html';
    }}
    if(!isExist){
        $('#invalidlogin').css({
            'display': 'block',
            'font-size': '12px',
            'color': 'red',
            'text-align': 'right'
        }).text('Email or password are not correct');
        $('#loginemail').css('border', '1px solid red');
        $('#password').css('border', '1px solid red');
    }
    

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