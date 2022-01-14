// JavaScript source code
function Person(firstname, secondname, username, email, logincode, age) {
    this.Fname = firstname;
    this.Sname = secondname;
    this.Username = username;
    this.Email = email;
    this.Logincode = logincode;
    this.Age = age;
    this.Activated = false;
    this.EmpType = 'n';//n:normal, s:security, a:admin
};

$('#signupbtn').click(function () {
    let fname = $('#fisrtname').val();
    let sname = $('#secondname').val();
    let email = $('#email').val();
    let bday = new Date($('#bday').val());
    let age = Date.now() - bday.getTime();
    age = new Date(age);
    age = age.getUTCFullYear();
    age = Math.abs(age - 1970);
    let emp = JSON.parse(localStorage.getItem('employees'));
    
    if (emp == null)
        emp = [];
    if (isuseremailvalid(email, emp) && !isEmpty(fname) && !isEmpty(sname)) {
        username = '';
        let x = 1;
        let isExist = true;
        do {

            username = getUsername(fname, sname);
            emp.forEach(function (e) {
                console.log(e)
                if (e.Username == username) {
                    isExist = true;
                    x = 0;
                }
            });
            if (x == 1)
                isExist = false;

        } while (isExist);
        let logincode = '';
        do {
            logincode = getUsername("abcdefghijklmnopqrstuvwxyz", "0123456789!%$#+*@");
        } while (logincode.length < 6 || logincode.length > 10)
        
        let newEmp = new Person(fname, sname, username, email, logincode, age);
        
        let pending = localStorage.getItem('pendingAccount');
        
        console.log(pending)
        if (pending == '' || pending == null) {
            pending = [];
            console.log('ddddddddddddddddd')
        }

        else {
            
            pending = JSON.parse(pending);
        }
            
        pending.push(newEmp);
        localStorage.setItem('pendingAccount', JSON.stringify(pending));
        
        location.href = "pendingAccount.html";
    }
    if (!isuseremailvalid(email,emp)) {
        $('#emailerror').css({
            'display': 'block',
            'color': 'red',
            'font-size': '10px',
            'text-align': 'right'
        });
        $('#email').css('border', '1px solid red');
        $('.container').css('height', '420px');
    }
    else {
        $('#emailerror').css('display', 'none');
        $('.container').css('height', '400px');
    }
    if (isEmpty(fname)) {
        $('#fisrtname').css('border', '1px solid red');
    }
    else {
        $('#fisrtname').css('border', 'none');
    }
    if (isEmpty(sname)) {
        $('#secondname').css('border', '1px solid red');
    }
    else {
        $('#secondname').css('border', 'none');
    }
});

function getUsername(fname, sname) {
    let username = '';
    do {
        let n1 = Math.floor(Math.random() * fname.length) + 0;
        let n2 = Math.floor(Math.random() * fname.length) + 0;
        
        if (n1 < n2)
            username = fname.slice(n1, n2);
        else
            username = fname.slice(n2, n1);
        n1 = Math.floor(Math.random() * sname.length) + 0;
        n2 = Math.floor(Math.random() * sname.length) + 0;
        
        if (n1 < n2)
            username += sname.slice(n1, n2);
        else
            username += sname.slice(n2, n1);
    } while (username.length < 5);
    return username;
}

function isuseremailvalid(email, emps) {
    emps.forEach(function (e) {
        if (e.Email == email)
            return false;
    });
    return email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
}
function isEmpty(str) {
    return str == '';
}