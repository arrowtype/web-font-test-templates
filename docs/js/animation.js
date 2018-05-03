// var lineDrawing = anime({
//     targets: '#lineDrawing .lines path',
//     strokeDashoffset: [anime.setDashoffset, 0],
//     easing: 'easeInOutSine',
//     duration: 2000,
//     stroke: [
//       {value: '#0f0'},
//       {value: '#121212'}
//     ],
//     delay: function(el, i) { return i * 750 },
//     direction: 'alternate',
//     loop: true
//   });

  // var greeting = anime({
  //   targets: '.greeting',
  //   opacity: [0, 1],
  //   duration: 2000;
  //   delay: 500
  // });
  

var basicTimeline = anime.timeline();

basicTimeline
  .add({
    targets: '#lineDrawing .lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1000,
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
