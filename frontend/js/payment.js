var subTotal = 0;
var gh = sessionStorage.getItem("giohang");
var getGioHang = JSON.parse(gh);

    const convert = (getGioHang) => {
      const res = {};
      getGioHang.forEach((obj) => {
         const key = `${obj.id}`;
         if (!res[key]) {
            res[key] = { ...obj, count: 0 };
         };
         res[key].count += 1;
      });
    return Object.values(res);
    };
    console.log(convert(getGioHang));
    $(".show-order").append(` <div class="row">
    <div class="col-6"><h6><b>Tên</b></h6></div>
    <div class="col-4"><h6><b>Số lượng</b></h6></div>
    <div class="col-2"><h6><b>Giá</b></h6></div>
  </div>`)
    for(var i = 0; i < convert(getGioHang).length; i ++) {
        subTotal += convert(getGioHang)[i].buyPrice*convert(getGioHang)[i].count;
        $(".show-order").append(`
        <div class="row">
              <div class="col-6"><p>${convert(getGioHang)[i].productName}</p></div>
              <div class="col-4"><p>${convert(getGioHang)[i].count}</p></div>
              <div class="col-2"><p>${convert(getGioHang)[i].buyPrice*convert(getGioHang)[i].count}</p></div>
            </div>`)
    }
    $(".show-order").append(`
    <hr>
            <div class="row">
              <div class="col-6"><p>Tổng tiền:</p></div>
              <div class="col-6"><b>${subTotal} Vnd</b></div>
            </div>`)

