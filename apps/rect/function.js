var lrg_x, lrg_y, sml_x, sml_y;
var i, j, lev, n = 1000, temp;
var cnt_str = 0, cnt_ver = 0;	
var mul, wid_can, hei_can;
var panel = new Array();
var visit = new Array();
var coord = new Array();
var cnt_tmp, units, units2;
var r_f,r_l,p_f,p_l;
var lang;

var color_pkg = new Array();
color_pkg[1] = "#06F";
color_pkg[2] = "#093";
color_pkg[3] = "#FC0";
color_pkg[4] = "#C3C";
color_pkg[5] = "#666";
color_pkg[6] = "#FFF";
color_pkg[7] = "#000";
color_pkg[8] = "#609";

function finish(country){
	
	if($("#wid").val() == ""){
		if(country == 1)
			$("#alert_txt").html("<b class='txt_color2'>! 패널 너비를 입력하세요.</b>");
		else if(country == 2)
			$("#alert_txt").html("<b class='txt_color2' style='font-size:12px'>! パネル幅を入力してください.</b>");
		else if(country == 3)
			$("#alert_txt").html("<b class='txt_color2'>! Input panel width.</b>");
		else if(country == 4)
			$("#alert_txt").html("<b class='txt_color2'>! 输入 面板 寬度.</b>");
		$("#alert_window_bg").fadeIn("fast",function(){$("#alert_window").fadeIn("fast");});
		return;
	}else if($("#hei").val() == ""){
		if(country == 1)
			$("#alert_txt").html("<b class='txt_color2'>! 패널 높이를 입력하세요.</b>");
		else if(country == 2)
			$("#alert_txt").html("<b class='txt_color2' style='font-size:12px'>! パネル高さを入力してください.</b>");
		else if(country == 3)
			$("#alert_txt").html("<b class='txt_color2'>! Input panel height.</b>");
		else if(country == 4)
			$("#alert_txt").html("<b class='txt_color2'>! 输入 面板 高度.</b>");
		$("#alert_window_bg").fadeIn("fast",function(){$("#alert_window").fadeIn("fast");});
		return;
	}else if($("#sml_w").val() == ""){
		if(country == 1)
			$("#alert_txt").html("<b class='txt_color2'>! 사각 너비를 입력하세요.</b>");
		else if(country == 2)
			$("#alert_txt").html("<b class='txt_color2' style='font-size:12px'>! 四角幅を入力してください.</b>");
		else if(country == 3)
			$("#alert_txt").html("<b class='txt_color2'>! Input rect width.</b>");
		else if(country == 4)
			$("#alert_txt").html("<b class='txt_color2'>! 输入 四角 寬度.</b>")
		$("#alert_window_bg").fadeIn("fast",function(){$("#alert_window").fadeIn("fast");});
		return;
	}else if($("#sml_h").val() == ""){
		if(country == 1)
			$("#alert_txt").html("<b class='txt_color2'>! 사각 높이를 입력하세요.</b>");
		else if(country == 2)
			$("#alert_txt").html("<b class='txt_color2' style='font-size:12px'>! 四角高さを入力してください.</b>");
		else if(country == 3)
			$("#alert_txt").html("<b class='txt_color2'>! Input rect height.</b>");
		else if(country == 4)
			$("#alert_txt").html("<b class='txt_color2'>! 输入 面板 四角.</b>");
		$("#alert_window_bg").fadeIn("fast",function(){$("#alert_window").fadeIn("fast");});
		return;
	}
	
	lrg_x = parseInt($("#wid").val()); 
	lrg_y = parseInt($("#hei").val());		
	sml_x = parseInt($("#sml_w").val());
	sml_y = parseInt($("#sml_h").val());
	
	$("#input_page").fadeOut("fast",function(){
		$("#draw_page").fadeIn("fast");
	});
	
	lang = country;
	
	process();
	process02();
	p_f = '#c18859';
	p_l = '#000000';
	r_f = '#f3f3f3';
	r_l = '#000000';
	draw(p_f,p_l,r_f,r_l,country);
}

