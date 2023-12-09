import { recipes } from '../../recipes.js';
//les elements du DOM
const messageSearchbar = document.querySelector('.message-searchbar');
const error = document.querySelector('.error');
let inputSearchbarPrincipal = document.getElementById(`searchbar`);
const contnerInputListIngredients = document.querySelector(
  '.input-list-ingredients'
);
const contnerInputListAppliances = document.querySelector(
  '.input-list-appliance'
);
const contnerInputListUstensils = document.querySelector(
  '.input-list-ustensils'
);
const iconChevronI = document.querySelector('.chevron-ingredient');
const iconChevronA = document.querySelector('.chevron-appliance');
const iconChevronU = document.querySelector('.chevron-ustensil');
 
const contnerIngredient = document.querySelector('.contnerIngredients');
const contnerAppliances = document.querySelector('.contnerAppliances');
const buttoIngredient = document.querySelector('.contner-button-chevron');
const buttoAppliance = document.querySelector(
  '.contner-button-chevron-appliance'
);
const buttoUstensils = document.querySelector(
  '.contner-button-chevron-ustensils'
);
const contnerUstensils = document.querySelector('.contnerUstensils');
const InputIngredient = document.querySelector('.input-ingredient');
const sectionRecette = document.querySelector('.Recettes');
const InputAppliance = document.querySelector('.input-appliance');
const inputUstensils = document.querySelector('.input-ustensils');
//const tagSelectinner = document.querySelector('.tag-choisis');
const tags = document.querySelector('.tags-ingredient');
//les cartes des recettes
function getRecettes(recipes) {
  const numberRecettes = recipes.length;
  const spanNumberRecettes = document.querySelector('.number-recettes');
  spanNumberRecettes.innerHTML = `${numberRecettes} recettes`;
  recipes.forEach((recette, index) => {
    const sectionRecette = document.querySelector('.Recettes');
    const templateRecettes = recetteTemplate(recette, numberRecettes);
    const cartDomRecettes = templateRecettes.cartDomRecettes(index);
    sectionRecette.appendChild(cartDomRecettes);
    getIngredients(recette, index);
  });
}

