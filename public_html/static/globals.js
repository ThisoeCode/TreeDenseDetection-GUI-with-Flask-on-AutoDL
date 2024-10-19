$(_=>{
  // TEST
  $('#testjs').on('click',_=>{
    alert('测试成功。')
    haisin('ping','#p0 pre')
  })



  // config && lib
  let
    is1Subbed=false,
    load_dots='',
    load_itv =null

  const
    /** NewLine for pre text appending */
    preNL=`
`   ,
    regimg=/Img name:\s*\['(.*?)'\]/,
    startMsg=_=>`确定启动 ${_} 模型？`,
    $flex=_=>$(_).css('display','flex'),
    get=_=>(new URLSearchParams(window.location.search)).get(_)==='',
    flipTitle=_=>{$('h1>span').text(
      _===1
        ?'模型运行'
        :_===2
          ?'训练模型'
          :'测试页面'
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
      [' GT count','wheat'],
      ['THISOE_PYERROR','red'],
    ],
    listImg=line=>{
      const match = line.match(regimg)
      match&&match[1]&&
        $('aside').append(
          `<i i="${match[1]}"><img alt="data" src="/static/img/ico_mat.png"><span>${match[1]}.mat</span></i>`
        )
    },
    /** @param {boolean} _ - truthy for starting, falsy for stopping */
    loaddotsAnime=_=>{
      if(_){ if(!load_itv){
        load_itv=setInterval(_=>{
          load_dots=load_dots.length<3 ? load_dots+'•' : ''
          $('.loaddots').text(load_dots)
        },233)
      }}else{
        clearInterval(load_itv)
        load_itv=null
        load_dots=''
        $('.loaddots').text('')
      }
    },
    /**
     * SSE Stream
     * @param {string} api - API URL for streaming (ignore `/api/`)
     * @param {string} $elem - Terminal output `<pre>` selector
     */
    haisin=(api,$elem)=>{
      // let isAutoScrollEnabled=true
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
      const
        $pre = $($elem)[0],
        E = new EventSource('/api/'+api),
        autoScroll=_=>{
          if(isAutoScrollEnabled){
            $pre.scrollTop = $pre.scrollHeight
          }
        }
      let isAutoScrollEnabled = true
      loaddotsAnime(1)
      $($elem).on('scroll',_=>{
        const
          scrollOffset = $pre.scrollTop + $pre.clientHeight,
          isAtBottom = scrollOffset >= $pre.scrollHeight - 1
        isAutoScrollEnabled = isAtBottom
      })
      E.onmessage = function(e){
        let ln = e.data||''
        if(ln==="ENDSTREAM"){
          console.log(`[STREAM::${api}] Stream end.`)
          loaddotsAnime(0)
          $($elem).append(preNL+mod("&gt; bash","&gt;",'aqua'))
          return E.close()
        }
        api==='test'&& listImg(ln)
        // `mod()` Add color
        for(let j=0; j<modConf.length; j++){
          ln=mod(ln,modConf[j][0],modConf[j][1])
        }
        // const modimg=ln.match(regimg)
        // modimg&&modimg[1]&&mod(ln,modimg[1],'aquamarine')
        $($elem+' .loaddots').before(ln+preNL)
        autoScroll()
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
  $('#loading').hide()

  $('#flip-page').click(_=>{
    get('1')
      ?flipTo(2)
      :flipTo(1)
  })

  // show IMG
  $('aside').on('click','i',function(){
    const
      imgName=$(this).attr('i'),
      bg='background-image',
      img=_=>`url(/api/img?dir=${_}&img=${imgName})`
    $('#media-ori').css(bg,img('ori'))
    $('#media-pre').css(bg,img('pre'))
    console.log(imgName)
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

  // pre mods
  modPre($('#pre1'),'&gt; ','aqua')
  modPre($('#pre2'),'&gt; ','aquamarine')
  modPre($('#pre2'),'end!','aqua')
  modPre($('#pre2'),'INFO','green')
  modPre($('#pre2'),'Loss: ','#cca')
})