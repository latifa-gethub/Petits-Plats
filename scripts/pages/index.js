
import {recipes} from "../../recipes.js";
 

 function getRecettes(recipes) {      

    recipes.forEach((recette,index) => {
        const sectionRecette=document.querySelector(".Recette");
       
        const templateRecettes=recetteTemplate(recette);
        const cartDomRecettes=templateRecettes.cartDomRecettes()
         
        sectionRecette.appendChild(cartDomRecettes);
        getIngredients(recipes.ingredients,index)
    }); 
   
}
  function getIngredients(ingredients,index) { 
      let toutesIngredients=document.getElementById(`#toutes_ingredients_${index}`)
      console.log(recipes)
     ingredients.forEach((ingredient) => {
          
        
         const templateRecettes=recetteTemplate(ingredient);
         const cartDomIngredient=templateRecettes.cartDomIngredient()
          
         toutesIngredients.appendChild(cartDomIngredient);
     }); 
    
 }
  function init(){   
     console.log(recipes)
   getRecettes(recipes)
   

}
init();
 /*<div class="ingredient1">
                                    <h4>${ingredient1}</h4>
                                    <div class="quantity">
                                    <h5>${quantity1}</h5>
                                    <h5 class="unit">${valeurUnit}</h5></div>
                               </div>
                               <div class="ingredient2">
                                    <h4>${ingredient2}</h4>
                                    <div class="quantity">
                                    <h5>${quantity2}</h5>
                                    <h5 class="unit">${valeurUnit2}</h5></div>
                               </div>
                               <div class="ingredient3">
                                    <h4>${ingredient3}</h4>
                                    <div class="quantity">
                                    <h5>${quantity3}</h5>
                                    <h5 class="unit">${valeurUnit3}</h5></div>
                               </div> 
                               <div class="ingredient3">
                                    <h4>${ingredient4}</h4>
                                    <div class="quantity">
                                    <h5>${quantity4}</h5>
                                    <h5 class="unit">${valeurUnit3}</h5></div>
                               </div>*/                 