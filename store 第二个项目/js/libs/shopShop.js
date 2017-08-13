(function () {
    var shopView = {
        init: function () {
            var self = this;
            var data ={};
            self.binder();
            self.query(data);
        },
        binder: function () {
             $("#select_all").on("click",function () {
             $(".no_select").removeClass();


            })
        },
        render: function (res) {
            var list = res.list;
             var html = $("#tpl").html();
            $("#shopping_list").html(_.template(html)(list));
            /* var item;
             var html="";
             var list=res.list;
             for(var i=0;i<list.length;i++){
             item=list[i];
             html+='<li class="select" ms-repeat="list">' +
                 '<div ms-click="events.select" class="no_select select_ok">' +
                 '</div><div class="shopping_img"><a><img src="'+item.imgUrl+'"></a></div>' +
                 '<div class="shopping_box"><h2>'+item.shopName+'</h2>' +
                 '<div class="shopping_box_bottom">' +
                 '<div class="unit_price">￥<span>'+item.price+'</span></div>' +
                 '<div class="number">x<span>'+item.prdNum+'</span>' +
                 '</div></div></div></div></li>'
             }
              $("#shopping_list").html(html);*/
        },
        query: function (data) {
            var self = this;
            common.ajaxCommon01("shopCarList", data, function (res) {
                self.render(res)
            })
        }
    }
    shopView.init();
})()
