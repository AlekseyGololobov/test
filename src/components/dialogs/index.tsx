import React from 'react';
import './assets/style.less';
// import ellipse from './assets/ellipse.svg';
import { ReplaceRGB, rgbSelector } from '../../CEF';
import { E_GET_DIALOG_TEXT, E_GET_DIALOG, emitter } from '../../event';
import Particles from 'react-particles-js';

type DialogInterface = {
    DIALOG_SHOW:boolean,
    DIALOG_TYPE:number
    DIALOG_HEADER:string;
    DIALOG_KEYS: Array<string>;
    DIALOG_TEXT: string;
    DIALOG_INPUT?: string;
    DIALOG_LISTS?: number;
    DIALOG_ITEM?: number;
    DIALOG_KEY: number;
}
const DIALOG_STYLE_MSGBOX	= 0;
const DIALOG_STYLE_INPUT = 1;
const DIALOG_STYLE_LIST	= 2;
const DIALOG_STYLE_PASSWORD = 3;
const DIALOG_STYLE_TABLIST = 4;
const DIALOG_STYLE_TABLIST_HEADERS = 5;

const MAX_INPUT_LENGTH = 144;

//cef_dialog("{\"DIALOG_HEADER\":\"TEST\"}")
class Dialog extends React.Component<any, DialogInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            DIALOG_SHOW: false,
            DIALOG_TYPE: DIALOG_STYLE_LIST,//DIALOG_STYLE_TABLIST_HEADERS,
            DIALOG_HEADER: "{FFF0FF}Транспорт компании",
            DIALOG_KEYS:['','Закрыть'],
            DIALOG_TEXT:"1. Статистика<br>2. Статистика<br>3. Статистика",
            // DIALOG_TEXT: "{FFFFFF}Транспорт<tbl>{FFFFFF}Доступ<tbl>{FFFFFF}Тех.обслуживание через<tbl>{FFFFFF}Использование\
            // <br>Модель 1<tbl>Свободно<tbl>100 рейсов.<tbl>---\
            // <br>Модель 2<tbl>Аренда ({39B064}$500/ч{FFFFFF})<tbl>100 рейсов.<tbl>---\
            // <br>Модель 3<tbl>Свободно<tbl>200 рейсов.<tbl>Player Name\
            // <br>Модель 4<tbl>Свободно<tbl>200 рейсов.<tbl>---\
            // <br>Модель 5<tbl>Свободно<tbl>200 рейсов.<tbl>Player Name\
            // <br>Модель 6<tbl>Свободно<tbl>200 рейсов.<tbl>---\
            // <br>Модель 7<tbl>Свободно<tbl>200 рейсов.<tbl>---\
            // <br>Модель 8<tbl>Свободно<tbl>200 рейсов.<tbl>---\
            // <br>Модель 9<tbl>Свободно<tbl>200 рейсов.<tbl>---\
            // <br>Модель 10<tbl>Свободно<tbl>200 рейсов.<tbl>---\
            // <br>Модель 11<tbl>Свободно<tbl>200 рейсов.<tbl>---\
            // ",
            // DIALOG_TEXT:"1. Мобильный телефон<tbl>{00CC00}170$\
            // <br>2. Изменить {FFFFFF}номер<tbl><tbl>{00CC00}от 450$\
            // <br>3. Изменить цвет телефона<tbl>{00CC00}200$\
            // <br>4. Аптечка<tbl><tbl><tbl>{00CC00}150$\
            // <br>5. Фотоаппарат (15 снимков)<tbl>{00CC00}200$\
            // <br>6. Букет цветов<tbl><tbl>{00CC00}150$\
            // <br>7. Трость<tbl><tbl><tbl>{00CC00}600$\
            // <br>8. Парашют<tbl><tbl><tbl>{00CC00}800$\
            // <br>9. Лотерейный билет<tbl><tbl>{00CC00}400$\
            // <br>10. Маска<tbl><tbl><tbl>{00CC00}110$\
            // <br>11. Балончик<tbl><tbl><tbl>{00CC00}300$\
            // <br>12. Ремкомплект<tbl><tbl>{00CC00}1000$",
            DIALOG_INPUT: "",
            DIALOG_LISTS: 0,
            DIALOG_ITEM: 0,
            DIALOG_KEY:0
        }
    };
    unsubscribe = () => {};
    ubsubscribe_2 = () => {};
    responseDialog = (key:number, list?:number) => {
        //if(key === 0) 
        window.cef.set_focus( false );
        this.setState({...this.state, DIALOG_SHOW:false});
        console.log(key, list !== undefined ? list : this.state.DIALOG_ITEM, this.state.DIALOG_INPUT);
        window.cef.emit( "cef:dialogResponse", key, list !== undefined ? list : this.state.DIALOG_ITEM, this.state.DIALOG_INPUT );
        return;
    } 
    inputText = (text:string) => {
        if(!this.state.DIALOG_SHOW) return null;
        if( text.length > MAX_INPUT_LENGTH ) return null;
        this.setState({...this.state, DIALOG_INPUT:text});
        return;
    }
    handleKeyDown = (e:any) => {
        if(!this.state.DIALOG_SHOW) return null;
        switch( e.keyCode ) {
            case 13: {
                return this.responseDialog( 1 );
            }
            case 27: {
                return this.responseDialog( 0 );
            }
            case 40: { //down
                if( this.state.DIALOG_TYPE < DIALOG_STYLE_LIST ) return;
                if( this.state.DIALOG_ITEM !== undefined && this.state.DIALOG_LISTS !== undefined &&  this.state.DIALOG_ITEM+1 < this.state.DIALOG_LISTS ) {
                    this.setState({...this.state, DIALOG_ITEM: this.state.DIALOG_ITEM+1});
                    if( (document.querySelector as any)('.dialog_items .dialog_item_select')) (document.querySelector as any)('.dialog_items .dialog_item_select').scrollIntoView({ block: 'center' });
                }
                return;
            }
            case 38: { //up
                if( this.state.DIALOG_TYPE < DIALOG_STYLE_LIST ) return;
                if( this.state.DIALOG_ITEM !== undefined && this.state.DIALOG_LISTS !== undefined &&  this.state.DIALOG_ITEM > 0 ) {
                    this.setState({...this.state, DIALOG_ITEM: this.state.DIALOG_ITEM-1});
                    if( (document.querySelector as any)('.dialog_items .dialog_item_select')) (document.querySelector as any)('.dialog_items .dialog_item_select').scrollIntoView({ block: 'center' });
                }
                return;
            }
        }
    }
    showDialog = (data:string) => {
        let result:DialogInterface = JSON.parse(data, function(key, value) {  return value; });
        console.log( data );
        this.setState({...this.state, ...result, DIALOG_LISTS:(result.DIALOG_TEXT).split('<br>').length, DIALOG_INPUT:"", DIALOG_ITEM: 0});
        window.cef.set_focus( true );
        if( (document.querySelector as any)('.dialog_items .dialog_item_select')) (document.querySelector as any)('.dialog_items .dialog_item_select').scrollIntoView({ block: 'center' });

    }
    addText = (text:string) => {
        this.setState( { ...this.state, DIALOG_TEXT:this.state.DIALOG_TEXT+text, DIALOG_LISTS:(this.state.DIALOG_TEXT+text).split('<br>').length} );
      }
    componentDidMount = () => {
        document.addEventListener('keydown', this.handleKeyDown);
        this.unsubscribe = emitter.subscribe(E_GET_DIALOG_TEXT, ( data:any ) => this.addText(data));
        this.ubsubscribe_2 = emitter.subscribe(E_GET_DIALOG, ( data:any ) => this.showDialog(data));
        this.setState( { ...this.state,  DIALOG_LISTS:(this.state.DIALOG_TEXT).split('<br>').length} );
    }
    componentWillUnmount = () => {
        document.removeEventListener('keydown', this.handleKeyDown);
        this.unsubscribe();
        this.ubsubscribe_2();
    }
    hoverKey = (key:number) => {
        this.setState({...this.state, DIALOG_KEY:key});
    }
    render() { 
        if(!this.state.DIALOG_SHOW) return null;
        return <>
            <div className="dialog_main">
                <div className="dialog_blur" />
                <div className="dialog_black" >
                {/*<Particles
                     params={{
                        "particles": {
                            "number": {
                                "value": 20,
                                "density": {
                                    "enable": false
                                }
                            },
                            "size": {
                                "value": 8,
                                "random": true,
                                "anim": {
                                    "speed": 6,
                                    "size_min": 1.3
                                }
                            },
                            "line_linked": {
                                "enable": false
                            },
                            "move": {
                                "random": true,
                                "speed": 1,
                                "direction": "top",
                                "out_mode": "out"
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "bubble"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            },
                            "modes": {
                                "bubble": {
                                    "distance": 250,
                                    "duration": 2,
                                    "size": 0,
                                    "opacity": 0
                                },
                                "repulse": {
                                    "distance": 400,
                                    "duration": 4
                                }
                            }
                        }
                    }} />  */}                  
                </div>
                {/* <img className="dialog_ellipse" src={ellipse} alt=""/>  */}
                <div className="dialog_box">
                    {DialogData(this.state, this.responseDialog,this.inputText, this.hoverKey)}
                </div>
            </div>    
        </>;
    }
}

