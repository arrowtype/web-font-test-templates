

var basicTimeline = anime.timeline();

basicTimeline
  .add({
    targets: '#lineDrawing .lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1750,
    stroke: [
      {value: '#0f0'},
      {value: 'rgba(20,20,20)'}
    ],
    
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  })
  
  .add({
    targets: '.greeting',
    opacity: [0,1],
    easing: 'easeInOutSine',
    duration: 1500,
    offset: '-=1500'
  })
  .add({
    targets: '.greeting code:first-of-type',
    color: ['#fff',"#0f0"],
    easing: 'easeInOutSine',
    duration: 750,
    offset: '-=100'
  })
  .add({
    targets: '#lineDrawing g',
    fill: ["rgba(0,0,0,0)","rgba(10,40,10,0.5)"],
    strokeWidth: [
      ".5",
      "0"],
    easing: 'easeInOutSine',
    duration: 2500,
    offset: '-=2000'
  })
