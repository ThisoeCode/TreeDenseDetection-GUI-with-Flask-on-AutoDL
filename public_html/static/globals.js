$(_=>{
  // lib
  const
    $flex=_=>$(_).css('display','flex'),
    get=_=>(new URLSearchParams(window.location.search)).get(_),
    preLines=$('#pre-code').html().split(/\n/).length

  let
    preCtt=''



  // init
  get('1')===''
    ?$flex('#p1')
    :get('2')===''
      ?$flex('#p2')
      :get('0')===''
        ?$flex('#p0')
        :(_=>{
          window.history.pushState({},'',`${(new URL(window.location)).pathname}?1`)
          $flex('#p1')
        })()
  $('#loading').hide()

  for(let j=1; j<=preLines; j++){
    preCtt+=j+`
` // nl
  }
  $('#pre-lines').text(preCtt)



  // TEST
  $('#testjs').click(_=>{alert('测试成功。')})



  // 
})