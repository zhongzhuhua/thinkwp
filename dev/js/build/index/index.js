$.ajaxSetup({
  dataType: 'json'
});
var $project = $('#project');
var $btn = $('#btn');
var $component = $('#component');
var $build = $('#build');
$btn.on('click', function() {
  var $list = $component.find('input:checkbox:checked');
  var component = '';
  $list.each(function() {
    component += $(this).attr('id') + ',';
  });
  component = component.replace(/\,$/, '');
  $.ajax({
    url: '/builds/index/addconfig',
    data: {
      project: $.trim($project.val()),
      component: component
    },
    success: function(data) {
      console.log(data);
    }
  });
});
$build.on('click', function() {
  $.ajax({
    url: '/builds/index/build',
    data: {
      project: $.trim($project.val())
    },
    success: function(data) {
      console.log(data);
    }
  });
});