export default Dialog;

const DialogData = ( data:DialogInterface, 
                     responseDialog: (key:number, list?:number)=>void, 
                     inputText: (text:string) => void, 
                     hoverKey:(key:number)=>void ) => {
    switch(data.DIALOG_TYPE) { 
        case DIALOG_STYLE_MSGBOX: {
            return <>
                <h1>{data.DIALOG_HEADER.replace(/\s*\{.*?\}\s*/g, '').trim()}</h1>
                <h2 dangerouslySetInnerHTML={{__html: ReplaceRGB( data.DIALOG_TEXT )}}></h2>
                <div className="dialog_keys">
                    {data.DIALOG_KEYS.map( (map, index) => {
                        if( map.length < 1 ) return null;
                        return <div key={index} className={`dialog_key ${data.DIALOG_KEY === index ? `dialog_key_select`: ``}`} onMouseEnter={()=>hoverKey(index)} onClick={()=>responseDialog(index)}>{map}</div>
                    })}
                </div>
            </>
        }
        case DIALOG_STYLE_INPUT:
        case DIALOG_STYLE_PASSWORD: {
            return <>
                <h1>{data.DIALOG_HEADER.replace(/\s*\{.*?\}\s*/g, '').trim()}</h1>
                <h2 dangerouslySetInnerHTML={{__html: ReplaceRGB( data.DIALOG_TEXT )}}></h2>
                <input value={data.DIALOG_INPUT} onChange={(e:any) => inputText(e.target.value)} autoFocus={true}></input>
                <div className="dialog_keys">
                    {data.DIALOG_KEYS.map( (map, index) => {
                        if( map.length < 1 ) return null;
                        return <div key={index} className={`dialog_key ${data.DIALOG_KEY === index ? `dialog_key_select`: ``}`} onMouseEnter={()=>hoverKey(index)} onClick={()=>responseDialog(index)}>{map}</div>
                    })}
                </div>
            </>
        }
        case DIALOG_STYLE_TABLIST:
        case DIALOG_STYLE_TABLIST_HEADERS:
        case DIALOG_STYLE_LIST: {
            const spit = data.DIALOG_TEXT.split('<br>'),
                filterNull = spit.filter(text => text.length > 0),
                listProps = filterNull.map( text => rgbSelector( text ));                        
            return <>
                <h1>{data.DIALOG_HEADER.replace(/\s*\{.*?\}\s*/g, '').trim()}</h1>
                <div className="dialog_items">
                {listProps.map( (list, index) =>  { 
                      let col = list.split('<tbl>');
                      let ListText = col.map( (coltext, colnum) => 
                        <div key={colnum}><span dangerouslySetInnerHTML={{__html: coltext}}></span></div> 
                      )
                      if( !index ) {
                        if( data.DIALOG_TYPE === DIALOG_STYLE_TABLIST_HEADERS ) {
                          return <div className="dialog_item_box" key={index}><div className = "dialog_item_head" style={{gridTemplateColumns: `repeat(${col.length}, 1fr)`}}>{ListText}</div></div>      
                        }
                      }
                      let click = () => { 
                        responseDialog(1, data.DIALOG_TYPE === DIALOG_STYLE_TABLIST_HEADERS? (index-1):index);
//                        props.sendToServer( 1, props.state.type === DIALOG_STYLE_TABLIST_HEADERS? (index-1):index);
//                        clickClose(); 
                      }
                      if( data.DIALOG_ITEM === ( data.DIALOG_TYPE === DIALOG_STYLE_TABLIST_HEADERS? (index-1):index ) ) {
                        return <div className = {`dialog_item_box`}><div className = {`dialog_item dialog_item_select`} style={{gridTemplateColumns: `repeat(${col.length}, 1fr)`}} onClick={click}
                                  key={index}>{ListText}</div></div>    
                      } 
                      return <div className = {`dialog_item_box`}><div className = "dialog_item" style={{gridTemplateColumns: `repeat(${col.length}, 1fr)`}} onClick={click}
                                 key={index}>{ListText}</div></div>     
                    } ) 
                }              
                </div>   
                <div className="dialog_keys">
                    {data.DIALOG_KEYS.map( (map, index) => {
                        if( map.length < 1 ) return null;
                        return <div key={index} className={`dialog_key ${data.DIALOG_KEY === index ? `dialog_key_select`: ``}`} onMouseEnter={()=>hoverKey(index)} onClick={()=>responseDialog(index)}>{map}</div>
                    })}
                </div>
            </>
        }
    }
}