function val_reset(){
	$("#wid").val("");
	$("#hei").val("");
	$("#sml_w").val("");
	$("#sml_h").val("");
}

function process(){

	if(lrg_x > lrg_y){
		temp = lrg_y;
		lrg_y = lrg_x;
		lrg_x = temp;
	}
	
	mul = 300 / lrg_x;
	wid_can = lrg_x*mul;
	hei_can = lrg_y*mul;
	
	for(i=0;i<=lrg_y;i++){
		visit[i] = new Array();
		panel[i] = new Array();
		for(j=0;j<=lrg_x;j++){
			visit[i][j] = -1;
			panel[i][j] = 0;
		}
	}
	
	visit[sml_x][sml_y] = visit[sml_y][sml_x] = 0;
	panel[sml_y][sml_x] = panel[sml_x][sml_y] = 1;
	

	for(i=1;i<=lrg_y;i++){
		for(j=1;j<=lrg_x;j++){
			if(i-sml_y>=0 && j-sml_x>=0){
				if(panel[i][j] < panel[i-sml_y][sml_x]+panel[i][j-sml_x]+1){
					panel[i][j] = panel[i-sml_y][sml_x]+panel[i][j-sml_x]+1;
					visit[i][j] = 1;
				}
				if(panel[i][j] < panel[i-sml_y][j]+panel[sml_y][j-sml_x]+1){
					panel[i][j] = panel[i-sml_y][j]+panel[sml_y][j-sml_x]+1;
					visit[i][j] = 3;
				}
			}
			if(i-sml_x>=0 && j-sml_y >=0){
				if(panel[i][j] < panel[i-sml_x][sml_y]+panel[i][j-sml_y]+1){
					panel[i][j] = panel[i-sml_x][sml_y]+panel[i][j-sml_y]+1;
					visit[i][j] = 2;
				}
				if(panel[i][j] < panel[i-sml_x][j]+panel[sml_x][j-sml_y]+1){
					panel[i][j] = panel[i-sml_x][j]+panel[sml_x][j-sml_y]+1;
					visit[i][j] = 4;
				}
			}
		}
	}
	
	lev = panel[lrg_y][lrg_x]+1;
	
	for(i=0;i<=panel[lrg_y][lrg_x];i++){
		coord[i] = new Array();
		for(j=0;j<4;j++){
			coord[i][j] = 0;
		}
	}
}












