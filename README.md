# Fasih-Carousel
A jQuery plugin to make a image slider that cascades its child element, like accordion.

Fasih Carousel is used to make a carousel of images in easiest way. Currently there is just one possible option for configuration, Pause Duration. We will update the configuration and option more in the future (maybe).

How to configure the Pause Duration?

There is 3 way to do it :

1. Manually change the pauseDuration in tcs.js from 4800 to what do you want in micro second
```
		options = $.extend({
			"pauseDuration": 4800 // The default waiting time before the slide slides. If DATA-PAUSE attribute is present in the slide element, then this option is deferred.
		}, options);
```
2. Add extra JS in your webpage 
```
<TABLE ID="slider">
  <TR>
    <TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&21776);"></TD>
    <TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&92488);"></TD>
    <TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&22694);"></TD>
    <TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&85209);"></TD>
    <TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&57642);"></TD>
    <TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&12052);"></TD>
  </TR>
</TABLE>
<SCRIPT>
  $("#slider").theCascadingSlider({pauseDuration: 4800}); // default slide duration is 4800ms
</SCRIPT>
```
3. Using attrribut in your slide element (DATA-PAUSE)
```
<TABLE ID="slider">
  <TR>
    <TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&92488);" DATA-FOLDED-CENTRE="25%"></TD><!--When inactive, the centre of the background image is the 25% part from its left-->
    <TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&22694);"></TD>
    <TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&85209);" DATA-PAUSE="6400"></TD><!--Slide will change after 6400ms-->
    <TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&57642);"></TD>
    <TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&12052);"></TD>
  </TR>
</TABLE>
```
