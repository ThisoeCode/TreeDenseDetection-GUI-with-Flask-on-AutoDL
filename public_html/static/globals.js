$(_=>{
  // lib
  const
    startMsg='（测试阶段）确定启动程序？',
    /** NewLine for pre text appending */
    preNL=`
`   ,
    $flex=_=>$(_).css('display','flex'),
    get=_=>(new URLSearchParams(window.location.search)).get(_)==='',
    preLines=$('#pre-code').html().split(/\n/).length,
    flipTitle=_=>{$('h1>span').text(
      _===1
        ?' 模型运行'
        :_===2
          ?' 训练模型'
          :' 测试页面'
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
    /**
     * SSE Stream
     * @param {string} api - API URL for streaming (ignore `/api/`)
     * @param {string} $elem - Terminal output `<pre>` selector
     */ 
    stream=(api,$elem)=>{
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
      $($elem).append(preNL)
      $($elem).on('scroll',_=>{
        const
          scrollOffset = $preElem.scrollTop + $preElem.clientHeight,
          isAtBottom = scrollOffset >= $preElem.scrollHeight - 1
        isAutoScrollEnabled = isAtBottom
      })
      E.onmessage = function(e){
        if(e.data==="ENDSTREAM"){
          return E.close()
        }
        $pre.append(e.data+preNL)
        autoScroll()
      }
    }

  let
    preCtt=''



  // init
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

  for(let j=1; j<=preLines; j++){
    preCtt+=j+preNL
  }
  $('#pre-lines').text(preCtt)



  // TEST
  $('#testjs').on('click',_=>{
    alert('测试成功。')
    stream('ping','#p0 pre')
  })

  // MODELS TRIGGERING & TERMINAL STREAMING
  $('#submit1').click(_=>{
    confirm(startMsg)
      && stream('test','pre1')
  })
  $('#submit2').click(_=>{
    confirm(startMsg)
      && stream('train','pre2')
  })
})