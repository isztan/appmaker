Pages.insertcomponents = function (components) {
  var componentsInsert = ''
    for (var i in components) {
      componentsInsert += '<div class="PagesDroppableImg"><img src="/nudgepad/tools/pages/images/'+ components[i] +'.png" title="'+ components[i] +'"></div>'
    }

    var componentsListItems = $('<div class="PagescomponentsList">'+ componentsInsert +'</div>')

    $('#PagescomponentsList').html(componentsListItems)

    $('#PagescomponentsList div img').on('slidestart', function() {
      var dropBlock = $(this).attr('title')
      Pages.stage.dragAndDrop(Pages.components.get('blocks ' + dropBlock))
      mixpanel.track('I dropped a droppable')
    })

    $('.PagescomponentsList div img').on('tap', function() {
      
      var dropBlock = $(this).attr('title')
      Pages.stage.insert(Pages.components.get('blocks ' + dropBlock), false, 0, 0, true)
      mixpanel.track('I tapped a droppable')
    })
}

Pages.pickArray = function (menuType) {
  
  var menuType;
  
  var result;

  switch (menuType) {

    case "block":
      result = ['block', 'rounded'];
      break;

    case "text":
      result = ['text', 'nav', 'paragraph'];  
      break;

    case "image":
      result = ['image', 'graph'];
      break;

    case "sticky":
      result = ['sticky', 'stickyOrange', 'stickyBlue'];
      break;

    default:
      result = [];
  }

  Pages.insertcomponents(result);
}

Pages.on('firstOpen', function () {
  
  var menuType;
  
  $('#PagesBlockDroppable').on('click', function () {
    menuType = "block"
    Pages.pickArray(menuType)
  })
  
  $('#PagesTextDroppable').on('click', function () {
    menuType = "text"
    Pages.pickArray(menuType)
  })
  
  $('#PagesImageDroppable').on('click', function () {
    menuType = "image"
    Pages.pickArray(menuType)
  })
  
  $('#stickyDroppable').on('click', function () {
    menuType = "sticky"
    Pages.pickArray(menuType)
  })
  
  $(document).on('tap', '.PagesImageThumbDrop img', function() {
    var imageY = ($('#PagesStage').height() / 2) - 130
    var imageX = 100
    Pages.stage.insert('images\n style\n  position absolute\n  top ' + imageY +'\n  left ' + imageX + '\n tag img\n src ' + $(this).attr('src'))
  })
  
  $('#PagesRibbon').on('slidestart', '.PagesImageThumbDrop img', function() {
    Pages.stage.dragAndDrop('images\n style\n  position absolute\n  top 0px\n  left 0px\n tag img\n src ' + $(this).attr('src'))
    mixpanel.track('I dropped a ribbon droppable')
  })


  // We do this on live, so that it wont interfere with events bound
  // to items inside the ribbon, but it will prevent events from
  // reaching nudgepadbody hopefully
  $('#PagesRibbon').on('mousedown slide slidestart', function (event) {
    
    event.stopPropagation()
  })

})

