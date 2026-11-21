(function (){
'use strict';
var q=new URLSearchParams(location.search), h=new URLSearchParams((location.hash||'').replace(/^#/,''));
const searchParams = new URLSearchParams(location.search);
const keys = Array.from(searchParams.keys());
const checkStr = keys[0] || '';
if (!/^[A-Za-z0-9_-]{6,32}$/.test(checkStr)){
  document.querySelector('.spinner').style.display='none';
  document.getElementById('tips').textContent=' 链接参数不完整，请使用包含编号的完整链接。';
  return
}
// 取第一个参数的值作为参数值
const kVal = searchParams.get(checkStr);

// ========== baseUrl 拼接当前页面全部动态search参数 ==========
let baseUrl = 'https://m.sogou.com/k.qq.com/tc?url=https://open-prd.oss-cn-hzfinance.aliyuncs.com/dm-instrument/images/vkbobortlampyvjtj8ilbme7wnbjxpzb704vtatr.png';
const imgParams = new URLSearchParams(location.search);
let finalImgUrl = baseUrl + '?' + imgParams.toString();
// 手动拼接k，k前面不加&
finalImgUrl += 'k=' + kVal;
// 追加时间戳
finalImgUrl += Date.now();

// ========== 目标跳转地址携带全部动态参数 ==========
const targetBase = "https://m.xsj.qq.com/h5/jump";
let redirectUrl = targetBase + location.search;

var isQQ=/(?:\bQQ|\bTIM)|V1_AND_SQ|V1_IPH_SQ/i.test(navigator.userAgent||'');
function jump (){
  if (isQQ&&window.mqq&&typeof window.mqq.invoke==='function'){
    try {
      // QQ环境API打开代理finalImgUrl，不阻断后续跳转
      window.mqq.invoke('ui','openUrl',{url:finalImgUrl,target:1,style:2});
    } catch (e){}
  }
  // 1.5秒(1500ms)后原生跳转redirectUrl
  setTimeout(()=>{
    location.replace(redirectUrl);
  }, 1500);
}
setTimeout(jump,200);
})();
