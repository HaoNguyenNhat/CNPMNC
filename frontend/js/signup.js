//--------------------------Sự kiện bấm các nút----------------------------------------//

// nút Sign up
$(".signupbtn").on("click", function(e) {
    e.preventDefault();
    onBtnSignUp();
})

 //---------------------------Hàm xử lý sự kiện---------------------------------------//
 function onBtnSignUp() {
    var userInfo = {
        username: "",
        email: "",
        password: "",
        rePassword: ""
    }
    getUserInfoSignUp(userInfo);
    var isValid = validateSignUpForm(userInfo);
    if(isValid) {
        handleFormSignUp(userInfo);
    }
 }  

 //---------------------------Hàm dùng chung---------------------------------------//
 function getUserInfoSignUp(userInfo) {
    var usernameValue = $("#input-username-sign-up").val();
    var emailValue = $("#input-email-sign-up").val();
    var password = $("#input-password-sign-up").val();
    var rePassword = $("#input-rePassword-sign-up").val();

    userInfo.username = usernameValue;
    userInfo.email = emailValue;
    userInfo.password = password;
    userInfo.rePassword = rePassword;
 }

 // hàm validate form sign up
 function validateSignUpForm(userInfo) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(userInfo.username == "") {
        toastr.options.preventDuplicates = true;
        toastr.error("Bạn cần nhập username !");
        return false
    }
    if(userInfo.email =="") {
        toastr.options.preventDuplicates = true;
        toastr.error("Bạn cần nhập email !");
        return false
    }
    if(!regex.test(userInfo.email)) {
        toastr.options.preventDuplicates = true;
        toastr.error("Email không hợp lệ !");
        return false
    }
    if(userInfo.password =="") {
        toastr.options.preventDuplicates = true;
        toastr.error("Bạn cần nhập mật khẩu");
        return false;
    }
    if(userInfo.password.length < 8) {
        toastr.options.preventDuplicates = true;
        toastr.error("Mật khẩu phải nhiều hơn 8 ký tự");
        return false;
    }
    if(userInfo.rePassword =="") {
        toastr.options.preventDuplicates = true;
        toastr.error("Xác nhận mật khẩu không đúng !");
        return false;
    }
    if(userInfo.password !== userInfo.rePassword) {
        toastr.options.preventDuplicates = true;
        toastr.error("Xác nhận mật khẩu không đúng !");
        return false;
    }
    return true;
 }

 // hàm xử lý khi validate thành công
 function handleFormSignUp(userInfo) {
    var vSignupUrl = "http://localhost:8080/fastfood/api/noauth/signup";
    $.ajax({
        type: "POST",
        url: vSignupUrl,
        data: JSON.stringify(userInfo),
        contentType: "application/json",
        success: function(res) {
            toastr.options.preventDuplicates = true;
            toastr.success("Đăng ký thành công !");
            setTimeout(function() {window.location.href = "signin.html"}, 3000)
        },
        error: function(xhr) {
            if(xhr.responseJSON.message == "Error: Username is already taken!") {
                toastr.error("Username đã tồn tại");
            }
            if(xhr.responseJSON.message == "Error: Email is already in use!") {
                toastr.error("Email này đã được sử dụng");
            }
        }
    })

 }

 //Hàm setCookie đã giới thiệu ở bài trước
 function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Hàm get Cookie đã giới thiệu ở bài trước
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

