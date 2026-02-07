## Pseudocodigo?

1. preguntar en el render inicial (useEffect) si esta creado el usuario
    1.1 Si esta creado, continuar
    1.2 Si no esta creado, crearlo automaticamente
2. dentro del mismo useEffect, hacer fetch de la informacion ya guardada (si el usuario es nuevo esto se puede saltar)
3. Añadir la featgure de añadir tareas. Usando el metodo POST, asociar a la presion de la tecla ENTER el añadir tarea a la lista, y luego con un GET actualizar la lista visualmente
4. 