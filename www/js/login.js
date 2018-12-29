$('.loginsel > span').eq(0).click(function () {
    $('.userlogin').css('display', 'none');
    $('.qrcodelogin').css('display', 'block');
    $(this).addClass('active').siblings().removeClass('active');
    $('.qrcodebox').hover(function () {
        setTimeout(function () {
            $('.qrtips').css('display', 'block')
        }, 200)
    }, function () {
        $('.qrtips').css('display', 'none')
    })
})

$('.loginsel > span').eq(1).click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.userlogin').css('display', 'block');
    $('.qrcodelogin').css('display', 'none');
})


$("form").submit(function (e) {
    // 阻止默认事件
    e.preventDefault();
    $.post("/login", $(this).serialize(), function (data) {
        alert(data.info)
        // $("#myModal").modal("show")执行让模态框显示
        // hide.bs.modal监听模态框关闭事件
        if (!data.code) {
            // 跳转到首页
            location.href = "/";
        }
    });
});