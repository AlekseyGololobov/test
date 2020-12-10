import { createSelector } from "reselect";

export const ReplaceRGB = (text:string) => {
    if( typeof text === 'string') {
        let color_Sets = 0;
          let class_id = parseInt( (Math.random()*1000) as any ) ;
          text = text.replace(/}/g, () => { return ";}</style>" });
          text = text.replace(/{/g, () => { color_Sets ++; return `<span class="color_${color_Sets}_${class_id}"><style>.color_${color_Sets}_${class_id}{color: #` } );
          return `<span>${text}</span>`;
    }
    console.log(text);
    return text;
}
const rgbSelect = (text:string) => text;
export const rgbSelector = createSelector(
    rgbSelect,
    (text:string) =>  {  
        if( typeof text === 'string') {
            let color_Sets = 0; 
              let class_id = parseInt( (Math.random()*1000) as any ) ;
              text = text.replace(/}/g, () => { return ";}</style>" });
              text = text.replace(/{/g, () => { color_Sets ++; return `<span class="color_${color_Sets}_${class_id}"><style>.color_${color_Sets}_${class_id}{color: #` } );
              return `<span>${text}</span>`;
        }
        return text;
    }
  );