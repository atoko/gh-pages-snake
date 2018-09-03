const touch = (() => {
    let stickX = 0;
    let stickY = 0;
    let baseX = 0;
    let baseY = 0;
    let pressed = false;
    let touchIdx = null;


    const deltaX = () => { return stickX - baseX; }
    const deltaY = () => { return stickY - baseY; }

    const up = () => {
        let dX	= deltaX();
        let dY	= deltaY();
        if( dY >= 0 ) return false;
        if( Math.abs(dX) > 2 * Math.abs(dY) ) return false;
        return true;
    }
    const down = () => {
        let dX	= deltaX();
        let dY	= deltaY();
        if( dY <= 0 ) return false;
        if( Math.abs(dX) > 2 *Math.abs(dY) ) return false;
        return true;	
    }
    const right	= function(){
        let dX	= deltaX();
        let dY	= deltaY();
        if( dX <= 0 ) return false;
        if( Math.abs(dY) > 2*Math.abs(dX) )	return false;
        return true;	
    }
    const left	= function(){
        var dX	= deltaX();
        var dY	= deltaY();
        if( dX >= 0 ) return false;
        if( Math.abs(dY) > 2*Math.abs(dX) )	return false;
        return true;	
    }    


    const onUp	= () => {
        pressed	= false;         
        baseX = baseY = 0;
        stickX = stickY	= 0;
    }
    
    const onDown = (x, y) => {
        pressed	= true; 
        baseX = x;
        baseY = y;
        
        stickX = x;
        stickY = y;
    }
    
    const onMove = (x, y) => {
        if(pressed === true) {
            stickX = x;
            stickY = y;
        }	
    }

    const preventIfNotButton = (event) => {
        if (event.target.tagName !== "BUTTON") {
            event.preventDefault();
        }
    }
    
    const onTouchStart = (event) => {
        // if there is already a touch inprogress do nothing
        if( touchIdx !== null )	return;
        
        preventIfNotButton(event);

        // get the first who changed
        var touch	= event.changedTouches[0];
        // set the touchIdx of this joystick
        touchIdx = touch.identifier;
    
        // forward the action
        var x = touch.pageX;
        var y = touch.pageY;
        onDown(x, y)
    }
    
    const onTouchEnd = (event) => {
        // if there is no touch in progress, do nothing
        if( touchIdx === null )	return;
    
         // try to find our touch event
        var touchList = event.changedTouches;
        for(var i = 0; i < touchList.length && touchList[i].identifier !== touchIdx; i++);
        // if touch event isnt found, 
        if( i === touchList.length)	return;
    
        touchIdx = null;    
        preventIfNotButton(event);

        onUp()
    }
    
    const onTouchMove	= (event) => {
        // if there is no touch in progress, do nothing
        if( touchIdx === null )	return;
    
        // try to find our touch event
        var touchList	= event.changedTouches;
        for(var i = 0; i < touchList.length && touchList[i].identifier !== touchIdx; i++ );
        // if touch event with the proper identifier isnt found, do nothing
        if( i === touchList.length)	return;
        var touch	= touchList[i];
    
        preventIfNotButton(event);
    
        var x = touch.pageX;
        var y = touch.pageY;
        return onMove(x, y)
    }
    
    return {
        initialize: (element) => {
            element.addEventListener("touchstart", onTouchStart, { passive: false });
            element.addEventListener("touchmove", onTouchMove, { passive: false });
            element.addEventListener("touchend", onTouchEnd, { passive: false });    
        },
        teardown: (element) => {
            element.removeEventListener("touchstart", onTouchStart);
            element.removeEventListener("touchmove", onTouchMove);
            element.removeEventListener("touchend", onTouchEnd);    
        },
        poll: () => {
            if (up()) {
                input.up();
            }
            if (down()) {
                input.down();
            }
            if (left()) {
                input.left();
            }
            if (right()) {
                input.right();
            }                    
        }
    }
})()