# The modules

## 1: Minecraft

### a: Clear

clear HOW_MANY WHAT (item) to WHO

Syntaxe:

```minjs
Clear<"[WHO]","[WHAT]",[HOW_MANY]>;
```

WHO=String; Minecraft selector
WHAT=String; Minecraft item
WHAT=Number

Equivalent in Minecraft:
`/clear [WHO] [WHAT] [HOW MANY]`

### b: Command

clear Execute COMMAND

Syntaxe:

```minjs
Execute<"[COMMAND]">;
```

COMMAND=String; Minecraft command

Equivalent in Minecraft:
`/[COMMAND]`

### c: Event

Run a function if the objectif is at more than 1

Syntaxe:

```minjs
When<[OBJECTIF]>([WHO]&[NAME_OF_THE_SCOREBOARD]): [FUNCTION_NAME];
```

OBJECTIF=Undef; Minecraft scoreboard objective
WHO=Undef; Minecraft selector
NAME_OF_THE_SCOREBOARD=Undef; Minecraft scoreboard name
FUNCTION_NAME=Undef; MinJS function name

Equivalent in Minecraft:
[MORE THAN 1 COMMAND]

### d: EventFun

Just place it in a function that will be called by an Event (it just reset the event)

Syntaxe:

```minjs
EvFun<[WHO],[NAME_OF_THE_SCOREBOARD]>;
```

WHO=Undef; Minecraft selector
NAME_OF_THE_SCOREBOARD=Undef; Minecraft scoreboard name

Equivalent in Minecraft:
`execute as [WHO] run scoreboard players set @s [NAME_OF_THE_SCOREBOARD] 0`

### e: If

A simple `/execute if`

Syntaxe:

```minjs
Minecraft If<[ARG1]>([ARG2]): [FUNCTION_NAME];
```

ARG1=Undef; First arg of `/execute if`
ARG2=Undef; Second arg of `/execute if`
FUNCTION_NAME=Undef; MinJS function name

Equivalent in Minecraft:
`/execute if [ARG1] [ARG2] run [THEN THE CODE IN THE FUNCTION]`

### f: Print

A simple `/say`

Syntaxe:

```minjs
Print<"[WHAT_DO_YOU_WANT_TO_SAY_TODAY]">;
```

WHAT_DO_YOU_WANT_TO_SAY_TODAY=String; Message to print in the chat

Equivalent in Minecraft:
`/say [WHAT_DO_YOU_WANT_TO_SAY_TODAY]`

### g: Print

A simple `/say`

Syntaxe:

```minjs
Print<"[WHAT_DO_YOU_WANT_TO_SAY_TODAY]">;
```

WHAT_DO_YOU_WANT_TO_SAY_TODAY=String; Message to print in the chat

Equivalent in Minecraft:
`/say [WHAT_DO_YOU_WANT_TO_SAY_TODAY]`

### h: setBlock

Set the block ([TYPE]) at [X], [Y] and [Z]

Syntaxe:

```minjs
setBlock<[X],[Y],[Z],"[TYPE]">;
```

X,Y,Z=Any; Minecraft coordinates
TYPE=String; Minecraft block type

Equivalent in Minecraft:
`/setblock [X] [Y] [Z] [TYPE]`

### i: Summon

Spawn the entity ([TYPE]) at [COORDINATES] with [NBT] as nbt (for nothing, just type `{}`)

Syntaxe:

```minjs
Summon<"[TYPE]","[COORDINATES]","[NBT]">;
```

TYPE=String; Minecraft entity type
COORDINATES=String; Minecraft coordinates
NBT=String; Minecraft entity nbt

Equivalent in Minecraft:
`/summon [TYPE] [COORDINATES] [NBT]`

### j: Tp

Teleport [WHO] to [WHERE]

Syntaxe:

```minjs
Tp<"[WHO]","[WHERE]">;
```

WHO=String; Minecraft entity selector
WHERE=String; Minecraft entity selector/Minecraft coordinates

Equivalent in Minecraft:
`/tp [WHO] [WHERE]`

## 2: Global

### a: As

Execute THE NEXT command (NOT INSTRUCTION!) As an entity [WHO]

Syntaxe:

