(function(){
    var shopView={
        init:function(){
           var self=this;
            var data={};
            this.query(data);
            this.editStaus=false;
            this.bindEvent();
        },
        //计算商品总价
        getPriceSum:function(){
            var num=0;
            var $str=$("#shopping_list").find("li");
            $str.each(function(){
                //用if语句做判断是否在选中商品的条件下再进行计算
                if($(this).find(".no_select").hasClass("select_ok")){
                    var  a=$(this).find(".number_edit").text();
                    var b=$(this).find(".unit_price span" ).text();
                    var sum=a*b;
                    num=num+sum;
                }
            })
            $("#pay_account").text(num);
        },

    bindEvent:function(){
            var self=this;
            //点击"编辑"/"完成"
            $("#car_edit").on("click",function(ev){
                if(self.editStaus==true){
                    //完成状态
                    $(this).text("编辑");
                    $(".number").show();
                    $(".number_content").hide();
                    self.editStaus=false;//点击调用了后面一种情况
                }else{
                    //编辑状态
                    $(this).text("完成");
                    $(".number").hide();
                    $(".number_content").show();
                    $("#delete_btn").removeClass();
                    self.editStaus=true;//点击调用前面一种情况
                }
            });

            //点击实现全选
            $(".select_all").on("click",function(){
                //编辑状态下才可以点击
                if(self.editStaus==true){
                    $(this).toggleClass("select_ok");
                    if($(this).hasClass("select_ok")){
                        $(".no_select").addClass("select_ok");
                    }else{
                        $(".no_select").removeClass("select_ok");
                    }
                }else{
                    alert("请点击编辑")
                }
                self.getPriceSum();//调用计算总价的函数
            })

            //反选
            $("#shopping_list").on("click",".no_select",function(){
                //编辑状态下才可以点击
                if(self.editStaus==true){
                    $(this).toggleClass("select_ok");
                    var len=$("#shopping_list .select_ok").length;
                    var size=$("li.select").length;
                    if(size!=len){
                        $(".select_all").removeClass("select_ok");
                    }else{
                        $(".select_all").addClass("select_ok");
                    }
                }else{
                    alert("请点击编辑!")
                }
                self.getPriceSum();//调用计算总价的函数
            });

            //增加
            $("#shopping_list").on("click",".js_add",function(){
                var num=Number($(this).siblings(".number_edit").text());
                var id=$(this).closest("li").attr("data-id");
                num++;
                var data={id:id,prdNum:1,icon:"add"};
                common.ajaxCommon01("addToShopCar",data,function(res){
                });
                //$("#productId_"+id).text(num);//什么意思?
                $(this).siblings(".number_edit").text(num);
                $(this).parent().prev().find("span").text(num);
                self.getPriceSum();//调用计算总价的函数
            });

            //减少
            $("#shopping_list").on("click",".js_minus",function(){
                var num=Number($(this).siblings(".number_edit").text());
                var id=$(this).closest("li").attr("data-id");
                num--;
                if(num>=0){
                    var data={id:id,prdNum:-1,icon:"min"};
                    common.ajaxCommon01("addToShopCar",data,function(res){
                    });
                    $("#productId_"+id).text(num);
                    $(this).siblings(".number_edit").text(num);
                    $(this).parent().prev().find("span").text(num);
                }else{
                    $(this).parent().parent().parent().parent().remove();
                   // alert("不能小于0")
                }
                //显示购物车空空如也
                if($(".prdNum").text()<1){
                    $("#empty_cart").show();
                }
                self.getPriceSum();//调用计算总价的函数

            });

            //点击删除
            $("#delete_btn").on("click",function(){
                var $str=$("#shopping_list").find("li");
                $str.each(function(){
                    if($(this).find(".no_select").hasClass("select_ok")){
                        $(this).remove();
                    }
                });
                self.getPriceSum()
            });

            //点击结算去结算中心
            $("#account_btn").on("click",function(){
                var selectObj={};//定义其为数组
                var list=$("#shopping_list .select_ok");
                for(var i= 0,len=list.length;i<len;i++){
                    var id=$(list[i]).closest("li").attr("data-id");
                    selectObj[id]={};
                    selectObj[id]['imgUrl']=$(list[i]).siblings('.shopping_img').find('img').attr('src');
                    selectObj[id]['shopName']=$(list[i]).siblings(".shopping_box").find('h2').text();
                    selectObj[id]["id"]=id;
                    selectObj[id]["prdNum"]=$(list[i]).siblings('.shopping_box').find('.number span').text();
                    selectObj[id]["price"]=$(list[i]).siblings('.shopping_box').find('.unit_price span').text();

                };
                //存储数据
               common.setData("orderList",selectObj);
                location.href="sureOrder.html"
            });

        },

        render:function(res){
            var sum=0;
              var list=res.list;
            var html=_.template($("#tpl").html())(list);
            $("#shopping_list").html(html);

            //商品总价在页面中的渲染
            for(var i in list){
                    var price=list[i].price*list[i].prdNum;
                    sum+=price;
                }

            $("#pay_account").html(sum);
            //删除小于等于0的选项
            $("#shopping_list li").each(function(){
                if($(this).find(".prdNum").text()==0){
                    $(this).closest("li").remove();
                }
                //显示购物车空空如也
                if($(".prdNum").text()==0){
                    $("#empty_cart").show();
                }
            })
        },
        query:function(data){
            var self=this;
            common.ajaxCommon01("shopCarList",data,function(res){
                self.render(res)
            })
        }
    }
     shopView.init();
})()
