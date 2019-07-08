<?php
require('./fpdf.php');

$unit[0] = $lrg_x;
$unit[1] = $lrg_y; 

$data = explode("a",$coord);
$page_size = "pixel";

$pdf = new FPDF('P', $units, $unit);
$pdf->AddPage();

$temp = 1;

if($page_size == "A4"){
	$mul = 277 / $lrg_y;
	$wid_can = $lrg_x * $mul;
	$hei_can = $lrg_y * $mul;


	if($wid_can > 190){
		$mul *= 190 / $wid_can;
		$wid_can = $lrg_x * $mul;
		$hei_can = $lrg_y * $mul;
	}
}else if($page_size == "A3"){
	$mul = 400 / $lrg_y;
	$wid_can = $lrg_x * $mul;
	$hei_can = $lrg_y * $mul;


	if($wid_can > 277){
		$mul *= 277 / $wid_can;
		$wid_can = $lrg_x * $mul;
		$hei_can = $lrg_y * $mul;
	}
}else if($page_size == "pixel"){
	$mul = 1;
	$wid_can = $lrg_x;
	$hei_can = $lrg_y;
}



$pdf->SetLineWidth(0.2); 
$pdf->SetDrawColor((int)color_change(1,$p_l),(int)color_change(2,$p_l),(int)color_change(3,$p_l));  
$pdf->SetFillColor((int)color_change(1,$p_f),(int)color_change(2,$p_f),(int)color_change(3,$p_f));  
$pdf->Rect(0+$temp,0+$temp,$wid_can,$hei_can,'DF'); 

$pdf->SetLineWidth(0.2); 
$pdf->SetDrawColor((int)color_change(1,$r_l),(int)color_change(2,$r_l),(int)color_change(3,$r_l));  
$pdf->SetFillColor((int)color_change(1,$r_f),(int)color_change(2,$r_f),(int)color_change(3,$r_f));  

for($i=1;$i<=$n;$i++){
	$rect = explode("s",$data[$i]);
	$rect[0] = (int)$rect[0];
	$rect[1] = (int)$rect[1];
	$rect[2] = (int)$rect[2];
	$rect[3] = (int)$rect[3];
	
	
	$pdf->Rect($rect[0]*$mul+$temp,$rect[1]*$mul+$temp,$rect[2]*$mul,$rect[3]*$mul,'DF'); 
}

$time = time();

$pdf->Output("./data/".$time.".pdf");

function color_change($type,$color){
	$r = hexdec(substr($color,1,2));
	$g = hexdec(substr($color,3,2));
	$b = hexdec(substr($color,5,2));

	if($type == 1){
		return $r;
	}else if($type == 2){
		return $g;
	}else if($type == 3){
		return $b;
	}
}

?>


<?
// 폼에서 넘어오는 값들
//-- $mailTo : 수신자 이메일주소
//-- $mailFrom : 송신자 이메일주소
//-- $fromName : 송신자명 또는 정보
//-- $title : 메일제목
//-- $content : 메일내용
//-- $upfile : 첨부파일명
//*******************************

$mailTo = $email;
$mailFrom = "developer@choseong.com";
$fromName = "choseong";
$title = "Smart Rect";
$content = "$p_f $p_l $r_f $r_l";
$upfile ="./data/".$time.".pdf";
$upfile_size = filesize("./data/".$time.".pdf");

$boundary = "----" . uniqid("part"); // 구분자 생성

// --- 헤더작성 --- //
$header = "Return-Path: $mailFrom\r\n"; // 반송 이메일 주소
$header .= "from: $fromName <$mailFrom>\r\n"; // 송신자명, 송신자 이메일 주소

// --- 첨부화일이 있을경우 --- //
if($upfile && $upfile_size) {
$filename="Smart_Rect(".$units.").pdf"; // 파일명 추출
$fp = fopen($upfile,"r"); // 파일 열기
$file = fread($fp,$upfile_size); // 파일 읽기
fclose($fp); // 파일 닫기
if ($upfile_type == ""){
$upfile_type = "application/octet-stream";
}

// --- 헤더작성 --- //
$header .= "MIME-Version: 1.0\r\n"; // MIME 버전 표시
$header .= "Content-Type: Multipart/mixed; boundary=\"$boundary\""; // 구분자 설정, Multipart/mixed 일 경우 첨부화일

// --- 이메일 본문 생성 --- // 
$mailbody = "This is a multi-part message in MIME format.\r\n\r\n";
$mailbody .= "--$boundary\r\n";
$mailbody .= "Content-Type: text/html; charset=euc-kr\r\n";
$mailbody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$mailbody .= nl2br(addslashes($content)) . "\r\n";

// --- 파일 첨부 ---// 
$mailbody .= "--$boundary\r\n"; 
$mailbody .= "Content-Type: ".$upfile_type."; name=\"".$filename."\"\r\n"; // 내용
$mailbody .= "Content-Transfer-Encoding: base64\r\n"; // 암호화 방식 
$mailbody .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n"; // 첨부파일인 것을 알림
$mailbody .= base64_encode($file)."\r\n\r\n";

$mailbody .= "--$boundary--"; //내용 구분자 마침
} else {
// --- 헤더작성 --- // 
$header .= "MIME-Version: 1.0\r\n"; 
$header .= "Content-Type: Multipart/alternative; boundary = \"$boundary\"";

// --- 이메일 본문 생성 --- //
$mailbody = "--$boundary\r\n"; 
$mailbody .= "Content-Type: text/html; charset=euc-kr\r\n";
$mailbody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$mailbody .= nl2br(addslashes($content)) . "\r\n";

$mailbody .= "--$boundary--\r\n\r\n"; 
}

$result = mail($mailTo,$title,$mailbody,$header);
if($result){
	echo "메일 전송에 성공하였습니다.";
	$rm_file="./data/".$time.".pdf";
	if(is_file($rm_file)){ unlink($rm_file); }
}else {
	echo "메일 보내기 실패";
}

?>