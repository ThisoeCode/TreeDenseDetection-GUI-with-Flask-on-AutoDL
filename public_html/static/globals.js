$(_=>{
  // TEST
  $('#testjs').on('click',_=>{
    alert('测试成功。')
    haisin('ping','#p0 pre')
  })



  // config && lib
  let
    is1Subbed=false,
    is2Subbed=false,
    load_dots='',
    load_itv =null

  const
    regimg=/Img name:\s*\['(.*?)'\]/,
    regGT=/GROUNDTRUTH: *(.*?) /,
    regNUM=/NUMBER: *(.*?);/,
    p2aTime=[233,33, 2333,99],
    p2aEpoch=[4, 4,3, 4,3, 3,4,3],

    /** NewLine for pre text appending */
    preNL=`
`   ,
    startMsg=_=>`确定启动 ${_} 模型？`,
    $flex=_=>$(_).css('display','flex'),
    $p2=$('#pre2'),
    get=_=>(new URLSearchParams(window.location.search)).get(_)==='',
    flipTitle=_=>{$('h1>span').text(
      _===1
        ?'模型运行'
        :_===2
          ?'训练模型'
          :'前端测试'
    )},
    flipTo=_=>{
      window.history.pushState({},'',`${(new URL(window.location)).pathname}?`+_)
      $flex('#p'+_)
      $('#p0,#p'+(_===1?2:1)).hide()
      flipTitle(_)
    },
    /** stream flags */
    isStreamin = [false,false,false],
    checkStream=_=>{
      if(isStreamin[_]){return false}
      return isStreamin[_]=true
    },
    mod=(txt,str,color)=>{ if(str){
      reg=new RegExp(str,'g')
      return txt.replace(reg,`<span style="color:${color}">${str}</span>`)
    }},
    modPre=(pre,str,color)=>{
      $(pre).html(mod($(pre).html(),str,color))
    },
    modConf=[
      ['Random number spittin...','#178577'],
      ['number of img','violet'],
      ['Img name','aqua'],
      [' Error','gold'],
      [' Model out','lime'],
      [' NUMBER','lime'],
      [' GT count','wheat'],
      [' GROUNDTRUTH','wheat'],
      ['THISOE_PYERROR','red'],
    ],
    listImg=line=>{
      const
        IMG = line.match(regimg),
        GT = line.match(regGT),
        NUM = line.match(regNUM)
      IMG&&IMG[1]&&
      GT&&GT[1]&&
      NUM&&NUM[1]&&
        $('aside').append(
          `<i i="${IMG[1]}" gt="${GT[1]}" num="${NUM[1]}"><img alt="data" src="/static/img/ico_mat.png"><span>${IMG[1]}.mat</span></i>`
        )
    },
    /** @param {boolean} _ - truthy for starting, falsy for stopping */
    loaddotsAnim=_=>{
      if(_){ if(!load_itv){
        load_itv=setInterval(_=>{
          load_dots=load_dots.length<3 ? load_dots+'*' : ''
          $('.loaddots').text(load_dots)
        },233)
      }}else{
        clearInterval(load_itv)
        load_itv=null
        load_dots=''
        $('.loaddots').text('')
      }
    },

    autoScroll=$_=>{
      const
        ht=$_[0],
        ASE=_=>$_.data('isAutoScrollEnabled',_)
      ASE(true)
      $_.off('scroll').on('scroll',_=>{
        const
          scrollOffset = ht.scrollTop + ht.clientHeight,
          isAtBottom = scrollOffset >= ht.scrollHeight - 1
        ASE(isAtBottom)
      })
      if($_.data('isAutoScrollEnabled')){
        ht.scrollTop = ht.scrollHeight
      }
    },

    /**
     * SSE Stream
     * @param {string} api - API URL for streaming (ignore `/api/`)
     * @param {string} elem - Terminal output `<pre>` selector
     */
    haisin=(api,elem)=>{
      switch(api){
        case 'test':
          if(!checkStream(1)){return null}
          break
        case 'train':
          if(!checkStream(2)){return null}
          break
        case 'ping':
          if(!checkStream(0)){return null}
          break
        default:return null
      }
      const E = new EventSource('/api/'+api)
      loaddotsAnim(1)
      E.onmessage = function(e){
        let ln = e.data||''
        if(ln==="ENDSTREAM"){
          console.log(`[STREAM::${api}] Stream end.`)
          loaddotsAnim(0)
          $(elem).append(preNL+mod("&gt; bash","&gt;",'aqua'))
          return E.close()
        }
        api==='test'&& listImg(ln)
        // `mod()` Add color
        for(let j=0; j<modConf.length; j++){
          ln=mod(ln,modConf[j][0],modConf[j][1])
        }
        // const modimg=ln.match(regimg)
        // modimg&&modimg[1]&&mod(ln,modimg[1],'aquamarine')
        $(elem+' .loaddots').before(ln+preNL)
        autoScroll($(elem))
      }
    },
    toggleSub=_=>{
      $('#submit1').prop(
        'disabled',
        $('select').val()==='m0'||is1Subbed
      )
    }



  // init
  $('#github').click(_=>window.open('https://github.com/ThisoeCode/TreeDenseDetection-GUI-with-Flask-on-AutoDL'))
  toggleSub()
  get('1')
    ?(_=>{$flex('#p1')
      flipTitle(1)
    })()
    :get('2')
      ?(_=>{$flex('#p2')
        flipTitle(2)
      })()
      :get('0')
        ?(_=>{$flex('#p0')
          flipTitle(0)
        })()
        :flipTo(1)
  $('#flip-page').click(_=>{
    get('1')
      ?flipTo(2)
      :flipTo(1)
  })

  // pre mods
  modPre($('#pre1'),'&gt; ','aqua')
  modPre($p2,'&gt; ','aquamarine')
  modPre($p2,'end!','aqua')
  modPre($p2,'INFO','green')
  modPre($p2,'Loss: ','#cca')

  // p2 bash anim
  const
    p2 = $p2.html().split(preNL),
    p2Anim=_=>{
      if(is2Subbed){return false}
      is2Subbed=true
      let j=1, iEP=0, itv3=[]
      class Pre2I3 {
        constructor(initEP){
          this.EP=initEP
          this.limit=p2aEpoch[initEP]
          this.i=1
          this.itv=
          setInterval(_=>{
            if(!p2[j]){
              this.stop()
              return false
            }
            $p2.append(p2[j++]+preNL)
            autoScroll($p2)
            this.i++ === this.limit && this.stop()
            p2[j] || this.stop()
          },p2aTime[3])
          return this.itv
        }
        stop(){clearInterval(this.itv)}
      }
      setTimeout(_=>{
        // --- 1 ----
        const itv1 = setInterval(_=>{
          $p2.append(p2[j++]+preNL)
          autoScroll($p2)
          // --- 2 ----
          if(j>25){
            clearInterval(itv1)
            $p2.append(p2[j++]+preNL+p2[j++]+preNL)
            autoScroll($p2)
            const itv2 = setInterval(_=>{
              // --- 3 ----
              $p2.append(preNL)
              itv3[iEP] = new Pre2I3(iEP)
              if(++iEP === p2aEpoch.length){
                setTimeout(_=>{
                  clearInterval(itv2)
                  while(p2[j+3]!==undefined){
                    $p2.append(p2[++j]+preNL)
                  }
                  autoScroll($p2)
                  is2Subbed=false
                },p2aTime[2])
              }
            },p2aTime[2])
          }
        },p2aTime[1]+Math.floor(Math.random()*9))
      },p2aTime[0])
    }
  $p2.html(p2[0])
  $('#fc-menu button').click(p2Anim)

  $('#loading').hide()

  // show IMG
  $('aside').on('click','i',function(){
    const
      imgName=$(this).attr('i'),
      gt=parseInt( $(this).attr('gt') ),
      num=parseInt( $(this).attr('num') ),
      bg='background-image',
      img=_=>`url(/api/img?dir=${_}&img=${imgName})`,
    // plot prepare
      perGT=gt>num ? 100 : (gt/num)*100,
      perNUM=gt<num ? 100 : (num/gt)*100
    // render
    $('#media-ori').css(bg,img('ori'))
    $('#media-pre').css(bg,img('pre'))
    $('#media-ori>i').text(gt)
    $('#media-pre>i').text(
      Math.floor(num * 10) / 10
    )
    $('gt').css('height',perGT+'%').prop('title',gt)
    $('num').css('height',perNUM+'%').prop('title',num)
  })



  // MODELS TRIGGERING & TERMINAL STREAMING
  $('select').change(toggleSub)
  $('#submit1').click(_=>{
    if(confirm(startMsg($('select').val()))){
      haisin('test','#pre1')
      is1Subbed=true
      $('#submit1').prop('disabled',true).text('已执行')
      $('select').prop('disabled',true)
    }
  })
})