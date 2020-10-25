import React from 'react';
import './assets/style.less';

type DialogInterface = {
    DIALOG_SHOW:boolean,
    DIALOG_TYPE:number
    DIALOG_HEADER:string;
    DIALOG_KEYS: Array<string>;
    DIALOG_TEXT: string;
}
const DIALOG_STYLE_MSGBOX	= 0;
const DIALOG_STYLE_INPUT = 1;
const DIALOG_STYLE_LIST	= 2;
const DIALOG_STYLE_PASSWORD = 3;
const DIALOG_STYLE_TABLIST = 4;
const DIALOG_STYLE_TABLIST_HEADERS = 5;

class Dialog extends React.Component<any, DialogInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            DIALOG_SHOW: true,
            DIALOG_TYPE: DIALOG_STYLE_MSGBOX,
            DIALOG_HEADER: "Заголовок",
            DIALOG_KEYS:['Закрыть'],
            DIALOG_TEXT:"Текст"
        }
    }   
    render() { 
        return <>
            <div className="dialog_main">
                <div className="dialog_blur" />
                    {/* <img className="dialog_ellipse" src={ellipse} /> */}
            </div>    
        </>;
    }
}

export default Dialog;