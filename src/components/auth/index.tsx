import React from 'react';
import './assets/style.less';

import eye from './assets/openeye.svg';
import colse_eye from './assets/closeeye.svg';
import bg from './assets/bg.webp';
import { emitter, E_SHOW_LOGIN, E_SHOW_LOGIN_ERROR } from '../../event';
type ErrorInterface = {
    ERROR:number,
    MESSAGE:string
}
type GetError = {
    type: number,
    message: string
}
type AuthInterface = {
    AUTH_SHOW:boolean,
    AUTH_LOGIN:string,
    AUTH_PASS:string,
    AUTH_PASS_TYPE: boolean,
    AUTH_PASS_TYPE_BEFORE: boolean,
    AUTH_OPEN_EYE: number,
    REG_LOGIN:string,
    REG_PASS:string,
    REG_PASS_TYPE: boolean,
    REG_PASS_TYPE_BEFORE: boolean,
    REG_OPEN_EYE: number,
    REG_EMAIL:string,
    REG_REF:string,
    REG_RULES: string,
    PAGE: number,
    PAGE_LOADING: boolean,

    AUTH_LOGIN_error: string | null,
    AUTH_PASS_error: string | null,
    AUTH_LOGIN_error_text: string | null,
    AUTH_PASS_error_text: string | null,
    AUTH_LOGIN_error_anim: boolean,
    AUTH_PASS_error_anim: boolean,
    
    REG_LOGIN_error: string | null,
    REG_PASS_error: string| null,
    REG_EMAIL_error: string| null,
    REG_REF_error: string| null,
    REG_LOGIN_error_text: string| null,
    REG_PASS_error_text: string| null,
    REG_EMAIL_error_text: string| null,
    REG_REF_error_text: string| null,
    REG_LOGIN_error_anim: boolean,
    REG_PASS_error_anim: boolean,
    REG_EMAIL_error_anim: boolean,
    REG_REF_error_anim: boolean
}

const TYPE_HIDE           = 0,
      TYPE_REG            = 1,
      TYPE_LOGIN          = 2,

      ERROR_LOGIN         = 1,
      ERROR_PASS          = 2,
      ERROR_REGLOGIN      = 3,
      ERROR_REGPASS       = 4,
      ERROR_REGMAIL       = 5,
      ERROR_REGREF        = 6,

      INPUT_TYPE_LOGIN    = 1,
      INPUT_TYPE_PASS     = 2,
      INPUT_TYPE_REGLOGIN = 3,
      INPUT_TYPE_REGPASS  = 4,
      INPUT_TYPE_REGMAIL  = 5,
      INPUT_TYPE_REGREF   = 6;

