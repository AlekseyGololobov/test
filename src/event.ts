export const E_GET_DIALOG = "cef:dialog";
export const E_GET_DIALOG_TEXT = "cef:dialogtext";
export const E_SHOW_LOGIN = "cef:login";
export const E_SHOW_LOGIN_ERROR = "cef:loginerror";
export const E_GET_STATS = "cef:stats";

const IsEmit:any = {};
class EventEmitter {
    constructor() {
      this.events = {};
    }
    events = {};
    emit(eventName:string, data:any) {
      const event = (this.events as any)[eventName];
      if( event ) {
        event.forEach((fn:any) => {
          fn.call(null, data);
        });
      }
    }
    
    subscribe(eventName:string, fn:any) {
      if(!(this.events as any)[eventName]) {
          if( !IsEmit[eventName]) {
              EmitCEF(eventName);
          }
//        console.log(this.events);
        (this.events as any)[eventName] = [];
      }
//      console.log( (this.events as any)[eventName], eventName );
      (this.events as any)[eventName].push(fn);
      return () => {
        (this.events as any)[eventName] =  (this.events as any)[eventName].filter((eventFn:any) => fn !== eventFn);
      }
    }
    
}
export let emitter = new EventEmitter();

if (window.cef === undefined) {
    window.cef = {
        on: () => 0,
        off: () => 0,
        emit: () => 0,
        set_focus: () => 0,
        hide: () => 0,
    };
  }
declare global {
    interface Window {
      cef: {
          on: ( event_name:string, callback: (data:any) => void ) => void;
          off: ( event_name:string, callback: (data:any) => void ) => void;
          emit: ( event_name:string, ...args: any[] ) => void;
          set_focus: (focused:boolean) => void;
          hide: (hide:boolean) => void;
      };
    }
}

export const EmitCEF = (call:string) => { 
    IsEmit[call] = true;
    let event_fn = (data:any) => {  emitter.emit( call, data);  }
    window.cef.on( call,  event_fn ); 
    (window as any)[call.replace(":","_")] = (data:any) => {
        event_fn( data );
    } 
}