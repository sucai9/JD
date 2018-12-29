$('form').submit(function (e) {
    e.preventDefault();
    if ($('#pwd').val() != $('#pwd2').val()) {
        alert('两次输入的密码不正确！');
        return;
    }
    $.post("/register",$(this).serialize(),function(data){
        alert(data.info);
        if(!data.code){
            location.href = "login.html";
        }
    });
})