(function () {
    var homeView = {
        init: function () {
            this.isMore=false;
            var data = {isMore: false};
            var self=this
            self.shopNum=0;
            this.bindEvent();
            this.queryHome(data);
            //this.render();
        },
        bindEvent: function () {
            //绑定查看更多事件
            var self = this;
            $("#btn-more").on("click", function () {
                $(this).hide()
                self.isMore = true;
                var data = {isMore: true};
                common.ajaxCommon01("shopListQuery", data, function (res) {
                    self.render(res);
                })
            })

            //点击图片展示详情事件

            $("#product_list").on("click", "img", function () {
                var id = $(this).data('id');
                var shopName = $(this).data('shopName');
                var obj = {
                    id: id,
                    shopName: shopName
                };
                location.href = 'detail.html?' + $.param(obj);
            });

            /* //点击加入购物车事件  此方法有问题
             $("#product_list").on("click",".product_car",function(){
             var self=this;
             setTimeout(function(){$("#hasAdd").css("display","none")},300);
             var i=$(".car_trolley").text();
             i++;
             $(".car_trolley").text(i);
             $(".dsn").css("display","block");
             var id=$(this).closest("li").find("img").data("id");
             var data={
             id:id,
             prdNum:1
             };
             common.ajaxCommon01("addToShopCar",data,function(res){

             })
             });*/

            //点击添加购物车
            $("#product_list").on("click", ".product_car", function () {
                var id = $(this).closest("li").find("img").data("id");
                var data = {
                    id: id,
                    prdNum: 1
                };
                self.addCar(data);

            });

            //点击购物车跳转详情页
            $("#pop_car").on("click", "a", function () {
                location.href = "showShop.html"
            });
        },


        //点击添加购物车
        addCar:function(data){
            var self=this;
            $("#hasAdd").removeClass('dsn');
            common.ajaxCommon01("addToShopCar",data,function(res){
                $('.car_trolley').text(++self.shopNum);
                setTimeout(function(){
                    $("#hasAdd").addClass('dsn');
                },700);
                $('#pop_car .car_trolley').removeClass('dsn');//不加上此代码,页面的购物车上显示的数据只有重新刷新页面才能显示,初始时不显示
            })

        },

        render: function (res) {
            var item;
            var html = "";
            var list = res.list;

            if(!this.isMore){
                var showlist=list[0];
                var list=list.slice(1);
                $("#recommend>a").text(showlist.shopName);
                $("#price").text(showlist.price);
                $("#oldPrice").text(showlist.oldPrice);
                $("#recommend>img").attr("src",showlist.imgUrl);

              /* var html= _.template($("#tpl").html())(list);//注意template 的用法 _.template()(list)下面被注释掉的为常规写法*/
                for (var i = 0; i < list.length; i++) {
                    item = list[i];
                    html += '<li><div class="product_box"><a>' +
                        '<img data-id="' + item.id + '" data-shopName="' + item.shopName + '" src="' + item.imgUrl + '"></a>' +
                        '<h2><a>' + item.shopName + '</a></h2>' +
                        '<div class="clearfix"><div class="product_price fl">' +
                        '￥<span class="product_mpney">' + item.price + '</span></div>' +
                        '<div class="product_car fr"></div></div></div></li>'
                }
                $("#product_list").html(html);
                //this.bindEvent(); //渲染出的页面要做绑定事件
            }else{
                for (var i = 0; i < list.length; i++) {
                    item = list[i];
                    html += '<li><div class="product_box"><a>' +
                        '<img data-id="' + item.id + '" data-shopName="' + item.shopName + '" src="' + item.imgUrl + '"></a>' +
                        '<h2><a>' + item.shopName + '</a></h2>' +
                        '<div class="clearfix"><div class="product_price fl">' +
                        '￥<span class="product_mpney">' + item.price + '</span></div>' +
                        '<div class="product_car fr"></div></div></div></li>'
                }
                $("#product_list").append(html);
                //this.bindEvent(); //渲染出的页面要做绑定事件
            }

        },


        queryHome: function (data) {
            var self = this;
            common.ajaxCommon01("shopListQuery", data, function (res) {
                self.render(res);

                //显示购物车上大于0的数字
                if(res.shopNum>0){
                    self.shopNum=res.shopNum;
                    $('.car_trolley').show().text(res.shopNum);
                }
            })
        }
    };
    homeView.init()
})();