class Auth extends React.Component<any, AuthInterface> {
    constructor(props: any) {
        super(props);
        this.state = {
            AUTH_SHOW: false,
            AUTH_LOGIN: "",
            AUTH_PASS:"",
            AUTH_PASS_TYPE: true,
            AUTH_PASS_TYPE_BEFORE: false,
            AUTH_OPEN_EYE: 0,
            REG_LOGIN:"",
            REG_PASS:"",
            REG_PASS_TYPE: false,
            REG_PASS_TYPE_BEFORE: false,

            REG_OPEN_EYE: 1,
            REG_EMAIL:"",
            REG_REF:"",
            REG_RULES: "",
            PAGE: TYPE_LOGIN,
            PAGE_LOADING: true,

            AUTH_LOGIN_error: null,
            AUTH_PASS_error: null,
            AUTH_LOGIN_error_text: null,
            AUTH_PASS_error_text: null,
            AUTH_LOGIN_error_anim: false,
            AUTH_PASS_error_anim: false,
                        
            REG_LOGIN_error: null,
            REG_PASS_error: null,
            REG_EMAIL_error: null,
            REG_REF_error: null,
            REG_LOGIN_error_text: null,
            REG_PASS_error_text: null,
            REG_EMAIL_error_text: null,
            REG_REF_error_text: null,
            REG_LOGIN_error_anim: false,
            REG_PASS_error_anim: false,
            REG_EMAIL_error_anim: false,
            REG_REF_error_anim: false
        }
    };
    unsubscribe = () => {};
    ubsubscribe_2 = () => {};    
    sendData = ( type: number ) => {
        let is_retun:boolean = false;
        switch( type ) {
            case TYPE_LOGIN:{
                if (this.state.AUTH_LOGIN.length < 3) { this.getError(ERROR_LOGIN, "Укажите логин"); is_retun = true }
                if (this.state.AUTH_PASS.length < 3) { this.getError(ERROR_PASS, "Укажите пароль"); is_retun = true; }
                if (is_retun) return;
                window.cef.emit( "cef:loginResponse", this.state.AUTH_LOGIN, this.state.AUTH_PASS );
                return;
            }
            case TYPE_REG:{
                if (this.state.REG_LOGIN.length < 3) { this.getError(ERROR_REGLOGIN, "Укажите логин"); is_retun = true }
                if (this.state.REG_PASS.length < 3) { this.getError(ERROR_REGPASS, "Укажите пароль"); is_retun = true; }
                if( !this.state.REG_EMAIL.match(/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm) ) {
                    this.getError(ERROR_REGMAIL, "Email указан неверно"); is_retun = true; 
                }
                if (is_retun) return;
                window.cef.emit( "cef:regResponse", this.state.REG_LOGIN, this.state.REG_PASS, this.state.REG_EMAIL, this.state.REG_REF);
                return;
            }
        }
    }
    showLogin = (data:string) => {
        let result:AuthInterface = JSON.parse(data, function(key, value) {  return value; });
        if( result.AUTH_SHOW === false ) window.cef.set_focus( false );
        else window.cef.set_focus( true );
        this.setState({...this.state, ...result });
    }
    getShow = ( page: number ) => { //Обновить показ
        if( page === TYPE_HIDE) {
            setTimeout( () =>  this.setState( { ...this.state, AUTH_SHOW: false } ), 1000);
            this.setState( { ...this.state, PAGE_LOADING: false } );
        } else {
            this.setState( { ...this.state,AUTH_SHOW:true, PAGE: page, PAGE_LOADING: false }, () => {
                setTimeout( () =>  this.setState( { ...this.state, PAGE_LOADING: true } ), 1000);
            } );
        }
        return;
    }
    getError = ( type:number, message:string ) => { // Получить ошибку
        switch( type ){
            case ERROR_LOGIN: {
                setTimeout( () =>  this.setState( { ...this.state, AUTH_LOGIN_error_text: message } ), 750);
                setTimeout( () =>  this.setState( { ...this.state, AUTH_LOGIN_error_anim: false } ), 1500);
                setTimeout( () =>  this.setState( { ...this.state, AUTH_LOGIN_error: this.state.AUTH_LOGIN, AUTH_LOGIN_error_anim: true } ), 0 );
                return;
            }
            case ERROR_PASS: {
                setTimeout( () =>  this.setState( { ...this.state, AUTH_PASS_error_text: message, AUTH_PASS_TYPE_BEFORE:this.state.AUTH_PASS_TYPE, AUTH_PASS_TYPE: true } ), 750);
                setTimeout( () =>  this.setState( { ...this.state, AUTH_PASS_error_anim: false } ), 1500);
                setTimeout( () =>  this.setState( { ...this.state, AUTH_PASS_error: this.state.AUTH_PASS, AUTH_PASS_error_anim: true } ), 0 );
                return;
            }
            case ERROR_REGLOGIN:{
                setTimeout( () =>  this.setState( { ...this.state, REG_LOGIN_error_text: message } ), 750);
                setTimeout( () =>  this.setState( { ...this.state, REG_LOGIN_error_anim: false } ), 1500);
                setTimeout( () =>  this.setState( { ...this.state, REG_LOGIN_error: this.state.REG_LOGIN, REG_LOGIN_error_anim: true } ), 0 );
                return;
            }
            case ERROR_REGPASS: {
                setTimeout( () =>  this.setState( { ...this.state, REG_PASS_error_text: message} ), 750);
                setTimeout( () =>  this.setState( { ...this.state, REG_PASS_error_anim: false } ), 1500);
                setTimeout( () =>  this.setState( { ...this.state, REG_PASS_error: this.state.REG_PASS, REG_PASS_error_anim: true } ), 0);
                return;
            }
            case ERROR_REGMAIL: {
                setTimeout( () =>  this.setState( { ...this.state, REG_EMAIL_error_text: message} ), 750);
                setTimeout( () =>  this.setState( { ...this.state, REG_EMAIL_error_anim: false } ), 1500);
                setTimeout( () =>  this.setState( { ...this.state, REG_EMAIL_error: this.state.REG_EMAIL, REG_EMAIL_error_anim: true } ), 0 );
                return;
            }
            case ERROR_REGREF: {
                setTimeout( () =>  this.setState( { ...this.state, REG_REF_error_text: message} ), 750);
                setTimeout( () =>  this.setState( { ...this.state, REG_REF_error_anim: false } ), 1500);
                setTimeout( () =>  this.setState( { ...this.state, REG_REF_error: this.state.REG_REF, REG_REF_error_anim: true } ), 0 );
                return;
            }
        }
        return;
    }
    inputLogin = ( e:React.ChangeEvent<HTMLInputElement> ) => {
        if( this.state.AUTH_LOGIN_error_text != null) return this.setState( { ...this.state, AUTH_LOGIN_error: null, AUTH_LOGIN_error_text: null  } );
        let validator = e.target.value.match(/^[a-zA-Z0-9_-]{0,24}$/i);
        if( validator) this.setState( { ...this.state, AUTH_LOGIN: e.target.value, AUTH_LOGIN_error:null } );
    }
    inputPass = ( e:React.ChangeEvent<HTMLInputElement> ) => {
        if( this.state.AUTH_PASS_error_text != null) return this.setState( { ...this.state, AUTH_PASS_error: null, AUTH_PASS_error_text: null  } );
        if( e.target.value.length < 24 ) this.setState( { ...this.state, AUTH_PASS: e.target.value, AUTH_PASS_error: null } );
    }

