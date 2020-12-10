import React, { useState, useEffect } from 'react';
import './assets/StaticUser.css';

import bg from './assets/bg1.svg';
import star from './assets/bg1.svg';
import phone from './assets/phone.png';
import { Line, Circle } from 'rc-progress';
import { emitter, E_GET_STATS } from '../../event';
/*
cef_stats("{\"show\": true, \"progress\": {\"sati\":50, \"hp\": 100, \"level\":1, \"exp\":1,\"maxexp\": 8,\"zakon\":50}, 
\"name\": \"Player Name\", \"age\": 18, \"indicators\": [ 10, 20, 30, 40 ,50 ,60], \"phone\": {\"number\": 1111, \"balance\": 123}, \"wanted\": 4 }")
*/
export const Static = () => {
   // ----- хуки -----
   type StatsInterface = {
      show: boolean,
      progress: {
         sati: number,
         hp: number,
         level: number,
         exp: number,
         maxexp: number,
         zakon: number
      },
      name: string,
      age: number,
      indicators: Array<number>,
      phone: {
         number: number,
         balance: number
      },
      wanted: number
   }

   const [state, setState] = useState( {
      show:true,
      progress: {
         sati: 0,
         hp: 100,
         level: 1,
         exp: 1,
         maxexp: 8,
         zakon: 50,
      },
      name: "Player Name",
      age: 24,
      indicators: [
         66, 10 , 10 , 20, 30, 40
      ],
      phone: {
         number: 1234,
         balance: 999,         
      },
      wanted: 3
   });
   const IndicatorsName = [ 'сила', 'наркотики', 'патроны', 'метал', 'маски', 'аптечки' ];

 
   const escKey = (e:any) => {
      if( e.keyCode == 27 ) closeStats();
   }      
   const closeStats = () => {
      setState( {...state, show: false });
      window.cef.set_focus( false );
   }
   const openSkill = () => {
      closeStats();
      window.cef.emit( "cef:openSkills" );
   }

   useEffect(() => {
      document.addEventListener('keydown', escKey); 
      const unsubscribe = emitter.subscribe(E_GET_STATS, ( data:any ) => {
         let result:StatsInterface = JSON.parse(data, function(key, value) {  return value; });
         console.log( data );
         setState( { ...state, ...result } );
         window.cef.set_focus( true );
      });
      return () => { 
         document.removeEventListener('keydown', escKey );
         unsubscribe();
      }
   }, [state]);
   
   // ------ функции разных событий ------

   const wantedLevel = () => {
      let result: JSX.Element[] = [];
      for (let id = 0; id < 5; id++) {
         result.push(<svg
               width="18"
               height="18"
               viewBox="0 0 18 18"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
               <g opacity="0.6">
                  <path
                     fill-rule="evenodd"
                     clip-rule="evenodd"
                     d="M3.59551 17.1885L9 14.3472L14.4045 17.1885L13.3723 11.1705L17.7446 6.90853L11.7022 6.03052L9 0.555176L6.29776 6.03052L0.255356 6.90853L4.62768 11.1705L3.59551 17.1885ZM12.4123 14.4463L9 12.6524L5.58771 14.4463L6.2394 10.6467L3.4788 7.95579L7.29386 7.40142L9 3.9444L10.7062 7.40142L14.5212 7.95579L11.7606 10.6467L12.4123 14.4463Z"
                     fill={ state.wanted > id ? '#E55E5E' : '#FFFFFF'}
                  />
               </g>
            </svg>
         );
      }

      return result;
   }


 
   const strokeWidth = 6; // что-то очень неожиданное
   const trailWidth = 6; // что-то очень неожиданное
   const trailColor = 'rgba(255, 255, 255,0.2)'; // что-то очень неожиданное
   if( state.show !== true ) return null;
   return (
      <div className="Static">
         <div className="Static_img">
            <div className="Static_Container">
               <div className="Static_Container-box1">
                  <div className="Container_Box-food-hp">

                           <div className="Container_Box-element">
                              <div className="Box-name">
                                 <p className="Box-name-text">Голод</p>
                              </div>
                              <div className="Box-circle">
                                 <span className="Box-procent">
                                    <p>{ state.progress.sati }%</p>
                                 </span>
                                 <Circle
                                    className="test"
                                    percent={  state.progress.sati  }
                                    strokeWidth={strokeWidth}
                                    strokeLinecap="round"
                                    strokeColor={ '#e04b4b' }
                                    trailWidth={trailWidth}
                                    trailColor={trailColor}
                                 />
                              </div>
                           </div>
                           <div className="Container_Box-element">
                              <div className="Box-name">
                                 <p className="Box-name-text">Здоровье</p>
                              </div>
                              <div className="Box-circle">
                                 <span className="Box-procent">
                                    <p>{ state.progress.hp }%</p>
                                 </span>
                                 <Circle
                                    className="test"
                                    percent={ state.progress.hp  }
                                    strokeWidth={strokeWidth}
                                    strokeLinecap="round"
                                    strokeColor={ '#7aca73'}
                                    trailWidth={trailWidth}
                                    trailColor={trailColor}
                                 />
                              </div>
                           </div>

                  </div>
               </div>
               <div className="Static_ober">
                  <div className="Static_Container-box2">
                     <div className="Container-box2-aboutMe">
                              <div className="Container-box2-column">
                              <div>
                                 <div className="box2-line">
                                    <span className="Box2-name">имя фамилия:</span>
                                    <div className="Box2-name1">{state.name}</div>
                                 </div>
                                 <div className="Box2-age">возраст:</div>
                                 <div className="Box2-age1">{state.age}</div>
                                 <div className="stars">
                                    {wantedLevel()}
                                 </div>
                              </div>
                              <div className="Box-circlee">
                                 <div className="oberee">
                                    <div className="ee">
                                       <span className="aa">
                                          <p>{state.progress.level}</p>
                                 <div className="lvl">{state.progress.exp}/{state.progress.maxexp}</div>
                                       </span>
                                       <Circle
                                          className="me-test"
                                          percent={ (state.progress.exp/state.progress.maxexp)*100.0 }
                                          strokeWidth={strokeWidth}
                                          strokeLinecap="round"
                                          strokeColor="#facf37"
                                          trailWidth={trailWidth}
                                          trailColor={trailColor}
                                       />
                                    </div>
                                    <div>
                                       <p className="gg">уровень</p>
                                    </div>
                                 </div>
                                 <div className="oberee">
                                    <div className="ee">
                                       <span className="aa-one">
                                          <p>{state.progress.zakon}</p>
                                       </span>
                                       <Circle
                                          className="me-test"
                                          percent={state.progress.zakon}
                                          strokeWidth={strokeWidth}
                                          strokeLinecap="round"
                                          strokeColor="#3791fa"
                                          trailWidth={trailWidth}
                                          trailColor={trailColor}
                                       />
                                    </div>
                                    <div>
                                       <p className="gg ">законопослушность</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                      </div>
                     <div className="Container_Cart-ober">
                        <div>
                           <div className="Container-box2-home">
                              <div className="Container-box-svg">
                                 <p className="box2-home">дом</p>
                                 <svg
                                    width="25"
                                    height="23"
                                    viewBox="0 0 25 23"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                       d="M12.5 0.875L25 12.125H21.25V22.125H15V14.625H10V22.125H3.75V12.125H0L12.5 0.875Z"
                                       fill="white"
                                    />
                                 </svg>
                              </div>
                              <div className="Container-street">
                                 <div className="street-text">vinewood street</div>
                                 <span className="street-text"># 254</span>
                              </div>
                           </div>
                           {/* <div className="Container-box2-fraction">фракция</div> */}
                           <div className="Container-box2-biz">
                              <div className="Container-box-svg">
                                 <p className="box2-home">бизнес</p>
                                 <svg
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0)">
                                       <path
                                          d="M15.625 6.771C15.05 6.771 14.5834 6.30433 14.5834 5.72933V4.16683H10.4167V5.72933C10.4167 6.30433 9.95001 6.771 9.37501 6.771C8.80001 6.771 8.33334 6.30433 8.33334 5.72933V4.16683C8.33334 3.01787 9.26772 2.0835 10.4167 2.0835H14.5834C15.7323 2.0835 16.6667 3.01787 16.6667 4.16683V5.72933C16.6667 6.30433 16.2 6.771 15.625 6.771Z"
                                          fill="white"
                                       />
                                       <path
                                          d="M13.2396 16.0207C13.0521 16.0936 12.7812 16.1457 12.5 16.1457C12.2187 16.1457 11.9479 16.0936 11.6979 15.9998L0 12.104V20.0519C0 21.6352 1.28125 22.9165 2.86458 22.9165H22.1354C23.7187 22.9165 25 21.6352 25 20.0519V12.104L13.2396 16.0207Z"
                                          fill="white"
                                       />
                                       <path
                                          d="M25 8.07308V10.4585L12.75 14.5418C12.6667 14.5731 12.5833 14.5835 12.5 14.5835C12.4167 14.5835 12.3333 14.5731 12.25 14.5418L0 10.4585V8.07308C0 6.48975 1.28125 5.2085 2.86458 5.2085H22.1354C23.7187 5.2085 25 6.48975 25 8.07308Z"
                                          fill="white"
                                       />
                                    </g>
                                    <defs>
                                       <clipPath id="clip0">
                                          <rect width="25" height="25" fill="white" />
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </div>
                              <div className="Container-street">
                                 <div className="street-text">у вас отсутствует</div>
                                 <span className="street-text">бизнес</span>
                              </div>
                           </div>
                        </div>
                        <div>
                           {/* <div className="Container-box2-biz">бизнес</div> */}
                           <div className="Container-box2-frac">
                              <div className="Container-box-svg">
                                 <p className="box2-home">фракция</p>
                                 <svg
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0)">
                                       <path
                                          d="M15.3809 8.83789C15.3809 9.64546 14.7236 10.3027 13.916 10.3027C13.5548 10.3027 13.208 10.1704 12.9396 9.93004C12.723 9.73778 12.414 9.69124 12.1523 9.80701C11.8883 9.92508 11.7188 10.1868 11.7188 10.4757V13.3333C11.4719 13.2668 11.216 13.2324 10.9556 13.2324C9.33972 13.2324 8.02594 14.5464 8.02594 16.1621C8.02594 17.7778 9.33972 19.0918 10.9556 19.0918C11.2173 19.0918 11.4712 19.0454 11.7188 18.9785V25H6.56109C6.15617 25 5.81055 24.6723 5.81055 24.2676V20.5566H3.63141C3.22648 20.5566 2.88087 20.229 2.88087 19.8242V16.1621H0.683604C0.440417 16.1621 0.213634 16.0412 0.0770674 15.8401C-0.0587358 15.6393 -0.0867739 15.3831 0.00344372 15.1579L1.95046 10.3363V8.10547C1.95046 3.66306 5.5647 0 10.0071 0H11.7188V7.19986C11.7188 7.48882 11.8883 7.7507 12.1523 7.86877C12.4155 7.98531 12.723 7.93877 12.9396 7.74574C13.208 7.50542 13.5548 7.37305 13.916 7.37305C14.7236 7.37305 15.3809 8.03032 15.3809 8.83789Z"
                                          fill="white"
                                       />
                                       <path
                                          d="M24.2187 16.1621H21.9726V19.8242C21.9726 20.229 21.6452 20.5566 21.2402 20.5566H19.043V24.2676C19.043 24.6723 18.7155 25 18.3105 25H13.1836V17.7721C13.1836 17.1654 12.417 16.8039 11.9526 17.2358C11.6808 17.4883 11.3268 17.627 10.9556 17.627C10.148 17.627 9.49077 16.9697 9.49077 16.1621C9.49077 15.3547 10.148 14.6973 10.9556 14.6973C11.3268 14.6973 11.6808 14.8361 11.9526 15.0887C12.1658 15.2866 12.4769 15.3397 12.7437 15.2237C13.0112 15.1072 13.1836 14.8432 13.1836 14.5521V11.6747C13.421 11.7361 13.6663 11.7676 13.916 11.7676C15.5317 11.7676 16.8457 10.4538 16.8457 8.83789C16.8457 7.22218 15.5317 5.9082 13.916 5.9082C13.6663 5.9082 13.421 5.93967 13.1836 6.00128V0H14.8645C19.3069 0 22.9212 3.66306 22.9212 8.10547V10.3363L24.8989 15.1579C24.9891 15.3831 24.9613 15.6393 24.8253 15.8403C24.6887 16.0412 24.4619 16.1621 24.2187 16.1621Z"
                                          fill="white"
                                       />
                                    </g>
                                    <defs>
                                       <clipPath id="clip0">
                                          <rect
                                             width="25"
                                             height="25"
                                             fill="white"
                                             transform="matrix(-1 0 0 1 25 0)"
                                          />
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </div>
                              <div className="Container-street">
                                 <div className="street-text">вы не состоите</div>
                                 <span className="street-text">во фракции</span>
                              </div>
                           </div>
                           <div className="Container-box2-nav">
                              <div className="Container-nav">
                                 <div className="Container-nav-lin">
                                    <div className="street-text-nav">ваши навыки</div>
                                    <span className="nav-text">и способности</span>
                                 </div>

                                 <button className="box2-nav-btn" onClick={openSkill}>показать</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="Container_Box3-ober">
                     <div className="Container-box3-bag">
                        <ul>
                           {state.indicators.map((arr, id) => {
                              return (
                                 <li className="box3-bag-li">
                                    {IndicatorsName[id]}
                                    <div className="box3-bag-text">{arr}</div>
                                 </li>
                              );
                           })}
                        </ul>
                     </div>
                     <div className="Container-box2-tel">
                        <div className="Container-street">
                           <div className="Container-street-tel-line"> 
                              <div className="street-text-tel">ваш номер:</div>
                              <span className="street-number">{state.phone.number}</span>
                           </div>
                           <div className="street-number-value">
                              <p className="street-number-value-tel">${state.phone.balance}</p>
                           </div>
                        </div>
                        <span className="Container_Box3-img-phone">
                           <img className="imgtel" src={phone} alt="" />
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
