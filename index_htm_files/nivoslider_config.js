var xaraSwidgets_nivosliderTemplates = {

	entry:		'<img src="{image}" {titletag} />',

	
	main:		'<div class="slider-wrapper theme-default">'
				
				+'<div id="slider" class="nivoSlider">'
	
				+'{entries}'
				
				+'</div>'
				
				+'<div class="nivo-controlNavContainer">'
				
				+'</div>'
				
				+'</div>'
            
};

function xaraSwidgets_nivosliderGetScaledWidthNumber(container, num, min)
{
	return xaraSwidgets_nivosliderGetScaledNumber(container.width(), 610, num, min);
}

function xaraSwidgets_nivosliderGetScaledHeightNumber(container, num, min)
{
	return xaraSwidgets_nivosliderGetScaledNumber(container.height(), 440, num, min);
}

function xaraSwidgets_nivosliderGetScaledNumber(containerNum, originalNum, num, min)
{
	var ratio = containerNum / originalNum;
	
	var newNum = Math.round(ratio * num);
	
	if(min==null) { min = 1; }
	
	if(newNum<=min) { newNum = min; }
	
	return newNum;
}

function xaraSwidgets_nivosliderGetConfig(value, d)
{
	var ret = parseInt(value);
	
	if(!isNaN(ret))
	{
		return ret;
	}
	else
	{
		return d;
	}
}

function xaraSwidgets_nivosliderConstructor(divID, data)
{
	var widget = $('#' + divID);
	var container = widget.parent();
	
	widget.width(container.width()).height(container.height());
	
	var entryHTML = '';
	
	var config = data[0];
	
	var autoScroll = xaraSwidgets_nivosliderGetConfig(config.autoscroll, 10);
	var useTransition = xaraSwidgets_nivosliderGetConfig(config.effect, 1);
	
	var effects = [
'random',	
'random',
'sliceDown',
'sliceDownLeft',
'sliceUp',
'sliceUpLeft',
'sliceUpDown',
'sliceUpDownLeft',
'fold',
'fade',
'slideInRight',
'slideInLeft',
'boxRandom',
'boxRain',
'boxRainReverse',
'boxRainGrow',
'boxRainGrowReverse'
];

function htmlbr(str) {
	if (str == undefined)
	return '';
    var lines = str.split("\n");
    for (var t = 0; t < lines.length; t++) {
        lines[t] = $("<p>").text(lines[t]).html();
    }
    return lines.join("<br/>");
}
	var effectName = effects[useTransition];
	
	// loop through each entry in the array and compile the entry template for it
	for(var i=1; i<data.length; i++)
	{
		var entryData = data[i];
		data[i].caption = htmlbr(data[i].caption);
//		entryData.caption = entryData.caption.replace(/"/g, '\\"');
		
		if(entryData.caption.match(/\w/))
		{
			entryData.titletag = ' title="' + entryData.caption + '"';
		}
		
		entryHTML += xaraSwidgets_compileTemplate(xaraSwidgets_nivosliderTemplates.entry, entryData);
	}
	
	var mainData = {
		entries:entryHTML
	};
	
	var mainHTML = xaraSwidgets_compileTemplate(xaraSwidgets_nivosliderTemplates.main, mainData);
	
	widget.html(mainHTML);
	
	widget.find('.slider-wrapper').width(container.width()).height(container.height());
	
	var imgWidth = xaraSwidgets_nivosliderGetScaledWidthNumber(container, 600);
	var maxImgHeight = xaraSwidgets_nivosliderGetScaledWidthNumber(container, 400);
	
	var imgHeight = container.height() - 40;
	var navBottom = -4;
	
	if(imgHeight > maxImgHeight)
	{
		var gap = imgHeight - maxImgHeight;
		
		imgHeight = maxImgHeight;
		
		navBottom += gap;
	}
	
	widget.find('.nivoSlider').width(imgWidth).height(imgHeight).nivoSlider({
	
		pauseTime:autoScroll*1000,
		effect:effectName
		
	});
	
	widget.find('.nivoSlider').width(imgWidth).height(imgHeight);
	
	var navMargin = (container.width()/2) - (widget.find('.nivo-controlNav').width()/2);
	
	
	
	
	
	widget.find('.nivo-controlNav').appendTo(widget.find('.nivo-controlNavContainer')).css({
		
		'margin-left':navMargin + 'px',
		'bottom':navBottom + 'px'
		
	});
	
}
