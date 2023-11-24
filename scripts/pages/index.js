 
import { recipes } from "../../recipes.js";
//les elements du DOM
const messageSearchbar=document.querySelector(".message-searchbar")
const error=document.querySelector(".error")
let inputSearchbarPrincipal=document.getElementById(`searchbar`);       
const contnerInputList=document.querySelectorAll(".input-list")
const contnerInputListAppliances=document.querySelector(".input-list-appliance")
const contnerInputListUstensils=document.querySelector(".input-list-ustensils")
const iconChevron=document.querySelector(".fa-chevron-down")
const contnerIngredient=document.querySelector(".contnerIngredients")
const contnerAppliances=document.querySelector(".contnerAppliances")
const buttoIngredient=document.querySelector(".contner-button-chevron")
const buttoAppliance=document.querySelector(".contner-button-chevron-appliance")
const buttoUstensils=document.querySelector(".contner-button-chevron-ustensils")
const contnerUstensils=document.querySelector(".contnerUstensils") 
const  InputIngredient=document.querySelector(".input-ingredient") 
const sectionRecette = document.querySelector(".Recettes");
const  InputAppliance=document.querySelector(".input-appliance")
const inputUstensils=document.querySelector(".input-ustensils") 

//les cartes des recettes
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

function getAllIngredient(recipes){
     const ingredients= recipes.reduce((acc, { ingredients }) => {
               return [...acc, ...ingredients.map(({ ingredient }) => ingredient)];}, [])
                
               const allIngredients=[...new Set(ingredients)]
                 console.log("all ingredients de chaque recette",allIngredients)
                /*  contnerIngredient.innerHTML=""
                   ingredients.forEach((ingredient)=>{                       
                  contnerIngredient.innerHTML+=`<li >${ingredient}</li>`
                 })   */
                 filtrerIngredients(allIngredients)
                  
}
function getAllAppliances(recipes){
  const appliances= recipes.map(({ appliance }) =>appliance)
  const allAppliances= [...new Set(appliances)]   
              console.log("appliances de chaque recette",allAppliances)
         
                /*  contnerAppliances.innerHTML=""
            allAppliances.forEach((appliance)=>{                    
                 contnerAppliances.innerHTML+=`<li >${appliance}</li>`
                })  */ 
                filtrerAppliances(allAppliances)
              return allAppliances        
}
function getAllUstensils(recipes){

  const ustensils= recipes.reduce((acc,{ ustensils }) =>[...acc,...ustensils],[])
  const allUstensils=[...new Set(ustensils)]
  console.log("all etensils",allUstensils)
  filtrer(allUstensils)   
      return allUstensils                       
}
function getElementRecherche(valueInput,elements){
 
  const ElementRechercher=elements.filter((el)=>el.toLowerCase().includes(valueInput))
  return ElementRechercher
}
function filtrer(tabAllUstensils){
  contnerUstensils.innerHTML=""
  tabAllUstensils.forEach((el)=>{
   
    contnerUstensils.innerHTML+=`<li class="list-ingredient">${el}</li>`
    
        inputUstensils.addEventListener("keyup",function Recherche(e){
          
         const valueInput=e.target.value.toLowerCase()
          
         const ustensilsrechercher=tabAllUstensils.filter((el)=>el.toLowerCase().includes(valueInput))
         console.log("ustensils rechercher",ustensilsrechercher)
         contnerUstensils.innerHTML=""
         ustensilsrechercher.forEach((el)=>{
          contnerUstensils.innerHTML+=`<li class="list-ingredient">${el}</li>`
         })
         const tabListUstensilschoisis=document.querySelectorAll(".list-ingredient")
     
    for(let i=0;i<tabListUstensilschoisis.length;i++){
     
     tabListUstensilschoisis[i].addEventListener("click",function ustensilsSelectionner(){
       const tagChoisis=tabListUstensilschoisis[i].textContent.toLowerCase()
         console.log("la valeur clicker",tagChoisis)
         const tags=document.querySelector(".tags-ustensils")
         
         
      const recipesFinall=recipes.filter((recette)=>
                          recette.ustensils.some((el)=>el.toLowerCase().includes(tagChoisis)))
        console.log("rectte final au chois de estensil",recipesFinall)
      tags.innerHTML+=`<div class="contner-tag-close">
                             <span class="tag-choisis">${tagChoisis}</span>
                             <i class="fa-solid fa-close"></i></div>`
                             sectionRecette.innerHTML="";
          
                             getRecettes(recipesFinall)
                             getAllAppliances(recipesFinall) 
                             getAllIngredient(recipesFinall) 
              const tabTagSelectioner=document.querySelectorAll(".contner-tag-close")
                 for(let i=0;i< tabTagSelectioner.length;i++){
                       const iconClose=document.querySelector(".fa-close")
                       
                       iconClose.addEventListener("click",function(){
                         console.log(iconClose)
                            tabTagSelectioner[i].remove()
                       })
                 }
     })                                 }    
        })
                                  
     
  }
     )
}
function filtrerAppliances(tabAllAppliances){
  contnerAppliances.innerHTML=""
  tabAllAppliances.forEach((el)=>{
    contnerAppliances.innerHTML+=`<li class="list-ingredient">${el}</li>`
    
        InputAppliance.addEventListener("keyup",function Recherche(e){
          
         const valueInput=e.target.value.toLowerCase()
          
         const appliancesRechercher=getElementRecherche(valueInput,tabAllAppliances)
         console.log(appliancesRechercher)
         contnerAppliances.innerHTML=""
         appliancesRechercher.forEach((el)=>{
          contnerAppliances.innerHTML+=`<li class="list-ingredient">${el}</li>`
         })
         const tabListApplianceschoisis=document.querySelectorAll(".list-ingredient")
     
    for(let i=0;i<tabListApplianceschoisis.length;i++){
     
     tabListApplianceschoisis[i].addEventListener("click",function applianceSelectioner(){
       const tagChoisis=tabListApplianceschoisis[i].textContent.toLowerCase()
         console.log("la valeur clicker",tagChoisis)
         const tags=document.querySelector(".tags-appliance")
         
          
      const recipesFinall=recipes.filter(({appliance})=>
                          appliance.toLowerCase().includes(tagChoisis))
        console.log("recette final au chois de apliances",recipesFinall)
      tags.innerHTML+=`<div class="contner-tag-close">
                             <span class="tag-choisis">${tagChoisis}</span>
                             <i class="fa-solid fa-close"></i></div>`
                             sectionRecette.innerHTML="";
          
                             getRecettes(recipesFinall)
                             getAllUstensils(recipesFinall) 
                             getAllIngredient(recipesFinall) 
              const tabTagSelectioner=document.querySelectorAll(".contner-tag-close")
                 for(let i=0;i< tabTagSelectioner.length;i++){
                       const iconClose=document.querySelector(".fa-close")
                       
                       iconClose.addEventListener("click",function(){
                         console.log(iconClose)
                            tabTagSelectioner[i].remove()
                       })
                 }
     })                                 }    
        })
                                  
     
  }
     )
}
let cumule=[]
let alltag=[]
function filtrerIngredients(tabAllIngredients){
  contnerIngredient.innerHTML=""
  console.log("tableau des ingredients",tabAllIngredients)
  tabAllIngredients.forEach((el)=>{
    contnerIngredient.innerHTML+=`<li class="list-ingredient">${el}</li>`
  }
  )
        InputIngredient.addEventListener("keyup",function Recherche(e){
          
         const valueInput=e.target.value.toLowerCase()
         
         const ingredientsRecherche=tabAllIngredients.filter((el)=>el.toLowerCase().includes(valueInput))
         console.log("ingredients aprés recherche",ingredientsRecherche)
         contnerIngredient.innerHTML=""
         ingredientsRecherche.forEach((el)=>{
          contnerIngredient.innerHTML+=`<li class="list-ingredient">${el}</li>`
         })
         const tabListIgredientchoisis=document.querySelectorAll(".list-ingredient")
    
    for(let i=0;i<tabListIgredientchoisis.length;i++){     
     tabListIgredientchoisis[i].addEventListener("click",function applianceSelectioner(){
       const tagChoisis=tabListIgredientchoisis[i].textContent.toLowerCase()
         console.log("la valeur clicker",tagChoisis)
          alltag.push(tagChoisis)
          console.log("alltag",alltag)
         const tags=document.querySelector(".tags-ingredient")
        let recipesFinall=[]
        console.log("se quon a au cumule",cumule)
         if(cumule.length===0){
              recipesFinall=recipes.filter((el)=>el.ingredients.some((item)=>
                      (item.ingredient).toLowerCase().includes(tagChoisis)))  
                      recipesFinall.forEach((el)=>cumule.push(el))
        } else{
          recipesFinall=cumule.filter((el)=>el.ingredients.some((item)=>
          (item.ingredient).toLowerCase().includes(tagChoisis)))
          console.log("recette final",recipesFinall)
        } 
         console.log("recipe final",recipesFinall)     
       
      tags.innerHTML+=`<div class="contner-tag-close">
                             <span class="tag-choisis">${tagChoisis}</span>
                             <i class="fa-solid fa-close"></i></div>`
                             
                             sectionRecette.innerHTML="";                              
                               
                             getRecettes(recipesFinall)
                             getAllUstensils(recipesFinall) 
                             getAllAppliances(recipesFinall) 
                         const tabTagSelectioner=document.querySelectorAll(".contner-tag-close")
                         for(let i=0;i< tabTagSelectioner.length;i++){
                       const tabiconClose=document.querySelectorAll(".fa-close")
                       for(let i=0;i< tabiconClose.length;i++){
                         tabiconClose[i].addEventListener("click",function(){
                          tabTagSelectioner[i].remove()
                       const tagsup=tabTagSelectioner[i].querySelector(".tag-choisis").textContent
                         console.log("tag supprimer",tagsup)
                         alltag = alltag.filter(function(item) {
                          return item !== tagsup
                        });
                        console.log("tag qui reste",alltag)
                            
                   for(let i=0;i<alltag.length;i++){
                    console.log("tags ingredient qui reste a la fin",alltag[i]) 
                           if(recipesFinall.length>0){
                             const recipesRestant=recipesFinall.filter((el)=>
                             el.ingredients.some((item)=>                                 
                             (item.ingredient).toLowerCase().includes(alltag[i])))  
                                  console.log("recipes restant ",recipesRestant)
                                  getRecettes(recipesRestant) 
                                   
                            }else{
                              const recipesRestant=recipes.filter((el)=>el.ingredients.some((item)=>
                             (item.ingredient).toLowerCase().includes(alltag[i])))  
                              console.log("recipes restant si on a plus de recettes ",recipesRestant)
                               getRecettes(recipesRestant)
                               getAllIngredient(recipesRestant)
                            }
                           
                   }                            
                         
                       })
                       }

                       
                 }
     })                                 }    
        })
                                  
     
  
}
buttoIngredient.addEventListener("click",ouvreListe)
buttoAppliance.addEventListener("click",ouvreListe)
buttoUstensils.addEventListener("click",ouvreListeUstensils)
                        function ouvreListeUstensils(){
                          if (contnerInputListUstensils.classList.contains("visible")) {
                            contnerInputListUstensils.classList.remove("visible")
                            iconChevron.style.transform = "rotateX(360deg)";
                        } else {
                            contnerInputListUstensils.classList.add("visible")
                            iconChevron.style.transform = "rotateX(180deg)";
                        }
                        }
                        function ouvreListe(){ 
                          for(let i=0;i<contnerInputList.length;i++){
                            if(contnerInputList[i].classList.contains("visible")){
                            contnerInputList[i].classList.remove("visible")
                            iconChevron.style.transform = "rotateX(360deg)";     
                          } else{
                            contnerInputList[i].classList.add("visible")
                            iconChevron.style.transform = "rotateX(180deg)";               
                          }   
                          } 
                                                
                        }
