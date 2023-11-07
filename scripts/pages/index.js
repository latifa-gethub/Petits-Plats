 
import { recipes } from "../../recipes.js";

function getRecettes(recipes) {
 const numberRecettes=recipes.length
 const spanNumberRecettes=document.querySelector(".number-recettes")
  
 spanNumberRecettes.innerHTML=`${numberRecettes} recettes`
 
    recipes.forEach((recette, index) => {
      
        const sectionRecette = document.querySelector(".Recette");

        const templateRecettes = recetteTemplate(recette,numberRecettes);
        const cartDomRecettes = templateRecettes.cartDomRecettes(index)
        sectionRecette.appendChild(cartDomRecettes);
        getIngredients(recette, index)       
 
    });  
}
 
  //actualiser l'interface l'orsque l'utilisateur entre 
        //des caractére sur la barre de recherche
        const error=document.querySelector(".error")
        let inputSearchbar=document.getElementById(`searchbar`);       
        
       inputSearchbar.addEventListener("keyup",function search_recette(e) {
           console.log(e.target.value)
   
       let RegExp = /^[a-zA-Z-\s]+$/;
       
       if (RegExp.test(e.target.value) == false || e.target.value.length < 3) {
           error.innerHTML = "Veuillez entrez au moins trois caracteres";
            
       } else {             
           error.innerHTML="";
            let valueSerchbar=e.target.value.toLowerCase()
            
               console.log(valueSerchbar)
            //    const ingredient= recipes.reduce((acc, { ingredients }) => {
            //   return [...acc, ...ingredients.map(({ ingredient }) => ingredient)];}, [])
            //      console.log("ingredient de chaque recette",ingredient)
            //trier les recette par raport au ingredients
            const tabRecipesIngredient=recipes.filter((el)=>el.ingredients.some((item)=>
                                         (item.ingredient).toLowerCase().includes(valueSerchbar)))
                console.log(tabRecipesIngredient)
                //trier les recette par raport au titrede recette
               const TabRecipesName=recipes.filter(({name})=>name.toLowerCase().includes(valueSerchbar)) 
               //trier les recette par raport au description
               const TabRecipesDescription=recipes.filter(({description})=>description.toLowerCase().includes(valueSerchbar))                             
                                                  
                const recipesfiltrer=[...tabRecipesIngredient,...TabRecipesName,...TabRecipesDescription]
                   
                     
                    var uniqueRecipesFiltrer = [...new Set(recipesfiltrer)]
                    console.log("avec la metode spread new",uniqueRecipesFiltrer)
                     
                   const sectionRecette = document.querySelector(".Recette");
                     
                    sectionRecette.innerHTML="";
                    if(uniqueRecipesFiltrer){
                       getRecettes(uniqueRecipesFiltrer)   
                    }  
                    //recuperer tous les ingredient de recettes filtrer 
                    const ingredientRecherche=uniqueRecipesFiltrer.reduce((acc,{ingredients})=>{
                                               return [...acc,...ingredients.map(({ ingredient }) => 
                                                ingredient)];},[])
                     console.log(ingredientRecherche)
                     const contnerIngredient=document.getElementById("contnerIngredients")
                     
                     ingredientRecherche.forEach((ingredient)=>{
                      contnerIngredient.innerHTML+=`<option >${ingredient}<option>`
                     }) 
                     contnerIngredient.addEventListener("click",ouvreListe)
                     function ouvreListe(e){
                       const  inputIngredient=document.getElementById("input-ingredient")
                       inputIngredient.style.display="block"
                     }
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
