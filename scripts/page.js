
/*pageSize:每页显示记录数
 currentPage：当前页数
 totalPage：总页数
  rankList:数据集
*/
(function($){
  var btn = {
		$prev:$('.prev'),
		$next:$('.next')
	};

	
	

	/*数据初始化*/
	var rankList = [];
	var Len = 100;
	for(var i = 0;i < Len;i++){
		var item = {
			rank:i+1,
			name:'风轻轻'+(i+1),
			times:10000-i
		};
		rankList.push(item);//将数据压入
	}

	/*数据初始化*/
	var currentPage  = 1;//当前页码
    var pageSize = 10;//每页记录显示10条
    //ranklist.length=100时，则此时的总页数=(100/10)=10;
	var totalPage = (rankList.length % pageSize == 0) ? rankList.length / pageSize : parseInt(rankList.length / pageSize) + 1;

	var Page = {
		init:function(){
			this.see();
			this.Click();
		},
		see:function(){//查看分页
          this.pager(currentPage,totalPage,pageSize,rankList);
		},
		Click:function(){
           var that = this;

	         //上一页点击
		btn.$prev.on('click',function(){
			if(currentPage == 1){//当前页就是第一页
				return;
			}
			currentPage--;
			that.pager(currentPage,totalPage,pageSize,rankList);
			 $('.tablebody tr').remove();//清除上一页table的10条记录
            that.pager(currentPage,totalPage,pageSize,rankList);//继续添加下一页的记录

		});

	    //下一页点击
		btn.$next.on('click',function(){
			if(currentPage == totalPage){//当前页是最后一页
				return;
			}
			currentPage++;
		   $('.tableBody tr:eq(0) td:nth-child(1)').removeClass('circle');//给table中的第1个tr下的第一个td移除属性circle
           $('.tablebody tr:eq(1) td:nth-child(1)').removeClass('circle');//给table中的第2个tr下的第一个td移除属性circle
           $('.tablebody tr:eq(2) td:nth-child(1)').removeClass('circle');//给table中的第3个tr下的第一个td移除属性circle
           $('.tablebody tr').remove();//清除上一页table的10条记录
	       that.pager(currentPage,totalPage,pageSize,rankList);
		});

		},

//分页处理
     pager:function(currentPage,totalPage,pageSize,rankList){
    var tempA = '';
    var start = 0;
    var end = 10;
    var len = rankList.length;

//翻页需要2个参数，第一个是currentPage(当前页)，另一个是pageSize(每页显示的条目数)
    if(currentPage < totalPage)//当前页数<总页数时
    {
       start = (currentPage - 1) * pageSize;//第一页显示的是：0-9，第二页显示的是:10-20;
       end = currentPage * pageSize;//第一页的结束记录号码是9
    }else{
    	start = (currentPage -1) * pageSize;
    	end = len - 1;
    }

    //一页显示10个记录
    for(var i = start;i <end;i++){
            tempA = '<tr><td width="5%">'+rankList[i]['rank']+'</td>'+"<td  width='40%'>"+rankList[i]['name']+"</td>"
           +"<td width='30%'>"+rankList[i]['times']+"</td></tr>";
           $('.tablebody').append(tempA);//将前5条记录放入table下的tbody中
           $('.tablebody tr:eq(0) td:nth-child(1)').addClass('circle');//给table中的第1个tr下的第一个td添加属性circle
           $('.tablebody tr:eq(1) td:nth-child(1)').addClass('circle');//给table中的第2个tr下的第一个td添加属性circle
           $('.tablebody tr:eq(2) td:nth-child(1)').addClass('circle');//给table中的第3个tr下的第一个td添加属性circle

		}
	$('#currentPage').text(''+currentPage+'');//动态改变当前页码数
   }	
}
Page.init();
})(jQuery);

