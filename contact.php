<?php session_start(); ?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Jon Stevens Web Developer</title>
        <meta name="description" content="Jon Stevens, Web Designer and Developer">
        <meta name="viewport" content="width=device-width">
		<link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="css/animations.css">
        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    </head>
<body>

<div style="" class="clearfix mega-wrap">
        
		<div class="header-container">
            <header class="wrapper clearfix">
                <h1 class="title">Designer &amp; Developer</h1>
            </header>
        </div>
        
		<div class="main-container">		
			<div class="main wrapper clearfix contact">
				<article>
					<header>
						<h1>Contact</h1>
						<p>To get in touch, fill out the form..</p>
					</header>					

						<?php
						$to='deadparsnip@gmail.com';
						$messageSubject='message from designerdeveloper.co.uk';
						$confirmationSubject='Thanks for your email';
						$confirmationBody="Thanks for the email, I will get back to you.";
						$email='';
						$body='';
						$displayForm=true;
						if ($_POST){
						$email=stripslashes($_POST['email']);
						$body=stripslashes($_POST['body']);
						// validate e-mail address
						$valid=eregi('^([0-9a-z]+[-._+&])*[0-9a-z]+@([-0-9a-z]+[.])+[a-z]{2,6}$',$email);
						$crack=eregi("(\r|\n)(to:|from:|cc:|bcc:)",$body);
						if ($email && $body && $valid && !$crack){
						if (mail($to,$messageSubject,$body,'From: '.$email."\r\n")
						&& mail($email,$confirmationSubject,$confirmationBody.$body,'From: '.$to."\r\n")){
						$displayForm=false;?>
						<p> Your message was successfully sent.
						In addition, a confirmation copy was sent to your e-mail address.
						Your message is shown below. </p>
						<?php
						echo '<p>'.htmlspecialchars($body).'</p>';
						}else{ // the messages could not be sent
						?>
						<p> Something went wrong when the server tried to send your message.
						This is usually due to a server error, and is probably not your fault.
						I apologise for any inconvenience caused. </p>
						<?php
						}
						}else if ($crack){ // cracking attempt
						?>
						<p><strong> Your message contained e-mail headers within the message body.
						This seems to be a cracking attempt and the message has not been sent. </strong></p>
						<?php
						}else{ // form not complete
						?>
						<p><strong>Your message could not be sent. You must include both a valid e-mail address and a message. </strong></p>
						<?php
						}
						}
						if ($displayForm){
						?>
						<form action="contact.php" method="post" id="contact">
						<label for="email">Your e-mail address</label>
						<input type="email" name="email" id="email" required="required" placeholder="Email" value="<?php echo htmlspecialchars($email); ?>" size="30">
						<label for="body">Your message</label>
						<textarea name="body" required="required" id="body" cols="30" rows="5" placeholder="I think you are lovely"><?php echo htmlspecialchars($body); ?></textarea>
						<button type="submit" class="submit">Send message</button></td>
						</form>
						<?php
						}
						?>		
			
			
				</article>

				<aside>
					<h3>interessant</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sodales urna non odio egestas tempor. Nunc vel vehicula ante. Etiam bibendum iaculis libero, eget molestie nisl pharetra in. In semper consequat est, eu porta velit mollis nec. Curabitur posuere enim eget turpis feugiat tempor. Etiam ullamcorper lorem dapibus velit suscipit ultrices.</p>
				</aside>

			</div> <!-- #main -->				
			
        </div> <!-- #main-container -->
		
		<nav>
			<ul>
				<li><a href="index.html" data-num="one">about</a></li>
				<li><a href="index.html" data-num="two">work</a></li>
				<li><a href="index.html" data-num="technology">technology</a></li>
				<li><a href="index.html" data-num="contact" class="active">contact</a></li>
				<li><a href="index.html" data-num="cv">cv</a></li>
			</ul>
		</nav>	

		<aside class="findAside"></aside><aside class="top"></aside>
	</div>
	<a href="http://uk.linkedin.com/pub/jon-stevens/27/936/459" class="linkedIn">
	<img src="http://www.linkedin.com/img/webpromo/btn_liprofile_blue_80x15.png" width="80" height="15" style="float:right" alt="View Jon Stevens's profile on LinkedIn"></a>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.3.min.js"><\/script>')</script>

	<script src="http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.2.0.js"></script>
	<script defer="defer" src="js/viewModel.js"></script>
	<script>
$(document).ready(function () {	
	$('nav a').not('.contact').click(function (e) {    
		page = $(this).attr("data-num");
		$('nav a.active').removeClass('active');
		$(this).addClass('active');
		$('.main:visible').fadeOut(500);
		$('.main.' + page).fadeIn(900);
		if (typeof (Storage) !== "undefined") {
		  localStorage.page = page;
		} else {
		  window.location.hash = page;
		}
		window.location.url="http://www.designerdeveloper.co.uk/";
	})

  });
  
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('a.top').fadeIn();
      $('a.home').fadeOut();
      $('nav').addClass('fixed');
      $('.findAside').addClass('fixed');
      $('.top').fadeIn(300);
    } else {
      $('.top').fadeOut(300);
      $('a.home').fadeIn(400);
      $('nav').removeClass('fixed');
      $('.findAside').removeClass('fixed');
    }
  });
  $('.top').click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });
  $('.findAside').click(function () {
    $("html, body").animate({
      scrollTop: "+=250px"
    }, 600);
    return false;
  });
	</script>
</body>
</html>