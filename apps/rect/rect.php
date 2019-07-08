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
// ������ �Ѿ���� ����
//-- $mailTo : ������ �̸����ּ�
//-- $mailFrom : �۽��� �̸����ּ�
//-- $fromName : �۽��ڸ� �Ǵ� ����
//-- $title : ��������
//-- $content : ���ϳ���
//-- $upfile : ÷�����ϸ�
//*******************************

$mailTo = $email;
$mailFrom = "developer@choseong.com";
$fromName = "choseong";
$title = "Smart Rect";
$content = "$p_f $p_l $r_f $r_l";
$upfile ="./data/".$time.".pdf";
$upfile_size = filesize("./data/".$time.".pdf");

$boundary = "----" . uniqid("part"); // ������ ����

// --- ����ۼ� --- //
$header = "Return-Path: $mailFrom\r\n"; // �ݼ� �̸��� �ּ�
$header .= "from: $fromName <$mailFrom>\r\n"; // �۽��ڸ�, �۽��� �̸��� �ּ�

// --- ÷��ȭ���� ������� --- //
if($upfile && $upfile_size) {
$filename="Smart_Rect(".$units.").pdf"; // ���ϸ� ����
$fp = fopen($upfile,"r"); // ���� ����
$file = fread($fp,$upfile_size); // ���� �б�
fclose($fp); // ���� �ݱ�
if ($upfile_type == ""){
$upfile_type = "application/octet-stream";
}

// --- ����ۼ� --- //
$header .= "MIME-Version: 1.0\r\n"; // MIME ���� ǥ��
$header .= "Content-Type: Multipart/mixed; boundary=\"$boundary\""; // ������ ����, Multipart/mixed �� ��� ÷��ȭ��

// --- �̸��� ���� ���� --- // 
$mailbody = "This is a multi-part message in MIME format.\r\n\r\n";
$mailbody .= "--$boundary\r\n";
$mailbody .= "Content-Type: text/html; charset=euc-kr\r\n";
$mailbody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$mailbody .= nl2br(addslashes($content)) . "\r\n";

// --- ���� ÷�� ---// 
$mailbody .= "--$boundary\r\n"; 
$mailbody .= "Content-Type: ".$upfile_type."; name=\"".$filename."\"\r\n"; // ����
$mailbody .= "Content-Transfer-Encoding: base64\r\n"; // ��ȣȭ ��� 
$mailbody .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n"; // ÷�������� ���� �˸�
$mailbody .= base64_encode($file)."\r\n\r\n";

$mailbody .= "--$boundary--"; //���� ������ ��ħ
} else {
// --- ����ۼ� --- // 
$header .= "MIME-Version: 1.0\r\n"; 
$header .= "Content-Type: Multipart/alternative; boundary = \"$boundary\"";

// --- �̸��� ���� ���� --- //
$mailbody = "--$boundary\r\n"; 
$mailbody .= "Content-Type: text/html; charset=euc-kr\r\n";
$mailbody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$mailbody .= nl2br(addslashes($content)) . "\r\n";

$mailbody .= "--$boundary--\r\n\r\n"; 
}

$result = mail($mailTo,$title,$mailbody,$header);
if($result){
	echo "���� ���ۿ� �����Ͽ����ϴ�.";
	$rm_file="./data/".$time.".pdf";
	if(is_file($rm_file)){ unlink($rm_file); }
}else {
	echo "���� ������ ����";
}

?>