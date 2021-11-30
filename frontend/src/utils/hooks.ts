const events = [
  'afterscriptexecute',
  'auxclick',
  'beforescriptexecute',
  'blur',
  'click',
  'compositionend',
  'compositionstart',
  'compositionupdate',
  'contextmenu',
  'copy',
  'cut',
  'dblclick',
  'DOMActivate',
  'DOMMouseScroll',
  'error',
  'focusin',
  'focusout',
  'focus',
  'fullscreenchange',
  'fullscreenerror',
  'gesturechange',
  'gestureend',
  'gesturestart',
  'keydown',
  'keypress',
  'keyup',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'mousewheel',
  'msContentZoom',
  'MSGestureChange',
  'MSGestureEnd',
  'MSGestureHold',
  'MSGestureStart',
  'MSGestureTap',
  'MSInertiaStart',
  'MSManipulationStateChanged',
  'paste',
  'scroll',
  'select',
  'show',
  'touchcancel',
  'touchend',
  'touchmove',
  'touchstart',
  'webkitmouseforcechanged',
  'webkitmouseforcedown',
  'webkitmouseforceup',
  'webkitmouseforcewillbegin',
  'wheel',
];

const compose = (el: Element | Document, event: string): ListenComposer => listener => {
  el.addEventListener(event, listener);
  return () => el.removeEventListener(event, listener);
};

export const useEventListener = (el: Element | Document): EventListenerComposeObject => {
  return events.reduce(
    (
      acc: {
        [key: string]: ListenComposer;
      },
      next
    ) => {
      acc[next] = compose(el, next);
      return acc;
    }, {}) as EventListenerComposeObject;
};