function reprocess(){

	
	for(i=0;i<=lrg_y;i++){
		visit[i] = new Array();
		panel[i] = new Array();
		for(j=0;j<=lrg_x;j++){
			visit[i][j] = -1;
			panel[i][j] = 0;
		}
	}
	
	visit[sml_x][sml_y] = visit[sml_y][sml_x] = 0;
	panel[sml_y][sml_x] = panel[sml_x][sml_y] = 1;

	var RD = Math.floor(Math.random() * 99) + 1;
	

	if(RD % 4 == 0){
		for(i=1;i<=lrg_y;i++){
			for(j=1;j<=lrg_x;j++){
				if(i-sml_x>=0 && j-sml_y >=0){
					if(panel[i][j] < panel[i-sml_x][sml_y]+panel[i][j-sml_y]+1){
						panel[i][j] = panel[i-sml_x][sml_y]+panel[i][j-sml_y]+1;
						visit[i][j] = 2;
					}
					if(panel[i][j] < panel[i-sml_x][j]+panel[sml_x][j-sml_y]+1){
						panel[i][j] = panel[i-sml_x][j]+panel[sml_x][j-sml_y]+1;
						visit[i][j] = 4;
					}
				}
				if(i-sml_y>=0 && j-sml_x>=0){
					if(panel[i][j] < panel[i-sml_y][sml_x]+panel[i][j-sml_x]+1){
						panel[i][j] = panel[i-sml_y][sml_x]+panel[i][j-sml_x]+1;
						visit[i][j] = 1;
					}
					if(panel[i][j] < panel[i-sml_y][j]+panel[sml_y][j-sml_x]+1){
						panel[i][j] = panel[i-sml_y][j]+panel[sml_y][j-sml_x]+1;
						visit[i][j] = 3;
					}
				}
			}
		}
	}else if(RD % 4 == 1){
		for(i=1;i<=lrg_y;i++){
			for(j=1;j<=lrg_x;j++){
				if(i-sml_x>=0 && j-sml_y >=0){
					if(panel[i][j] < panel[i-sml_x][j]+panel[sml_x][j-sml_y]+1){
						panel[i][j] = panel[i-sml_x][j]+panel[sml_x][j-sml_y]+1;
						visit[i][j] = 4;
					}
					if(panel[i][j] < panel[i-sml_x][sml_y]+panel[i][j-sml_y]+1){
						panel[i][j] = panel[i-sml_x][sml_y]+panel[i][j-sml_y]+1;
						visit[i][j] = 2;
					}					
				}
				if(i-sml_y>=0 && j-sml_x>=0){
					if(panel[i][j] < panel[i-sml_y][j]+panel[sml_y][j-sml_x]+1){
						panel[i][j] = panel[i-sml_y][j]+panel[sml_y][j-sml_x]+1;
						visit[i][j] = 3;
					}
					if(panel[i][j] < panel[i-sml_y][sml_x]+panel[i][j-sml_x]+1){
						panel[i][j] = panel[i-sml_y][sml_x]+panel[i][j-sml_x]+1;
						visit[i][j] = 1;
					}
				}
			}
		}
	}else if(RD % 4 == 2){
		for(i=1;i<=lrg_y;i++){
			for(j=1;j<=lrg_x;j++){
				if(i-sml_y>=0 && j-sml_x>=0){
					if(panel[i][j] < panel[i-sml_y][j]+panel[sml_y][j-sml_x]+1){
						panel[i][j] = panel[i-sml_y][j]+panel[sml_y][j-sml_x]+1;
						visit[i][j] = 3;
					}
					if(panel[i][j] < panel[i-sml_y][sml_x]+panel[i][j-sml_x]+1){
						panel[i][j] = panel[i-sml_y][sml_x]+panel[i][j-sml_x]+1;
						visit[i][j] = 1;
					}
				}
				if(i-sml_x>=0 && j-sml_y >=0){
					if(panel[i][j] < panel[i-sml_x][j]+panel[sml_x][j-sml_y]+1){
						panel[i][j] = panel[i-sml_x][j]+panel[sml_x][j-sml_y]+1;
						visit[i][j] = 4;
					}
					if(panel[i][j] < panel[i-sml_x][sml_y]+panel[i][j-sml_y]+1){
						panel[i][j] = panel[i-sml_x][sml_y]+panel[i][j-sml_y]+1;
						visit[i][j] = 2;
					}					
				}
			}
		}
	}else if(RD % 4 == 3){
		for(i=1;i<=lrg_y;i++){
			for(j=1;j<=lrg_x;j++){
				if(i-sml_y>=0 && j-sml_x>=0){
					if(panel[i][j] < panel[i-sml_y][sml_x]+panel[i][j-sml_x]+1){
						panel[i][j] = panel[i-sml_y][sml_x]+panel[i][j-sml_x]+1;
						visit[i][j] = 1;
					}
					if(panel[i][j] < panel[i-sml_y][j]+panel[sml_y][j-sml_x]+1){
						panel[i][j] = panel[i-sml_y][j]+panel[sml_y][j-sml_x]+1;
						visit[i][j] = 3;
					}
				}
				if(i-sml_x>=0 && j-sml_y >=0){
					if(panel[i][j] < panel[i-sml_x][sml_y]+panel[i][j-sml_y]+1){
						panel[i][j] = panel[i-sml_x][sml_y]+panel[i][j-sml_y]+1;
						visit[i][j] = 2;
					}
					if(panel[i][j] < panel[i-sml_x][j]+panel[sml_x][j-sml_y]+1){
						panel[i][j] = panel[i-sml_x][j]+panel[sml_x][j-sml_y]+1;
						visit[i][j] = 4;
					}
				}
			}
		}
	}
	
	lev = panel[lrg_y][lrg_x]+1;
	
	for(i=0;i<=panel[lrg_y][lrg_x];i++){
		coord[i] = new Array();
		for(j=0;j<4;j++){
			coord[i][j] = 0;
		}
	}
}







