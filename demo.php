<STYLE>
	.nrm-slider {
		width: 100%;
		min-height: 400px;
		border-collapse: collapse;
	}

	.nrm-slider td {
		background-size: cover;
		background-position-x: 30%;
		background-position-y: 50%;
		background-repeat: no-repeat;
		transition-property: all;
		transition-duration: 0.6s;
		transition-timing-function: ease-out;
		transition-delay: 0s;
	}

	.nrm-slider td:hover:not(.shown) {
		cursor: pointer;
		opacity: 0.6;
	}

	.nrm-slider td > * {
		display: none;
	}

	.nrm-slider td.shown > * {
		display: block;
	}
</STYLE>
<TABLE ID="slider">
	<TR>
		<TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&<?php print(mt_rand(10000, 99999)); ?>);"></TD>
		<TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&<?php print(mt_rand(10000, 99999)); ?>);" DATA-FOLDED-CENTRE="25%"></TD>
		<TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&<?php print(mt_rand(10000, 99999)); ?>);"></TD>
		<TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&<?php print(mt_rand(10000, 99999)); ?>);" DATA-PAUSE="6400"></TD>
		<TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&<?php print(mt_rand(10000, 99999)); ?>);"></TD>
		<TD CLASS="" STYLE="background-image: url(https://picsum.photos/800/400/?random&<?php print(mt_rand(10000, 99999)); ?>);"></TD>
	</TR>
</TABLE>
<SCRIPT TYPE="application/javascript" SRC="https://code.jquery.com/jquery-3.3.1.min.js"></SCRIPT>
<SCRIPT TYPE="application/javascript" SRC="tcs.js"></SCRIPT>