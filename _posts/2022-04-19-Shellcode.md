# 4.Shellcode

**Control Flow Hijac (제어 흐름 하이재킹)**

⇒ 여러 멀웨어가 차용하고 있는 기술로, 코드가 작성되고 실행되는 방식 자체를 공략해 전혀 엉뚱한 결과물이 나오도록 하는 것

![Untitled](4%20Shellcod%2092d45/Untitled.png)

## Buffer overflow

buffer overflow를 이용하여 arbitrary(임의의) code를 실행할수 있을까 ? ⇒ YES

![Untitled](4%20Shellcod%2092d45/Untitled%201.png)

# System calls을 이해해보자! 🤔

### Shellcode란?

assembler으로 작성

hexadecimal opcode (16 진수 opcode)로 변환

`vulnerability`를 이용하여 system에 악성 행위를 한다. 

전형적으로 root shell을 실행?생성?하지만, 다른 작업을 수행 할 수 있다. 

### System calls (= Syscalls)

Syscall은 kernel에 직접적으로 access한다. 

⇒ 운영 체제를 통하여 접근을 한다. 

⇒ os, kernel에 요청을 보내는 것이 system call

> **왜 필요할까?
⇒ kernel mode와 user mode의 인터페이스로, os를 보호하기 위함 이다.**
> 

### Protection Rings

x86은 4개의 rings를 제공, window와 unix에서는 1~3개의 rings를 제공한다. 

- Ring 3 ⇒ user-land
- Ring0 ⇒ kernel-land

![Untitled](4%20Shellcod%2092d45/Untitled%202.png)

Ring의 번호가 커질수록 제약이 많아진다. 

### Protecting the kernel

OS는 시스템을 관리하는 역할을 한다. ⇒ OS를 보호해야 한다. 

`protected kernel mode`은 사용자 응용프로그램이 OS를 손상시키지 않도록 한다. 

만약, user mode program이 kernel memeory에 접근하려고 하면 `access exception`이 발생된다. 

**syscalls은 user mode와 kernel mode 사이의 인터페이스**이다. 

### Libc

: C library wrapper

: syscall을 부르기 위한 C functions

**장점**

- syscall이 변경되더라고, 프로그램이 정상적으로 작동하도록 허락
- `malloc`과 같은 유용한 함수를 제공 (malloc ⇒ heap에 공간 할당)

### Syscall INT 0x80 사용

1. Load Syscall numner into EAX
    
    `EAX` : function에 대한 정보를 저장??
    
2. Put arguments in other registers
3. Execute INT 0x80
    
    INT 0x80을 실행 ⇒ Syscall을 실행
    
4. CPU switches to kernel mode
5. Syscall function executes

### Syscall Number and Arguments

`EAX` 에 syscall 저장 (Integer 값? )

EBX, ECX, EDX, ESI, EDI, EPB와 같은 register에 load된다. 

> first argument : data structure에 대한 pointer 보유
> 

### exit()

libc의 `exit()` function은 많은 준비가 필요함, 가능한 많은 상황을 주의 깊게 다룬 다음 exit syscall을 호출해야 한다.

> gcc -static option
⇒ libc library들이 동적이 아닌, 함께 complie되도록 한다. 
⇒ program size가 커진다. 
⇒ 대신 속도가 빨라진다.
> 

### Disassembling exit

gdb 를 이용

`disassemble main` 와 같은 command를 입력 ⇒ memory 주소 출력

_exit label에 있는 syscall 호출을 준비하기 위한 error handling ..?

syscall 252 ⇒ exit_group() == kill all threads

syscall 1 ⇒ exit() == kill  calling thread 

![Untitled](4%20Shellcod%2092d45/Untitled%203.png)

# exit() syscall을 호출하는 Shellcode를 작성해보자!

### Shellcode size

shellcode는 simple, compact하게 작성

⇒ vulnerability는 종종 작은 injected btyes만을 허용하기 때문

⇒ 작게 작성하면, error-handling이 부족하게 되고, crash가 쉽게 발생

```wasm
section .text // section => 코드영역인지? data영역인지? 판단, .text => code
	global _start  //label작성

_start:
	
	mov ebx, 0 // exit status 0 => 종료되는 상태
	move eax, 1 // system call # => eax에 syscall에 대한 정보를 저장
	int 0x80
```

`nasm` : object file 생성 

`.asm` file을 elf format으로 변환

`ld` 는 생성한 file을 link하여 실행 가능한 ELF file을 생성한다. 

![Untitled](4%20Shellcod%2092d45/Untitled%204.png)

`objdump` : Shows the contents of object files

`opcode(=machine code)`, `AT&T format` 출력

`strace` : 어떤 syscall을 발생시키는지 확인 가능

## Injectable Shellcode

⇒ 공격에 사용되는 shellcode

### Null 제거

string을 종료하고, exploit를 중단시키는 `null bytes` 를 제거해야 한다. 

### Replacing Instructions

null을 만들때

`mov ebx, 0` 처럼 간단하게가 아닌

→ `00 00 00`

`xor ebx, ebx` 와 같이 해야한다 

→ 0이 제거됨 

⇒ 왜져? 몰러요

- `mov eax, 1` : 32bit를 move하므로, null를 포함한다.
    
    ⇒ `00 00 00 01`
    
    `eax` : 4byte
    
- `mov al, 1` : 8bit만 move
    
    ⇒ `01`
    
    `al` : 1byte
    
    null 이 없다, 어떤 asemble이든 사용이 가능
    

아래과 같이 변해야

공격에 사용할 수 있는 shellcode가 된다. 

+ machine code가 더 간단해졌다 (null char이 존재 x)

![Untitled](4%20Shellcod%2092d45/Untitled%205.png)

![Untitled](4%20Shellcod%2092d45/Untitled%206.png)

## Spawning a Shell

`exit()` 뿐만 아니라, 

arbitrary command을 입력할 수 있도록 attacker에게 shell을 제공하는 shellcode가 필요하다. 

### Shellcode - 5 단계

1. write high-level code
2. complie, disassemble
3. assembly 분석
4. clean up, assembly, null제거
5. extract commands, shellcode 생성

### Linux에서 새로운 process를 생성하는 2 way

- replace a running process
    
    `execve()`이용
    
- copy a running process to create a new one
    
    `fork()` ,  `execve()` 사용
    

두 방법의 차이는?

⇒ ??

### execve() Arguments

- 실행할 program의 이름을 포함하는 string에 대한 pointer
- argument array에 대한 pointer
- environment array에 대한 pointer

ex) `execve(”/bin/sh”, happy, NULL)`

![Untitled](4%20Shellcod%2092d45/Untitled%207.png)

- edx, ecx, edx, eax register에 4개의 parameter put
- INT 80

### /bin/sh shell 예시

![Untitled](4%20Shellcod%2092d45/Untitled%208.png)

`/bin/sh` ⇒ little endian으로 전달