function getAllIngredient(recipes) {
  const ingredients = recipes.reduce((acc, { ingredients }) => {
    return [...acc, ...ingredients.map(({ ingredient }) => ingredient)];
  }, []);

  const allIngredients = [...new Set(ingredients)];

  filtrerIngredients(allIngredients, recipes);
}
function getAllAppliances(recipes) {
  const appliances = recipes.map(({ appliance }) => appliance);
  const allAppliances = [...new Set(appliances)];

  filtrerAppliances(allAppliances, recipes);
  //return allAppliances;
}
function getAllUstensils(recipes) {
  const ustensils = recipes.reduce(
    (acc, { ustensils }) => [...acc, ...ustensils],
    []
  );
  const allUstensils = [...new Set(ustensils)];

  filtrer(allUstensils,recipes);
 // return allUstensils;
}
function getElementRecherche(valueInput, elements) {
  const ElementRechercher = elements.filter(el =>
    el.toLowerCase().includes(valueInput)
  );
  return ElementRechercher;
}
function filtrer(tabAllUstensils,recipes) {
  let cumule = [];
let alltag = [];
  contnerUstensils.innerHTML = '';
  tabAllUstensils.forEach(el => {
    contnerUstensils.innerHTML += `<li class="list-ingredient">${el}</li>`;

    inputUstensils.addEventListener('keyup', function Recherche(e) {
      const valueInput = e.target.value.toLowerCase();

      const ustensilsrechercher = tabAllUstensils.filter(el =>
        el.toLowerCase().includes(valueInput)
      );
      console.log('ustensils rechercher', ustensilsrechercher);
      contnerUstensils.innerHTML = '';
      ustensilsrechercher.forEach(el => {
        contnerUstensils.innerHTML += `<li class="list-ingredient">${el}</li>`;
      });
      const tabListUstensilschoisis = document.querySelectorAll(
        '.list-ingredient'
      );

      for (let i = 0; i < tabListUstensilschoisis.length; i++) {
        tabListUstensilschoisis[
          i
        ].addEventListener('click', function ustensilsSelectionner() {
          const tagChoisis = tabListUstensilschoisis[
            i
          ].textContent.toLowerCase();
          tabListUstensilschoisis[i].style.backgroundColor="#FFD15B";
          console.log('la valeur clicker', tagChoisis);
          const tags = document.querySelector('.tags-ustensils');
           
          if (alltag.includes(tagChoisis) == false) {
            alltag.push(tagChoisis);
          }
  
          tags.innerHTML = '';
          alltag.forEach(el => {
            tags.innerHTML += `<div class="contner-tag-close">
        <span class="tag-choisis">${el}</span>
        <i class="fa-solid fa-close"></i></div>`;
          });
  
          let recipesFinall = [];
  
          if (cumule.length === 0) {
            console.log('les recipes reçu des le debut', recipes);
            console.log('tag choisi', tagChoisis);
            recipesFinall = recipes.filter(recette =>
              recette.ustensils.some(el => el.toLowerCase().includes(tagChoisis))
            );
            recipesFinall.forEach(el => cumule.push(el));
          } else {
            recipesFinall = cumule.filter(el =>
              el.ustensils.some(item =>
                item.toLowerCase().includes(tagChoisis)
              )
            );
          }
          console.log('recipe final au choix ustensils', recipesFinall);
  
          const tabTagSelectioner = document.querySelectorAll(
            '.contner-tag-close'
          );
          //suppression dun tag
          for (let i = 0; i < tabTagSelectioner.length; i++) {
            const tabiconClose = document.querySelectorAll('.fa-close');
            for (let i = 0; i < tabiconClose.length; i++) {
              tabiconClose[i].addEventListener('click', function() {
                tabTagSelectioner[i].remove();
                const tagIngredientsup = tabTagSelectioner[i].querySelector(
                  '.tag-choisis'
                ).textContent;
                console.log('tag ustensil supprimer', tagIngredientsup);
  
                alltag = alltag.filter(function(item) {
                  return item !== tagIngredientsup;
                });
                console.log('tag qui reste', alltag);
                let recipesRestant = recipes;
                for (let i = 0; i < alltag.length; i++) {
                  recipesRestant = recipesRestant.filter(el =>
                    el.ingredients.some(item =>
                      item.ingredient.toLowerCase().includes(alltag[i])
                    )
                  );
                  recipesFinall = recipesRestant;
                }
                console.log('recipes restant aprés sup tag', recipesFinall);
                sectionRecette.innerHTML = '';
                getRecettes(recipesFinall);
                getAllIngredient(recipesFinall);
                getAllAppliances(recipesFinall);
                if (alltag.length === 0) {
                  console.log('ne ya plus de tag voila les recipes', recipes);
                  sectionRecette.innerHTML = '';
                  getRecettes(recipes);
                  getAllIngredient(recipes);
                  getAllUstensils(recipes);
                  getAllAppliances(recipes);
                }
              });
            }
            sectionRecette.innerHTML = '';
            getRecettes(recipesFinall);
            getAllIngredient(recipesFinall);
            getAllAppliances(recipesFinall);
          }

        });
      }
    });
  });
}

