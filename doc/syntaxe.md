# 1: La syntaxe :

Let's look at this code

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

What do we have here?

### 1: sections

All functions have sections.
There are two, and one apart:

1. #[NAME]#fun, it contains the functions.
2. #[NAME]#text, it contains the code to execute.

You probably noticed the [NAME]. Inside you must indicate the name of the function (global being called by default `!`)
Separately, there is `#!#imp`. Because it is only in global
(she manages imports)

### 2: imports

Create from `#!#imp`, imports allow you to import additional functions. There are two types:

1. `@import [IMPORT]` allows you to import global modules (eg: `Run`)
2. `@Fimport [MODULE]::[IMPORT]` it allows you to import modules that come from specific modules (Minecraft or PreProssessor) (For example: `Minecraft::Print`)

### 2: functions

The functions are based on this:

```minjs
fun<[NOM]>()-:
  #[NOM]#fun;
    NULL;
  #[NOM]#text;
    Print<"Hello, World!">;
[NOM]_END
```

Just replace `[NAME]` with the name of your function, and the instructions, and you'll be good to go!

DO NOT PUT FUNCTIONS IN FUNCTIONS; Optimization errors (functions in global are by default global (accessible in other functions))

If there are no functions in global, set `NULL;`

### 2: the code

(Refer to modules)

(all instructions are separated by `;`)

#NEXT PART: modules.md
