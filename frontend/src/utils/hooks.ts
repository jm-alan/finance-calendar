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
] as const;

const compose = (el: Element | Document, event: string): ListenComposer => (listener): ListenDestructor => {
  el.addEventListener(event, listener);
  return () => el.removeEventListener(event, listener);
};

const eventComposer = (el: Element | Document): EventListenerComposeObject => events.reduce(
  (
    acc: {
      [key in typeof events[number]]: ListenComposer;
    },
    next
  ) => {
    acc[next] = compose(document, next);
    return acc;
  }, {} as EventListenerComposeObject);

const documentListeners: EventListenerComposeObject = eventComposer(document);

export const useDocumentEvents = (): EventListenerComposeObject => documentListeners;
