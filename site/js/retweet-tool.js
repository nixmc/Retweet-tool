$(document).ready(function(){
  
  $('#from-date').datepicker({
		dateFormat: 'dd/mm/yy'
	});
	
	$('#to-date').datepicker({
		dateFormat: 'dd/mm/yy'
	});
	
	var zero_pad = function(num,count)
  {
    var numZeropad = num + '';
    while(numZeropad.length < count) {
      numZeropad = "0" + numZeropad;
    }
    return numZeropad;
  }
	var today = new Date();
	var day = zero_pad(today.getDate(), 2);
	var month = zero_pad(today.getMonth() + 1, 2);
	var year = today.getFullYear();
	$("#to-date").attr('value',  day + "/" + month + "/" + year);
  
  var spinner_options = {
    lines: 7, // The number of lines to draw
    length: 2, // The length of each line
    width: 4, // The line thickness
    radius: 1, // The radius of the inner circle
    color: '#000', // #rbg or #rrggbb
    speed: 0.9, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false // Whether to render a shadow
  };
	
	// LETS GO!!
  $("#submit_form").click(function(){
    
    $("label").removeClass("error");
    
    var spin = new Spinner(spinner_options).spin();
    $("form").append("<div id='spinner'></div>");
    $("#spinner").append(spin.el);
    
    var user = $.trim($("#user").attr("value")), count = 0, total_retweets = 0;
    var start_date = null, end_date = null;
    var from_date = $.trim($('#from-date').attr("value")), to_date = $.trim($('#to-date').attr("value"));
    
    // reset some things
    $("#tweets").html("");
    $("ul#errors").remove();
    $("#download").remove();
    $("p.dates").hide();
    $("p.total").hide();
    
    if(user == ""){
      // error
      render_errros("Oh no, you haven&apos;t entered a user name.", ["user"]);
      return false;
    }
    
    if(from_date == ""){
      render_errros("Oops, you haven&apos;t filled in the &quot;from date&quot; field.", ["from-date"]);
      return false;
    }
    if(to_date == ""){
      render_errros("Wha! you haven&apos;t filled in the &quot;to date&quot; field.", ["to-date"]);
      return false;
    }
    
    var r = /(\d*)\/(\d*)\/(\d*)/;
    from_date = r.exec(from_date);
    to_date = r.exec(to_date);
    var from_date = new Date(from_date[3],from_date[2] - 1,from_date[1]);
    var to_date = new Date(to_date[3],to_date[2] - 1,to_date[1]);
    var today = new Date();
    if(from_date > today){
      render_errros("Oopsy, the selected &quot;from date&quot; is in the future.", ["from-date"]);
      return false;
    }
    if(to_date > today){
      render_errros("Wha! the selected &quot;to date&quot; is in the future.", ["to-date"]);
      return false;
    }

    if(from_date > to_date){
      // error
      render_errros("Uh oh, the &quot;from date&quot; is greater than &quot;to date&quot;.", ["from-date", "to-date"]);
      return false;
    }
    
    render_table();
    
    twitterlib.timeline(user, { limit: 200 }, function (tweets, options) {
      for(var x = 0; x < tweets.length; x = x+1){
        var retweets = tweets[x].retweet_count;
        var date = new Date(tweets[x].created_at);
        if(date < to_date && date > from_date){
          if(retweets > 0){
            total_retweets = total_retweets + parseInt(retweets);
            var text = this.ify.clean(tweets[x].text);
            //$("#tweets").append(li_html({user: user, id: tweets[x].id_str, text: text, created_at: tweets[x].created_at, retweets: retweets}));
            add_table_row(date, text, retweets, user, tweets[x].id_str);
            if(start_date === null){
              start_date = tweets[x].created_at;
            }
            end_date = tweets[x].created_at;
          } // end retweet check
        } // end date check
      } // end for
    
      $("#total").html(total_retweets);
      $("p.total").show();
      $("#start_date").html(start_date);
      $("#end_date").html(end_date);
      $("p.dates").show();
      
      count++;
      if (date > from_date) {
        this.next();
      }
      else{
        $("#spinner").remove();
        render_download_button();
        downloadify_options = {
          swf: 'media/downloadify.swf',
          downloadImage: 'media/download_csv.png',
          width: 100,
          height: 32,
          filename: generate_filename(),
          data: generate_data(),
          dataType: 'string',
          transparent: true,
          append: false    
        };
        $("#download").downloadify( downloadify_options );
      }
    }); // end twitterlib

    return false;
  }); // end click
  
  var li_html = function(info){
    var html = "<li><p class='text'>" + info.text +  "</p>";
    html = html + "<p class='tweet-meta'><span><a href='http://www.twitter.com/" + info.user + "/status/" + info.id + "'>" + info.created_at + "</a></span>, <span>Retweets: " + info.retweets + "</span></p></li>"
    return html;
  }
  
  var render_table = function(){
    var $table = $("table#tweet-table");
    if($table.length <= 0){
      $("#content").append("<table id='tweet-table'> \
      <tr> \
      <th>Date</th> \
      <th>Tweet</th> \
      <th>Retweets</th> \
      </tr> \
      </table>");
      $table = $("table");
    }
    else{
      $("table#tweet-table").html("");
    }
    return $("table#tweet-table");
  }
  
  var add_table_row = function(date, tweet, retweets, user, id){
    var row = "<tr> <td><a href='http://www.twitter.com/" + user + "/status/" + id + "'>" + date + "</a></td> <td>" + tweet + "</td> <td>" + retweets + "</td> </tr>";
    $("table").append(row);
  }
  
  var render_download_button = function(){
    var $dl = $("#download");
    if($dl.length <= 0){
      $("p.dates.meta").after("<div id='download'></div>");
    }
    else{
      $("#download").html("");
    }
    return $("#download");
  }
  
  
  var render_errros = function(error, els){
    var $ul = $("ul#errors");
    var li = null;
    if($ul.length <= 0){
      $("form#form_options").before("<ul id='errors'></ul>");
      $ul = $("ul#errors");
    }
    li = '<li>' + error + '</li>';
    for(var x = 0; x < els.length; x = x + 1){
      $("#" + els[x]).prev().addClass("error");
    }
    $ul.append(li);
    $("#spinner div").remove();
    return false;
  }
  
  $.fn.spin = function(opts) {
    this.each(function() {
      var $this = $(this), spinner = $this.data('spinner');

      if (spinner) spinner.stop();
      if (opts !== false) {
        opts = $.extend({color: $this.css('color')}, opts);
        spinner = new Spinner(opts).spin(this);
        $this.data('spinner', spinner);
      }
    });
    return this;
  };
  
  var generate_filename = function(){
    var dates = $("p.dates.meta span");
    var user = $("#user").attr("value");
    var from = $("#from-date").attr("value").replace("\/", "-", "g");
    var to = $("#to-date").attr("value").replace("\/", "-", "g");
    var name = "retweets_for_" + user + "_" + from + "_-_" + to + ".csv"; // +;
    return name;
  }
  var generate_data = function(){
    var data = "";
    $("table#tweet-table tr").each(function(){
      $(this).children().each(function(){
        var cell = $(this).html().replace('"', '\"', 'g');
        cell = cell.replace('\'', "\'", 'g');
        cell = cell.replace(/(<([^>]+)>)/ig,"");
        cell = Encoder.htmlDecode(cell);
        data = data + '"' + cell + '",';
      });
      data = data + "\n\r";
    });
    
    return data;
  }

});