$(function () {
   if(localStorage.getItem('inputYear') && localStorage.getItem('inputYear') && localStorage.getItem('inputDate')){
    var yyyy = localStorage.getItem('inputYear');
    var mm = ("0"+String(Number(localStorage.getItem('inputMonth'))+1)).slice(-2);
    var dd = ("0"+localStorage.getItem('inputDate')).slice(-2);
    $('#userFullDate').val(yyyy+'-'+mm+'-'+dd);
}
    
$('#start_countdown').click(()=>{
   var date = new Date($('#userFullDate').val());
   localStorage.setItem('inputYear', date.getFullYear())
   localStorage.setItem('inputMonth',date.getMonth())
   localStorage.setItem('inputDate', date.getDate())
})
    
function showCountdown() {
   
//ローカルストレージに値がない場合は実行しない   
if(!localStorage.getItem('inputYear') || !localStorage.getItem('inputYear') || !localStorage.getItem('inputDate')){
   return
}
var nowDate = new Date();
var dnumNow = nowDate.getTime();
var inputYear  = localStorage.getItem('inputYear');
var inputMonth = localStorage.getItem('inputMonth');
var inputDate  = localStorage.getItem('inputDate');
var inputHour  = 23;
var inputMin   = 59;
var inputSec   = 59;
var targetDate = new Date( inputYear, inputMonth, inputDate, inputHour, inputMin, inputSec);
var dnumTarget = targetDate.getTime();

var diff2Dates = dnumTarget - dnumNow;
if( dnumTarget < dnumNow ) {
   // 期限が過ぎた場合は -1 を掛けて正の値に変換
   diff2Dates *= -1;
}

var dDays  = diff2Dates / ( 1000 * 60 * 60 * 24 );  // 日数
diff2Dates = diff2Dates % ( 1000 * 60 * 60 * 24 );
var dHour  = diff2Dates / ( 1000 * 60 * 60 );   // 時間
diff2Dates = diff2Dates % ( 1000 * 60 * 60 );
var dMin   = diff2Dates / ( 1000 * 60 );    // 分
diff2Dates = diff2Dates % ( 1000 * 60 );
var dSec   = diff2Dates / 1000; // 秒

var dlYear  = targetDate.getFullYear();
var dlMonth = targetDate.getMonth() + 1;
var dlDate  = targetDate.getDate();
var dlHour  = targetDate.getHours();
var dlMin   = targetDate.getMinutes();
var dlSec   = targetDate.getSeconds();
var msg1 = "期限の" + dlYear + "/" + dlMonth + "/" + dlDate + " " + dlHour + ":" + dlMin + ":" + dlSec;

var msg2 = Math.floor(dDays) + "日"
         + Math.floor(dHour) + "時間"
         + Math.floor(dMin) + "分"
         + Math.floor(dSec) + "秒";

var msg;
if( dnumTarget > dnumNow ) {
   // まだ期限が来ていない場合
   msg = `夏休み終了まで残り<span id="alert_time">${msg2}</span>です`;
}
else {
   // 期限が過ぎた場合
   msg = `夏休みは既に<span id="alert_time">${msg2}</span>前に終わりました`;
}
$("#realtimeCountdownArea").html(msg);
}

setInterval(showCountdown,1000);
});