'use strict';
let startTime;
let timer, setTimer;
let tryCount = 0;
let firstClick = true;
let firstCard;
let compUnit = 0;

window.onload=function(){
  function Card(suit,num){
    this.suit=suit;
    this.num=num;
    this.front;
    this.setFront=function(){
      this.front=`${this.suit}${this.num<10?'0':''}${this.num}.gif`;
    };
  }
  const cards=[];
  const suits=['d','c'];
  for(let i=0;i<suits.length;i++){
    for(let j=1;j<=14;j++){
      let card=new Card(suits[i],j);
      card.setFront();
      cards.push(card);
    }
  }
  function shuffle(){
    let i=cards.length;
    while(i){
      let index=Math.floor(Math.random()*i--);
      var temp=cards[index];
      cards[index]=cards[i];
      cards[i]=temp;
    }
  }
  shuffle();//シャッフル実行
  const table=document.getElementById('table');
  for(let i=0;i<suits.length;i++){
    let tr=document.createElement('tr');
    for(let j=0;j<14;j++){
      let td=document.createElement('td');
      let tempCard=cards[i*14+j];
      td.classList.add('card','back');
      td.onclick=flip;

      td.num=tempCard.num;
      td.style.backgroundImage=`url(images/${tempCard.front})`;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
//以下の変数を追加
  let firstCard=null;
  let flipTimerId=NaN;
  function flip(e){
    let td=e.target;

    //td.classList.toggle('back');

    if(!td.classList.contains('back') || flipTimerId){
      return;//表のカードをクリックしても何もしない。
    }
    td.classList.remove('back');//カードを表にする。
    if(firstCard===null){
      firstCard=td;//1枚目だったら今めくったカードをfirstCardに設定
    }else{
      //2枚目だったら1枚目と比較して結果を判定する。
      if(firstCard.num===td.num){
        //２枚が同じだったときの処理
        firstCard=null;
      }else{
        flipTimerId=setTimeout(function(){
          firstCard.classList.add('back');
          td.classList.add('back');
          flipTimerId=NaN;
          firstCard=null;
        },1200);
      }
 
 
    }
}
startTime = new Date();
    timer = setInterval(drawResult, 1000);
// 経過時間と回数を表示する関数
function drawResult(){
    let nowTime = new Date();
    let time = Math.floor((nowTime-startTime)/1000);
    let result = document.getElementById("result");
    let str = "TIME: " + time + "秒";
    result.innerHTML = str;
}

}
