# 3. Software Attacks - Buffer overflow

# Introduction to x86
Assembly

⇒ 32bit 

## AT&T vs Intel Syntax

![https://user-images.githubusercontent.com/49177223/163720262-7d422c6f-c607-4dd2-a056-9bd6b0fd01ff.png](https://user-images.githubusercontent.com/49177223/163720262-7d422c6f-c607-4dd2-a056-9bd6b0fd01ff.png)

## x86의 기존 register

Pseudo General Purpose Register

- Stack : SP (stack pointer), BP (base pointer)
- Strings : SI (source index), DI (destination index)

![Untitled](3%20Software%20cc6e8/Untitled.png)

Special Purpose Registers

- IP (instruction pointerand EFLAGS
    
    어떤 명령어가 실행되고 있는지 명령어의 주소를 담고 있는 register
    

## GPR usage

● Legacy structure: 16 bits
– 8 bit components: low and high bytes
– Allow quick shifting and type enforcement
● AX ← Accumulator (arithmetic)
● BX ← Base (memory addressing)
● CX ← Counter (loops)
● DX ← Data (data manipulation)

## Modern extensions

● “E” prefix for 32 bit variants → EAX, ESP
● “R” prefix for 64 bit variants → RAX, RSP
● Additional GPRs in 64 bit: R8 →R15

![Untitled](3%20Software%20cc6e8/Untitled%201.png)

## Endianness

### Big-endian ↔ highest order byte first

- 0A 0B 0C 0D

### Little-endian ↔ lowest order byte first (X86)

- 0D 0C 0B 0A

![Untitled](3%20Software%20cc6e8/Untitled%202.png)

## Operands in x86

● Register: MOV EAX, EBX
– Copy content from one register to another
● Immediate: MOV EAX, 10h
– Copy constant to register
● Memory: different addressing modes
– Complex address computation supported

## Addressing modes

● Direct: MOV EAX, [10h]
– Copy value located at address 10h
● Indirect: MOV EAX, [EBX]
– Copy value pointed to by register BX
● Indexed: MOV AL, [EBX + ECX * 4 + 10h]
– Copy value from array (BX[4 * CX + 0x10])
● Pointers can be associated to type
– MOV AL, byte ptr [BX]

## Data movement in assembly

**Basic instruction** : MOV (from src to dst)

**Alternatives**
– XCHG: Exchange values between src and dst
– PUSH: Store src to stack
– POP: Retrieve top of stack to dst
– LEA: Same as MOV but does not dereference

  ● Used to compute addresses
  ● LEA EAX, [EBX + 10h] ↔ MOV EAX, EBX + 10h

## Stack management

● PUSH, POP manipulate top of stack
– Operate on architecture words (16 bit on x86)
● Stack Pointer can be freely manipulated
● Stack can also be accessed by MOV
● The stack grows “downwards”
– Example: 0xc0000000 → 0

## Conditional statements

Two interacting instruction classes
● **Evaluators**: evaluate the conditional expression generating a set of boolean flags
● **Conditional jumps**: change the control flow based on boolean flags

> “Expression → Evaluator → EFLAGS → Jump”
> 

### Evaluators

● TEST - logical AND between arguments
– Does not perform operation itself, **focus on Zero Flag ⇒ 어떤 값이 1인지를 확인**
– Detecting 0: TEST EAX, EAX
– State of a bit: TEST AL, 00010000b (mask)
● CMP – logical SUB between arguments
– Compare two values: CMP EAX, EBX
– Focus on Sign, Overflow and Zero Flags

![Untitled](3%20Software%20cc6e8/Untitled%203.png)

### Jumps

flag의 상태에 기반

● Conditional jumps related to `CMP`:
– JE (equal), JNE (not equal), JG (greater), JGE, JL (less), JLE

● Conditional jumps related to `TEST`:
– JZ (same as JE), JNZ

● **Unconditional Jumps** ⇒ `JMP`

– **Relative jump**: address relative to current IP

Short [-128; 127], Near, Far; Constant offset
– **Absolute jump**: specific address

Direct vs Indirect (complie vs runtime에 알수있는 것)

Static analysis may fail for indirect jump

![Untitled](3%20Software%20cc6e8/Untitled%204.png)

# Stack Buffer Overflow

Stack : active subroutine 정보를 저장하는 데이터 구조

![Untitled](3%20Software%20cc6e8/Untitled%205.png)

**Stack 내부 구조**

![Untitled](3%20Software%20cc6e8/Untitled%206.png)

# Stack Buffer Overflow

### Morris Worm

Nov. 2, 1988 `buffer overflow` Unix

## Buffer Overflow란?

- Overruns buffer boundary
- Overwrites adjacent memory objects

⇒ 공격자가 return address를 overwirte할수있다. 

⇒ control flow hijaking

![Untitled](3%20Software%20cc6e8/Untitled%207.png)

> 버퍼의 용량 까지만 데이터가 쌓여야 하는데, 프로그램의 버그 때문에 buffer의 크기를 넘어 다른 object를 overwrite해 문제가 발생한다.
> 

## Control Flow Hijack

![Untitled](3%20Software%20cc6e8/Untitled%208.png)

위와 같은 상황이 `control flow hijack`

## Simple Buffer Overflow

**공격 전략**

- 1. stack에서 `ret` 에 의해 pop된, `return address`를 찾고
    
    ⭐ `esp` register가 subroutine entry에서 `return address` 를 포함한다는것을 기억
    
- 2. `Buffer overflow` 를 이용하여 `return address` 를 조작한다.
    
    
    input 에 `“A”*260 + “printthis address”` 을 넣으면 원하는 조작이 가능하다. 
    
    ![Untitled](3%20Software%20cc6e8/Untitled%209.png)
    
    `esp` 가 `ebp`-0x100(⇒ 256byte)
    

- 3.새로운 `return address`는 `"printthis" function` 의 주소가 된다.
    
    이제 `“printthis address”` 의 주소만 찾으면 된다.
    
    ⇒  **payload**
    
    ```jsx
    python –c ‘print “A” * 260 + **“\x5b\x84\x04\x08”**’| ./bof
    ```
    
    ❗Little endian을 이용하여 적어야 한다❗
    
    ![Untitled](3%20Software%20cc6e8/Untitled%2010.png)