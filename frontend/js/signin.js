 //Kiểm tra token nếu có token tức người dùng đã đăng nhập
 const token = getCookie("token");

//--------------------------Sự kiện bấm các nút----------------------------------------//

// nút Sign in
$(".signinbtn").on("click", function(e) {
    e.preventDefault(e);
    onBtnSignIn();
})

 //---------------------------Hàm xử lý sự kiện---------------------------------------//
 function onBtnSignIn() {
    var userInfo = {
        username: "",
        password: "",
    }
    getUserInfoSignIn(userInfo);
    var isValid = validateSignInForm(userInfo);
    if(isValid) {
        handleFormSignIn(userInfo);
    }
 }  

  //---------------------------Hàm dùng chung---------------------------------------//
  function getUserInfoSignIn(userInfo) {
    var usernameValue = $("#input-username-sign-in").val();
    var passwordValue = $("#input-password-sign-in").val();

    userInfo.username = usernameValue;
    userInfo.password = passwordValue;
 }

 // hàm validate form sign up
 function validateSignInForm(userInfo) {
    if(userInfo.username == "") {
        toastr.options.preventDuplicates = true;
        toastr.error("Bạn cần nhập username !");
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
    return true;
 }

 function handleFormSignIn(userInfo) {
    var vSigninUrl = "http://localhost:8080/fastfood/api/noauth/signin";
    $.ajax({
        url: vSigninUrl,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(userInfo),   
        success: function(responseObject) {
            responseHandler(responseObject);
        },
        error: function(xhr) {
            toastr.options.preventDuplicates = true;
            toastr.error("username hoặc mật khẩu không đúng");
        }
    });
 }

 //Xử lý object trả về khi login thành công
 function responseHandler(data) {
    console.log(data);
    //Lưu token vào cookie trong 1 ngày
    setCookie("token", data.accessToken, 1);
    toastr.success("Đăng nhập thành công !");
    setTimeout(function() {window.location.href = "index.html"}, 3000)
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

//Hàm setCookie đã giới thiệu ở bài trước
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}