function search_coord(x,y,i,j){
	if(lev < 1 || visit[i][j] < 0){
		return;
	}
	
	lev--;
	coord[lev][0] = x;
	coord[lev][1] = y;
	if(visit[i][j] == 1 || visit[i][j] == 3||i == sml_y){
		cnt_ver++;
		coord[lev][2] = sml_x;
		coord[lev][3] = sml_y;
	}else{
		cnt_str++;
		coord[lev][2] = sml_y;
		coord[lev][3] = sml_x;
	}
	
	if(visit[i][j] == 1){		
		search_coord(x,y+sml_y,i-sml_y,sml_x);
		search_coord(x+sml_x,y,i,j-sml_x);
	}else if(visit[i][j] == 2){
		search_coord(x,y+sml_x,i-sml_x,sml_y);
		search_coord(x+sml_y,y,i,j-sml_y);
	}else if(visit[i][j] == 3){
		search_coord(x,y+sml_y,i-sml_y,j);
		search_coord(x+sml_x,y,sml_y,j-sml_x);
	}else if(visit[i][j] == 4){
		search_coord(x,y+sml_x,i-sml_x,j);
		search_coord(x+sml_y,y,sml_x,j-sml_y);
	}
}

function process02(){
	search_coord(0,0,lrg_y,lrg_x);
	
	if(sml_x > sml_y){
		cnt_tmp = cnt_str;
		cnt_str = cnt_ver;
		cnt_ver = cnt_tmp;
	}
}

function refinish(country){
	$("#result").html("");
	cnt_str = 0;
	cnt_ver = 0;	
	reprocess();
	process02();
	p_f = '#c18859';
	p_l = '#000000';
	r_f = '#f3f3f3';
	r_l = '#000000';
	draw(p_f,p_l,r_f,r_l,country);
}