    inputRegLogin = ( e:React.ChangeEvent<HTMLInputElement> ) => {
        if( this.state.REG_LOGIN_error_text != null) return this.setState( { ...this.state, REG_LOGIN_error: null, REG_LOGIN_error_text: null } );
        let validator = e.target.value.match(/^[a-zA-Z0-9_-]{0,24}$/i);
        if( validator) this.setState( { ...this.state, REG_LOGIN: e.target.value, REG_LOGIN_error:null } );
    }
    inputRegPass = ( e:React.ChangeEvent<HTMLInputElement> ) => {
        if( this.state.REG_PASS_error_text != null) return this.setState( { ...this.state, REG_PASS_error: null, REG_PASS_error_text: null } );
        if( e.target.value.length < 24 ) this.setState( { ...this.state, REG_PASS: e.target.value, REG_PASS_error: null } );
    }
    inputRegEmail = ( e:React.ChangeEvent<HTMLInputElement> ) => {
        if( this.state.REG_EMAIL_error_text != null) return this.setState( { ...this.state, REG_EMAIL_error: null, REG_EMAIL_error_text: null  } );
        if( e.target.value.length < 30 ) this.setState( { ...this.state, REG_EMAIL: e.target.value, REG_EMAIL_error: null, REG_EMAIL_error_text: null } );
    }
    inputRegRef = ( e:React.ChangeEvent<HTMLInputElement> ) => {
        if( this.state.REG_REF_error_text != null) return this.setState( { ...this.state, REG_REF_error: null, REG_REF_error_text: null  } );
        let validator = e.target.value.match(/^[a-zA-Z0-9_-]{0,24}$/i);
        if( validator) this.setState( { ...this.state, REG_REF: e.target.value, REG_REF_error: null, REG_REF_error_text: null } );
    }
    gotoReg = ( page:number ) => {
        this.setState( { ...this.state, PAGE_LOADING: false } );
        setTimeout( () =>  {
            this.setState({ ...this.state, PAGE: page, PAGE_LOADING: false }, () => {
                setTimeout(() => {
                    this.setState({ ...this.state, PAGE: page, PAGE_LOADING: true })
                }, 100)
            })
        }, 1000);
    }  
    openPass = (type:number) => {
        switch( type ) {
            case TYPE_LOGIN: {
                setTimeout( () =>  this.setState( { ...this.state, AUTH_PASS_TYPE: !this.state.AUTH_PASS_TYPE } ), 400);
                this.setState( { ...this.state, AUTH_OPEN_EYE: this.state.AUTH_OPEN_EYE > 0 ? 0 : this.state.AUTH_OPEN_EYE+1, AUTH_PASS_error_text: null} );
                return;
            }
            case TYPE_REG: {
                setTimeout( () =>  this.setState( { ...this.state, AUTH_PASS_TYPE: !this.state.AUTH_PASS_TYPE } ), 400);
                this.setState( { ...this.state, REG_OPEN_EYE: this.state.REG_OPEN_EYE > 0 ? 0 : this.state.REG_OPEN_EYE+1 } );
                return;
            }
        }
    }

