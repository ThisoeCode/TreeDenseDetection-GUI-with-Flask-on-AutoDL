$(_=>{
  // TEST
  $('#testjs').on('click',_=>{
    alert('测试成功。')
    haisin('ping','#p0 pre')
  })



  // lib
  let
    is1Subbed=false

  const
    /** NewLine for pre text appending */
    preNL=`
`   ,
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
    mod=(txt,str,color)=>{
      reg=new RegExp(str,'g')
      return txt.replace(reg,`<span style="color:${color}">${str}</span>`)
    },
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
      const match = line.match(/Img name: \s*\('(.*?)',\)/)
      match&&match[1]&&
        $('#mydiv').append(
          `<i i="${match[1]}"><img alt="data" src="public_html/static/img/ico_mat.png"><span>${match[1]}.mat</span></i>`
        )
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
      $($elem).append(preNL)
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
          return E.close()
        }
        for(let j=0; j<modConf.length; j++){
          ln=mod(ln,modConf[j][0],modConf[j][1])
        }
        $($elem).append(ln+preNL)
        autoScroll()
        api==='test'&& listImg(ln)
      }
    },
    toggleSub=_=>{
      $('#submit1').prop(
        'disabled',
        $('select').val()==='m0'||is1Subbed
      )
    }



  // init
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

  $('aside').on('click','i',function(_){
    imgName=$(this).attr('i')
    $('#media-ori').css('background-image',`/api/img?dir=ori&img=${imgName}.jpg`)
    $('#media-pre').css('background-image',`/api/img?dir=pre&img=${imgName}.png`)
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