function filtrerAppliances(tabAllAppliances, recipes) {
  let cumule = [];
let alltag = [];
  contnerAppliances.innerHTML = '';
  tabAllAppliances.forEach(el => {
    contnerAppliances.innerHTML += `<li class="list-ingredient">${el}</li>`;

    InputAppliance.addEventListener('keyup', function Recherche(e) {
      const valueInput = e.target.value.toLowerCase();

      const appliancesRechercher = tabAllAppliances.filter(el =>
        el.toLowerCase().includes(valueInput)
      );
      console.log(appliancesRechercher);
      contnerAppliances.innerHTML = '';
      appliancesRechercher.forEach(el => {
        contnerAppliances.innerHTML += `<li class="list-appliance">${el}</li>`;
      });
      const tabListApplianceschoisis = document.querySelectorAll(
        '.list-appliance'
      );
      for (let i = 0; i < tabListApplianceschoisis.length; i++) {
        tabListApplianceschoisis[
          i
        ].addEventListener('click', function applianceSelectioner() {
          const tagChoisis = tabListApplianceschoisis[
            i
          ].textContent.toLowerCase();
          tabListApplianceschoisis[i].style.backgroundColor="#FFD15B";
          const tags = document.querySelector('.tags-appliance');
          console.log('la valeur clicker', tagChoisis);

          if (alltag.includes(tagChoisis) == false) {
            alltag.push(tagChoisis);
          }
          tags.innerHTML = '';
          alltag.forEach(el => {
            tags.innerHTML += `<div class="contner-tag-close">
      <span class="tag-choisis">${el}</span>
      <i class="fa-solid fa-close"></i></div>`;
          });

          console.log('alltag', alltag);

          let recipesFinall = [];

          if (cumule.length === 0) {
            console.log('les recipes reçu des le debut', recipes);
            console.log('tag choisi', tagChoisis);

            recipesFinall = recipes.filter(recipe =>
              recipe.appliance.toLowerCase().includes(tagChoisis)
            );
            recipesFinall.forEach(el => cumule.push(el));
          } else {
            recipesFinall = cumule.filter(el =>
              el.ingredients.some(item =>
                item.ingredient.toLowerCase().includes(tagChoisis)
              )
            );
          }
          console.log('recipe final au choix dingredient', recipesFinall);

          const tabTagSelectioner = document.querySelectorAll(
            '.contner-tag-close'
          );
          //suppression dun tag
          for (let i = 0; i < tabTagSelectioner.length; i++) {
            const tabiconClose = document.querySelectorAll('.fa-close');
            for (let i = 0; i < tabiconClose.length; i++) {
              tabiconClose[i].addEventListener('click', function() {
                tabTagSelectioner[i].remove();
                const tagIngredientsup = tabTagSelectioner[i].querySelector(
                  '.tag-choisis'
                ).textContent;
                console.log('tag ingredient supprimer', tagIngredientsup);

                alltag = alltag.filter(function(item) {
                  return item !== tagIngredientsup;
                });
                console.log('tag qui reste', alltag);
                let recipesRestant = recipes;
                for (let i = 0; i < alltag.length; i++) {
                  console.log(
                    'boucle tags ingredient qui reste a la fin',
                    alltag[i]
                  );

                  console.log(
                    'les recettes ou on filtre all tag',
                    recipesRestant
                  );
                  recipesRestant = recipesRestant.filter(el =>
                    el.ingredients.some(item =>
                      item.ingredient.toLowerCase().includes(alltag[i])
                    )
                  );
                  recipesFinall = recipesRestant;
                  console.log('recipes restant', recipesRestant);
                }
                console.log('recipes restant aprés sup tag', recipesFinall);
                sectionRecette.innerHTML = '';
                getRecettes(recipesFinall);
                getAllUstensils(recipesFinall);
                getAllAppliances(recipesFinall);
                if (alltag.length === 0) {
                  console.log('ne ya plus de tag voila les recipes', recipes);
                  sectionRecette.innerHTML = '';
                  getRecettes(recipes);
                  getAllIngredient(recipes);
                  getAllUstensils(recipes);
                  getAllAppliances(recipes);
                }
              });
            }
            sectionRecette.innerHTML = '';
            getRecettes(recipesFinall);
            getAllUstensils(recipesFinall);
            getAllAppliances(recipesFinall);
          }
        });
      }
    });
  });
}

