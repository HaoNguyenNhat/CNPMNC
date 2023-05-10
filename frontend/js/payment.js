

function getSession() {
    var gh = sessionStorage.getItem("giohang");
    var getGioHang = JSON.parse(gh);
    console.log(getGioHang);

}

getSession();