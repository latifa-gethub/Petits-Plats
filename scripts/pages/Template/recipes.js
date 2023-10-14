function recetteTemplate(recettes){
console.log(recettes)
    const {id,image,name,servings,ingredients,description,time}=recettes;           
   
    const lienImageRecette=`./images/Photos_P7_JS_Les_petits_plats/${image}` 
     
    function cartDomRecettes(index){
     const articleRecette=document.createElement("article")
     articleRecette.setAttribute("class","article-recette")
     articleRecette.innerHTML=`<img class="img-recette" src=${lienImageRecette}>
                                <span class="time">${time}min</span>
                               <section class="info-recette"><h2 class="name-recette">${name}</h2>
                               <h3>RECETTE</h3>
                               <p class="description-recette">${description}</p>
                               <h3>Ingrédients</h3>
                               <div id="toutes_ingredients_${index}">
                                                                                         
                               </div>
                               <h4></h4>
                               </div>
                               </section>`                            
                                 
                                                                  
                                  
                                                                       
                                 
    return articleRecette
    }
    function cartDomIngredient(ingredient){
      const divIngredient=document.createElement("div");
      divIngredient.setAttribute("class","ingredient1")
      divIngredient.innerHTML=`<h4>${ingredient.ingredient}</h4>
                                <div class="quantity">
                                <h5 class="quantity-ingredient">${ingredient.quantity}</h5>
                                <h5 class="unit">${ingredient.unit}</h5></div>`
                                console.log(divIngredient)
                                return divIngredient
    }
    return {lienImageRecette,cartDomRecettes,cartDomIngredient}
}