function recettesFiltrer(valueSerchbar){
      //trier les recette par raport au ingredients
  const tabRecipesIngredient=recipes.filter((el)=>el.ingredients.some((item)=>
                              (item.ingredient).toLowerCase().includes(valueSerchbar)))
       
      //trier les recette par raport au titre de recette
    const TabRecipesName=recipes.filter(({name})=>name.toLowerCase().includes(valueSerchbar))
    
    //trier les recette par raport au description
    const TabRecipesDescription=recipes.filter(({description})=>description.toLowerCase().includes(valueSerchbar))                             
                                        
      const recipesfiltrer=[...tabRecipesIngredient,...TabRecipesName,...TabRecipesDescription]        
          
          var uniqueRecipesFiltrer = [...new Set(recipesfiltrer)]
           
         
             return uniqueRecipesFiltrer
         
         
}                      

  //actualiser l'interface l'orsque l'utilisateur entre 
        //des caractére sur la barre de recherche       
       inputSearchbarPrincipal.addEventListener("keyup",function search_recette(e) {
            console.log("l'input de la bar principale",e.target.value)
       let RegExp = /^[a-zA-Z-\s]+$/;
       
       if (RegExp.test(e.target.value) == false || e.target.value.length < 3) {
           error.innerHTML = "Veuillez entrez au moins trois caracteres";
            
       } else {             
           error.innerHTML="";
            let valueSerchbar=e.target.value.toLowerCase()
               
          const recipesInitial=recettesFiltrer(valueSerchbar)            
                     if(recipesInitial==0){
                      
                      messageSearchbar.innerHTML=` Aucune recette ne contient ${valueSerchbar} vous pouvez chercher «
                      tarte aux pommes », « poisson », etc.`
                      sectionRecette.innerHTML=""
                      getRecettes(recipesInitial)
                     }else{
                      messageSearchbar.innerHTML=""
                      sectionRecette.innerHTML="";
                   
                       getRecettes(recipesInitial)
                       getAllAppliances(recipesInitial)
                       getAllIngredient(recipesInitial)
                       getAllUstensils(recipesInitial)
                       /* const tabAllUstensils=getAllUstensils(recipesInitial)   
                      filtrer(tabAllUstensils)      */    
                     } 
                           
                          
                     //recuperer l'input d'ingredients                                           
                       /*  InputIngredient.addEventListener("keyup",function searchIgredient(e){
                            const valueInputIngredient=e.target.value.toLowerCase()
                            console.log("ingredients recherche",ingredientRecherche)
                            const ingredientFilter=ingredientRecherche.filter((ingredient)=>
                                                   ingredient.toLowerCase().includes(valueInputIngredient))
                                             const tabUniqueIngredientFiltrer=[...new Set(ingredientFilter)]
                                                 
                                             console.log("tab unique ingredient filtrer",tabUniqueIngredientFiltrer)
                                             contnerIngredient.innerHTML=""
                                             tabUniqueIngredientFiltrer.forEach((ingredient)=>{
                                               contnerIngredient.innerHTML+=`<li class="list-ingredient">${ingredient}</li>`
                                               const tabListIgredientchoisis=document.querySelectorAll(".list-ingredient")
                                               console.log(tabListIgredientchoisis)
                                               for(let i=0;i<tabListIgredientchoisis.length;i++){
                                                
                                                tabListIgredientchoisis[i].addEventListener("click",function ingredientSelectionner(){
                                                  const tagChoisis=tabListIgredientchoisis[i].textContent.toLowerCase()
                                                    console.log("la valeur clicker",tagChoisis)                                            
                                                    const recipesFinal=uniqueRecipesFiltrer.filter((el)=>el.ingredients.some((el)=>
                                                                  (el.ingredient).toLowerCase().includes(tagChoisis)))
                                                           console.log("recipes final",recipesFinal)
                                                    const tags=document.querySelector(".tags-ingredient")
                                                  
                                                    tags.innerHTML+=`<div class="contner-tag-close">
                                                                   <span class="tag-choisis">${tagChoisis}</span>
                                                                   <i class="fa-solid fa-close"></i></div>`
                                                    sectionRecette.innerHTML="";
                                                     
                                                    getRecettes(recipesFinal)   
                                                    const tabTagSelectioner=document.querySelectorAll(".contner-tag-close")
                                                    for(let i=0;i< tabTagSelectioner.length;i++){
                                                          const iconClose=document.querySelector(".fa-close")
                                                          
                                                          iconClose.addEventListener("click",function(){
                                                            console.log(iconClose)
                                                               tabTagSelectioner[i].remove()
                                                          })
                                                    }
                                                })                                 }                                  
                                                
                                             }
                                                )
                                             
                        })   */               
                        //recuperer input appliance                                  
                       /*  InputAppliance.addEventListener("keyup",function searchIgredient(e){
                            const valueInputAppliance=e.target.value.toLowerCase()
                            console.log("appareil recherche",appareilsRecherche)
                            const applianceFiltrer=appareilsRecherche.filter((appliance)=>
                                                   appliance.toLowerCase().includes(valueInputAppliance))
                                             const tabUniqueApplianceFiltrer=[...new Set(applianceFiltrer)]
                                                 
                                             console.log("tab unique appliance filtrer",tabUniqueApplianceFiltrer)
                                             contnerAppliances.innerHTML=""
                                             tabUniqueApplianceFiltrer.forEach((appliance)=>{
                                               contnerAppliances.innerHTML+=`<li class="list-ingredient">${appliance}</li>`
                                               const tabListAppliancechoisis=document.querySelectorAll(".list-ingredient")
                                               console.log(tabListAppliancechoisis)
                                               for(let i=0;i<tabListAppliancechoisis.length;i++){
                                                
                                                tabListAppliancechoisis[i].addEventListener("click",function ingredientSelectionner(){
                                                  const tagChoisis=tabListAppliancechoisis[i].textContent.toLowerCase()
                                                    console.log("la valeur clicker",tagChoisis)
                                                    const tags=document.querySelector(".tags-appliance")
                                                    console.log("recipes filtrer",uniqueRecipesFiltrer)
                                                    
                                                 const recipesFinall=uniqueRecipesFiltrer.filter(({appliance})=>
                                                                     appliance.toLowerCase().includes(tagChoisis))
                                                   console.log(recipesFinall)
                                                 tags.innerHTML+=`<div class="contner-tag-close">
                                                                        <span class="tag-choisis">${tagChoisis}</span>
                                                                        <i class="fa-solid fa-close"></i></div>`
                                                                        sectionRecette.innerHTML="";
                                                     
                                                                        getRecettes(recipesFinall)   
                                                                        const tabTagSelectioner=document.querySelectorAll(".contner-tag-close")
                                                                        for(let i=0;i< tabTagSelectioner.length;i++){
                                                                              const iconClose=document.querySelector(".fa-close")
                                                                              
                                                                              iconClose.addEventListener("click",function(){
                                                                               
                                                                                   tabTagSelectioner[i].remove()
                                                                              })
                                                                        }

                                                })                                 }                                  
                                                
                                             }
                                                )
                                             
                        }) */
                        
                         
                       
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
     getAllIngredient(recipes)
     getAllAppliances(recipes)
     getAllUstensils(recipes)
 //getListRecette(recipes)
 }
 init();