function draw(rect_fill,rect_line,panel_fill,panel_line,country){
	
	if(country == 1){/* 한국 */
		var tb_cts = "<br>";
			tb_cts += "<table>";
			tb_cts +=    "<tr>";
			tb_cts +=      "<td width='155px'>";
			tb_cts +=       "<b class='txt_color2'>패널 높이 :</b> ";
			tb_cts +=   	"<a class='txt_color'>"+lrg_y+" </a>";
			tb_cts +=		"<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=      "</td>";
			tb_cts +=	   "<td width='155px'>";
			tb_cts +=	     "<b class='txt_color2'>패널 너비 :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+lrg_x+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	   "</td>";
			tb_cts +=	 "<tr>";
			tb_cts +=	  " <td>";
			tb_cts +=	     "<b class='txt_color2'>사각 높이 :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+sml_y+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	  " </td>";
			tb_cts +=	   "<td>";
			tb_cts +=	     "<b class='txt_color2'>사각 너비 :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+sml_x+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	   "</td>";
			tb_cts +=	 "</tr>";
			tb_cts +=  "</table>";
		
		$("#result").append(tb_cts);
		
		if(sml_x != sml_y){
			tb_cts  = "<table>";
			tb_cts +=    "<tr>";
			tb_cts +=      "<td width='155px'>";
			tb_cts +=       "<b class='txt_color2'>가로 개수 :</b> ";
			tb_cts +=   	"<a class='txt_color'>" + cnt_str+ "</a> 개";
			tb_cts +=      "</td>";
			tb_cts +=	   "<td width='155px'>";
			tb_cts +=	     "<b class='txt_color2'>세로 개수 :</b> ";
			tb_cts +=		 "<a class='txt_color'>" + cnt_ver+"</a> 개";
			tb_cts +=	   "</td>";
			tb_cts +=	 "<tr>";
			tb_cts +=  "</table>";
			$("#result").append(tb_cts);
		}
		$("#result").append("<br><b class='txt_color2'>모든 개수 :</b> <a class='txt_color'>" + panel[lrg_y][lrg_x]+"</a> 개");
		$("#result").append("<br><br>");
	}else if(country == 2){/* 일본 */
		var tb_cts = "<br>";
			tb_cts += "<table>";
			tb_cts +=    "<tr>";
			tb_cts +=      "<td width='155px'>";
			tb_cts +=       "<b class='txt_color2'>パネル高さ :</b> ";
			tb_cts +=   	"<a class='txt_color'>"+lrg_y+" </a>";
			tb_cts +=		"<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=      "</td>";
			tb_cts +=	   "<td width='155px'>";
			tb_cts +=	     "<b class='txt_color2'>パネル幅&nbsp; :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+lrg_x+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	   "</td>";
			tb_cts +=	 "<tr>";
			tb_cts +=	  " <td>";
			tb_cts +=	     "<b class='txt_color2'>四角高さ&nbsp;&nbsp;&nbsp;&nbsp; :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+sml_y+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	  " </td>";
			tb_cts +=	   "<td>";
			tb_cts +=	     "<b class='txt_color2'>四角幅&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+sml_x+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	   "</td>";
			tb_cts +=	 "</tr>";
			tb_cts +=  "</table>";
		
		$("#result").append(tb_cts);
		
		if(sml_x != sml_y){
			tb_cts  = "<table>";
			tb_cts +=    "<tr>";
			tb_cts +=      "<td width='155px'>";
			tb_cts +=       "<b class='txt_color2'>横 個数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</b> ";
			tb_cts +=   	"<a class='txt_color'>" + cnt_str+ "</a> ea";
			tb_cts +=      "</td>";
			tb_cts +=	   "<td width='155px'>";
			tb_cts +=	     "<b class='txt_color2'>縦 個数&nbsp;&nbsp;&nbsp;&nbsp; :</b> ";
			tb_cts +=		 "<a class='txt_color'>" + cnt_ver+"</a> ea";
			tb_cts +=	   "</td>";
			tb_cts +=	 "<tr>";
			tb_cts +=  "</table>";
			$("#result").append(tb_cts);
		}
		$("#result").append("<br><b class='txt_color2'>あらゆる 個数 :</b> <a class='txt_color'>" + panel[lrg_y][lrg_x]+"</a> ea");
		$("#result").append("<br><br>");
	}else if(country == 3){/* 미국 */
		
		var tb_cts = "<br>";
			tb_cts += "<table>";
			tb_cts +=    "<tr>";
			tb_cts +=      "<td width='155px'>";
			tb_cts +=       "<b class='txt_color2'>Panel Hei&nbsp; :</b> ";
			tb_cts +=   	"<a class='txt_color'>"+lrg_y+" </a>";
			tb_cts +=		"<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=      "</td>";
			tb_cts +=	   "<td width='155px'>";
			tb_cts +=	     "<b class='txt_color2'>Panel Wid :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+lrg_x+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	   "</td>";
			tb_cts +=	 "<tr>";
			tb_cts +=	  " <td>";
			tb_cts +=	     "<b class='txt_color2'>Rect Hei&nbsp;&nbsp; :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+sml_y+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	  " </td>";
			tb_cts +=	   "<td>";
			tb_cts +=	     "<b class='txt_color2'>Rect Wid&nbsp; :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+sml_x+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	   "</td>";
			tb_cts +=	 "</tr>";
			tb_cts +=  "</table>";
		
		$("#result").append(tb_cts);
		
		if(sml_x != sml_y){
			tb_cts  = "<table>";
			tb_cts +=    "<tr>";
			tb_cts +=      "<td width='155px'>";
			tb_cts +=       "<b class='txt_color2'>hor num&nbsp;&nbsp;&nbsp; :</b> ";
			tb_cts +=   	"<a class='txt_color'>" + cnt_str+ "</a> ea";
			tb_cts +=      "</td>";
			tb_cts +=	   "<td width='155px'>";
			tb_cts +=	     "<b class='txt_color2'>ver num&nbsp;&nbsp;&nbsp; :</b> ";
			tb_cts +=		 "<a class='txt_color'>" + cnt_ver+"</a> ea";
			tb_cts +=	   "</td>";
			tb_cts +=	 "<tr>";
			tb_cts +=  "</table>";
			$("#result").append(tb_cts);
		}
	
		$("#result").append("<br><b class='txt_color2'>total num :</b> <a class='txt_color'>" + panel[lrg_y][lrg_x]+"</a> ea");
		$("#result").append("<br><br>");
	}else if(country == 4){/* 중국 */
	
		var tb_cts = "<br>";
			tb_cts += "<table>";
			tb_cts +=    "<tr>";
			tb_cts +=      "<td width='155px'>";
			tb_cts +=       "<b class='txt_color2'>板 高度&nbsp;&nbsp;&nbsp;&nbsp; :</b> ";
			tb_cts +=   	"<a class='txt_color'>"+lrg_y+" </a>";
			tb_cts +=		"<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=      "</td>";
			tb_cts +=	   "<td width='155px'>";
			tb_cts +=	     "<b class='txt_color2'>板 寬度&nbsp;&nbsp;&nbsp;&nbsp; :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+lrg_x+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	   "</td>";
			tb_cts +=	 "<tr>";
			tb_cts +=	  " <td>";
			tb_cts +=	     "<b class='txt_color2'>四角 高度 :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+sml_y+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	  " </td>";
			tb_cts +=	   "<td>";
			tb_cts +=	     "<b class='txt_color2'>四角 寬度 :</b> ";
			tb_cts +=		 "<a class='txt_color'>"+sml_x+" </a>";
			tb_cts +=		 "<a class='txt_color2'>"+units2+"</a>";
			tb_cts +=	   "</td>";
			tb_cts +=	 "</tr>";
			tb_cts +=  "</table>";
		
		$("#result").append(tb_cts);
		
		if(sml_x != sml_y){
			tb_cts  = "<table>";
			tb_cts +=    "<tr>";
			tb_cts +=      "<td width='155px'>";
			tb_cts +=       "<b class='txt_color2'>水平 个數 :</b> ";
			tb_cts +=   	"<a class='txt_color'>" + cnt_str+ "</a> 个";
			tb_cts +=      "</td>";
			tb_cts +=	   "<td width='155px'>";
			tb_cts +=	     "<b class='txt_color2'>垂直 个數 :</b> ";
			tb_cts +=		 "<a class='txt_color'>" + cnt_ver+"</a> 个";
			tb_cts +=	   "</td>";
			tb_cts +=	 "<tr>";
			tb_cts +=  "</table>";
			$("#result").append(tb_cts);
		}
		
		$("#result").append("<br><b class='txt_color2'>总 个數 :</b> <a class='txt_color'>" + panel[lrg_y][lrg_x]+"</a> 个");
		$("#result").append("<br><br>");
	}
	
	
	var x = wid_can + 10;
	var y = hei_can + 10;
	
	$("#result").append("<canvas id=myCanvas width="+x+" height="+y+"></canvas>");
	var c=document.getElementById("myCanvas");
	var context=c.getContext("2d");
	
	context.fillStyle   = panel_fill;
	context.strokeStyle = panel_line;
	context.lineWidth   = 1;
	
	context.fillRect  (0,0,wid_can,hei_can);
	context.strokeRect(0,0,wid_can,hei_can);
	
	for(i=1;i<=panel[lrg_y][lrg_x];i++){
		context.fillStyle   = rect_fill;
		context.strokeStyle = rect_line;
		context.lineWidth   = 1;
		context.fillRect  (coord[i][0]*mul,coord[i][1]*mul,coord[i][2]*mul,coord[i][3]*mul);
		context.strokeRect(coord[i][0]*mul,coord[i][1]*mul,coord[i][2]*mul,coord[i][3]*mul);
	}
}