/*(function(){
    var homeView = {
            init: function () {
                this.isMore=false;
                var data = {isMore: false};
                this.bindEvent();
                this.queryHome(data);
            },
            bindEvent: function () {
                var self = this;
                $("#btn-more").on("click", function () {
                    $(this).hide()
                    self.isMore=true;
                    var data = {isMore: true};
                    common.ajaxCommon01("shopListQuery", data, function (res) {
                        self.render(res);
                    })
                })
        },
        render:function(data){
            var item;
            var html="";
            var list=data.list;
            if(!this.isMore){
                var showList=list[0];
                var list=list.slice(1)
                for(var i=0;i<list.length;i++){
                    $("#recommend>a").text(showList.shopName);
                    $("#recommend>img").text(showList.imgUrl);
                    $("#price").text(showList.price);
                    $("#oldPrice").text(showList.oldPrice);


                    item=list[i];
                    html += '<li><div class="product_box"><a>' +
                        '<img data-id="' + item.id + '" data-shopName="' + item.shopName + '" src="' + item.imgUrl + '"></a>' +
                        '<h2><a>' + item.shopName + '</a></h2>' +
                        '<div class="clearfix"><div class="product_price fl">' +
                        '￥<span class="product_mpney">' + item.price + '</span></div>' +
                        '<div class="product_car fr"></div></div></div></li>'
                }
                $("#product_list").html(html)
            }else{
                for(var i=0;i<list.length;i++){
                item=list[i];
                html += '<li><div class="product_box"><a>' +
                    '<img data-id="' + item.id + '" data-shopName="' + item.shopName + '" src="' + item.imgUrl + '"></a>' +
                    '<h2><a>' + item.shopName + '</a></h2>' +
                    '<div class="clearfix"><div class="product_price fl">' +
                    '￥<span class="product_mpney">' + item.price + '</span></div>' +
                    '<div class="product_car fr"></div></div></div></li>'
            }

            }

            $("#product_list").append(html)
        },
        queryHome:function(data){
            var self=this;
            common.ajaxCommon01("shopListQuery",data,function(res){
                self.render(res);
            })
        }
    };
    homeView.init();
})()*/


/*
(function(){
    var homeView={
        init:function(){
            this.isMore=false;
            var data={isMore:false};
             this.queryHome(data);
             this.bindEvent();
        },
        bindEvent:function(){
            var self=this;
              $("#btn-more").on("click",function(){
                  this.hide();
                  self.isMore=true;
                  var data={isMore:true};
                  common.ajaxCommon01("shopListQuery",data,function(res){
                      self.render(res);
                  })
              })
        },
        render:function(data){
           var item;
            var html="";
            var list=data.list;
            if(!this.isMore){
                var showlist=list[0];
                var list=list.slice(1);
                $("#recommend>a").text(showlist.shopName);
                $("#price").text(showlist.price);
                $("#oldPrice").text(showlist.oldPrice);
                $("#recommend>img").attr("src",showlist.imgUrl);

                for(var i= 0;i<list.length;i++){
                    item=list[i];
                    html += '<li><div class="product_box"><a>' +
                        '<img data-id="' + item.id + '" data-shopName="' + item.shopName + '" src="' + item.imgUrl + '"></a>' +
                        '<h2><a>' + item.shopName + '</a></h2>' +
                        '<div class="clearfix"><div class="product_price fl">' +
                        '￥<span class="product_mpney">' + item.price + '</span></div>' +
                        '<div class="product_car fr"></div></div></div></li>'
                }
                $("#product_list").html(html)
            }else{
                for(var i= 0;i<list.length;i++){
                    item=list[i];
                    html += '<li><div class="product_box"><a>' +
                        '<img data-id="' + item.id + '" data-shopName="' + item.shopName + '" src="' + item.imgUrl + '"></a>' +
                        '<h2><a>' + item.shopName + '</a></h2>' +
                        '<div class="clearfix"><div class="product_price fl">' +
                        '￥<span class="product_mpney">' + item.price + '</span></div>' +
                        '<div class="product_car fr"></div></div></div></li>'
                }
                $("#product_list").append(html)
            }

        },
        queryHome:function(data){
            var self=this;
            common.ajaxCommon01("shopListQuery",data,function(res){
                   self.render(res)
            })
        }
    }
    homeView.init()
})()*/
