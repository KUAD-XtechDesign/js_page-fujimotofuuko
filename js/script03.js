$(function(){

  let date;
  let hour;
  let min;
  let sec;

  //0.5秒に一回実行される
  setInterval(function(){
    date = new Date()//日時に関するデータを設定
    hour = date.getHours()
    min = date.getMinutes()
    sec = date.getSeconds()
    setClock(hour,min,sec)
  },500)


  //時計の表示系
  function setClock(h,m,s){
    //console.log(h,m,s)
    
    let degH = h * (360 / 12) + m * (360 / 12 / 60);
    let degM = m * (360 / 60);
    let degS = s * (360 / 60);

    //アナログ時計 針の角度をCSSで設定
    $("#h_hand").css("transform","rotate(" + degH +"deg)")
    $("#m_hand").css("transform","rotate(" + degM +"deg)")
    $("#s_hand").css("transform","rotate(" + degS +"deg)")

    //数字表示
    $("#dig_time").text(getTimeText())

    //ブロック表示
    $("#footer_h").html("")//時間一旦空に
    $("#footer_m").html("")//分一旦空に
    $("#footer_s").html("")//秒一旦空に

    for(let i=0; i <= hour; i++){//時間数だけp要素を入れる
      $("#footer_h").append("<p>"+i+"</p>")
    }

    for(let i=0; i <= min; i++){//分数だけp要素を入れる
      $("#footer_m").append("<p>"+i+"</p>")
    }

    for(let i=0; i <= sec; i++){//秒数だけp要素を入れる
      $("#footer_s").append("<p>"+i+"</p>")
    }
  }


  //記録ボタンを押す
  $("#btn").on("click",function(){
    addRecord()
  })

  //記録をつける
  function addRecord(){
    let txt = $("#textarea").val()
    let time = getTimeText()
    console.log(time,txt)
    $("#record").append("<div class='time_txt'><p class='time'>"+time+"</p><p class='txt'>"+txt+"</p></div>")
  }

  //時間をテキストとして取得
  function getTimeText(){
    return (hour+"").padStart(2, '0') + ':' +(min+"").padStart(2, '0')+ ':' +(sec+"").padStart(2, '0')
  }

})