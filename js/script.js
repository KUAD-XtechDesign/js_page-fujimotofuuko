$(function(){

//マウスストーカー用のdivタグを作成
const stalker = document.createElement('div');  //divタグを作成
stalker.id = 'stalker';                         //IDを付与
document.body.appendChild(stalker);


document.addEventListener('mousemove', function (e) {
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
 })

});


//リンクへ吸い付く処理
const linkElem = document.querySelectorAll('a:not(.no_stick_)');
for (let i = 0; i < linkElem.length; i++) {
    //マウスホバー時
    linkElem[i].addEventListener('mouseover', function (e) {
        hovFlag = true;

        //マウスストーカーにクラスをつける
        stalker.classList.add('hov_');

        //マウスストーカーの位置をリンクの中心に固定
        let rect = e.target.getBoundingClientRect();
        let posX = rect.left + (rect.width / 2);
        let posY = rect.top + (rect.height / 2);

        stalker.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';

    });
    //マウスホバー解除時
    linkElem[i].addEventListener('mouseout', function (e) {
        hovFlag = false;
        stalker.classList.remove('hov_');
    });
}

jQuery(".container").raindrops({
    color: "#0bd",
    canvasHeight: 250
  });


$.widget("water.raindrops", {
    options: {
        waveLength: 340,    // Wave Length. A numeric value. The higher the number, the smaller the wave length.
        canvasWidth: 0,     // Width of the  water. Default is 100% of the parent's width
        canvasHeight: 0,    // Height of the water. Default is 50% of the parent's height 
        color: '#00aeef',   // Water Color
        frequency: 3,       // Raindrops frequency. Higher number means more frequent raindrops.
        waveHeight: 100 ,   // Wave height. Higher number means higher waves created by raindrops.
        density: 0.02,      // Water density. Higher number means shorter ripples.
        rippleSpeed:  0.1,  // Speed of the ripple effect. Higher number means faster ripples.
        rightPadding: 20,    // To cover unwanted gaps created by the animation.
        position:'absolute',
        positionBottom:0,
        positionLeft:0
    },
    _create: function () {
        var canvas = window.document.createElement('canvas');
        if (!this.options.canvasHeight) {
            this.options.canvasHeight = this.element.height() / 2;
        }
        if (!this.options.canvasWidth) {
            this.options.canvasWidth = this.element.width();
        }
        this.options.realWidth = this.options.canvasWidth + this.options.rightPadding;
        canvas.height = this.options.canvasHeight;
        canvas.width = this.options.realWidth;

        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = this.options.color;
        this.element.append(canvas);
        canvas.parentElement.style.overflow = 'hidden';
        canvas.parentElement.style.position = 'relative';
        canvas.style.position = this.options.position;
        canvas.style.bottom = this.options.positionBottom;
        canvas.style.left = this.options.positionLeft;
        
        this.springs = [];
        for (var i = 0; i < this.options.waveLength; i++)
        {
            this.springs[i] = new this.Spring();
        }

        raindropsAnimationTick(this);
    },
    Spring: function ()
    {
        this.p = 0;
        this.v = 0;
        //this.update = function (damp, tens)
        this.update = function (density, rippleSpeed)
        {
            //this.v += (-tens * this.p - damp * this.v);
            this.v += (-rippleSpeed * this.p - density * this.v);
            this.p += this.v;
        };
    },
    updateSprings: function (spread) {
        var i;
        for (i = 0; i < this.options.waveLength; i++)
        {
            //this.springs[i].update(0.02, 0.1);
            this.springs[i].update(this.options.density, this.options.rippleSpeed);
        }

        var leftDeltas = [],
                rightDeltas = [];

        for (var t = 0; t < 8; t++) {

            for (i = 0; i < this.options.waveLength; i++)
            {
                if (i > 0)
                {
                    leftDeltas[i] = spread * (this.springs[i].p - this.springs[i - 1].p);
                    this.springs[i - 1].v += leftDeltas[i];
                }
                if (i < this.options.waveLength - 1)
                {
                    rightDeltas[i] = spread * (this.springs[i].p - this.springs[i + 1].p);
                    this.springs[i + 1].v += rightDeltas[i];
                }
            }

            for (i = 0; i < this.options.waveLength; i++)
            {
                if (i > 0)
                    this.springs[i - 1].p += leftDeltas[i];
                if (i < this.options.waveLength - 1)
                    this.springs[i + 1].p += rightDeltas[i];
            }

        }

    },
    renderWaves: function ()
    {
        var i;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.options.canvasHeight);
        for (i = 0; i < this.options.waveLength; i++)
        {
            this.ctx.lineTo(i * (this.options.realWidth / this.options.waveLength), (this.options.canvasHeight / 2) + this.springs[i].p);
        }
        this.ctx.lineTo(this.options.realWidth, this.options.canvasHeight);
        this.ctx.fill();
    } 
    
});

function raindropsAnimationTick(drop) {
    if ((Math.random() * 100) < drop.options.frequency)
        drop.springs[Math.floor(Math.random() * drop.options.waveLength)].p = drop.options.waveHeight;

    drop.ctx.clearRect(0, 0, drop.options.realWidth, drop.options.canvasHeight);
    drop.updateSprings(0.1);
    drop.renderWaves();

    requestAnimationFrame(function () {
        raindropsAnimationTick(drop);
    });
}
;

$(function()
{

    var cursor=$("#cursor");                
    $(document).on("mousemove",function(e){ 
      var x=e.clientX;
      var y=e.clientY;

      cursor.css({
        "top":y+"px",
        "left":x+"px"
      });
    });
});