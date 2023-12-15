function recetteTemplate(recette){
   
    const {id,image,name,servings,ingredients,description,time}=recette; 
   
    const lienImageRecette=`./images/Photos_P7_JS_Les_petits_plats/${image}` 
    
    function cartDomRecettes(index){
     const articleRecette=document.createElement("article")
     articleRecette.setAttribute("class",`article-recette article-recette_${index}`)
    
     const tableauDescription=description.split(".")
    
     const discriptionRecette=tableauDescription[0]+tableauDescription[1]
     articleRecette.innerHTML=`<img class="img-recette" src=${lienImageRecette}>
                                <span class="time">${time}min</span>
                                
                               <section class="info-recette"><h2 class="name-recette">${name}</h2>
                               <h3>RECETTE</h3>
                               <p class="description-recette">${discriptionRecette}</p>
                               <h3>Ingrédients</h3>
                               <div class="toutes_ingredients_${index} ingredients">
                                                                                         
                               </div>
                               <h4></h4>
                               </div>
                               </section>`                                                               
                                 
    return articleRecette
    }
       
    function cartDomIngredients(ingredient){
      const divIngredients=document.createElement("div");
      divIngredients.setAttribute("class","ingredient")
      if(ingredient.quantity == undefined){
         
        ingredient.quantity="";
    } 
      if(ingredient.unit == undefined){
         
        ingredient.unit="";
    } 
      divIngredients.innerHTML=`<h4 class="name-ingredient">${ingredient.ingredient}</h4>
                                <div class="quantity">
                                <h5 class="quantity-ingredient">${ingredient.quantity}</h5>
                                <h5 class="unit">${ingredient.unit}</h5></div>`
                                       
                                const unitIngredient=document.querySelector(".unit")
                                
                           
                                return divIngredients
                                
    }
    function listRecette(){
       const list=document.querySelector(".list")       
       list.innerHTML=`<li class="name-recette">${name}</li>`
       return list
    }
    
    return {lienImageRecette,cartDomRecettes,cartDomIngredients,listRecette}    
   
}