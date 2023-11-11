 
import { recipes } from "../../recipes.js";

function getRecettes(recipes) {
 const numberRecettes=recipes.length
 const spanNumberRecettes=document.querySelector(".number-recettes")
  
 spanNumberRecettes.innerHTML=`${numberRecettes} recettes`
 
    recipes.forEach((recette, index) => {
      
        const sectionRecette = document.querySelector(".Recettes");

        const templateRecettes = recetteTemplate(recette,numberRecettes);
        const cartDomRecettes = templateRecettes.cartDomRecettes(index)
        sectionRecette.appendChild(cartDomRecettes);
        getIngredients(recette, index)       
 
    });  
}
 
  //actualiser l'interface l'orsque l'utilisateur entre 
        //des caractére sur la barre de recherche
        const error=document.querySelector(".error")
        let inputSearchbarPrincipal=document.getElementById(`searchbar`);       
        
       inputSearchbarPrincipal.addEventListener("keyup",function search_recette(e) {
            console.log("l'input de la bar principale",e.target.value)
       let RegExp = /^[a-zA-Z-\s]+$/;
       
       if (RegExp.test(e.target.value) == false || e.target.value.length < 3) {
           error.innerHTML = "Veuillez entrez au moins trois caracteres";
            
       } else {             
           error.innerHTML="";
            let valueSerchbar=e.target.value.toLowerCase()
                    
            //    const ingredient= recipes.reduce((acc, { ingredients }) => {
            //   return [...acc, ...ingredients.map(({ ingredient }) => ingredient)];}, [])
            //      console.log("ingredient de chaque recette",ingredient)
            //trier les recette par raport au ingredients
            const tabRecipesIngredient=recipes.filter((el)=>el.ingredients.some((item)=>
                                         (item.ingredient).toLowerCase().includes(valueSerchbar)))
                console.log("les ingredients des recettes qui la valeur input",tabRecipesIngredient)
                //trier les recette par raport au titre de recette
               const TabRecipesName=recipes.filter(({name})=>name.toLowerCase().includes(valueSerchbar))
               console.log("recettes qui on le nom include search",TabRecipesName) 
               //trier les recette par raport au description
               const TabRecipesDescription=recipes.filter(({description})=>description.toLowerCase().includes(valueSerchbar))                             
                                                  
                const recipesfiltrer=[...tabRecipesIngredient,...TabRecipesName,...TabRecipesDescription]
                   
                     
                    var uniqueRecipesFiltrer = [...new Set(recipesfiltrer)]
                    console.log("recettes filtrer avec la metode spread new",uniqueRecipesFiltrer)
                     
                   const sectionRecette = document.querySelector(".Recettes");
                     
                    sectionRecette.innerHTML="";
                    if(uniqueRecipesFiltrer){
                       getRecettes(uniqueRecipesFiltrer)   
                    }  
                    //recuperer tous les ingredient de recettes filtrer 
                    const ingredientRecherche=uniqueRecipesFiltrer.reduce((acc,{ingredients})=>{
                                               return [...acc,...ingredients.map(({ ingredient }) => 
                                                ingredient)];},[])
                     console.log("tous les ingredients de recettes filtrer",ingredientRecherche)
                     const contnerIngredient=document.querySelector(".contnerIngredients")
                     const buttoIngredient=document.querySelector(".contner-button-ingredients")
                       
                     ingredientRecherche.forEach((ingredient)=>{
                       
                      contnerIngredient.innerHTML+=`<li >${ingredient}</li>`
                     }) 
                     buttoIngredient.addEventListener("click",ouvreListe)
                     function ouvreListe(event){
                     
                       const iconChevron=document.querySelector(".fa-chevron-down")                     
                       const contnerInputList=document.querySelector(".input-list")
                       if(contnerInputList.classList.contains("visible")){
                        contnerInputList.classList.remove("visible")
                       } else{
                         contnerInputList.classList.add("visible")
                       }                       
                          
                       iconChevron.style.transform = "rotate(180deg)";
                         event.preventDefault()
                       
                                              
                     }
                     //recuperer l'input d'ingredients
                     const  InputIngredient=document.querySelector(".input-ingredient")                      
                        InputIngredient.addEventListener("keyup",function searchIgredient(e){
                            const valueInputIngredient=e.target.value.toLowerCase()
                            const ingredientFilter=ingredientRecherche.filter((ingredient)=>
                                                   ingredient.toLowerCase().includes(valueInputIngredient))
                                             const tabUniqueIngredientFiltrer=[...new Set(ingredientFilter)]
                                                 
                                             console.log("tab unique ingredient filtrer",tabUniqueIngredientFiltrer)
                                             contnerIngredient.innerHTML=""
                                             tabUniqueIngredientFiltrer.forEach((ingredient)=>{
                                               contnerIngredient.innerHTML+=`<li class="list-ingredient">${ingredient}</li>`
                                               const tabListIgredient=document.querySelectorAll(".list-ingredient")
                                               console.log(tabListIgredient)
                                               for(let i=0;i<tabListIgredient.length;i++){
                                                
                                                tabListIgredient[i].addEventListener("click",function ingredientSelectionner(){
                                                    console.log("la valeur clicker",tabListIgredient[i].textContent)
                                                })                                 }                                  
                                                
                                             }
                                                )
                                             
                        })
            }       
   }
  ) 
   
function getIngredients(recette, index) {
    let toutesIngredients = document.querySelector(`.toutes_ingredients_${index}`)
    
    recette.ingredients.forEach((ingredient) => {
 
        const templateRecettes = recetteTemplate(ingredient);
        const cartDomIngredient = templateRecettes.cartDomIngredients(ingredient)
        toutesIngredients.appendChild(cartDomIngredient);
    });    
}
 
function init() {      
     
     getRecettes(recipes)
 //getListRecette(recipes)
 }
 init();