function radio_btn(value){
	var i;
	for(i=1;i<=4;i++)
		radio_arr[i] = 0;
	radio_arr[value] = 1;
	units = radio_val[value-1];
	units2 = radio_val2[value-1];
	for(i = 1;i<=4;i++)
		$("#radio_"+i).html("<img src='images/radio_"+radio_arr[i]+".png' />");
}

function input_reset(){
	radio_btn(1);
	$(".input_number").val("");
}

function setting_open(){
	$("#draw_page").fadeOut("fast",function(){
		$("#setting_page").fadeIn("fast");
	});
}

function setting_back(){
	$("#setting_page").fadeOut("fast",function(){
		$("#draw_page").fadeIn("fast");
	});
}

function window_close(){
	$("#alert_window").fadeOut("fast",function(){$("#alert_window_bg").fadeOut("fast");});
}

function help_open(){
	$("#input_page").fadeOut("fast",function(){
		$("#help_page").fadeIn("fast");
	});
}

function PDF_open(){
	$("#draw_page").fadeOut("fast",function(){
		$("#PDF_page").fadeIn("fast");
	});
}

function PDF_back(){
	$("#PDF_page").fadeOut("fast",function(){
		$("#draw_page").fadeIn("fast");
	});
}

function email_send(country){
	if($("#email").val() == ""){
		if(country == 1)
			$("#alert_txt").html("<b class='txt_color2'>이 메일을 입력해주세요.</b>");
		else if(country == 2)
			$("#alert_txt").html("<b class='txt_color2'>このメールを入力してください.</b>");
		else if(country == 3)
			$("#alert_txt").html("<b class='txt_color2'>Input E-mail.</b>");
		else if(country == 4)
			$("#alert_txt").html("<b class='txt_color2'>E-mail 输入.</b>");
		$("#alert_window_bg").fadeIn("fast",function(){$("#alert_window").fadeIn("fast");});
		return;
	}
	
	var r_data = new Array();
	
	r_data[0] = "email";
	r_data[1] = $("#email").val();
	r_data[2] = "coord";
	r_data[3] = "a";
	r_data[4] = "n";
	r_data[5] = panel[lrg_y][lrg_x];
	r_data[6] = "lrg_x";
	r_data[7] = lrg_x;
	r_data[8] = "lrg_y";
	r_data[9] = lrg_y;
	r_data[10] = "units";
	r_data[11] = units;
	r_data[12] = "p_f";
	r_data[13] = p_f;
	r_data[14] = "p_l";
	r_data[15] = p_l;
	r_data[16] = "r_f";
	r_data[17] = r_f;
	r_data[18] = "r_l";
	r_data[19] = r_l;
	r_data[20] = "text";
	r_data[21] = $("#email_txt").val();
	
	

	for(i=1;i<=panel[lrg_y][lrg_x];i++){
		r_data[3] += coord[i][0]+"s"+coord[i][1]+"s"+coord[i][2]+"s"+coord[i][3]+"a";
	}
	
	
	rect_JSON("http://www.choseong.com/FPDF/test_rect.php",r_data,function(){});
	if(country == 1)
		$("#alert_txt").html("<b class='txt_color2'>이 메일이 전송되었습니다.</b>");
	else if(country == 2)
		$("#alert_txt").html("<b class='txt_color2'>このメールが送信されました.</b>");
	else if(country == 3)
		$("#alert_txt").html("<b class='txt_color2'>Complete.</b>");
	else if(country == 4)
		$("#alert_txt").html("<b class='txt_color2'>完成.</b>");
	$("#alert_window_bg").fadeIn("fast",function(){$("#alert_window").fadeIn("fast");});
	
}

function rect_JSON(urls,data,s_fn){
	urls += "?";
	for(var i=0;i<data.length;i+=2){
		urls += (data[i] + "=" + data[i+1] + "&");
	}
	urls += "format=jsonp&callback=?";
	$.ajax({
		  url: urls, 
		  dataType: "jsonp",
		  success: s_fn
	});
}

function color_setting(){
	$("#result").html("");
	draw(r_f,r_l,p_f,p_l,lang);
	
	$("#setting_page").fadeOut("fast",function(){
		$("#draw_page").fadeIn("fast");
	});
}

function select_country(){
	$("#alert_window_bg").fadeIn("fast",function(){$("#select_country").fadeIn("fast");});
}