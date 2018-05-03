

var basicTimeline = anime.timeline();

basicTimeline
  .add({
    targets: '#lineDrawing .lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1250,
    stroke: [
      {value: '#0f0'},
      {value: '#121212'}
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