```minjs
As<"[WHO]">;
```

WHO=String; Minecraft entity selector

Equivalent in Minecraft:
`/execute as [WHO] run ...`

### b: At

Execute THE NEXT command (NOT INSTRUCTION!) At an entity [WHO]

Syntaxe:

```minjs
At<"[WHO]">;
```

WHO=String; Minecraft entity selector

Equivalent in Minecraft:
`/execute at [WHO] run ...`

### b: Bvar

A simple block variable.

THIS FEATURE WILL BE REMOVED IN THE FUTURE, Use Svar!

### b: FLoop

Execute in loop the function very fast
DON'T ACCEPT ANY WAIT

Syntaxe:

```minjs
FastLoop [FUNCTION_NAME]();
```

FUNCTION_NAME=Letters; MinJS function name

Equivalent in Minecraft:
Repeat command block with chain

### b: Bvar_If

A simple block variable if.

THIS FEATURE WILL BE REMOVED IN THE FUTURE, Use Svar!

### b: Loop

A simple loop (run the code every ~0.3 seconds)

Syntaxe:

```minjs
Loop [FUNCTION_NAME]();
```

FUNCTION_NAME=Letters; MinJS function name

Equivalent in Minecraft:
Not needed

### b: FRun

Execute the function very fast
DON'T ACCEPT ANY WAIT

Syntaxe:

```minjs
FastRun [FUNCTION_NAME]();
```

FUNCTION_NAME=Letters; MinJS function name

Equivalent in Minecraft:
Chain command block

### b: Return

NEEDS TO BE PLACED AT THE END OF global

Syntaxe:

```minjs
Return;
```

### b: Run

Just run the function

Syntaxe:

```minjs
Run [FUNCTION_NAME]();
```

FUNCTION_NAME=Letters; MinJS function name

Equivalent in Minecraft:
Not Needed

### b: Svar

A scoreboard variable

Syntaxe:

```minjs
[TO_WHO] Svar [NAME] = [HOW_MANY];
```

TO_WHO=Any; To who will the scoreboard be attribued
NAME=Letters, the name of the variable
HOW_MANY=Number

Equivalent in Minecraft:
scoreboard

### b: SAdd

Add a one to a scoreboard variable

Syntaxe:

```minjs
[NAME].Add();
```

NAME=Letters, the name of the variable

Equivalent in Minecraft:
`/scoreboard players add ... [NAME] 1`

### b: SRm

Remove a one to a scoreboard variable

Syntaxe:

```minjs
[NAME].Remove();
```

NAME=Letters, the name of the variable

Equivalent in Minecraft:
`/scoreboard players remove ... [NAME] 1`

### b: SRand

Set the scoreboard variable to a random number beetween [MIN] and [MAX]

Syntaxe:

```minjs
[NAME].Random([MIN],[MAX]);
```

NAME=Letters, the name of the variable
MIN=Number
MAX=Number

Equivalent in Minecraft:
`"execute store result score ... [NAME] run random value [MIN]..[MAX]"`
(Need to be 1.20.2+)

### b: SSet

Set the scoreboard variable to [VALUE]

Syntaxe:

```minjs
[NAME].Set([VALUE]);
```

NAME=Letters, the name of the variable
VALUE=Number

Equivalent in Minecraft:
`/scoreboard players set ... [NAME] [VALUE]`

### b: SIf

Run a function IF:

Syntaxe:
1, or 2 you can choose:
1:

```minjs
If<Svar>([VAR] [SIGN] [NUNBER/VAR]):\s*(\w+);
```

2:

```minjs
If<Svar [WHO]>([VAR] [SIGN] [NUNBER/VAR]):\s*(\w+);
```

WHO=Any; Minecraft selector
VAR=Letters or Numbers; The first variable that will be compared
SIGN="<" OR "=" OR ">"; The sign
VAR=Letters or Numbers; The second variable/number that will be compared

Equivalent in Minecraft:
Not needed

### b: Wait

Just wait [TIME] ticks (from 1 to 4):

Syntaxe:

```minjs
Wait [TIME];
```

TIME=Number; 1 to 4

Equivalent in Minecraft:
Repeater

# NEXT PART: PPMJS.md