    clickInputBox = ( type:number ) => {
        switch( type ) {
            case INPUT_TYPE_LOGIN: 
            {
                setTimeout( () =>  this.setState( { ...this.state, AUTH_LOGIN_error_text: null } ), 750 );
                setTimeout( () =>  this.setState( { ...this.state, AUTH_LOGIN_error_anim: false } ), 1500 );
                return this.setState( { ...this.state, AUTH_LOGIN_error_anim: true  } );
            }
            case INPUT_TYPE_PASS: {
                setTimeout( () =>  this.setState( { ...this.state, AUTH_PASS_error_text: null, AUTH_PASS_TYPE: this.state.AUTH_PASS_TYPE_BEFORE } ), 750);
                setTimeout( () =>  this.setState( { ...this.state, AUTH_PASS_error_anim: false } ), 1500);
                return this.setState( { ...this.state, AUTH_PASS_error_anim: true  } );
            }
            case INPUT_TYPE_REGLOGIN: 
            {
                setTimeout( () =>  this.setState( { ...this.state, REG_LOGIN_error_text: null } ), 750);
                setTimeout( () =>  this.setState( { ...this.state, REG_LOGIN_error_anim: false } ), 1500);
                return this.setState( { ...this.state, REG_LOGIN_error_anim: true  } );
            }
            case INPUT_TYPE_REGPASS:{
                setTimeout( () =>  this.setState( { ...this.state, REG_PASS_error_text: null } ), 750);
                setTimeout( () =>  this.setState( { ...this.state, REG_PASS_error_anim: false  } ), 1500);
                return this.setState( { ...this.state, REG_PASS_error_anim: true  } );
            }
            case INPUT_TYPE_REGMAIL: {
                setTimeout( () =>  this.setState( { ...this.state, REG_EMAIL_error_text: null } ), 750);
                setTimeout( () =>  this.setState( { ...this.state, REG_EMAIL_error_anim: false } ), 1500);
                return this.setState( { ...this.state, REG_EMAIL_error_anim: true  } );
            }
            case INPUT_TYPE_REGREF: {
                setTimeout( () =>  this.setState( { ...this.state, REG_REF_error_text: null } ), 750);
                setTimeout( () =>  this.setState( { ...this.state, REG_REF_error_anim: false } ), 1500);
                return this.setState( { ...this.state, REG_REF_error_anim: true  } );
            }
        }
    }    
    componentDidMount = () => {
        this.unsubscribe = emitter.subscribe(E_SHOW_LOGIN, ( data:any ) => this.showLogin(data));
        this.ubsubscribe_2 = emitter.subscribe(E_SHOW_LOGIN_ERROR, ( data:any ) => {
            let result:ErrorInterface = JSON.parse(data, function(key, value) {  return value; });
            this.getError( result.ERROR, result.MESSAGE );
        });
//        this.setState( { ...this.state, PAGE_LOADING: true  } );
    }
    componentWillUnmount = () => {
        this.unsubscribe();
        this.ubsubscribe_2();        
    }
    render() { 
        if(!this.state.AUTH_SHOW) return null;
        return <>
            <div className="auth_main">
                <div className="auth_pages">
                    <div className="auth_pages_top" style = {{opacity: this.state.PAGE === TYPE_LOGIN? 1 : 0.5}} onClick={() => this.gotoReg( TYPE_LOGIN )}><div/><h1>Авторизация</h1></div>
                    <div className="auth_pages_top" style = {{opacity: this.state.PAGE === TYPE_REG? 1 : 0.5}} onClick={() => this.gotoReg( TYPE_REG )}><div/><h1>Регистрация</h1></div>
                </div>
                <div className={`auth_login ${this.state.PAGE_LOADING ? "show": ""}`}>
                    <div className="auth_login_blur"/>
                    <div className="auth_bg">
                        <img src={bg} alt=""/>
                    </div>
                    {this.state.PAGE === TYPE_LOGIN ? 
                        <>
                                <div className="auth_box">
                                    <div className="auth_form_box">

                                        <h1>Авторизация</h1>
                                        <p>Войдите для того, чтобы начать игру</p>
                                        <div className={`auth_form_area ${this.state.AUTH_LOGIN_error !== null ? `auth_error`:``}`}>
                                            <p>Логин</p>
                                            <input onClick={ () => this.clickInputBox( INPUT_TYPE_LOGIN )} 
                                                className={ this.state.AUTH_LOGIN_error_anim === true ?  "auth_show_err" : "" } 
                                                type="text" value={this.state.AUTH_LOGIN !== null ? ( this.state.AUTH_LOGIN_error_text ? this.state.AUTH_LOGIN_error_text: this.state.AUTH_LOGIN ) : ""} 
                                                onChange={this.inputLogin}></input>
                                        </div>
                                        <div className={`auth_form_area ${this.state.AUTH_PASS_error !== null  ? `auth_error`:``}`}>
                                            <div className="auth_pass_area">
                                                <div>
                                                    <p>Пароль</p>
                                                    <input onClick={ () => this.clickInputBox( INPUT_TYPE_PASS )}
                                                        type={ this.state.AUTH_PASS_TYPE === false ? "password" : "text" } 
                                                        className={ this.state.AUTH_PASS_error_anim === true ?  "auth_show_err" : "" } 
                                                        value={this.state.AUTH_PASS !== null ? ( this.state.AUTH_PASS_error_text ? this.state.AUTH_PASS_error_text:  this.state.AUTH_PASS ) : ""} 
                                                        onChange={this.inputPass} autoFocus={this.state.AUTH_LOGIN !== null ? true:false}></input>
                                                </div>   
                                                <img className={this.state.AUTH_OPEN_EYE !== -1 ? ( this.state.AUTH_OPEN_EYE ? "auth_eye_open":"auth_eye_close") : ""} 
                                                    src={ (this.state.AUTH_PASS_error_text ? this.state.AUTH_PASS_TYPE_BEFORE :this.state.AUTH_PASS_TYPE) === false ? colse_eye : eye} 
                                                    onClick={()=>this.openPass(TYPE_LOGIN)} alt=""></img>
                                            </div>
                                        </div>
                                        <div className="auth_form_key" onClick={()=>this.sendData( TYPE_LOGIN )}>
                                            <p>Играть</p>
                                        </div>

                                    </div>
                                </div>
                        </>: null }
                        {this.state.PAGE === TYPE_REG ? 
                        <>
                                <div className="auth_box">
                                    <div className="auth_form_box">

                                        <h1>Регистрация</h1>
                                        <p>Введите все необходимые данные<br/>для регистрации вашего аккаунта</p>
                                        <div className={`auth_form_area ${this.state.REG_LOGIN_error !== null ? `auth_error`:``}`}>
                                            <p>Логин</p>
                                            <input onClick={ () => this.clickInputBox( INPUT_TYPE_REGLOGIN )} 
                                                className={ this.state.REG_LOGIN_error_anim === true ?  "auth_show_err" : "" } 
                                                type="text" value={this.state.REG_LOGIN !== null ? ( this.state.REG_LOGIN_error_text ? this.state.REG_LOGIN_error_text: this.state.REG_LOGIN ) : ""} 
                                                onChange={this.inputRegLogin}></input>
                                        </div>
                                        <div className={`auth_form_area ${this.state.REG_PASS_error !== null ? `auth_error`:``}`}>
                                            <p>Пароль</p>
                                            <input onClick={ () => this.clickInputBox( INPUT_TYPE_REGPASS )} 
                                                className={ this.state.REG_PASS_error_anim === true ?  "auth_show_err" : "" } 
                                                type="text" value={this.state.REG_PASS !== null ? ( this.state.REG_PASS_error_text ? this.state.REG_PASS_error_text: this.state.REG_PASS ) : ""} 
                                                onChange={this.inputRegPass}></input>
                                        </div>
                                        <div className={`auth_form_area ${this.state.REG_EMAIL_error !== null ? `auth_error`:``}`}>
                                            <p>E-mail</p>
                                            <input onClick={ () => this.clickInputBox( INPUT_TYPE_REGMAIL )} 
                                                className={ this.state.REG_EMAIL_error_anim === true ?  "auth_show_err" : "" } 
                                                type="text" value={this.state.REG_EMAIL !== null ? ( this.state.REG_EMAIL_error_text ? this.state.REG_EMAIL_error_text: this.state.REG_EMAIL ) : ""} 
                                                onChange={this.inputRegEmail}></input>
                                        </div>
                                        <div className={`auth_form_area ${this.state.REG_REF_error !== null ? `auth_error`:``}`}>
                                            <p>Пригласивший игрок ( Оставьте пустым при отсутствии )</p>
                                            <input onClick={ () => this.clickInputBox( INPUT_TYPE_REGREF )} 
                                                className={ this.state.REG_REF_error_anim === true ?  "auth_show_err" : "" } 
                                                type="text" value={this.state.REG_REF !== null ? ( this.state.REG_REF_error_text ? this.state.REG_REF_error_text: this.state.REG_REF ) : ""} 
                                                onChange={this.inputRegRef}></input>
                                        </div>

                                        <div className="auth_form_key" onClick={()=>this.sendData( TYPE_REG )}>
                                                <p>Регистрация</p>
                                        </div>
                                    </div>
                                </div>
                        </>: null }
                </div>

            </div>
        </>
    }    
}
export default Auth;