function filtrerIngredients(tabAllIngredients, recipes) {
  let cumule = [];
let alltag = [];
  contnerIngredient.innerHTML = '';
   
  tabAllIngredients.forEach(el => {
    contnerIngredient.innerHTML += `<li class="list-ingredient">${el}</li>`;
  });
  InputIngredient.addEventListener('keyup', function Recherche(e) {
    const valueInput = e.target.value.toLowerCase();

    const ingredientsRecherche = tabAllIngredients.filter(el =>
      el.toLowerCase().includes(valueInput)
    );

    contnerIngredient.innerHTML = '';
    ingredientsRecherche.forEach(el => {
      contnerIngredient.innerHTML += `<li class="list-ingredient">${el}</li>`;
    });
    const tabListIgredientchoisis = document.querySelectorAll(
      '.list-ingredient'
    );

    for (let i = 0; i < tabListIgredientchoisis.length; i++) {
      tabListIgredientchoisis[
        i
      ].addEventListener('click', function applianceSelectioner() {
        const tagChoisis = tabListIgredientchoisis[i].textContent.toLowerCase();
        tabListIgredientchoisis[i].style.backgroundColor="#FFD15B";
  
        console.log('la valeur clicker', tagChoisis);
        if (alltag.includes(tagChoisis) == false) {
          alltag.push(tagChoisis);
        }

        tags.innerHTML = '';
        alltag.forEach(el => {
          tags.innerHTML += `<div class="contner-tag-close">
      <span class="tag-choisis">${el}</span>
      <i class="fa-solid fa-close"></i></div>`;
        });
        
        let recipesFinall = [];

        if (cumule.length === 0) {
          console.log('les recipes reçu des le debut', recipes);
          console.log('tag choisi', tagChoisis);
          recipesFinall = recipes.filter(el =>
            el.ingredients.some(item =>
              item.ingredient.toLowerCase().includes(tagChoisis)
            )
          );
          recipesFinall.forEach(el => cumule.push(el));
        } else {
          recipesFinall = cumule.filter(el =>
            el.ingredients.some(item =>
              item.ingredient.toLowerCase().includes(tagChoisis)
            )
          );
        }
        console.log('recipe final au choix dingredient', recipesFinall);

        const tabTagSelectioner = document.querySelectorAll(
          '.contner-tag-close'
        );
        //suppression dun tag
        for (let i = 0; i < tabTagSelectioner.length; i++) {
          const tabiconClose = document.querySelectorAll('.fa-close');
          for (let i = 0; i < tabiconClose.length; i++) {
            tabiconClose[i].addEventListener('click', function() {
              tabTagSelectioner[i].remove();
              const tagIngredientsup = tabTagSelectioner[i].querySelector(
                '.tag-choisis'
              ).textContent;
              console.log('tag ingredient supprimer', tagIngredientsup);

              alltag = alltag.filter(function(item) {
                return item !== tagIngredientsup;
              });
              console.log('tag qui reste', alltag);
              let recipesRestant = recipes;
              for (let i = 0; i < alltag.length; i++) {
                recipesRestant = recipesRestant.filter(el =>
                  el.ingredients.some(item =>
                    item.ingredient.toLowerCase().includes(alltag[i])
                  )
                );
                recipesFinall = recipesRestant;
              }
              console.log('recipes restant aprés sup tag', recipesFinall);
              sectionRecette.innerHTML = '';
              getRecettes(recipesFinall);
              getAllUstensils(recipesFinall);
              getAllAppliances(recipesFinall);
              if (alltag.length === 0) {
                console.log('ne ya plus de tag voila les recipes', recipes);
                sectionRecette.innerHTML = '';
                getRecettes(recipes);
                getAllIngredient(recipes);
                getAllUstensils(recipes);
                getAllAppliances(recipes);
              }
            });
          }
          sectionRecette.innerHTML = '';
          getRecettes(recipesFinall);
          getAllUstensils(recipesFinall);
          getAllAppliances(recipesFinall);
        }
      });
    }
  });
}
buttoIngredient.addEventListener('click', ouvreListeIngredients);
buttoAppliance.addEventListener('click', ouvreListeAppliances);
buttoUstensils.addEventListener('click', ouvreListeUstensils);
function ouvreListeUstensils() {
  if (contnerInputListUstensils.classList.contains('visible')) {
    contnerInputListUstensils.classList.remove('visible');
    iconChevronU.style.transform = 'rotateX(360deg)';
  } else {
    contnerInputListUstensils.classList.add('visible');
    iconChevronU.style.transform = 'rotateX(180deg)';
  }
}
function ouvreListeAppliances() {
  if (contnerInputListAppliances.classList.contains('visible')) {
    contnerInputListAppliances.classList.remove('visible');
    iconChevronA.style.transform = 'rotateX(360deg)';
  } else {
    contnerInputListAppliances.classList.add('visible');
    iconChevronA.style.transform = 'rotateX(180deg)';
  }
}
function ouvreListeIngredients() {
  if (contnerInputListIngredients.classList.contains('visible')) {
    contnerInputListIngredients.classList.remove('visible');
    iconChevronI.style.transform = 'rotateX(360deg)';
  } else {
    contnerInputListIngredients.classList.add('visible');
    iconChevronI.style.transform = 'rotateX(180deg)';
  }
}
function recettesFiltrer(valueSerchbar) {
  const recipesfiltrer = recipes.filter(
    recipe =>
      recipe.name.toLowerCase().includes(valueSerchbar) ||
      recipe.description.toLowerCase().includes(valueSerchbar) ||
      recipe.ingredients.some(item =>
        item.ingredient.toLowerCase().includes(valueSerchbar)
      )
  );
   
  let uniqueRecipesFiltrer = [...new Set(recipesfiltrer)];

  return uniqueRecipesFiltrer;
}

