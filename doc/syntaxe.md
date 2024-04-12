# 1: La syntaxe :

Regardons ce code

```minjs
#!#imp;
   @import Run;
   @import Return;
   @Fimport Minecraft::Print;
#!#fun;
    fun<MyFunction>()-:
      #MyFunction#fun;
        NULL;
      #MyFunction#text;
        Print<"Hello, World!">;
    MyFunction_END
#!#text;
   Run MyFunction();
   Return;
```

Qu'est ce que nous avons ici ?

### 1: les sections

Toutes les fonctions ont des sections.
Il y en a deux, et une à part:

1. #[NAME]#fun, elle contient les fonctions.
2. #[NAME]#text, elle contient le code a executer.

Vous avez sûrement remarqué le [NAME]. Dedan il faut indiquer le nom de la fonction (global étant appelée par défault `!`)
À part, il y a `#!#imp`. Car est n'est que dans global
(elle gere les imports)

### 2: les imports

Créez à partir de `#!#imp`, les imports permettent d'importer des fonction supplémentaires. Il y en existe deux types:

1. `@import [IMPORT]` elle permet d'importer des modules globaux (Par ex: `Run`)
2. `@Fimport [MODULE]::[IMPORT]` elle permet d'importer des modules qui viennent de modules spécifiques (Minecraft ou PreProssessor) (Par ex: `Minecraft::Print`)

### 2: les fonctions

Les fonction ont comme base ceci :

```minjs
fun<[NOM]>()-:
  #[NOM]#fun;
    NULL;
  #[NOM]#text;
    Print<"Hello, World!">;
[NOM]_END
```

Remplacer juste `[NOM]` par le nom de votre fonction, et les instructions, et ce sera bon!

NE METTEZ PAS DE FONCTION DANS LES FONCTIONS; Erreurs l'optimisations (les fonctions dans global sont par défault global (accéssibles dans d'autes fonctions))

Si il n'y à pas de fonctions dans global, mettez `NULL;`

### 2: le code

(Refférez vous aux modules)

(toutes les instructions sont séparées par des `;`)

# NEXT PART: modules.md