//actualiser l'interface l'orsque l'utilisateur entre
//des caractére sur la barre de recherche
inputSearchbarPrincipal.addEventListener('keyup', function search_recette(e) {
  
  let RegExp = /^[a-zA-Z-\s]+$/;

  if (RegExp.test(e.target.value) == false || e.target.value.length < 3) {
    error.innerHTML = 'Veuillez entrez au moins trois caracteres';
  } else {
    error.innerHTML = '';
    let valueSerchbar = e.target.value.toLowerCase();

    const recipesInitial = recettesFiltrer(valueSerchbar);
    if (recipesInitial == 0) {
      messageSearchbar.innerHTML = ` Aucune recette ne contient ${valueSerchbar} vous pouvez chercher «
                      tarte aux pommes », « poisson », etc.`;
      sectionRecette.innerHTML = '';
      getRecettes(recipesInitial);
    } else {
      messageSearchbar.innerHTML = '';
      sectionRecette.innerHTML = '';

      getRecettes(recipesInitial);
      getAllAppliances(recipesInitial);
      getAllIngredient(recipesInitial);
      getAllUstensils(recipesInitial);
      //la recherche avec la boucle native
      testNative(valueSerchbar);
      function testNative(valueSerchbar) {
        let tabcumuleRecipes = [];
        for (let i = 0; i < recipes.length; i++) {
          if (recipes[i].name.toLowerCase().includes(valueSerchbar)) {
            tabcumuleRecipes.push(recipes[i]);
          } else if (
            recipes[i].description.toLowerCase().includes(valueSerchbar)
          ) {
            tabcumuleRecipes.push(recipes[i]);
          } else {
            for (let j = 0; j < recipes[i].ingredients[j].length; j++) {
              console.log(
                'boocle sur ingredients',
                recipes[i].ingredients[j].ingredient
              );
              if (
                recipes[i].ingredients[j].ingredient
                  .toLocaleLowerCase()
                  .includes(valueSerchbar)
              ) {
                tabcumuleRecipes.push(recipes[i]);
              }
            }
          }
          console.log(
            'tab cumule recipes avec boucle native',
            tabcumuleRecipes
          );
          return tabcumuleRecipes;
        }
      }
    }
  }
});

function getIngredients(recette, index) {
  let toutesIngredients = document.querySelector(
    `.toutes_ingredients_${index}`
  );

  recette.ingredients.forEach(ingredient => {
    const templateRecettes = recetteTemplate(ingredient);
    const cartDomIngredient = templateRecettes.cartDomIngredients(ingredient);
    toutesIngredients.appendChild(cartDomIngredient);
  });
}

function init() {
  getRecettes(recipes);
  getAllIngredient(recipes);
  getAllAppliances(recipes);
  getAllUstensils(recipes);
  //getListRecette(recipes)
}
init();
